<template>
  <div>
    <div style="display: flex;flex-direction: column;align-items: center;width: 100%;">
      <div style="margin: 40px 0"><h1>{{messageSort}}</h1></div>
      <el-card style="width: 80%;">
        <div style="display: flex;flex-direction: column;justify-content: space-around;align-items: center;margin-bottom: 50px">
          <div style="margin-top: 25px;width: 100%;display: flex;flex-direction: row;justify-content: space-around">
            <div>
              <label style="font-size: 16px;font-weight: 600">读取状态:</label>
              <el-select style="width: 150px;margin-left: 5px" value="searchDTO.status" v-model="searchDTO.isRead"
                         @change="initDate" clearable>
                <el-option value="1" label="已读"></el-option>
                <el-option value="0" label="未读"></el-option>
              </el-select>
            </div>
            <div v-show="messageSort === '我收到的建议'">
              <label style="font-size: 16px;font-weight: 600">医师描述:</label>
              <el-select style="width: 150px;margin-left: 5px" :value="searchDTO.office" v-model="searchDTO.office"
                         @change="initDate" clearable>
                <el-option v-for="item in roleOptions" :value="item.roleName" :key="item.id"
                           :label="item.roleName"></el-option>

              </el-select>
            </div>
            <el-input style="width: 300px;margin-right: 15px" prefix-icon="el-icon-search" placeholder="根据消息内容查询"
                      v-model="searchDTO.content">
              <el-button slot="append" icon="el-icon-search" @click="initDate"></el-button>
            </el-input>
            <el-button type="primary" @click="markToRead">标记为已读</el-button>
            <el-button type="info" @click="markToUnRead">标记为未读</el-button>
            <el-button type="danger" @click="deleteInfos">批量删除</el-button>
          </div>
        </div>
        <el-table
                ref="multipleTable"
                @selection-change="handleSelectionChange"
                :data="tableData"
                style="width: 100%">
          <el-table-column
                  type="selection"
                  width="55">
          </el-table-column>
          <el-table-column
                  label="读取状态">
            <template slot-scope="scope">
              <span :style="{color:(scope.row.isRead==0?'#FF0000':'#000')}" v-text="scope.row.isRead==0?'未读':'已读'"
                    style="font-size: 20px;font-weight: 600"></span>
            </template>
          </el-table-column>
          <el-table-column
                  label="创建日期"
                  width="180">
            <template slot-scope="scope">
              <span>{{scope.row.createDatetime}}</span>
            </template>
          </el-table-column>
          <el-table-column
                  label="修改日期"
                  width="180">
            <template slot-scope="scope">
              <span>{{scope.row.updateDatetime}}</span>
            </template>
          </el-table-column>
          <el-table-column
                  min-width="200"
                  prop="content"
                  label="建议内容">
          </el-table-column>
          <el-table-column
                  label="学生名称"
                  width="180">
            <template slot-scope="scope">
              <span>{{scope.row.userId | UserFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column
                  label="建议医师"
                  width="180">
            <template slot-scope="scope">
              <span>{{scope.row.doctorId | UserFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column
                  prop="office"
                  label="医师描述"
                  width="180">
          </el-table-column>
          <el-table-column
                  fixed="right"
                  label="操作"
                  align="center"
                  width="200">
            <template slot-scope="scope">
              <el-button icon="el-icon-search" size="small" @click="showInfo(scope.row)"></el-button>
              <el-button icon="el-icon-delete" size="small" @click="deleteInfo(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="searchDTO.page"
                :page-sizes="[10, 15, 20, 30]"
                :page-size="searchDTO.rows"
                layout="total, sizes, prev, pager, next, jumper"
                :total="searchDTO.total">
        </el-pagination>
      </el-card>
      <el-dialog
              :title=dialogTitle
              :visible.sync="dialogVisible"
              width="40%"
              :before-close="handleClose"
              :modal="false">
        <el-row style="padding: 0 40px">
          <el-input type="textarea" :rows="5" disabled="true" v-model="messageDTO.content"></el-input>
        </el-row>

      </el-dialog>
    </div>

  </div>
</template>

<script>
  import Message from '../../components/messages/index'

  const user = JSON.parse(localStorage.getItem("user"));
  export default {
    name: "Info",
    data() {
      return {
        selectionItems: [],
        messageSort: "我收到的建议",
        searchDTO: {
          page: 1,
          rows: 10,
          userId: "",
          doctorId: "",
          content: "",
          isRead: "",
          total: 0
        },
        messageDTO: {
          title: "",
          content: "",
          isRead: "",
          office: "",
          doctorId: "",
          status: "",
        },
        tableData: [],
        dialogVisible: false,
        dialogTitle: "",
        isShow: false,
        user: {},
        roleData: [],
        roleOptions: []
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.selectionItems = [];
        val.forEach(v => {
          this.selectionItems.push(v.id);
        });
      },
      handleSizeChange(val) {
        this.searchDTO.rows = val;
        this.initData();
      },
      handleCurrentChange(val) {
        this.searchDTO.page = val;
        this.initData();
      },
      //初始化数据
      initDate() {
        let self = this;
        self.user = JSON.parse(localStorage.getItem("user"));
        self.roleData = JSON.parse(localStorage.getItem("role"));
        if (self.roleData.roleName === '学生') {
          self.messageSort = "我收到的建议";
        } else {
          self.messageSort = "我提出的建议";
        }
        if (self.messageSort === "我收到的建议") {
          self.searchDTO.userId = user.id;
          self.searchDTO.doctorId = null;
          self.$http.post("/suggestion/getInfoPage", self.searchDTO).then(res => {
            if (res.status === 200) {
              self.tableData = res.data.list;
              self.searchDTO.total = res.data.total;
            }
          })
        } else {
          self.searchDTO.userId = null;
          self.searchDTO.doctorId = user.id;
          self.$http.post("/suggestion/getInfoPage", self.searchDTO).then(res => {
            if (res.status === 200) {
              self.tableData = res.data.list;
              self.searchDTO.total = res.data.total;
            }
          })
        }

      },
      //批量标记未已读
      markToRead() {
        if (this.selectionItems.length < 1) {
          this.$message.warning("至少需要选择一条数据")
        } else {
          this.$http.post("/suggestion/setInfoRead", {
            isRead: 1,
            ids: this.selectionItems
          }).then(res => {
            if (res.status === 200) {
              Message.success("操作成功");
              this.initDate();
            }
          })
        }
      },
      //批量标记为未读
      markToUnRead() {
        if (this.selectionItems.length < 1) {
          this.$message.warning("至少需要选择一条数据")
        } else {

          this.$http.post("/suggestion/setInfoRead", {
            isRead: 0,
            ids: this.selectionItems
          }).then(res => {
            if (res.status === 200) {
              Message.success("操作成功");
              this.initDate();
            }
          })
        }
      },
      //批量删除
      deleteInfos() {
        if (this.selectionItems.length < 1) {
          this.$message.warning("至少需要选择一条数据")
        } else {
          Message.confirm("是否需要删除这些通知？").then(() => {
            this.$http.post("/suggestion/deleteByIds", this.selectionItems).then(res => {
              if (res.status === 200) {
                Message.success("删除成功");
                this.initDate();
              }
            })
          })
        }
      },
      //单条查看
      showInfo(data) {
        this.dialogTitle = "查看健康建议";
        this.dialogVisible = true;
        this.messageDTO = data;
        this.isShow = true;
        console.log(data)
      },
      deleteInfo(data) {
        Message.confirm("是否需要删除此健康建议？").then(() => {
          let ids = [];
          ids.push(data.id);
          this.$http.post("/suggestion/deleteByIds", ids).then(res => {
            if (res.status === 200) {
              Message.success("删除成功");
              this.initDate();
            }
          })
        })
      },
      handleClose() {
        this.dialogVisible = false;
      },
      getAllRole() {
        this.$http.get("/role/all").then(res => {
          if (res.status === 200) {
            this.roleOptions = res.data;
          }
        })
      }

    },
    mounted() {
      this.initDate();
      this.getAllRole();
    },
  }
</script>

<style scoped>
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
