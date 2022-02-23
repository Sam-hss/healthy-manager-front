<template>
  <div>
    <div class="selfHealth">
      <h1 style="padding: 40px 0">广东财经大学医院体格检查表</h1>
      <div class="table-head">
        <label>
          <span>学院:</span>
          <input disabled="disabled" class="input-style-1" v-model="healthData.college">
        </label>
        <label>
          <span>专业:</span>
          <input disabled="disabled" class="input-style-1" v-model="healthData.major">
        </label>
        <label>
          <span>班级:</span>
          <input disabled="disabled" class="input-style-1" v-model="healthData.grade">
        </label>
        <label>
          <span>学号:</span>
          <input disabled="disabled" class="input-style-1" v-model="healthData.stuNo">
        </label>
      </div>
      <div class="content">
        <div style="width: 79.35%">
          <div class="first-line">
            <div class="border-bottom-right"
                 style="width: 18.75%;height: 60px;line-height: 60px;font-size: 20px;text-align: center;font-weight: 600">
              <span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</span>
            </div>
            <input disabled="disabled" class="input-style border-bottom-right" style="width: 18.75%;height: 60px;"
                   v-model="healthData.name"/>
            <div class="border-bottom-right"
                 style="width: 6.25%;height: 60px;font-size: 20px;text-wrap: normal;text-align: center;font-weight: 600">
              性<br/>别
            </div>
            <input disabled="disabled" class="input-style border-bottom-right" style="width: 6.25%;"
                   v-model="healthData.sex"/>
            <div class="border-bottom"
                 style="width: 6.25%;height: 60px;font-size: 20px;text-wrap: normal;text-align: center;font-weight: 600">
              出<br/>生
            </div>
            <input disabled="disabled" class="input-style border-bottom-right" type="date"
                   style="width: 26.2%;height: 60px;" v-model="healthData.birth"/>
            <div class="border-bottom-right"
                 style="width: 8%;height: 60px;font-size: 20px;text-wrap: normal;text-align: center;font-weight: 600">实际<br/>年龄
            </div>
            <input disabled="disabled" class="input-style border-bottom-right" style="width: 8%;"
                   v-model="healthData.realAge"/>
          </div>
          <div class="first-line">
            <div class="border-bottom-right"
                 style="width: 18.75%;height: 60px;font-size: 20px;line-height:60px;text-wrap: normal;text-align: center;font-weight: 600;letter-spacing: 15px">
              文化程度
            </div>
            <input disabled="disabled" class="input-style border-bottom-right" style="width: 31.5%;"
                   v-model="healthData.cultureLevel"/>
            <div class="border-bottom-right"
                 style="width: 6.25%;height: 60px;font-size: 20px;text-wrap: normal;text-align: center;font-weight: 600">
              民<br/>族
            </div>
            <input disabled="disabled" class="input-style border-bottom-right" style="width: 8%;"
                   v-model="healthData.nation"/>
            <div class="border-bottom-right"
                 style="width: 6.25%;height: 60px;font-size: 20px;text-wrap: normal;text-align: center;font-weight: 600">
              职<br/>业
            </div>
            <input disabled="disabled" class="input-style border-bottom-right" style="width: 27.8%;"
                   v-model="healthData.occupation"/>
          </div>
          <div class="first-line">
            <div class="border-bottom-right"
                 style="width: 18.75%;height: 60px;font-size: 20px;line-height:60px;text-wrap: normal;text-align: center;font-weight: 600;">
              籍&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;贯
            </div>
            <input disabled="disabled" class="input-style border-bottom-right" style="width: 31.5%;"
                   v-model="healthData.nativePlace"/>
            <div class="border-bottom-right"
                 style="width: 14.4%;height: 60px;font-size: 20px;text-wrap: normal;text-align: center;font-weight: 600;">
              现家庭<br/>住&nbsp;&nbsp;址
            </div>
            <input disabled="disabled" class="input-style border-bottom-right" style="width: 34.1%;"
                   v-model="healthData.presentAddress"/>
          </div>
          <div class="first-line">
            <div class="border-bottom-right"
                 style="width: 18.75%;height: 60px;font-size: 20px;text-wrap: normal;text-align: center;font-weight: 600;">
              毕业学校<br/>或工作单位
            </div>
            <input disabled="disabled" class="input-style border-bottom-right" style="width: 80.3%;"
                   v-model="healthData.workPlace"/>
          </div>
          <div class="first-line">
            <div class="border-bottom-right"
                 style="width: 18.75%;height: 60px;line-height:60px;font-size: 20px;text-wrap: normal;text-align: center;font-weight: 600;letter-spacing: 15px">
              既往医史
            </div>
            <input disabled="disabled" class="input-style border-bottom-right" style="width: 80.3%;"
                   v-model="healthData.historyCheck"/>
          </div>
          <div class="first-line">
            <div class="border-bottom-right"
                 style="width: 99.2%;height: 60px;line-height:60px;font-size: 20px;text-wrap: normal;text-align: center;font-weight: 600;letter-spacing: 15px">
              （以上本人如实填写）
            </div>
          </div>
        </div>
        <div class="photo border-bottom" style="text-align: center">
          <div style="position:relative;top: 330px;">体检单位盖章</div>
          <image-upload v-model="healthData.photo"></image-upload>

        </div>
      </div>
      <div class="content" style="height: 600px;border-top: none;">
        <div class="border-right"
             style="width: 7%;height: 604px;font-size: 20px;font-weight: 600;text-align: center;line-height: 200px">
          <span>五<br/>官<br/>科</span>
        </div>
        <div style="width: 72.25%;">
          <div class="first-line">
            <div style="width: 10%;height: 240px;font-size: 20px;font-weight: 600;text-align: center;">
              <div class="border-bottom-right" style="width: 100%;height: 240px;line-height: 240px">眼</div>
              <div class="border-bottom-right" style="width: 100%;height: 120px;line-height: 120px">耳</div>
              <div class="border-bottom-right" style="width: 100%;height: 60px;line-height: 60px">鼻</div>
              <div class="border-bottom-right" style="width: 100%;height: 60px;line-height: 60px">咽喉</div>
              <div class="border-bottom-right" style="width: 100%;height: 60px;line-height: 60px">口腔</div>
              <div class="border-right" style="width: 100%;height: 60px;line-height: 60px">其他</div>
            </div>
            <div style="width: 15%;height: 240px;font-size: 20px;font-weight: 600;text-align: center">
              <div>
                <div class="border-bottom-right" style="height: 120px;width: 100%;line-height: 120px">
                  <span>视&nbsp;&nbsp;力</span>
                </div>
              </div>
              <div class="border-bottom-right div-center" style="height: 120px;width: 100%">
                <span>其&nbsp;&nbsp;他<br/>眼&nbsp;&nbsp;疾</span>
              </div>
              <div>
                <div class="border-bottom-right" style="height: 119px;width: 100%;line-height: 120px">
                  <span>听&nbsp;&nbsp;力</span>
                </div>
              </div>
              <div>
                <div class="border-bottom-right" style="height: 60px;width: 100%;line-height: 60px">
                  <span>嗅&nbsp;&nbsp;觉</span>
                </div>
              </div>
              <div>
                <div class="border-bottom-right" style="height: 60px;width: 100%;line-height: 60px">
                  <span>状&nbsp;&nbsp;况</span>
                </div>
              </div>
              <div>
                <div class="border-bottom-right" style="height: 60px;width: 100%;line-height: 60px">
                  <span>龋&nbsp;&nbsp;齿</span>
                </div>
              </div>
            </div>
            <div style="width: 30%;height: 240px;">
              <div class="border-bottom-right"
                   style="width: 100%;height: 60px;font-size: 20px;font-weight: 600;text-align: center;display: flex;flex-direction: row">
                <div style="width: 30%;height: 100%;line-height: 60px">左</div>
                <input disabled="disabled" class="input-style-2" style="width: 70%;height: 60px"
                       v-model="healthData.leftView"/>
              </div>
              <div class="border-bottom-right"
                   style="width: 100%;height: 60px;font-size: 20px;font-weight: 600;text-align: center;display: flex;flex-direction: row">
                <div style="width: 30%;height: 100%;line-height: 60px">右</div>
                <input disabled="disabled" class="input-style-2" style="width: 70%;height: 60px"
                       v-model="healthData.rightView"/>
              </div>
              <div class="border-bottom-right" style="width: 100%;height: 120px;font-size: 20px;">
                <input disabled="disabled" class="input-style"
                       style="width: 99%;height: 99%;border: none;font-size: 20px;text-align: center"
                       v-model="healthData.otherEyesSick"/>
              </div>
              <div class="border-bottom-right"
                   style="width: 100%;height: 60px;font-size: 20px;font-weight: 600;text-align: center;display: flex;flex-direction: row">
                <div style="width: 30%;height: 100%;line-height: 60px">左</div>
                <input disabled="disabled" class="input-style-2" style="width: 40%;height: 60px"
                       v-model="healthData.leftAudition"/>
                <div style="width: 30%;height: 100%;line-height: 60px">公尺</div>
              </div>
              <div class="border-bottom-right"
                   style="width: 100%;height: 58px;font-size: 20px;font-weight: 600;text-align: center;display: flex;flex-direction: row">
                <div style="width: 30%;height: 100%;line-height: 58px">右</div>
                <input disabled="disabled" class="input-style-2" style="width: 40%;height: 100%"
                       v-model="healthData.rightAudition"/>
                <div style="width: 30%;height: 100%;line-height: 58px">公尺</div>
              </div>
              <div class="border-bottom-right" style="width: 100%;height: 60px;font-size: 20px;">
                <input disabled="disabled" class="input-style"
                       style="width: 99%;height: 99%;border: none;font-size: 20px;text-align: center"
                       v-model="healthData.smell"/>
              </div>
              <div class="border-bottom-right" style="width: 100%;height: 60px;font-size: 20px;">
                <input disabled="disabled" class="input-style"
                       style="width: 99%;height: 99%;border: none;font-size: 20px;text-align: center"
                       v-model="healthData.throat"/>
              </div>
              <div style="display: flex;flex-direction: row;width: 100%;height: 59px;">
                <div class="border-bottom-right" style="width: 50%;height: 58px;font-size: 20px;">
                  <input disabled="disabled" class="input-style"
                         style="width: 98%;height: 98%;border: none;font-size: 20px;text-align: center"
                         v-model="healthData.toothSick"/>
                </div>
                <div class="border-bottom-right" style="height: 58px;width: 50%;line-height: 58px;font-weight: 600">
                  <span>缺&nbsp;&nbsp;齿</span>
                </div>
              </div>
              <div style="width: 100%;height: 56px;font-size: 20px;">
                <input disabled="disabled" class="input-style"
                       style="width: 100%;height: 56px;font-size: 20px;text-align: center;line-height: 56px;border: none"
                       v-model="healthData.otherSenseSick"/>
              </div>

            </div>
            <div style="width: 15%;height: 240px;font-size: 20px;font-weight: 600;text-align: center">
              <div class="border-bottom-right" style="height: 120px;width: 100%;line-height: 120px">
                <span>矫正视力</span>
              </div>
              <div class="border-bottom-right div-center" style="height: 120px;width: 100%">
                <span>色&nbsp;&nbsp;觉<br/>检&nbsp;&nbsp;查</span>
              </div>
              <div class="border-bottom-right" style="height: 120px;width: 100%;line-height: 120px">
                <span>耳&nbsp;&nbsp;疾</span>
              </div>
              <div class="border-bottom-right div-center" style="height: 60px;width: 100%">
                <span>鼻及鼻窦<br/>疾病</span>
              </div>
              <div class="border-bottom-right" style="height: 60px;width: 100%;line-height: 60px">
                <span>口&nbsp;&nbsp;吃</span>
              </div>
              <div class="border-bottom-right" style="width: 100%;height: 58px;font-size: 20px;">
                <input disabled="disabled" class="input-style"
                       style="width: 98%;height: 98%;border: none;font-size: 20px;text-align: center"
                       v-model="healthData.hypodontia"/>
              </div>


            </div>
            <div style="width: 35%;height: 60px;;">
              <div class="border-bottom-right"
                   style="width: 100%;height: 60px;font-size: 20px;font-weight: 600;text-align: center;display: flex;flex-direction: row">
                <div style="width: 30%;height: 100%;line-height: 60px">左</div>
                <input disabled="disabled" class="input-style-2" style="width: 70%;height: 60px"
                       v-model="healthData.correctLeftView"/>
              </div>
              <div class="border-bottom-right"
                   style="width: 100%;height: 60px;font-size: 20px;font-weight: 600;text-align: center;display: flex;flex-direction: row">
                <div style="width: 30%;height: 100%;line-height: 60px">右</div>
                <input disabled="disabled" class="input-style-2" style="width: 70%;height: 60px"
                       v-model="healthData.correctRightView"/>
              </div>
              <div class="border-bottom-right"
                   style="width: 100%;height: 60px;font-size: 20px;font-weight: 600;text-align: center;display: flex;flex-direction: row">
                <div style="width: 70%;height: 100%;line-height: 60px">彩色图案及编码:</div>
                <input disabled="disabled" class="input-style-2" style="width: 30%;height: 60px"
                       v-model="healthData.colorOrCode"/>
              </div>
              <div class="border-bottom-right"
                   style="width: 100%;height: 59px;font-size: 20px;font-weight: 600;text-align: center;display: flex;flex-direction: row">
                <div style="width: 70%;height: 100%;">单色识别:（红、绿、紫、蓝、黄）</div>
                <input disabled="disabled" class="input-style-2" style="width: 30%;height: 59px"
                       v-model="healthData.singleColorJudge"/>
              </div>
              <div class="border-bottom-right" style="width: 100%;height: 119px;font-size: 20px;">
                <input disabled="disabled" class="input-style"
                       style="width: 99%;height: 99%;border: none;font-size: 20px;text-align: center"
                       v-model="healthData.earSick"/>
              </div>
              <div class="border-bottom-right" style="width: 100%;height: 59px;font-size: 20px;">
                <input disabled="disabled" class="input-style"
                       style="width: 99%;height: 99%;border: none;font-size: 20px;text-align: center"
                       v-model="healthData.paranasalSinus"/>
              </div>
              <div class="border-bottom-right" style="width: 100%;height: 59px;font-size: 20px;">
                <input disabled="disabled" class="input-style"
                       style="width: 99%;height: 99%;border: none;font-size: 20px;text-align: center"
                       v-model="healthData.stammer"/>
              </div>
              <div style="display: flex;flex-direction: row;width: 100.4%;height: 60px;">
                <div class="border-bottom-right" style="height: 60px;width: 50%;line-height: 60px;font-weight: 600">
                  <span>齿&nbsp;&nbsp;槽</span>
                </div>
                <div class="border-bottom-right" style="width: 50.5%;height: 60px;font-size: 20px;">
                  <input disabled="disabled" class="input-style"
                         style="width: 98%;height: 98%;border: none;font-size: 20px;text-align: center"
                         v-model="healthData.toothPlace"/>
                </div>
              </div>
              <div class="border-right" style="height: 60px;width: 100%;line-height: 60px">

              </div>
            </div>
          </div>
        </div>
        <div style="padding-left:10px;display: flex;flex-direction: column;justify-content: space-around;font-weight: 600">
          <div>
            <span style="font-size: 20px;text-align: center;font-weight: 600;">医师意见签字</span>
            <br/>
          </div>
          <div>
            <span style="font-size: 20px;text-align: center;font-weight: 600;">1.眼科</span>
            <br/>
            <input disabled="disabled" placeholder="请签字" class="input-style"
                   style="margin-left:5px;border: none;width: 60%;height: 60px;font-size: 20px;text-align: center"
                   v-model="healthData.signForEyes"/>
          </div>
          <div>
            <span style="font-size: 20px;text-align: center;font-weight: 600;">2.耳喉鼻科</span>
            <br/>
            <input disabled="disabled" placeholder="请签字" class="input-style"
                   style="margin-left:5px;border: none;width: 60%;height: 60px;font-size: 20px;text-align: center"
                   v-model="healthData.signForEar"/>
          </div>
          <div>
            <span style="font-size: 20px;text-align: center;font-weight: 600;">3.口腔科</span>
            <br/>
            <input disabled="disabled" placeholder="请签字" class="input-style"
                   style="margin-left:5px;border: none;width: 60%;height: 60px;font-size: 20px;text-align: center"
                   v-model="healthData.signForMouth"/>
          </div>
        </div>
      </div>
      <div class="content" style="height: 300px;border-top: none;">
        <div class="border-right"
             style="width: 7.2%;height: 300px;font-size: 20px;font-weight: 600;text-align: center;line-height: 160px">
          <span>外<br/>科</span>
        </div>
        <div style="width: 74.25%;">
          <div style="width: 100%;">
            <div class="first-line">
              <div style="width: 9.3%;height: 240px;font-size: 20px;font-weight: 600;text-align: center;">
                <div class="border-bottom-right" style="width: 100%;height: 60px;line-height: 60px">身长</div>
                <div class="border-bottom-right" style="width: 100%;height: 60px;line-height: 60px">体重</div>
                <div class="border-bottom-right" style="width: 100%;height: 60px;line-height: 60px">淋巴</div>
                <div class="border-bottom-right" style="width: 100%;height: 60px;line-height: 60px">四肢</div>
                <div class="border-right" style="width: 100%;height: 60px;line-height: 60px">其他</div>
              </div>
              <div style="width: 20%;height: 240px;font-size: 20px;font-weight: 600;text-align: center;">
                <div class="border-bottom-right"
                     style="width: 100%;height: 60px;font-size: 20px;display: flex;flex-direction: row">
                  <input disabled="disabled" class="input-style"
                         style="margin-left:2px;width: 60%;height: 98%;border: none;font-size: 20px;text-align: center"
                         v-model="healthData.height"/>
                  <div style="width: 30%;height: 100%;line-height: 58px">公分</div>
                </div>
                <div class="border-bottom-right"
                     style="width: 100%;height: 60px;font-size: 20px;display: flex;flex-direction: row">
                  <input disabled="disabled" class="input-style"
                         style="margin-left:2px;width: 60%;height: 98%;border: none;font-size: 20px;text-align: center"
                         v-model="healthData.weight"/>
                  <div style="width: 30%;height: 100%;line-height: 58px">公斤</div>
                </div>
                <div class="border-bottom-right"
                     style="width: 100%;height: 60px;font-size: 20px;display: flex;flex-direction: row">
                  <input disabled="disabled" class="input-style"
                         style="margin-left:2px;width: 100%;height: 98%;border: none;font-size: 20px;text-align: center"
                         v-model="healthData.lymph"/>
                </div>
                <div class="border-bottom-right"
                     style="width: 100%;height: 60px;font-size: 20px;display: flex;flex-direction: row">
                  <input disabled="disabled" class="input-style"
                         style="margin-left:2px;width: 100%;height: 98%;border: none;font-size: 20px;text-align: center"
                         v-model="healthData.allLegs"/>
                </div>
              </div>
              <div style="width: 20%;height: 240px;font-size: 20px;font-weight: 600;text-align: center;">
                <div class="border-bottom-right" style="width: 100%;height: 60px;line-height: 60px">腰&nbsp;&nbsp;围</div>
                <div class="border-bottom-right" style="width: 100%;height: 60px;line-height: 60px"></div>
                <div class="border-bottom-right" style="width: 100%;height: 60px;line-height: 60px">甲状腺</div>
                <div class="border-bottom-right" style="width: 100%;height: 60px;line-height: 60px">关&nbsp;&nbsp;节</div>
                <div style="width: 200%;height: 60px;font-size: 20px;display: flex;flex-direction: row">
                  <input disabled="disabled" class="input-style"
                         style="margin-left:2px;width: 100%;height: 92%;border: none;font-size: 20px;text-align: center"
                         v-model="healthData.otherInternalSick"/>
                </div>
              </div>
              <div style="width: 20%;height: 240px;font-size: 20px;font-weight: 600;text-align: center;">
                <div class="border-bottom-right"
                     style="width: 100%;height: 60px;font-size: 20px;display: flex;flex-direction: row">
                  <input disabled="disabled" class="input-style"
                         style="margin-left:2px;width: 60%;height: 98%;border: none;font-size: 20px;text-align: center"
                         v-model="healthData.waistline"/>
                  <div style="width: 30%;height: 100%;line-height: 58px">公分</div>
                </div>
                <div class="border-bottom-right"
                     style="width: 100%;height: 60px;font-size: 20px;display: flex;flex-direction: row">
                  <input disabled="disabled" class="input-style"
                         style="margin-left:2px;width: 100%;height: 98%;border: none;font-size: 20px;text-align: center"/>
                </div>
                <div class="border-bottom-right"
                     style="width: 100%;height: 60px;font-size: 20px;display: flex;flex-direction: row">
                  <input disabled="disabled" class="input-style"
                         style="margin-left:2px;width: 100%;height: 98%;border: none;font-size: 20px;text-align: center"
                         v-model="healthData.glandulaThyroidea"/>
                </div>
                <div class="border-bottom-right"
                     style="width: 100%;height: 60px;font-size: 20px;display: flex;flex-direction: row">
                  <input disabled="disabled" class="input-style"
                         style="margin-left:2px;width: 100%;height: 98%;border: none;font-size: 20px;text-align: center"
                         v-model="healthData.arthrosis"/>
                </div>
              </div>
              <div style="width: 10%;height: 240px;font-size: 20px;font-weight: 600;text-align: center;">
                <div class="border-bottom-right" style="width: 100%;height: 121px;line-height: 121px">皮&nbsp;&nbsp;肤
                </div>
                <div class="border-bottom-right" style="width: 100%;height: 60px;line-height: 60px">脊&nbsp;&nbsp;柱</div>
                <div class="border-bottom-right" style="width: 100%;height: 60px;line-height: 60px">平&nbsp;&nbsp;足</div>
              </div>
              <div style="width: 20%;height: 240px;font-size: 20px;font-weight: 600;text-align: center;">
                <div class="border-bottom-right"
                     style="width: 100%;height: 121px;font-size: 20px;display: flex;flex-direction: row">
                  <input disabled="disabled" class="input-style"
                         style="margin-left:2px;width: 100%;height: 100%;border: none;font-size: 20px;text-align: center"
                         v-model="healthData.skin"/>
                </div>
                <div class="border-bottom-right"
                     style="width: 100%;height: 60px;font-size: 20px;display: flex;flex-direction: row">
                  <input disabled="disabled" class="input-style"
                         style="margin-left:2px;width: 100%;height: 98%;border: none;font-size: 20px;text-align: center"
                         v-model="healthData.spineBackbone"/>
                </div>
                <div class="border-bottom-right"
                     style="width: 100%;height: 60px;font-size: 20px;display: flex;flex-direction: row">
                  <input disabled="disabled" class="input-style"
                         style="margin-left:2px;width: 100%;height: 98%;border: none;font-size: 20px;text-align: center"
                         v-model="healthData.foot"/>
                </div>
                <div class="border-right"
                     style="width: 100%;height: 60px;font-size: 20px;display: flex;flex-direction: row">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="padding-left:7px;display: flex;flex-direction: column;justify-content: space-around;font-weight: 600">
          <div>
            <span style="font-size: 20px;text-align: center;font-weight: 600;">医师意见</span>
            <br/>
            <span style="font-size: 20px;text-align: center;font-weight: 600;">签字</span>
            <br/>
            <input disabled="disabled" placeholder="请医师签字" class="input-style"
                   style="margin-left:5px;border: none;width: 60%;height: 60px;font-size: 20px;text-align: center"
                   v-model="healthData.signForSurgery"/>
          </div>
        </div>

      </div>
      <div class="content" style="height: 60px;border-top: none;">
        <div class="border-bottom-right"
             style="width: 50%;height: 60px;font-size: 20px;display: flex;flex-direction: row;font-weight: 600">
          <div style="width: 20%;height: 100%;line-height: 58px">血压</div>
          <input disabled="disabled" class="input-style"
                 style="margin-left:2px;width: 60%;height: 98%;border: none;font-size: 20px;text-align: center"
                 v-model="healthData.bloodPressure"/>
          <div style="width: 20%;height: 100%;line-height: 58px">mmHg</div>
        </div>
        <div class="border-bottom-right"
             style="width: 50%;height: 60px;font-size: 20px;display: flex;flex-direction: row;font-weight: 600">
          <div style="width: 20%;height: 100%;line-height: 58px">脉搏</div>
          <input disabled="disabled" class="input-style"
                 style="margin-left:2px;width: 60%;height: 98%;border: none;font-size: 20px;text-align: center"
                 v-model="healthData.pulse"/>
          <div style="width: 20%;height: 100%;line-height: 58px">次/秒</div>
        </div>
      </div>
      <div class="content" style="height: 425px;border-top: none;">
        <div class="border-right"
             style="width: 7.2%;height: 425px;font-size: 20px;font-weight: 600;text-align: center;line-height: 200px">
          <span>内<br/>科</span>
        </div>
        <div style="width: 74.25%;">
          <div style="width: 100%;">
            <div class="first-line">
              <div style="width: 29.3%;height: 240px;font-size: 20px;font-weight: 600;text-align: center;">
                <div class="border-bottom-right" style="width: 100%;height: 60px;line-height: 60px">发育营养</div>
                <div class="border-bottom-right" style="width: 100%;height: 60px;line-height: 60px">神经及精神</div>
                <div class="border-bottom-right" style="width: 100%;height: 60px;line-height: 60px">肺及呼吸道</div>
                <div class="border-bottom-right" style="width: 100%;height: 60px;line-height: 60px">心脏及血管</div>
                <div class="border-bottom-right" style="width: 100%;height: 120px;line-height: 120px">腹部器官</div>
                <div class="border-right" style="width: 100%;height: 60px;line-height: 60px">其他</div>
              </div>
              <div style="width: 70%;height: 240px;font-size: 20px;font-weight: 600;text-align: center;">
                <div class="border-bottom-right"
                     style="width: 100%;height: 60px;font-size: 20px;display: flex;flex-direction: row">
                  <input disabled="disabled" class="input-style"
                         style="margin-left:2px;width: 100%;height: 98%;border: none;font-size: 20px;text-align: center"
                         v-model="healthData.growth"/>
                </div>
                <div class="border-bottom-right"
                     style="width: 100%;height: 60px;font-size: 20px;display: flex;flex-direction: row">
                  <input disabled="disabled" class="input-style"
                         style="margin-left:2px;width: 100%;height: 98%;border: none;font-size: 20px;text-align: center"
                         v-model="healthData.mind"/>
                </div>
                <div class="border-bottom-right"
                     style="width: 100%;height: 60px;font-size: 20px;display: flex;flex-direction: row">
                  <input disabled="disabled" class="input-style"
                         style="margin-left:2px;width: 100%;height: 98%;border: none;font-size: 20px;text-align: center"
                         v-model="healthData.lung"/>
                </div>
                <div class="border-bottom-right"
                     style="width: 100%;height: 60px;font-size: 20px;display: flex;flex-direction: row">
                  <input disabled="disabled" class="input-style"
                         style="margin-left:2px;width: 100%;height: 98%;border: none;font-size: 20px;text-align: center"
                         v-model="healthData.heart"/>
                </div>
                <div class="border-bottom-right"
                     style="width: 100%;height: 59px;font-size: 20px;display: flex;flex-direction: row">
                  <div style="width: 20%;height: 100%;line-height: 58px">肝</div>
                  <input disabled="disabled" class="input-style"
                         style="margin-left:2px;width: 80%;height: 98%;border: none;font-size: 20px;text-align: center"
                         v-model="healthData.liver"/>
                </div>
                <div class="border-bottom-right"
                     style="width: 100%;height: 59px;font-size: 20px;display: flex;flex-direction: row">
                  <div style="width: 20%;height: 100%;line-height: 58px">脾</div>
                  <input disabled="disabled" class="input-style"
                         style="margin-left:2px;width: 80%;height: 98%;border: none;font-size: 20px;text-align: center"
                         v-model="healthData.spleen"/>
                </div>
                <div class="border-right"
                     style="width: 100%;height: 60px;font-size: 20px;display: flex;flex-direction: row">
                  <input disabled="disabled" class="input-style"
                         style="margin-left:2px;width: 100%;height: 98%;border: none;font-size: 20px;text-align: center"
                         v-model="healthData.otherInternalSick"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="padding-left:7px;display: flex;flex-direction: column;justify-content: space-around;font-weight: 600">
          <div>
            <span style="font-size: 20px;text-align: center;font-weight: 600;">医师意见</span>

            <div>

            </div>
            <br/>
            <span style="font-size: 20px;text-align: center;font-weight: 600;">签字</span>
            <br/>
            <input disabled="disabled" placeholder="请医师签字" class="input-style"
                   style="margin-left:5px;border: none;width: 60%;height: 60px;font-size: 20px;text-align: center"
                   v-model="healthData.signForInternal"/>
          </div>
        </div>

      </div>
      <div class="content" style="height: 600px;border-top: none;">
        <div style="width: 100%;">
          <div class="first-line">
            <div style="width: 28.5%;font-size: 20px;font-weight: 600;text-align: center;">
              <div class="border-bottom-right"
                   style="width: 100%;height: 100px;line-height: 100px;letter-spacing: 15px">化验检查
              </div>
              <div class="border-bottom-right" style="width: 100%;height: 100px;line-height: 100px">胸部放射检查</div>
              <div class="border-bottom-right"
                   style="width: 100%;height: 100px;line-height: 100px;letter-spacing: 15px">其他检查
              </div>
              <div class="border-bottom-right"
                   style="width: 100%;height: 100px;line-height: 100px;letter-spacing: 15px">检查结论
              </div>
              <div class="border-bottom-right" style="width: 100%;height: 100px;line-height: 100px">检查医院意见</div>
              <div class="border-right" style="width: 100%;height: 100px;line-height: 100px">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</div>
            </div>
            <div style="width: 71.38%;height: 240px;font-size: 20px;font-weight: 600;text-align: center;">
              <div class="border-bottom-right"
                   style="width: 100%;height: 100px;font-size: 20px;display: flex;flex-direction: row">
                <input disabled="disabled" class="input-style"
                       style="margin-left:2px;width: 60%;height: 98%;border: none;font-size: 20px;text-align: center"
                       v-model="healthData.assayCheck"/>
                <div style="width: 10%;height: 100%;line-height: 50px;">化验员签字:</div>
                <input disabled="disabled" class="input-style"
                       style="margin-left:2px;width: 30%;height: 98%;border: none;font-size: 20px;text-align: center"
                       v-model="healthData.signForAssay"/>
              </div>
              <div class="border-bottom-right"
                   style="width: 100%;height: 100px;font-size: 20px;display: flex;flex-direction: row">
                <input disabled="disabled" class="input-style"
                       style="margin-left:2px;width: 60%;height: 98%;border: none;font-size: 20px;text-align: center"
                       v-model="healthData.chestCheck"/>
                <div style="width: 10%;height: 100%;line-height: 50px;">医师<br/>签字:</div>
                <input disabled="disabled" class="input-style"
                       style="margin-left:2px;width: 30%;height: 98%;border: none;font-size: 20px;text-align: center"
                       v-model="healthData.signForChest"/>
              </div>
              <div class="border-bottom-right"
                   style="width: 100%;height: 100px;font-size: 20px;display: flex;flex-direction: row">
                <input disabled="disabled" class="input-style"
                       style="margin-left:2px;width: 100%;height: 98%;border: none;font-size: 20px;text-align: center"
                       v-model="healthData.otherCheck"/>
              </div>
              <div class="border-bottom-right"
                   style="width: 100%;height: 100px;font-size: 20px;display: flex;flex-direction: row">
                <input disabled="disabled" class="input-style"
                       style="margin-left:2px;width: 60%;height: 98%;border: none;font-size: 20px;text-align: center"
                       v-model="healthData.checkResult"/>
                <div style="width: 10%;height: 100%;line-height: 50px;">负责医师签字:</div>
                <input disabled="disabled" class="input-style"
                       style="margin-left:2px;width: 30%;height: 98%;border: none;font-size: 20px;text-align: center"
                       v-model="healthData.signForResult"/>
              </div>
              <div class="border-bottom-right"
                   style="width: 100%;height: 100px;font-size: 20px;display: flex;flex-direction: row">
                <input disabled="disabled" class="input-style"
                       style="margin-left:2px;width: 55%;height: 98%;border: none;font-size: 20px;text-align: center"
                       v-model="healthData.suggestForCheck"/>
                <div style="width: 15%;height: 100%;line-height: 100px;">（盖章）</div>
                <input disabled="disabled" class="input-style"
                       style="margin-left:2px;width: 30%;height: 98%;border: none;font-size: 20px;text-align: center"
                       v-model="healthData.sealer"/>
              </div>
              <div class="border-bottom-right"
                   style="width: 100%;height: 96px;font-size: 20px;display: flex;flex-direction: row">
                <input disabled="disabled" class="input-style"
                       style="margin-left:2px;width: 100%;height: 95%;border: none;font-size: 20px;text-align: center"
                       v-model="healthData.remark"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="width: 80%;margin-top: 20px" v-show="isMsg">
        <el-form :model="suggestionData" label-width="10%" label-position="left">
          <el-form-item label="您的建议">
            <el-input type="textarea" v-model="suggestionData.content" :rows="5" placeholder="请填写您的建议"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="sendSuggestion">确认</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
  import ImageUpload from '../../components/upload/UploadBase64'

  export default {
    props: {
      healthData: {
        type: Object,
        default: function () {
          return {
            college: "",
            major: "",
            grade: "",
            stuNo: "",
            name: "",
            sex: "",
            birth: "",
            realAge: 0,
            cultureLevel: "",
            //名族
            nation: "",
            //职业
            occupation: "",
            //籍贯
            nativePlace: "",
            presentAddress: "",
            workPlace: "",
            //既往医史
            historyCheck: "",
            //头像
            photo: "",
            leftView: "",
            rightView: "",
            correctLeftView: "",
            correctRightView: "",
            //其他眼疾
            otherEyesSick: "",
            //彩色图案及编码
            colorOrCode: "",
            //单色识别
            singleColorJudge: "",
            leftAudition: 0,
            rightAudition: 0,
            earSick: "",
            smell: "",
            //鼻窦
            paranasalSinus: "",
            //咽喉
            throat: "",
            //口吃
            stammer: "",
            toothSick: "",
            //缺齿
            hypodontia: "",
            //齿槽
            toothPlace: "",
            //其他无关疾病
            otherSenseSick: "",
            //五官医师签字
            signForSense: "",
            suggestForEyes: "",
            suggestForEar: "",
            suggestForTooth: "",
            height: 0,
            weight: 0,
            //腰围
            waistline: 0,
            skin: "",
            //淋巴
            lymph: "",
            //甲状腺
            glandulaThyroidea: "",
            //脊柱
            spineBackbone: "",
            //四肢
            allLegs: "",
            //关节
            arthrosis: "",
            foot: "",
            otherSurgerySick: "",
            signForSurgery: "",
            suggestForSurgery: "",
            //血压
            bloodPressure: 0,
            //脉搏
            pulse: 0,
            //发育营养
            growth: "",
            //神经及精神
            mind: "",
            //肺及呼吸道
            lung: "",
            //心脏及血管
            heart: "",
            //肝
            liver: "",
            //脾
            spleen: "",
            //其他内科疾病
            otherInternalSick: "",
            signForInternal: "",
            suggestForInternal: "",
            //化验检查
            assayCheck: "",
            signForAssay: "",
            //胸部放射检查
            chestCheck: "",
            signForChest: "",
            otherCheck: "",
            checkResult: "",
            signForResult: "",
            suggestForCheck: "",
            //盖章
            sealer: "",
            remark: "",
            checkTime: ""

          }
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      isMsg: {
        type: Boolean,
        default: false
      }
    },
    components: {ImageUpload},
    data() {
      return {
        suggestionData: {
          content: "",
          userId: "",
          doctorId: "",
          office: "",
          checkInfoId: ""
        },
        user: JSON.parse(localStorage.getItem("user"))
      }
    },
    methods: {
      sendSuggestion() {
        if (this.suggestionData.content === "" || this.suggestionData.content == null) {
          this.$message.warning("需要填写您的建议")
        } else {
          this.suggestionData.userId = this.healthData.userId;
          this.suggestionData.doctorId = this.user.id;
          this.suggestionData.checkInfoId = this.healthData.id;
          this.$http.get("/role/get/" + this.user.roleId).then(res => {
            if (res.status === 200) {
              this.suggestionData.office = res.data.roleName;
              this.$emit("save-suggestion", this.suggestionData)
            }
          });
        }
      }
    }

  }
</script>

<style scoped lang="less">
  .selfHealth {
    overflow-y: auto;
    height: 2800px;
    display: flex;
    align-items: center;
    flex-direction: column;

    .table-head {
      margin-top: 20px;
      width: 1200px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      span {
        font-size: 20px;
      }

      .input-style-1 {
        border: none;
        outline: none;
        font-size: 20px;
      }
    }

    .content {
      width: 1200px;
      height: 365px;
      border: 2px solid black;

      display: flex;
      flex-direction: row;

      .first-line {
        width: 100%;
        display: flex;
        flex-direction: row;
      }

      .photo {
        width: 20%;
        height: 365px;
      }
    }
  }

  .input-style {
    outline: none;
  }

  .input-style-2 {
    border: none;
    text-align: center;
    border-bottom: 1px solid black;
    outline: none;
    font-size: 20px;
  }

  .border-bottom {
    border: none;
    border-bottom: 1px solid black;
  }

  .border-right {
    border-right: 1px solid black;
  }

  .border-bottom-right {
    text-align: center;
    letter-spacing: 0.2em;
    border: none;
    font-size: 20px;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
  }

  .avatar-uploader .el-upload {
    width: 90%;
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
    width: 90%;
    height: 330px;
    line-height: 330px;
    text-align: center;
  }

  .avatar {
    display: block;
    width: 90%;
    height: 330px;
  }

  .div-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  input {
    color: rgb(58, 142, 230);
  }

  input:disabled {
    background-color: #00000000;
  }
</style>
