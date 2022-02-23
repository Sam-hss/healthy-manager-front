<template>
  <div style="display: flex;flex-direction: column;align-items: center;width: 100%;">
    <el-card style="width: 80%;margin-top: 20px">
      <el-divider content-position="left">身高体重分析</el-divider>
      <el-row style="text-align: center">
        <el-col :span="8">当前身高:{{heightData}}cm
          <div style="width: 100%;height: 300px" id="line"></div>
        </el-col>
        <el-col :span="8">当前体重:{{weightData}}kg
          <div style="width: 100%;height: 300px" id="bar"></div>
        </el-col>
        <el-col :span="8">当前BIM指数:{{bim}}({{suggestion}})
          <div style="width: 100%;height: 300px" id="pie"></div>
        </el-col>
      </el-row>
      <el-divider content-position="left">基本信息</el-divider>
      <div style="width: 100%;display: flex;align-items: center;flex-direction: column">
        <el-form :model="userData" ref="userData" label-width="32%" style="width: 90%;margin-top: 40px"
                 label-position="left">
          <template>
            <el-form-item align="right" v-show="!disable">
              <el-button :disabled="disable" type="primary" @click="saveData">保存</el-button>
            </el-form-item>
            <el-form-item align="right" v-show="disable">
              <el-button :disabled="!disable" type="info" @click="disable=!disable">修改</el-button>
            </el-form-item>
          </template>
          <el-row>
            <el-col :span="18">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="学号" prop="stuNo">
                    <el-input :disabled="disable" v-model="userData.stuNo" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="姓名" prop="name">
                    <el-input v-model="userData.name" :disabled="disable" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="性别" prop="sex">
                    <el-radio :disabled="disable" label="男" v-model="userData.sex"></el-radio>
                    <el-radio :disabled="disable" label="女" v-model="userData.sex"></el-radio>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="学院" prop="college">
                    <el-input :disabled="disable" v-model="userData.college" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="专业" prop="major">
                    <el-input :disabled="disable" v-model="userData.major" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="班级" prop="grade">
                    <el-input :disabled="disable" v-model="userData.grade" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="出生" prop="birth">
                    <el-date-picker v-model="userData.birth" :disabled="disable"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="实际年龄" prop="realAge">
                    <el-input type="number" v-model="userData.realAge" :disabled="disable"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="文化程度" prop="cultureLevel">
                    <el-input v-model="userData.cultureLevel" :disabled="disable"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="民族" prop="nation">
                    <el-input v-model="userData.nation" :disabled="disable"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="职业" prop="occupation">
                    <el-input v-model="userData.occupation" :disabled="disable"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="籍贯" prop="nativePlace">
                    <el-input v-model="userData.nativePlace" :disabled="disable"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="6">
              <el-form-item label-width="5%">
                <image-input v-model="userData.photo"></image-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="现家庭住址" label-width="10%">
            <el-input type="textarea" :disabled="disable" v-model="userData.presentAddress"></el-input>
          </el-form-item>
          <el-form-item label="毕业学校或工作单位" label-width="10%">
            <el-input type="textarea" :disabled="disable" :rows="4" v-model="userData.workPlace"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
  import Message from '../../components/messages/index'
  import ImageInput from '../../components/upload/UploadBase64.vue'

  export default {
    name: "index",
    components: {ImageInput},
    data() {
      return {
        userData: {},
        disable: true,
        heightData: 0,
        weightData: 0,
        bim: 0,
        suggestion: "",
        label: [],
        height: [],
        weight: []

      }
    },
    methods: {
      initData() {
        let user = JSON.parse(localStorage.getItem("user"));
        this.$http.get("/user/get/" + user.id).then(res => {
          if (res.status === 200) {
            this.userData = res.data
          }
        })
      },
      saveData() {
        this.$http.post("/user/update", this.userData).then(res => {
          if (res.status === 200) {
            Message.success("操作成功");
            localStorage.setItem("user", JSON.stringify(this.userData));
            this.disable = !this.disable;
            this.initData();
          }
        })
      },
      getOptions() {
        console.log(this.label);
        let Line = echarts.init(document.getElementById("line"));
        let Bar = echarts.init(document.getElementById("bar"));
        let Pie = echarts.init(document.getElementById("pie"));
        let heightOption = {
          xAxis: {
            type: 'category',
            data: this.label,
            name: "学期"
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: "{b} <br/>{a} : {c} (cm)"
          },
          yAxis: {
            type: 'value',
            name: "身高（cm）"
          },
          series: [{
            data: this.height,
            type: 'line',
            name: '身高',
          }]
        };
        let weightOption = {
          xAxis: {
            type: 'category',
            data: this.label,
          },
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: "{b} <br/>{a} : {c} (kg)"
          },
          yAxis: {
            type: 'value',
            name: "体重（kg）"
          },
          series: [{
            data: this.weight,
            type: 'bar',
            barWidth: '20%',
            name: '体重',
          }]
        };
        let bimOption = {
          tooltip: {
            formatter: "{a} <br/>{b} : {c}"
          },
          series: [
            {
              name: 'BIM指数',
              type: 'gauge',
              detail: {formatter: '{value}'},
              data: [{value: this.bim, name: '数值'}]
            }
          ]
        };
        Line.setOption(heightOption);
        Bar.setOption(weightOption);
        Pie.setOption(bimOption);
      },
      getDataAnalysis() {
        let user = JSON.parse(localStorage.getItem("user"));
        let checkData = JSON.parse(localStorage.getItem("checkData"));
        this.heightData = checkData.height;
        this.weightData = checkData.weight;
        this.$http.get("/checkInfo/getBim", {
          params: {
            "height": this.heightData,
            "weight": this.weightData
          }
        }).then(res => {
          if (res.status === 200) {
            this.bim = res.data.bim;
            this.suggestion = res.data.suggestion;
          }
        });
        this.$http.get("/checkInfo/getDataAnalysis/" + user.id).then(res => {
          if (res.status === 200) {
            this.label = res.data.label;
            this.height = res.data.height;
            this.weight = res.data.weight;
            this.getOptions();
          }
        }).catch(() => Message.error("访问出错!"))
      },

    },
    mounted() {
      this.initData();
      this.getDataAnalysis();
    },
    created() {

    }
  }
</script>
