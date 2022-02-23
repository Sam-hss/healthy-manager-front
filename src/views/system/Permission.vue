<template>
  <div style="display: flex;flex-direction: column;align-items: center">
    <div style="margin: 40px 0"><h1>权限管理</h1></div>
    <el-button size="small"
               type="success" style="margin: 20px 0;width: 80%;cursor: default">
      <!--新&nbsp;&nbsp;&nbsp;&nbsp;增--></el-button>
    <!-- @click="addCategory" -->
    <el-card style="width: 80%;margin-bottom: 20px">
      <el-tree
              :indent="38"
              :props="props"
              :data="data"
              @node-click="handleNodeClick"
              :render-content="renderContent"
              :default-expand-all="true"
      >
      </el-tree>
    </el-card>
    <CategoryEdit
            :title="categoryEditTitle"
            :dialogFormVisible="dialogFormVisible"
            :data="currentEditCategory"
            :roleList="roleList"
            @val-change="categoryEditChange"
            @cancel="dialogFormVisible = false"
    >
    </CategoryEdit>mi
  </div>
</template>

<script>
  import TreeDetails from './TreeDetails.vue';
  import CategoryEdit from './CategoryEdit.vue'
  import Message from '../../components/messages/index'

  export default {
    data() {
      return {
        data: [],
        categoryEditTitle: "",
        dialogFormVisible: false,
        currentEditCategory: null,
        props: {
          children: "children",
          label: 'name',
        },
        resourceList: [],
        roleList: [],
        parentId: 0,
        currentUser: JSON.parse(localStorage.getItem("user")),
      };
    },
    methods: {
      handleNodeClick() {

      },
      async categoryEditChange(data) {

        if (data.id == null || "" === data.id) {
          data.parentId = this.parentId;
          this.$http.post("/resources/add", data).then(res => {
            if (res.status === 200) {
              Message.success("添加资源成功");
              this.init();
              this.dialogFormVisible = false;
            }
          })
        } else {
          this.$http.post("/resources/update", data).then(res => {
            if (res.status === 200) {
              let bindInfo = {
                resourceId: data.id,
                roleList: data.roleIds
              };
              this.$http.post("/roleResourceBind/saveBind", bindInfo).then(resp => {
                if (resp.status === 200) {
                  Message.success(resp.data);
                  this.init();
                  this.dialogFormVisible = false;
                }
              })
            }
          })
        }
      },
      deleteCategory(data) {
        let self = this;
        self.$confirm('此操作将删除『' + data.name + '』该菜单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get("/resources/delete/" + data.id).then(res => {
            if (res.status === 200) {
              Message.success(res.data);
              self.init();
            }
          })
        });

      },
      addCategory(data) {
        let self = this;
        self.parentId = data.id;
        self.dialogFormVisible = true;
        self.currentEditCategory = {};
        self.categoryEditTitle = '添加';
      },
      editCategory(data) {
        let self = this;
        self.dialogFormVisible = true;
        self.currentEditCategory = data;
        console.log(self.currentEditCategory);
        if (data.type === 0) {
          self.categoryEditTitle = '修改“' + data.name + '”菜单';
        } else {
          self.categoryEditTitle = '修改“' + data.name + '”按钮';
        }
      },
      renderContent(h, {node}) {
        return this.$createElement(TreeDetails, {
          props: {data: node}, on: {
            'add-category': this.addCategory,
            'edit-category': this.editCategory,
            'delete-category': this.deleteCategory,
          }
        });
      },

      async init() {
        let user = JSON.parse(localStorage.getItem("user"));
        this.$http.get("/resources/getMenuByUserId", {params: {"userId": user.id, "typeId": ""}}).then(res => {
          if (res.status === 200) {
            this.data = res.data;
            this.localStorage.setItem("menu", JSON.stringify(res.data));
          }
        })
      },
      getAllRoles() {
        this.$http.get("/role/all").then(res => {
          if (res.status === 200) {
            this.roleList = res.data;
            console.log(this.roleList)
          }
        })
      }
    },
    mounted: function () {
      this.init();
      this.getAllRoles();
    },
    components: {
      CategoryEdit
    }
  };
</script>
<style lang="less">
  .el-tree-node__content {
    height: 40px;
    line-height: 40px;
  }
</style>


