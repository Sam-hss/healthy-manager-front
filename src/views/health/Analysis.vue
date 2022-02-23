<template>
  <div style="display: flex;flex-direction: column;align-items: center">
    <div style="margin: 40px 0"><h1>体检数据分析</h1></div>
    <el-card style="width: 80%">
      <el-row style="height: 400px">
        <el-col :span="14">
          <div id="first" style="width: 100%;height: 400px;"></div>
        </el-col>
        <el-col :span="10">
          <div id="second" style="width: 100%;height: 400px;"></div>
        </el-col>
      </el-row>
      <el-row style="height: 400px">
        <el-col :span="14">
          <div id="third" style="width: 100%;height: 400px;"></div>
        </el-col>
        <el-col :span="10">
          <div id="four" style="width: 100%;height: 400px;"></div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "Analysis",
    data() {
      return {}
    },
    methods: {
      getAnalysisData() {
        let firstEcharts = echarts.init(document.getElementById("first"));
        let firstOptions = {
          title: {
            text: '学生最高最低PIM值变化分析',
            subtext: '模拟'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['最高PIM', '最低PIM']
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['大一上学期', '大一下学期', '大二上学期', '大二下学期', '大三上学期', '大三下学期', '大四']
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series: [
            {
              name: '最高PIM',
              type: 'line',
              data: [30, 39, 36, 35, 34, 33, 38],
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]
              }
            },
            {
              name: '最低PIM',
              type: 'line',
              data: [19, 22, 21, 19, 20, 21, 19],
              markPoint: {
                data: [
                  {name: '这段期间', value: -2, xAxis: 1, yAxis: -1.5}
                ]
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]
              }
            }
          ]
        };
        let secondEcharts = echarts.init(document.getElementById("second"));
        let secondOptions = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['偏胖', '正常', '偏瘦']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'value'
            }
          ],
          yAxis: [
            {
              type: 'category',
              axisTick: {show: false},
              data: ['大一上学期', '大一下学期', '大二上学期', '大二下学期', '大三上学期', '大三下学期', '大四']
            }
          ],
          series: [
            {
              name: '偏胖',
              type: 'bar',
              label: {
                normal: {
                  show: true,
                  position: 'inside'
                }
              },
              data: [28, 29, 30, 37, 34, 33, 30]
            },
            {
              name: '正常',
              type: 'bar',
              stack: '斤',
              label: {
                normal: {
                  show: true
                }
              },
              data: [20, 20, 22, 21, 23, 24, 25]
            },
            {
              name: '偏瘦',
              type: 'bar',
              stack: '%',
              label: {
                normal: {
                  show: true,
                  position: 'left'
                }
              },
              data: [19, 18, 17, 16, 19, 18, 20]
            }
          ]
        };
        let thirdEcharts = echarts.init(document.getElementById("third"));
        let thirdOption = {
          xAxis: {
            type: 'category',
            data: ['大一上学期', '大一下学期', '大二上学期', '大二下学期', '大三上学期', '大三下学期', '大四']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [55, 50, 60, 65, 70, 60, 62, 64],
            type: 'line'
          }]
        };
        let fourEcharts = echarts.init(document.getElementById("four"));
        let fourOption = {
          title: {
            text: '当前肥胖占比',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['偏瘦', '偏胖', '极瘦', '极胖', '健康体重']
          },
          series: [
            {
              name: '健康分析',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: 335, name: '偏瘦'},
                {value: 310, name: '偏胖'},
                {value: 234, name: '极瘦'},
                {value: 135, name: '极胖'},
                {value: 1548, name: '健康体重'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        firstEcharts.setOption(firstOptions);
        secondEcharts.setOption(secondOptions);
        thirdEcharts.setOption(thirdOption);
        fourEcharts.setOption(fourOption);
      }
    },
    mounted() {
      this.getAnalysisData();

    }
  }
</script>
