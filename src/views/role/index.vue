<template>
  <div style="display: flex;flex-direction: column;align-items: center">
    <div style="margin: 40px 0"><h1>角色管理</h1></div>
    <el-card style="width: 80%">
      <el-table
              :data="roleData"
              :v-loading="loadFlag"
              style="width: 100%">
        <el-table-column
                type="index"
                width="50">
        </el-table-column>
        <el-table-column
                label="更新日期"
                min-width="280">
          <template slot-scope="scope">
            <span>{{scope.row.updateDatetime | dataFormat}}</span>
          </template>
        </el-table-column>
        <el-table-column
                prop="roleName"
                label="角色名称"
                min-width="280">
        </el-table-column>
        <el-table-column
                prop="remark"
                label="角色描述"
                min-width="280">
        </el-table-column>
        <el-table-column
                align="right"
                width="280px">
          <template slot="header" slot-scope="scope">
            <el-input
                    v-model="search.clauses[0].value"
                    size="mini"
                    @change="initData"
                    placeholder="输入角色备注搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button
                    size="mini"
                    @click="handleEdit(scope.row)">编辑
            </el-button>
            <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button size="small" type="success" @click="handleAdd">新增</el-button>
        <el-pagination
                style="float: right;"
                background
                :page-size="search.pageSize"
                @current-change="changePage"
                @prev-click="changePage"
                @next-click="changePage"
                layout="prev, pager, next"
                :total="total">
        </el-pagination>
      </div>
      <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :modal="false" :before-close="handleClose">
        <el-form :model="role" label-width="20%" label-position="left">
          <el-form-item label="角色名">
            <el-input v-model="role.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="role.remark"></el-input>
          </el-form-item>
          <el-form-item align="center">
            <template>
              <el-button @click="handleClose">取消</el-button>
              <el-button type="success" @click="submit">确定</el-button>
            </template>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  // import moment from 'moment'
  import Message from '../../components/messages/index'

  export default {
    name: "Role",
    data() {
      return {
        search: {
          pageSize: 10,
          pageNum: 1,
          clauses: [
            {
              column: "remark",
              operation: "like",
              value: ""
            }
          ],
          sortMap: {}
        },
        total: 0,
        roleData: [],
        dialogVisible: false,
        role: {},
        title: "",
        loadFlag: false,
        searchRole: ""

      }
    },
    methods: {
      initData() {
        this.loadFlag = true;
        this.$http.post("/role/page", this.search).then(res => {
          if (res.status === 200) {
            this.roleData = res.data.list;
            this.total = res.data.total;
            this.loadFlag = false;
          }
        })
      },
      changePage(val) {
        this.search.pageNum = val;
        this.initData();
      },
      handleEdit(data) {
        this.title = "修改角色";
        this.role = data;
        this.dialogVisible = true
      },
      submit() {
        if (this.role.id == null) {
          this.$http.post("/role/add", this.role).then(res => {
            if (res.status === 200) {
              Message.success("添加成功");
              this.dialogVisible = false
              this.initData();
            }
          })
        } else {
          this.$http.post("/role/update", this.role).then(res => {
            if (res.status === 200) {
              Message.success("添加成功");
              this.dialogVisible = false;
              this.initData();
            }
          })
        }
      },
      handleAdd() {
        this.title = "新增角色";
        this.role = {};
        this.dialogVisible = true
      },
      handleDelete(data) {
        Message.confirm("是否需要删除该角色").then(() => {
          this.$http.get("/role/delete/" + data.id).then(res => {
            if (res.status === 200) {
              Message.success("删除成功");
              this.initData();
            }
          })
        })
      },
      handleClose() {
        Message.confirm("角色信息未保存，确认需要取消？").then(() => {
          this.dialogVisible = false
        })
      }
    },
    mounted() {
      this.initData();
    },
    filters: {
      dataFormat: (data) => {
        return data;
      }
    }
  }
</script>
