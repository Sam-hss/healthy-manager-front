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
                    <span style="color: white;">
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
        <div class="menu">
          <h1 style="padding: 60px 0;">学生健康管理系统</h1>
          <div class="menu-body">
            <div class="item1" v-for="(item,index) in generateMenu" :style="{'background-color': item.color}"
                 :key="index">
              <div class="item-div" @click="toDetail(item.url)">
                <!--<img :src="item.pic" style="width: 100px;height: 100px;"/>-->
                <i :class="item.icon"></i>
                <h3>{{item.name}}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="修改密码" :visible.sync="addDialogVisible"
               width="30%">
      <el-form :model="userForm" ref="userForm" style="padding-right: 20px" :rules="rules" label-width="20%">
        <el-form-item label="用户名">
          <el-input v-model="userForm.username" placeholder="用户名"></el-input>
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
  import Color from '../mock/color.js'

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
          account: '',
          password: '',
          checkPass: ''
        },
        menu: [],
        datetime: {
          date: "",
          time: ""
        },
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
      getDatetime() {
        setInterval(() => {
          let date = new Date();
          this.datetime.date = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
          this.datetime.time = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
        }, 1000);
      },
      toDetail(data) {
        this.$router.push(data);
      }
    },
    created() {
      this.getDatetime();
    },
    computed: {
      generateMenu: function () {
        let roleData = JSON.parse(localStorage.getItem("role"));
        let Menu = JSON.parse(localStorage.getItem("menu"));
        Menu.forEach((m) => {
          if (roleData.roleName === '辅导员' && m.name === '用户信息管理') {
            m.name = "学生信息管理"
          }
          m.color = Color[Math.floor((Math.random() * Color.length))];
        });
        return Menu;
      }
    }

  }
</script>
<style lang="less">
  .iconfont {
    font-size: 80px;
  }

  .main {
    display: flex;
    text-align: center;
    height: 100%;

    .el-menu:not(.el-menu--collapse) {
      width: 100%;
    }

    .el-menu {
      background-color: rgba(236, 245, 255, 0.5);
      /*font-family: "Microsoft YaHei";*/
      font-weight: bold;
      font-size: 28px;
      color: #E5FCFF;
      letter-spacing: 5px;
      text-shadow: 0 0 8px #FFF, 0 0 42px #FFF, 0 0 72px #FFF, 0 0 150px #FFF;
    }

    .app {
      width: 100%;
      background-color: #E2F1FF;
    }

    .aside {
      width: 100%;
      margin-top: 60px;
      z-index: 10;
      transition: all 0.3s ease-in-out;
      height: calc(100% - 60px);
      overflow-x: auto;

      .menu {
        background: url("../assets/gdufeSchool.jpg");
        background-size: cover;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        font-size: 20px;
        height: 100%;

        .menu-body {
          height: 100%;
          width: 1200px;
          flex-direction: row;
          display: flex;
          flex-wrap: wrap;
          align-content: flex-start;
          justify-content: center;

          div:nth-child(n+6) {
            width: 388px;
            height: 200px;
          }

          .item1 {
            width: 228px;
            height: 200px;
            margin: 5px;
            transition: .3s;
            cursor: pointer;
            border-radius: 5px;

            &:hover {
              box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            }

            .item-div {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 100%;
              color: #000;
              text-decoration: none;
            }
          }
        }
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

    .time-box {
      display: flex;
      flex-direction: column;
      float: right;

      .time-time {
        font-size: 20px;
        color: #66bdff;
        letter-spacing: 1.66px;
      }
    }

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
