<template>
  <div class="category-dialog">
    <el-dialog :title="title" :visible="dialogFormVisible" :show-close="false" width="45%" :modal="false">
      <div class="panel">
        <div class="panel-heading">基础信息</div>
        <div class="panel-body">
          <el-form :model="form" label-width="10%">
            <el-row>
              <el-col :span="12">
                <el-form-item label="类型" label-width="20%">
                  <el-select size="small" v-model="form.type" placeholder="请选择" :value="form.type">
                    <el-option v-for="item in options" :label="item.name" :value="item.id" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="序号" label-width="20%">
                  <el-input-number size="small" v-model="form.sort"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="名称">
              <el-input size="small" v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="路由">
              <el-input size="small" v-model="form.url" placeholder="请输入菜单路由"></el-input>
            </el-form-item>
            <el-form-item label="权限">
              <el-input size="small" v-model="form.permission" placeholder="请输入权限信息"></el-input>
            </el-form-item>
            <el-form-item label="图标" v-show="form.type===0">
              <el-select size="small" v-model="form.icon" placeholder="请选择" value="form.icon">
                <el-option
                        v-for="item in elementIcon"
                        :key="item"
                        :label="item"
                        :value="item">
                  <span style="float: left">{{ item }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px"><i style="font-size: 24px"
                                                                                 :class="item"></i></span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="panel" v-if="form.id != null">
        <div class="panel-heading">权限信息</div>
        <el-form :model="form">
          <el-form-item label="角色权限：">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
            </el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="form.roleIds" @change="handleCheckedRolesChange">
              <el-checkbox v-for="role in roleList" :label="role.id" :key="role.id">{{role.roleName}}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="btnCancel">取 消</el-button>
        <el-button size="small" type="success" :loading="btnLoading" @click="btnOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'CategoryEdit',
    props: {
      dialogFormVisible: Boolean,
      data: [Object, Boolean],
      title: String,
      roleList: Array,
    },
    data() {
      return {
        props: {
          value: 'id',
          label: 'name',
          children: 'children'
        },
        checkList: [],
        checkAll: false,
        isIndeterminate: true,
        form: {
          id: '',
          name: '',
          url: '',
          icon: '',
          type: '',
          permission: '',
          sort: '',
          roleIds: []
        },
        elementIcon: [
          'iconfont icon-yonghuguanli', 'iconfont icon-jianyi', 'iconfont icon-gerendangan', 'iconfont icon-tubiaozhizuomoban',
          'iconfont icon-ai-user', 'iconfont icon-xitongshezhi', 'iconfont icon-danganguanli', 'iconfont icon-navicon-jsgl', "iconfont icon-quanxianguanli"
        ],
        btnLoading: false,
        options: [
          {
            id: 0,
            name: "菜单"
          },
          {
            id: 1,
            name: "按钮"
          }
        ]
      }
    },
    watch: {
      'data': {
        handler: function () {
          if (this.data) {
            for (let k in this.form) {
              this.form[k] = this.data[k];
            }
            this.getRoleList();
          } else {
            for (let k in this.form) {
              this.form[k] = '';
            }
          }
        },
        deep: true
      }
    },

    methods: {
      btnCancel() {
        this.$emit('cancel');
      },
      btnOk() {
        let errorMsg = "";
        let formData = this.form;

        if (formData.name && formData.name.length <= 1) errorMsg = '分类名称必须大于1个字符';

        if (errorMsg) {
          this.$message.error(errorMsg);
          return;
        }
        this.$emit('val-change', this.form);
        this.btnLoading = true;
        setTimeout(() => {
          this.btnLoading = false
        }, 1000)
      },
      handleCheckAllChange(val) {
        this.form.roleIds = val ? this.allRolesId : [];
        this.isIndeterminate = false;
      },
      handleCheckedRolesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.roleList.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.roleList.length;
      },
      getRoleList() {
        if (typeof this.form.id !== "undefined") {
          this.$http.get("/roleResourceBind/getRoles/" + this.form.id).then(res => {
            if (res.status === 200) {
              this.form.roleIds = res.data;
            }
          });
        }
      }
    },
    computed: {
      allRolesId: function () {
        let ids = [];
        for (let index in this.roleList) {
          ids.push(this.roleList[index].id);
        }
        return ids;
      }
    },
  }
</script>
<style lang="less">
  .category-dialog {
    .el-cascader {
      width: 100%;
    }
  }

  .panel {
    margin: 0 10px;
    background-color: #f5f5f5;

    .panel-heading {
      height: 31px;
      background-color: #75afbd;
      text-align: left;
      color: white;
      line-height: 31px;
      text-indent: 11px;
      font-size: 14px;
      font-weight: 600;
    }

    .el-form-item {
      padding: 0 10px;
    }
  }
</style>
