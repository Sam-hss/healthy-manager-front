<template>
  <div class="tree-details">
    <div class="detail-item">
      <div>
         <span style="font-size: 13px">
          <span style="color: #3c8dbc" v-text="data.data.type===0?'【菜单】':'【按钮】'">【菜单】</span>{{ data.data.name }}
        </span>
      </div>
      <div>
        <el-button @click="edit(data)" type="normal" icon="el-icon-edit" circle size="mini"></el-button>
<!--        <el-button @click="add(data)" type="normal" icon="el-icon-plus" circle size="mini"></el-button>-->
<!--        <el-button @click="deleteDepart(data)" type="normal" icon="el-icon-delete" circle size="mini"></el-button>-->
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'TreeCategory',
    props: {
      data: Object,
    },
    data() {
      return {}
    },
    methods: {
      deleteDepart(node, e) {
        this.$emit('delete-category', node.data);
        // e.cancelButton = true;
      },
      add(node, e) {
        this.$emit('add-category', node.data);
        // e.cancelButton = true;
      },
      edit(node, e) {
        this.$emit('edit-category', node.data);
        // e.cancelButton = true;
      },

    },
    mounted: function () {

      // console.log(this.data)

    },
    components: {}
  }
</script>
<style lang="less">
  .tree-details {
    width: 100%;

    .el-button.is-circle {
      padding: 8px;
    }

    .detail-item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
    }
  }

  .category-description {
    text-indent: 2em;
  }
</style>
