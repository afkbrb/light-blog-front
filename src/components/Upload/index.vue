<template>
  <el-upload
    :action="action"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    class="image-uploader, inner-item"
    accept="image/jpeg, image/gif, image/png, image/bmp"
  >
    <img v-if="image" :src="image" :style="imageSize" class="image">
    <i v-else :style="iconSize" class="el-icon-plus image-uploader-icon" />
  </el-upload>
</template>

<script>
export default {
  model: {
    prop: 'image',
    event: 'change'
  },
  props: {
    image: String,
    height: String
  },
  data() {
    return {
      mHeight: '180px',
      imageSize: '',
      iconSize: '',
      action: process.env.UPLOAD_URL
    }
  },
  created() {
    this.mHeight = this.height
    this.imageSize = 'height: ' + this.mHeight + ';'
    this.iconSize = 'height: ' + this.mHeight + ';width: ' + this.mHeight + ';line-height:' + this.mHeight
  },
  methods: {
    handleAvatarSuccess(response) {
      this.$emit('change', response.data.url)
    },
    beforeAvatarUpload(file) {
      const isLt4M = file.size / 1024 / 1024 < 4

      if (!isLt4M) {
        this.$message.error('上传头像图片大小不能超过 4MB!')
      }
      return isLt4M
    }
  }
}
</script>

<style lang="scss" scoped>
  .image-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .image-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .image-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    line-height: 180px;
    text-align: center;
    border: 1px dashed #d9d9d9;

    &:hover{
      border: 1px dashed #b9c1d9;
      box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
    }
  }
  .image {
    display: block;
  }
</style>
