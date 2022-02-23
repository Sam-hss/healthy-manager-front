<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
  * {
    margin: 0;
    padding: 0;
  }

  body {
    width: 100%;
    height: 100%;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    width: 100%;
    height: calc(~'100vh');
  }

  .el-dialog__header {
    background-color: #737c83;
    padding: 20px 20px 17px !important;

    .el-dialog__title {
      font-size: 20px;
      color: white;
      letter-spacing: 5px;
      font-weight: 800;
    }

    .el-dialog__headerbtn .el-dialog__close {
      color: white;
    }
  }

  .el-button--success {
    background-color: #737c83 !important;
    border-color: #737c83 !important;
  }

  .el-form-item__label {
    font-weight: 600;
    padding-left: 25px !important;
  }

  .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
    content: '*' !important;
    color: #F56C6C;
    margin-right: 0 !important;
  }
</style>
