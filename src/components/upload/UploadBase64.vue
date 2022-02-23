<template>
  <div>
    <el-upload
            class="avatar-uploader"
            :action="url"
            :multiple="false"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
      <img alt="头像图片" v-if="value" :src="value" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        defaults: ""
      }
    },
    name: "UploadImg",
    data() {
      return {
        url: "/api/uploadFile/upload"
      }
    },
    methods: {
      handleAvatarSuccess(res) {
        console.log("res:", res);
        this.emitInput(res);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        if (!isJPG && !isPNG) {
          this.$message.error('上传头像图片只能是 JPG或者PNG 格式!');
        }
        return isLt2M && (isJPG || isPNG);
      },
      emitInput(val) {
        this.$emit('input', val);

      }
    }
  }
</script>

<style scoped lang="less">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 241px;
    line-height: 241px;
    text-align: center;
    border: 1px solid #8c939d;
  }

  .avatar {
    width: 178px;
    height: 241px;;
    display: block;
  }
</style>
