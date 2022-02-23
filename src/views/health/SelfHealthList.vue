<template>
  <div style="display: flex;flex-direction: column;align-items: center">
    <div style="margin: 40px 0"><h1>我的健康档案</h1></div>
    <el-card style="width: 80%">
      <div style="width: 100%;display: flex;flex-direction: row;justify-content: space-around;margin-bottom: 20px">
        <el-button type="primary" icon="el-icon-plus" @click="addUser">添加健康档案</el-button>
      </div>
      <el-table
              :data="tableData"
              style="width: 100%;margin-bottom: 20px">
        <el-table-column
                type="index"
                width="50">
        </el-table-column>
        <el-table-column
                prop="checkYear"
                label="学年"
                width="180">
        </el-table-column>
        <el-table-column
                prop="name"
                label="姓名"
                align="center">
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
               width="80%"
               :modal="false"
               :before-close="handleClose"
               :visible.sync="dialogVisible">
      <div style="width: 100%;display: flex;align-items: center;flex-direction: column">
        <el-form :model="checkInfoData"
                 ref="checkInfoData"
                 label-width="25%"
                 style="width: 90%;"
                 label-position="left">
<!--          :rules="rules"-->
          <el-row>
            <el-col :span="8">
              <el-form-item label="选择学年" prop="checkYear">
                <el-select v-model="checkInfoData.checkYear" :disabled="disable" :value="checkInfoData.checkYear"
                           @change="judgeCheckIsExist">
                  <el-option v-for="item in checkDataOptions" :key="item.label" :label="item.label"
                             :value="item.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="体检日期" prop="checkTime">
                <el-date-picker v-model="checkInfoData.checkTime" :disabled="disable"></el-date-picker>
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
                    <el-input :disabled="disable" v-model="checkInfoData.college" autocomplete="off"
                              @input="change($event)"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="专业" prop="major">
                    <el-input :disabled="disable" v-model="checkInfoData.major" autocomplete="off"
                              @input="change($event)"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="班级" prop="grade">
                    <el-input :disabled="disable" v-model="checkInfoData.grade" autocomplete="off"
                              @input="change($event)"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="学号" prop="stuNo">
                    <el-input :disabled="true" v-model="checkInfoData.stuNo" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="姓名" prop="name">
                    <el-input v-model="checkInfoData.name" :disabled="disable" autocomplete="off"
                              @input="change($event)"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="性别" prop="sex">
                    <el-radio :disabled="disable" label="男" v-model="checkInfoData.sex" @input="change($event)"></el-radio>
                    <el-radio :disabled="disable" label="女" v-model="checkInfoData.sex" @input="change($event)"></el-radio>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="出生" prop="birth">
                    <el-date-picker v-model="checkInfoData.birth" :disabled="disable" @input="change($event)"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="实际年龄" prop="realAge">
                    <el-input type="number" v-model="checkInfoData.realAge" :disabled="disable" @input="change($event)"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="文化程度" prop="cultureLevel">
                    <el-input v-model="checkInfoData.cultureLevel" :disabled="disable" @input="change($event)"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="民族" prop="nation">
                    <el-input v-model="checkInfoData.nation" :disabled="disable" @input="change($event)"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="职业" prop="occupation">
                    <el-input v-model="checkInfoData.occupation" :disabled="disable" @input="change($event)"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="籍贯" prop="nativePlace">
                    <el-input v-model="checkInfoData.nativePlace" :disabled="disable" @input="change($event)"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="6">
              <el-form-item label="照片">
                <image-upload v-model="checkInfoData.photo"></image-upload>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="现家庭住址" label-width="10%">
            <el-input type="textarea" :disabled="disable" v-model="checkInfoData.presentAddress" @input="change($event)"></el-input>
          </el-form-item>
          <el-form-item label="毕业学校或工作单位" label-width="10%">
            <el-input type="textarea" :disabled="disable" v-model="checkInfoData.workPlace" @input="change($event)"></el-input>
          </el-form-item>
          <el-form-item label="既往医史" label-width="10%">
            <el-input type="textarea" :disabled="disable" v-model="checkInfoData.historyCheck" @input="change($event)"></el-input>
          </el-form-item>


          <el-alert title="五官科检查信息--眼科"
                    type="warning"
                    :closable="false" style="margin-bottom: 10px"></el-alert>
          <el-row>
            <el-col :span="6">
              <el-form-item label="视力-左" prop="leftView">
                <el-input :disabled="!disable" type="number" v-model="checkInfoData.leftView"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="视力-右" prop="rightView">
                <el-input :disabled="!disable" type="number" v-model="checkInfoData.rightView"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="矫正视力-左" label-width="30%" prop="correctLeftView">
                <el-input :disabled="!disable" type="number" v-model="checkInfoData.correctLeftView"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="矫正视力-右" label-width="30%" prop="correctRightView">
                <el-input :disabled="!disable" type="number" v-model="checkInfoData.correctRightView"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="其他眼疾" label-width="10%">
            <el-input :disabled="!disable" v-model="checkInfoData.otherEyesSick"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="色觉检查-彩色图案及编码" label-width="30%">
                <el-input :disabled="!disable" v-model="checkInfoData.colorOrCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="色觉检查-单色识别" label-width="30%">
                <el-input :disabled="!disable" v-model="checkInfoData.singleColorJudge"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="医师签字" label-width="10%">
            <el-input :disabled="!disable" v-model="checkInfoData.signForEyes"></el-input>
          </el-form-item>

          <el-alert title="五官科检查信息--耳喉鼻科"
                    type="warning"
                    :closable="false" style="margin-bottom: 10px"></el-alert>
          <el-row>
            <el-col :span="12">
              <el-form-item label="听力-左" prop="leftAudition">
                <el-input :disabled="!disable" type="number" v-model="checkInfoData.leftAudition">
                  <template slot="append">公尺</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="听力-右" prop="rightAudition">
                <el-input :disabled="!disable" type="number" v-model="checkInfoData.rightAudition">
                  <template slot="append">公尺</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="耳疾" label-width="10%">
            <el-input :disabled="!disable" v-model="checkInfoData.earSick"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="嗅觉">
                <el-input :disabled="!disable" v-model="checkInfoData.smell"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="鼻及鼻窦疾病">
                <el-input :disabled="!disable" v-model="checkInfoData.paranasalSinus"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="咽喉">
                <el-input :disabled="!disable" v-model="checkInfoData.throat"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="口吃">
                <el-input :disabled="!disable" v-model="checkInfoData.stammer"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="医师签字" label-width="10%">
            <el-input :disabled="!disable" v-model="checkInfoData.signForEar"></el-input>
          </el-form-item>


          <el-alert title="五官科检查信息--口腔科"
                    type="warning"
                    :closable="false" style="margin-bottom: 10px"></el-alert>
          <el-row>
            <el-col :span="8">
              <el-form-item label="龋  齿">
                <el-input :disabled="!disable" v-model="checkInfoData.toothSick"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="缺  齿">
                <el-input :disabled="!disable" v-model="checkInfoData.hypodontia"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="齿  槽">
                <el-input :disabled="!disable" v-model="checkInfoData.toothPlace"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="其他" label-width="10%">
            <el-input :disabled="!disable" v-model="checkInfoData.otherSenseSick"></el-input>
          </el-form-item>
          <el-form-item label="医师签字" label-width="10%">
            <el-input :disabled="!disable" v-model="checkInfoData.signForMouth"></el-input>
          </el-form-item>

          <el-alert title="外科检查信息"
                    type="info"
                    :closable="false" style="margin-bottom: 10px"></el-alert>
          <el-row>
            <el-col :span="6">
              <el-form-item label="身长">
                <el-input v-model="checkInfoData.height" type="number" :disabled="!disable">
                  <template slot="append">公分</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="体重">
                <el-input v-model="checkInfoData.weight" type="number" :disabled="!disable">
                  <template slot="append">公斤</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="腰围">
                <el-input v-model="checkInfoData.waistline" type="number" :disabled="!disable">
                  <template slot="append">公分</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="皮肤">
                <el-input v-model="checkInfoData.skin" :disabled="!disable"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="淋巴">
                <el-input v-model="checkInfoData.lymph" :disabled="!disable"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="甲状腺">
                <el-input v-model="checkInfoData.glandulaThyroidea" :disabled="!disable"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="脊  柱">
                <el-input v-model="checkInfoData.spineBackbone" :disabled="!disable"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="四肢">
                <el-input v-model="checkInfoData.allLegs" :disabled="!disable"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="关  节">
                <el-input v-model="checkInfoData.arthrosis" :disabled="!disable"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="平  足">
                <el-input v-model="checkInfoData.foot" :disabled="!disable"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="其他" label-width="10%">
            <el-input v-model="checkInfoData.otherSurgerySick" :disabled="!disable"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="血压">
                <el-input :disabled="!disable" type="number" v-model="checkInfoData.bloodPressure">
                  <template slot="append">mmHg</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="脉搏">
                <el-input :disabled="!disable" type="number" v-model="checkInfoData.pulse">
                  <template slot="append">次/秒</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="医师签字" label-width="10%">
            <el-input v-model="checkInfoData.signForSurgery" :disabled="!disable"></el-input>
          </el-form-item>


          <el-alert title="内科检查信息"
                    type="info"
                    :closable="false" style="margin-bottom: 10px"></el-alert>
          <el-form-item label="发育营养" label-width="10%">
            <el-input v-model="checkInfoData.growth" :disabled="!disable"></el-input>
          </el-form-item>
          <el-form-item label="神经及精神" label-width="10%">
            <el-input v-model="checkInfoData.mind" :disabled="!disable"></el-input>
          </el-form-item>
          <el-form-item label="肺及呼吸道" label-width="10%">
            <el-input v-model="checkInfoData.lung" :disabled="!disable"></el-input>
          </el-form-item>
          <el-form-item label="心脏及血管" label-width="10%">
            <el-input v-model="checkInfoData.heart" :disabled="!disable"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="腹部器官-肝" label-width="20%">
                <el-input v-model="checkInfoData.liver" :disabled="!disable"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="腹部器官-脾" label-width="20%">
                <el-input v-model="checkInfoData.spleen" :disabled="!disable"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="其他" label-width="10%">
            <el-input v-model="checkInfoData.otherInternalSick" :disabled="!disable"></el-input>
          </el-form-item>
          <el-form-item label="医师签字" label-width="10%">
            <el-input v-model="checkInfoData.signForInternal" :disabled="!disable"></el-input>
          </el-form-item>


          <el-alert title="化验检查信息"
                    type="success"
                    :closable="false" style="margin-bottom: 10px"></el-alert>
          <el-form-item label="化验检查" label-width="10%">
            <el-input type="textarea" v-model="checkInfoData.assayCheck" :disabled="!disable"></el-input>
          </el-form-item>
          <el-form-item label="化验员签字" label-width="10%">
            <el-input v-model="checkInfoData.signForAssay" :disabled="!disable"></el-input>
          </el-form-item>

          <el-alert title="化验胸部放射检查信息"
                    type="success"
                    :closable="false" style="margin-bottom: 10px"></el-alert>
          <el-form-item label="化验胸部放射检查" label-width="10%">
            <el-input type="textarea" v-model="checkInfoData.chestCheck" :disabled="!disable"></el-input>
          </el-form-item>
          <el-form-item label="医师签字" label-width="10%">
            <el-input v-model="checkInfoData.signForChest" :disabled="!disable"></el-input>
          </el-form-item>

          <el-alert title="其他检查信息"
                    type="success"
                    :closable="false" style="margin-bottom: 10px"></el-alert>
          <el-form-item label="其他检查" label-width="10%">
            <el-input type="textarea" v-model="checkInfoData.otherCheck" :disabled="!disable"></el-input>
          </el-form-item>
          <el-form-item label="检查结论" label-width="10%">
            <el-input type="textarea" v-model="checkInfoData.checkResult" :disabled="!disable"></el-input>
          </el-form-item>
          <el-form-item label="负责医师签字" label-width="10%">
            <el-input v-model="checkInfoData.signForResult" :disabled="!disable"></el-input>
          </el-form-item>
          <el-form-item label="检查医院意见" label-width="10%">
            <el-input v-model="checkInfoData.suggestForCheck" :disabled="!disable"></el-input>
          </el-form-item>
          <el-form-item label="盖章" label-width="10%">
            <el-input v-model="checkInfoData.sealer" :disabled="!disable"></el-input>
          </el-form-item>
          <el-form-item label="备注" label-width="10%">
            <el-input type="textarea" v-model="checkInfoData.remark" :disabled="!disable"></el-input>
          </el-form-item>

          <template>
            <el-form-item align="right" v-show="!disable">
              <el-button type="success" @click="disable=false">编辑</el-button>
              <el-button :disabled="disable" type="primary" @click="saveData(checkInfoData)">保存</el-button>
              <el-button @click="handleClose">取消</el-button>
            </el-form-item>
          </template>
        </el-form>
      </div>

    </el-dialog>
    <el-dialog title="查看学生健康档案"
               width="80%"
               :modal="false"
               :before-close="handleClose"
               :visible.sync="dialogShowVisible">
      <health-table :health-data="checkInfoData" :is-msg="false" :disabled="disable"
                    @save-suggestion="saveSuggestion"></health-table>
    </el-dialog>
  </div>
</template>

<script>
  import Message from '../../components/messages/index.js'
  import HealthTable from './HeallthTable'
  import ImageUpload from '../../components/upload/UploadBase64'

  export default {
    name: "index",

    data() {
      /*const validateString = (rule, value, callback) => {
        value = value.split(" ").join("");
        if (value === '') {
          callback(new Error('请输入有效值'));
        } else {
          callback();
        }
      };*/
      return {
        dialogShowVisible: false,
        dialogVisible: false,
        tableData: [],
        searchData: {
          pageSize: 10,
          pageNum: 1,
          total: 0,
          clauses: [
            {
              column: "userId",
              operation: "=",
              value: ""
            }]
        },
        checkInfoData: {},
        disable: true,
        title: "添加用户",
        userOptions: [],
        /*rules: {
          checkTime: [
            {required: true, message: '请选择体检日期', trigger: 'blur'}
          ],
          checkYear: [
            {required: true, message: '请选择学年', trigger: 'blur'}
          ],
          userId: [
            {required: true, message: '请选择学生', trigger: 'blur'}
          ],
          college: [
            {required: true, message: '请输入学院', trigger: 'blur'}
          ],
          major: [
            {required: true, message: '请输入专业', trigger: 'blur'}
          ],
          grade: [
            {required: true, message: '请输入班级', trigger: 'blur'}
          ],
          /!*stuNo: [
            {required: true, message: '请输入学号', trigger: 'blur'}
          ],*!/
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
        },*/
        checkDataOptions: [
          {label: "第一学年"}, {label: "第二学年"}, {label: "第三学年"}, {label: "第四学年"}
        ],
        user: JSON.parse(localStorage.getItem("user"))
      }
    },
    components: {HealthTable, ImageUpload},
    methods: {
      change(e) {
        this.$forceUpdate()
      },
      handleClose() {
        this.dialogVisible = false;
        this.dialogShowVisible = false;
      },
      initData() {
        this.searchData.clauses[0].value = this.user.id;
        this.$http.post("/checkInfo/page", this.searchData).then(res => {
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
        this.title = "添加健康档案";
        this.checkInfoData = {};
        this.checkInfoData.college = this.user.college;
        this.checkInfoData.major = this.user.major;
        this.checkInfoData.grade = this.user.grade;
        this.checkInfoData.stuNo = this.user.stuNo;
        this.checkInfoData.name = this.user.name;
        this.checkInfoData.sex = this.user.sex;
        this.checkInfoData.birth = this.user.birth;
        this.checkInfoData.realAge = this.user.realAge;
        this.checkInfoData.cultureLevel = this.user.cultureLevel;
        this.checkInfoData.nation = this.user.nation;
        this.checkInfoData.occupation = this.user.occupation;
        this.checkInfoData.nativePlace = this.user.nativePlace;
        this.checkInfoData.presentAddress = this.user.presentAddress;
        this.checkInfoData.workPlace = this.user.workPlace;
        this.checkInfoData.teacherId = this.user.teacherId;
        this.checkInfoData.photo = this.user.photo;
        this.dialogVisible = true;
        this.disable = false;
      },
      showRow(data) {
        this.disable = true;
        this.checkInfoData = data;
        this.dialogShowVisible = true;
      },
      updateRow(index, data) {
        this.title = "编辑健康档案";
        this.disable = false;
        this.$http.get("/checkInfo/get/" + data[index].id).then(res => {
          if (res.status === 200) {
            this.checkInfoData = res.data;
            this.dialogVisible = true;
          }
        })
      },
      deleteRow(index, data) {
        Message.confirm("是否删除该档案?").then(() => {
          this.$http.get("/checkInfo/delete/" + data[index].id).then(res => {
            if (res.status === 200) {
              Message.success("操作成功");
              this.initData();
            }
          })
        })
      },
      saveData() {
        if (this.checkInfoData.id == null || this.checkInfoData.id === "") {
          this.checkInfoData.userId = this.user.id;
          this.$http.post("/checkInfo/add", this.checkInfoData).then(res => {
            if (res.status === 200) {
              Message.success("操作成功");
              this.initData();
            }
          })
        } else {
          this.$http.post("/checkInfo/update", this.checkInfoData).then(res => {
            if (res.status === 200) {
              Message.success("操作成功");
              this.initData();
            }
          })
        }
        this.dialogVisible = false;
      },
      getAllUser() {
        this.$http.get("/user/getAllStudent/2").then(res => {
          if (res.status === 200) {
            this.userOptions = res.data;
          }
        })
      },
      judgeCheckIsExist() {
        if (this.checkInfoData.checkYear === "" || this.checkInfoData.checkYear == null) {
          this.$message.warning("请选择需要学年")
        } else {
          this.$http.get("/checkInfo/judgeCheckIsExist", {
            params: {
              "userId": this.user.id,
              "checkYear": this.checkInfoData.checkYear
            }
          }).then(res => {
            if (res.status === 200) {
              if (res.data === false) {
                this.$message.error("该学生此学年体检单已存在，请重新选择学年!")
              }
            }
          })
        }
      },
      saveSuggestion(data) {
        this.$http.post("/suggestion/add", data).then(res => {
          if (res.status === 200) {
            this.$message.success("留言成功");
            this.dialogShowVisible = false;
          }
        })
      }
    },
    mounted() {
      this.initData();
      this.getAllUser();
    }
  }
</script>

<style scoped>
  .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
    margin-right: 0;
  }
</style>
