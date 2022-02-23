<template>
  <div class="main">
    <div class="header">
      <div class="logo">
        <a href="http://www.gdufe.edu.cn" target="_blank">
          <img src="@/assets/gdufe.jpg" style="width: 60px;height: 60px"/>
        </a>
        <div style="height: 60px;background: linear-gradient(to right, white, #737c83);">
          <router-link to="/index" style="text-decoration: none">
            <h3 style="color: #3a8ee6;letter-spacing: 3px;">学生健康管理系统</h3>
          </router-link>
        </div>
      </div>
      <div style="width: 500px;height: 60px;">
        <span style="color:white;letter-spacing: 5px"></span>
      </div>
      <div class="right">
        <el-dropdown style="float: right;">
                    <span style="color: white">
                         {{user.name}}({{roleData.roleName}})<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="updatePassword"><i style="padding-right: 8px" class="el-icon-share"></i>修改密码
            </el-dropdown-item>
            <el-dropdown-item @click.native="logout"><i style="padding-right: 8px" class="el-icon-star-off"></i>退出系统
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="time-box">
          <span class="time-time" v-text="datetime.time">12:00:00</span>
        </div>
      </div>
    </div>
    <div class="app">
      <div class="aside">
        <div class="index">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <el-dialog title="修改密码" :visible.sync="addDialogVisible"
               width="30%">
      <el-form :model="userForm" ref="userForm" style="padding-right: 20px" :rules="rules" label-width="20%">
        <el-form-item label="用户名">
          <el-input v-model="userForm.username" placeholder="用户名" @blur="checkUserName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="loginPassword">
          <el-input type="password" v-model="userForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="userForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="updateUser(userForm)">确认</el-button>
          <el-button @click="addDialogVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import Message from '../components/messages/index'

  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.userForm.checkPass !== '') {
            this.$refs.userForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.userForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        menus: [],
        menuMap: {},
        addDialogVisible: false,
        isCollapse: false,
        userInfo: {},
        uniqueOpened: true,
        rules: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        },
        userForm: {
          username: '',
          password: '',
          checkPass: ''
        },
        menu: [],
        datetime: {
          date: "",
          time: ""
        },
        currentUser: JSON.parse(localStorage.getItem("user")),
        menusMap: {},
        role: "",
        user: JSON.parse(localStorage.getItem("user")),
        roleData: JSON.parse(localStorage.getItem("role"))

      }
    },
    methods: {
      async logout() {
        this.$http.get("/user/loginOut").then(res => {
          if (res.status === 200) {
            Message.success(res.data);
            localStorage.clear();
            this.$router.push("/login")
          }
        })
      },

      handleOpen() {
      },
      handleClose() {
      },
      updatePassword() {
        this.addDialogVisible = true;
        this.userForm = JSON.parse(localStorage.getItem("user"));
      },
      async updateUser(data) {
        let self = this;
        this.$http.post("/user/updateUser", data).then(res => {
          if (res.status === 200) {
            Message.success("修改成功");
            localStorage.clear();
            this.$router.push("/login");
            self.addDialogVisible = false;
          }
        });

      },
      checkUserName() {

      },
      getDatetime() {
        setInterval(() => {
          let date = new Date();
          this.datetime.date = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
          this.datetime.time = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
        }, 1000);
      },
    },
    computed: {},
    created() {
      this.getDatetime();
    },

  }
</script>
<style lang="less">
  .main {
    display: flex;

    .app {
      width: 100%;
    }

    .aside {
      width: 100%;
      margin-top: 60px;
      z-index: 10;
      transition: all 0.3s ease-in-out;
      height: calc(100% - 60px);
      overflow-x: auto;

      .index {
        width: 100%;
        font-size: 20px;
      }
    }
  }

  .header {
    width: 100%;
    position: fixed;
    display: flex;
    height: 60px;
    line-height: 60px;
    background-color: #737c83;
    justify-content: space-between;
    z-index: 10;

    .logo {
      display: flex;
      flex-direction: row;
      width: 300px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      color: #FFF;
      font-weight: 600;
      -webkit-transition: width 0.35s;
      transition: all 0.3s ease-in-out;
    }

    .right {
      img {
        height: 48px;
        width: 48px;
        border-radius: 50%;
      }
    }
  }

  .time-box {
    display: flex;
    flex-direction: column;
    float: right;

    .time-time {
      font-size: 20px;
      color: #8EF3FA;
      letter-spacing: 1.66px;
    }

    .time-date {
      opacity: 0.48;
      font-size: 10px;
      -webkit-transform: scale(0.83333333) translate(-8.33333333%, 0);
      transform: scale(0.83333333) translate(-8.33333333%, 0);
      color: #8EF3FA;
      letter-spacing: 0.83px;
      text-indent: 34px;
    }
  }


  .el-menu--vertical {
    min-width: 190px;
  }

  .setting-category {
    padding: 10px 0;
    border-bottom: 1px solid #eee;
  }

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: #F5F5F5;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: #bdbdbd;
  }

  /*滑块效果*/
  ::-webkit-scrollbar-thumb:hover {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.4);
  }

  /*IE滚动条颜色*/
  html {
    scrollbar-face-color: #bfbfbf; /*滚动条颜色*/
    scrollbar-highlight-color: #000;
    scrollbar-3dlight-color: #000;
    scrollbar-darkshadow-color: #000;
    scrollbar-Shadow-color: #adadad; /*滑块边色*/
    scrollbar-arrow-color: rgba(0, 0, 0, 0.4); /*箭头颜色*/
    scrollbar-track-color: #eeeeee; /*背景颜色*/
  }

</style>
