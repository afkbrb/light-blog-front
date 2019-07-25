<template>
  <div class="comment-box">
    <form class="new-comment">
      <a class="avatar" @click="openModal">
        <img v-if="info.avatar" :src="info.avatar">
        <img v-else src="@/assets/imgs/add.png">
      </a>
      <textarea id="comment-text" ref="commentText" v-model="info.content" placeholder="写下你的评论..."/>
      <div class="write-function-block">
        <div v-if="!isMobile" class="emoji-modal-wrap" style="display: inline-block">
          <a class="emoji-icon" tabindex="0" @click="showEmoji = !showEmoji" @blur="showEmoji = false">
            <i class="iconfont icon-smile" style="font-size: 1.5rem; color: #969696"/>
            <div v-if="showEmoji" class="emoji-wrapper">
              <emoji class="emoji" @select="selectEmoji" />
            </div>
          </a>
        </div>
        <a ref="sendComment" class="btn btn-send" href="javascript:void(0)" @click="submitComment">发送</a>
      </div>
    </form>

    <el-dialog :visible.sync="infoVisible" title="先完善一下信息呗！" width="90%" style="width: 500px; max-width: 100%; margin: 0 auto;">
      <el-form :model="info" :rules="rules" label-width="80px">
        <el-form-item label="昵称" prop="name">
          <el-input v-model="info.name" class="inner-item" />
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <lb-upload v-model="info.avatar" height="90px" class="inner-item" />
        </el-form-item>
        <el-form-item label="邮件" prop="email">
          <el-input v-model="info.email" class="inner-item" />
        </el-form-item>
        <div style="text-align: center">
          <el-button type="primary" style="margin-right: 2.5rem" @click="addProfile">确定</el-button>
          <el-button type="danger" @click="closeDialog">取消</el-button>
        </div>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import Cookie from 'js-cookie'
import { addComment } from '@/api/comment'
import upload from '@/components/Upload'
import emoji from '@/components/Emoji'

export default {
  components: {
    lbUpload: upload,
    emoji
  },
  props: {
    blogId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      info: {
        name: '',
        content: '',
        avatar: '',
        replyCommentId: '',
        email: ''
      },
      infoVisible: false,
      rules: {
        name: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在2到10个字符', trigger: 'blur' }
        ],
        avatar: [
          { required: false, message: '请选择头像（可选），不上传的话将使用随机头像', trigger: 'blur' }
        ],
        email: [
          { required: false, message: '请填写邮箱（可选）', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱！', trigger: ['blur', 'change'] }
        ]
      },
      showEmoji: false,
      cookieKey: 'READER_INFO',
      commentInterval: 30,
      commentReady: true,
      isMobile: false
    }
  },
  computed: {
    replyId() {
      return this.$root.state.comment.id
    },
    receiverName() {
      return this.$root.state.comment.name
    }
  },
  watch: {
    replyId(replyId) {
      if (replyId) {
        this.info.content = `@${this.receiverName}: `
        this.$refs.commentText.focus()
      }
    }
  },
  created() {
    this.info = { ...Cookie.getJSON(this.cookieKey), content: '', replyCommentId: '' }
  },

  mounted() {
    this.isMobile = window.matchMedia('(max-width:768px)').matches
  },
  methods: {
    openModal() {
      this.infoVisible = true
    },
    submitComment() {
      if (!this.commentReady) return
      if (this.validateComment()) {
        this.info.blogId = this.blogId
        if (this.replyId) this.info.replyCommentId = this.replyId
        addComment(this.info).then(response => {
          this.$message({
            message: '评论成功',
            type: 'success'
          })

          this.resetCommentTime()

          this.info.avatar = response.data // 如果没有上传头像，则头像由后台系统生成
          this.info.content = ''
          this.$root.state.comment.id = ''
          this.$root.state.comment.name = ''
          this.$root.state.comment.add += 1
          this.storeInfo()
        })
      }
    },
    storeInfo() {
      const readerInfo = {
        name: this.info.name,
        avatar: this.info.avatar,
        email: this.info.email
      }
      Cookie.set(this.cookieKey, readerInfo, { expires: 7 })
    },
    closeDialog() {
      this.infoVisible = false
      this.storeInfo()
    },
    addProfile() {
      this.infoVisible = false
      this.storeInfo()
    },
    validateComment() {
      if (!this.info.name) {
        this.openModal()
        return false
      }

      if (this.info.email && !/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(this.info.email)) {
        this.$message({
          message: '邮箱格式不正确！',
          type: 'warning'
        })
        return false
      }

      if (!this.info.content) {
        this.$message({
          message: '评论内容不能为空！',
          type: 'warning'
        })
        return false
      }

      if (this.info.content.length > 60) {
        this.$message({
          message: '评论字数不能超过60！',
          type: 'warning'
        })
        return false
      }
      return true
    },
    selectEmoji(code) {
      console.log('select emoji')
      this.info.content += code
    },
    resetCommentTime() {
      this.commentReady = false
      let timeLeft = this.commentInterval
      const judge = setInterval(() => {
        timeLeft--
        if (timeLeft <= 0) {
          this.commentReady = true
          this.$refs.sendComment.innerHTML = '发送'
          clearInterval(judge)
        } else {
          this.$refs.sendComment.innerHTML = timeLeft
        }
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>

  .comment-box{
    width: 100%;

   .new-comment {
    position: relative;
    margin-left: 48px;

     .avatar {
       position: absolute;
       left: -48px;
       margin-right: 5px;
       width: 38px;
       height: 38px;
       vertical-align: middle;
       display: inline-block;

       img {
         width: 100%;
         height: 100%;
         border-radius: 50%;
       }
     }

     textarea {
       padding: 10px 15px;
       width: 100%;
       height: 80px;
       font-size: 13px;
       border: 1px solid #dcdcdc;
       border-radius: 4px;
       background-color: hsla(0, 0%, 71%, .1);
       resize: none;
       display: inline-block;
       vertical-align: top;
       outline-style: none;
     }

     .btn-send {
       float: right;
       width: 78px;
       margin: 10px 0;
       padding: 8px 18px;
       font-size: 16px;
       border: none;
       border-radius: 20px;
       color: #fff !important;
       background-color: #42c02e;
       cursor: pointer;
       outline: none;
       display: block;

       &:focus {
         outline: 0;
         box-shadow: 0 0 0 0.2rem rgba(58, 255, 93, 0.25);
       }
     }

     .emoji-icon {
       position: absolute;
       outline: none;
       text-decoration: none;

       &:hover{
         text-decoration: none;
       }
     }

     .emoji-wrapper {
       position: relative;
       float: left;
       max-width: 100%;

       .emoji{
         position: absolute;
         top: -48px;
         left: -36px;

         }
       }
     }
  }

</style>
