<template>
  <div class="login" v-loading="loading">
    <el-card style="background-color: rgba(255, 255, 255, 0.8);">
      <img src="@/assets/gdufe.jpg" alt="广东财经大学" style="width: 100px;height: 100px">
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <h1 style="margin: 4px 0">学生健康管理系统</h1>
        <span style="font-size:20px;letter-spacing: 20px;text-shadow: -4px -4px 5px #aaa;font-variant: all-small-caps;word-spacing: 3px;">欢迎登陆</span>
        <el-form-item style="margin-top: 43px" prop="username">
          <el-input size="small" placeholder="用户名" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input size="small" placeholder="密码" type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" size="small" style="margin-top: 10px" @click="login(loginForm)">登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
          <el-button type="info" size="small" style="margin-top: 10px" @click="openRegister">
            注&nbsp;&nbsp;&nbsp;&nbsp;册
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog
            title="注册"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
      <el-form :model="registerForm" status-icon :rules="rules2" :ref="registerForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="registerForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="stuNo">
          <el-input v-model="registerForm.stuNo"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="registerForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
         <el-button @click="resetForm(registerForm)">重置</el-button>
         <el-button type="success" @click="register(registerForm)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import Message from '../components/messages/index.js'
  import {Loading} from 'element-ui'

  export default {
    data() {
      const validateUsername = (rule, value, callback) => {
        value = value.split(" ").join("");
        if (value === '') {
          callback(new Error('请输入有效值'));
        } else if (value.length < 3) {
          callback(new Error('字段名太短'));
        } else {
          callback();
        }
      };
      const validatePass = (rule, value, callback) => {
        value = value.split(" ").join("");
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        value = value.split(" ").join("");
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        loading: false,
        loginForm: {
          username: "",
          password: ""
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        },
        rules2: {
          password: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'} //失去焦点就开始校验
          ],
          username: [
            {validator: validateUsername, trigger: 'blur'}
          ],
          StuNo: [
            {validator: validateUsername, trigger: 'blur'}
          ]
        },
        dialogVisible: false,
        registerForm: {
          username: "",
          password: "",
          checkPass: "",
          stuNo: ""
        },
        menuMap: {},
        loadingInstance: '',
        loadingOptions: {
          lock: true,
          text: '正在登陆中，请耐心等候...',
          spinner: 'el-icon-loading',
          background: 'rgba(0,0,0,0.8)'
        },
      }
    },
    methods: {
      login(data) {
        let self = this;
        if (data.username === "" || data.password === "") {
          self.$message.warning("用户名或密码不能为空！")
        } else {
          self.loadingInstance = Loading.service(self.loadingOptions);
          self.$http.post("/user/login", self.loginForm).then(res => {
            console.info("登录返回的结果为：", res);
            if (res.status === 200) {
              let user = res.data;
              //缓存所有角色信息
              self.$http.get("/role/all").then(res => {
                if (res.status === 200) {
                  localStorage.setItem("roles", JSON.stringify(res.data));
                }
              });
              //缓存所有用户信息
              self.$http.get("/user/all").then(res => {
                if (res.status === 200) {
                  localStorage.setItem("users", JSON.stringify(res.data));
                }
              });
              //缓存当前角色信息
              self.$http.get("/role/get/" + user.roleId).then(res => {
                if (res.status === 200) {
                  localStorage.setItem("role", JSON.stringify(res.data));
                }
              });
              //缓存当前用户的健康档案
              self.$http.get("/checkInfo/getCurrentCheckInfo/" + user.id).then(res => {
                if (res.status === 200) {
                  localStorage.setItem("checkData", JSON.stringify(res.data));
                }
              });
              //缓存当前用户信息
              localStorage.setItem("user", JSON.stringify(user));
              self.$http.get("/resources/getMenuByUserId", {params: {"userId": user.id, "typeId": 0}}).then(res => {
                if (res.status === 200) {
                  localStorage.setItem("menu", JSON.stringify(res.data));
                  self.loadingInstance.close();
                  self.$router.push("/index");
                }
              })
            }
          }).catch(() => {
            Message.error("访问出错");
            self.loadingInstance.close();
          });
          self.loadingInstance.close();

        }
      },
      openRegister() {
        this.dialogVisible = true;
      },
      register(registerForm) {
        this.$refs[registerForm].validate((valid) => {
          if (valid) {
            this.$http.post("/user/add", registerForm).then(res => {
              if (res.status === 200) {
                Message.success("注册成功");
                this.dialogVisible = false;
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleClose() {
        this.dialogVisible = false;
      },
      resetForm(registerForm) {
        this.$refs[registerForm].resetFields();
      },

    }
  }
</script>

<style lang="less">
  .login {
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    width: 100%;
    height: calc(~'100vh');
    background: url("../assets/gdufeSchool.jpg");
    background-size: cover;

    .el-card {
      height: 469px;
      width: 508px;

      h3 {
        padding-top: 40px;
        padding-bottom: 10px;
        letter-spacing: 10px;
        text-shadow: 0 12px 7px #c8e494;
      }

      .el-form-item {
        padding: 0 78px;

        .el-input__inner {
          text-align: center !important;
        }
      }
    }
  }
</style>

