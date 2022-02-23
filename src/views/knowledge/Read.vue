<template>
  <div style="display: flex;flex-direction: column;align-items: center">
    <div style="margin: 40px 0"><h1>健康知识阅读</h1></div>
    <el-card style="width: 80%">
      <div style="width: 100%;display: flex;flex-direction: row;justify-content: space-around;margin-bottom: 20px">
        <div>
          <el-input placeholder="根据作者筛选" v-model="searchData.clauses[1].value" @blur="initData">
            <template slot="append">
              <el-button icon="el-icon-search" type="info" @click="initData"></el-button>
            </template>
          </el-input>
        </div>
        <div>
          <el-input placeholder="根据书名筛选" v-model="searchData.clauses[2].value" @blur="initData">
            <template slot="append">
              <el-button icon="el-icon-search" @click="initData"></el-button>
            </template>
          </el-input>
        </div>
        <div>
          <el-input placeholder="根据内容筛选" v-model="searchData.clauses[3].value" @blur="initData">
            <template slot="append">
              <el-button icon="el-icon-search" @click="initData"></el-button>
            </template>
          </el-input>
        </div>
      </div>
      <el-table
              :data="tableData"
              style="width: 100%;margin-bottom: 20px">
        <el-table-column
                type="index"
                width="50">
        </el-table-column>
        <el-table-column
                prop="publishData"
                label="创建日期"
                width="180">
        </el-table-column>
        <el-table-column
                prop="book"
                label="书名"
                width="180">
        </el-table-column>
        <el-table-column
                prop="author"
                align="center"
                label="作者"
                width="180">
        </el-table-column>
        <el-table-column
                prop="visitNum"
                align="center"
                label="阅读量"
                width="180">
        </el-table-column>
        <el-table-column
                prop="description"
                label="简介"
                align="center">
        </el-table-column>
        <el-table-column
                fixed="right"
                align="center"
                label="操作"
                width="230">
          <template slot-scope="scope">
            <el-button
                    @click.native.prevent="showBook(scope.$index, tableData)"
                    size="small">
              阅读
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
              background
              layout="prev, pager, next"
              @current-change="handleCurrentChange"
              :page-size="this.searchData.pageSize"
              :total="total">
      </el-pagination>
    </el-card>
    <el-dialog
            :title="title"
            width="70%"
            :modal="false"
            :before-close="handleClose"
            :visible.sync="dialogVisible">
      <el-form :model="bookData" label-width="10%" label-position="left" style="padding: 10px 60px">
        <el-form-item label="文章名">
          <el-input v-model="bookData.book"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="bookData.author" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="阅读量">
          <el-input-number v-model="bookData.visitNum"></el-input-number>
        </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea" v-model="bookData.description"></el-input>
        </el-form-item>
        <el-form-item label="正文" style="height: 300px">
          <quill-editor style="height: 200px" v-model="bookData.content">
          </quill-editor>
        </el-form-item>
        <template>
          <el-form-item>
            <el-button type="danger" @click="submitData(bookData,'save')">保存到草稿箱</el-button>
            <el-button type="success" @click="submitData(bookData,'publish')">发布</el-button>
            <el-button @click="handleClose">取消</el-button>
          </el-form-item>
        </template>

      </el-form>
    </el-dialog>
    <el-dialog title="阅读健康知识"
               width="70%"
               :modal="false"
               :before-close="handleBookClose"
               :visible.sync="bookVisible">
      <book-read :book-data="bookData"></book-read>
    </el-dialog>
  </div>
</template>

<script>
  import BookRead from './BookRead'
  import Message from '../../components/messages/index.js'

  export default {
    name: "Index",
    data() {
      return {
        title: "添加健康知识",
        dialogVisible: false,
        bookVisible: false,
        bookData: {
          publishData: "",
          author: "",
          book: "",
          visitNum: 0,
          description: "",
          content: "",
          isPublished: 1
        },
        tableData: [],
        searchData: {
          pageSize: 10,
          pageNum: 1,
          clauses: [{
            column: "isPublished",
            operation: "=",
            value: 1
          }, {
            column: "author",
            operation: "like",
            value: ""
          }, {
            column: "book",
            operation: "like",
            value: ""
          }, {
            column: "content",
            operation: "like",
            value: ""
          }]
        },
        total: 0,
        documentType: "已发布"
      }
    },
    methods: {
      handleClose() {
        this.dialogVisible = false;
        this.bookData = {};
      },
      handleBookClose() {
        this.bookVisible = false;
      },
      handleCurrentChange(val) {
        this.searchData.pageNum = val;
        this.initData();
      },
      initData() {
        this.$http.post("/healthDocument/page", this.searchData).then(res => {
          if (res.status === 200) {
            this.tableData = res.data.list;
            this.total = res.data.pages;
          }
        })
      },
      //打开添加文章弹窗
      addBook() {
        this.title = "添加健康知识";
        this.dialogVisible = true;
        this.bookData = {};

      },
      editBook(index, data) {
        this.title = "修改健康知识";
        this.$http.get("/healthDocument/get/" + data[index].id).then(res => {
          if (res.status === 200) {
            this.bookData = res.data;
          }
        });
        this.dialogVisible = true;

      },
      //提交添加的文章
      submitData(data, type) {
        if (type === 'save') {
          data.isPublished = 0;
        } else {
          data.isPublished = 1;
        }
        if (data.id == null || data.id === "") {
          this.$http.post("/healthDocument/add", data).then(res => {
            if (res.status === 200) {
              Message.success("操作成功");
              this.initData();
            }
          })
        } else {
          this.$http.post("/healthDocument/update", data).then(res => {
            if (res.status === 200) {
              Message.success("操作成功");
              this.initData();
            }
          })
        }
        this.dialogVisible = false;
      },
      showBook(index, data) {
        this.bookData = data[index];
        this.bookVisible = true;
      },
      deleteRow(index, data) {
        Message.confirm("是否需要删除该文章？").then(() => {
          this.$http.get("/healthDocument/delete/" + data[index].id).then(res => {
            if (res.status === 200) {
              Message.success("操作成功");
              this.initData();
            }
          })
        })
      }
    },
    components: {
      BookRead
    },
    mounted() {
      this.initData()
    },
    watch: {
      "documentType": function (val) {
        if (val === '已发布') {
          this.searchData.clauses[0].value = 1;
          this.initData();
        }
        if (val === '草稿箱') {
          this.searchData.clauses[0].value = 0;
          this.initData();
        }
      }
    }
  }
</script>
