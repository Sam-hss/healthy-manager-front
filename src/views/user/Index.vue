<template>
  <div style="display: flex;flex-direction: column;align-items: center">
    <div style="margin: 40px 0"><h1>用户管理</h1></div>
    <el-card style="width: 80%">
      <div style="width: 100%;display: flex;flex-direction: row;justify-content: space-around;margin-bottom: 20px">
        <div>
          <el-input placeholder="根据学院筛选" v-model="searchData.clauses[0].value" @blur="initData">
            <template slot="append">
              <el-button icon="el-icon-search" @click="initData"></el-button>
            </template>
          </el-input>
        </div>
        <div>
          <el-input placeholder="根据专业筛选" v-model="searchData.clauses[1].value" @blur="initData">
            <template slot="append">
              <el-button icon="el-icon-search" @click="initData"></el-button>
            </template>
          </el-input>
        </div>
        <div>
          <el-input placeholder="根据姓名筛选" v-model="searchData.clauses[2].value" @blur="initData">
            <template slot="append">
              <el-button icon="el-icon-search" @click="initData"></el-button>
            </template>
          </el-input>
        </div>
        <div>
          <el-input placeholder="根据学号筛选" v-model="searchData.clauses[3].value" @blur="initData">
            <template slot="append">
              <el-button icon="el-icon-search" type="info" @click="initData"></el-button>
            </template>
          </el-input>
        </div>
        <el-button type="primary" icon="el-icon-plus" @click="addUser">添加用户</el-button>
      </div>
      <el-table
              :data="tableData"
              style="width: 100%;margin-bottom: 20px">
        <el-table-column
                type="index"
                width="50">
        </el-table-column>
        <el-table-column
                prop="updateDatetime"
                label="更新日期"
                width="180">
        </el-table-column>
        <el-table-column
                prop="name"
                label="姓名"
                align="center">
        </el-table-column>
        <el-table-column
                label="角色Id"
                align="center">
          <template slot-scope="scope">
            <span>{{scope.row.roleId | RoleNameFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column
                prop="stuNo"
                label="学号"
                width="180">
        </el-table-column>
        <el-table-column
                prop="college"
                align="center"
                label="学院"
                width="180">
        </el-table-column>
        <el-table-column
                prop="major"
                align="center"
                label="专业"
                width="180">
        </el-table-column>
        <el-table-column
                prop="grade"
                label="班级"
                align="center">
        </el-table-column>
        <el-table-column
                fixed="right"
                align="center"
                label="操作"
                width="230">
          <template slot-scope="scope">
            <el-button
                    @click.native.prevent="showRow(scope.row)"
                    size="small">
              查看
            </el-button>
            <el-button
                    @click.native.prevent="updateRow(scope.$index, tableData)"
                    size="small">
              编辑
            </el-button>
            <el-button
                    @click.native.prevent="deleteRow(scope.$index, tableData)"
                    size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination
                style="float: left;margin-bottom: 20px"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="searchData.pageNum"
                :page-sizes="[10, 15, 20, 30]"
                :page-size="searchData.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="searchData.total">
        </el-pagination>
      </div>
    </el-card>
    <el-dialog :title="title"
               width="60%"
               :modal="false"
               :before-close="handleClose"
               :visible.sync="dialogVisible">
      <div style="width: 100%;display: flex;align-items: center;flex-direction: column">
        <el-form :model="userData" :rules="rules" ref="userData" label-width="32%" style="width: 90%;"
                 label-position="left">
          <el-row>
            <el-col :span="12">
              <el-form-item label="角色" label-width="20%">
                <el-select :disabled="roleDisabled" :value="userData.roleId" v-model="userData.roleId">
                  <el-option v-for="item in roleOptions" :key="item.id" :label="item.roleName"
                             :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="辅导员" label-width="20%">
                <el-select :disabled="roleDisabled" :value="userData.teacherId" v-model="userData.teacherId">
                  <el-option v-for="item in teacherOptions" :key="item.id" :label="item.name"
                             :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-alert title="学生基本信息"
                    type="success"
                    :closable="false" style="margin-bottom: 10px"></el-alert>
          <el-row>
            <el-col :span="18">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="学院" prop="college">
                    <el-input :disabled="disabled" v-model="userData.college" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="专业" prop="major">
                    <el-input :disabled="disabled" v-model="userData.major" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="班级" prop="grade">
                    <el-input :disabled="disabled" v-model="userData.grade" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="学号" prop="stuNo">
                    <el-input :disabled="disabled" v-model="userData.stuNo" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="姓名" prop="name">
                    <el-input v-model="userData.name" :disabled="disabled" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="性别" prop="sex">
                    <el-radio :disabled="disabled" label="男" v-model="userData.sex"></el-radio>
                    <el-radio :disabled="disabled" label="女" v-model="userData.sex"></el-radio>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="出生" prop="birth">
                    <el-date-picker v-model="userData.birth" :disabled="disabled"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="实际年龄" prop="realAge">
                    <el-input type="number" v-model="userData.realAge" :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="文化程度" prop="cultureLevel">
                    <el-input v-model="userData.cultureLevel" :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="名族" prop="nation">
                    <el-input v-model="userData.nation" :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="职业" prop="occupation">
                    <el-input v-model="userData.occupation" :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="籍贯" prop="nativePlace">
                    <el-input v-model="userData.nativePlace" :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="6">
              <el-form-item label-width="5%">
                <image-upload v-model="userData.photo"></image-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="现家庭住址" label-width="10%">
            <el-input type="textarea" :disabled="disabled" v-model="userData.presentAddress"></el-input>
          </el-form-item>
          <el-form-item label="毕业学校或工作单位" label-width="10%">
            <el-input type="textarea" :disabled="disabled" v-model="userData.workPlace"></el-input>
          </el-form-item>
          <template>
            <el-form-item>
              <el-button type="success" @click="disabled=false">编辑</el-button>
              <el-button :disabled="disabled" type="primary" @click="saveData">保存</el-button>
              <el-button @click="handleClose">取消</el-button>
            </el-form-item>
          </template>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Message from '../../components/messages/index.js'
  import ImageUpload from '../../components/upload/UploadBase64'

  export default {
    name: "index",
    components: {ImageUpload},
    data() {
      const validateString = (rule, value, callback) => {
        value = value.split(" ").join("");
        if (value === '') {
          callback(new Error('请输入有效值'));
        } else {
          callback();
        }
      };
      return {
        dialogVisible: false,
        tableData: [],
        rules: {
          stuNo: [
            {required: true, message: '请输入学号', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],

        },
        searchData: {
          pageSize: 10,
          pageNum: 1,
          total: 0,
          clauses: [{
            column: "college",
            operation: "like",
            value: ""
          }, {
            column: "major",
            operation: "like",
            value: ""
          }, {
            column: "name",
            operation: "like",
            value: ""
          }, {
            column: "stuNo",
            operation: "like",
            value: ""
          }, {
            column: "roleId",
            operation: "=",
            value: ""
          },]
        },
        userData: {},
        disabled: true,
        title: "添加用户",
        roleOptions: [],
        roleDisabled: false,
        teacherOptions: []
      }
    },
    methods: {
      handleClose() {
        this.dialogVisible = false;
      },
      initData() {
        let roleData = JSON.parse(localStorage.getItem("role"));
        if (roleData.roleName === '辅导员') {
          this.searchData.clauses[4].value = 2
        }
        this.$http.post("/user/page", this.searchData).then(res => {
          if (res.status === 200) {
            this.tableData = res.data.list;
            this.searchData.total = res.data.total;
          }
        })
      },
      handleSizeChange(val) {
        this.searchData.pageSize = val;
        this.initData();
      },
      handleCurrentChange(val) {
        this.searchData.pageNum = val;
        this.initData();
      },
      addUser() {
        this.userData = {};
        let roleData = JSON.parse(localStorage.getItem("role"));
        let user = JSON.parse(localStorage.getItem("user"));
        if (roleData.roleName === '辅导员') {
          this.userData.roleId = 2;
          this.userData.teacherId = user.id;
          this.roleDisabled = true;
        } else {
          this.roleDisabled = false;
        }
        this.title = "添加用户";
        this.dialogVisible = true;
        this.disabled = false;
      },
      showRow(data) {
        this.title = "查看用户";
        this.disabled = true;
        this.roleDisabled = true;
        this.userData = data;
        this.dialogVisible = true;
      },
      updateRow(index, data) {
        this.title = "编辑用户";
        let roleData = JSON.parse(localStorage.getItem("role"));
        if (roleData.roleName === '辅导员') {
          this.roleDisabled = true;
        } else {
          this.roleDisabled = false;
        }
        this.disabled = false;
        this.$http.get("/user/get/" + data[index].id).then(res => {
          if (res.status === 200) {
            this.userData = res.data;
            this.dialogVisible = true;
          }
        })
      },
      deleteRow(index, data) {
        Message.confirm("是否删除该用户?").then(() => {
          this.$http.get("/user/delete/" + data[index].id).then(res => {
            if (res.status === 200) {
              Message.success("操作成功");
              this.initData();
            }
          })
        })
      },
      saveData() {
        if (this.userData.id == null || this.userData.id === "") {
          this.$http.post("/user/add", this.userData).then(res => {
            if (res.status === 200) {
              Message.success("操作成功");
              this.initData();
            }
          })
        } else {
          this.$http.post("/user/update", this.userData).then(res => {
            if (res.status === 200) {
              Message.success("操作成功");
              this.initData();
            }
          })
        }
        this.dialogVisible = false;
      },
      getAllRole() {
        this.$http.get("/role/all").then(res => {
          if (res.status === 200) {
            this.roleOptions = res.data;
          }
        })
      },
      getAllTeacher() {
        this.$http.get("/user/getAllStudent/3").then(res => {
          if (res.status === 200) {
            this.teacherOptions = res.data;
          }
        })
      }
    },
    mounted() {
      this.initData();
      this.getAllRole();
      this.getAllTeacher();
    },
    filters: {
      RoleNameFilter: (data) => {
        let res = JSON.parse(localStorage.getItem("roles"));
        console.log(res);
        if (res[data - 1] != null) {
          return res[data - 1].roleName
        }

      }
    }
  }
</script>

<style scoped>
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 150px;
  }

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
