<template>
  <div style="display: flex;flex-direction: column;align-items: center;min-height: 600px;">
    <h1 style="padding: 40px 0">{{bookData.book}}</h1>
    <div style="width: 100%;display: flex;flex-direction: row;justify-content: space-around;font-size: 18px">
      <div>作者：{{bookData.author}}</div>
      <div>发布时间：{{bookData.publishData}}</div>
      <!--<div>阅读量：{{bookData.visitNum}}</div>-->
    </div>
    <div style="width: 80%;margin-top: 40px;font-size: 18px;text-align: left" v-html="bookData.content">
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      bookData: {
        type: Object,
        default: function () {
          return {
            id: 0,
            publishData: "2016-05-04",
            author: "张三",
            book: "<<钢铁怎样炼成>>",
            visitNum: 20,
            description: "钢铁很硬，坚不可摧，但是坚持就是胜利，不放弃是原则，bu后退是意识。",
            content: "钢铁很硬，坚不可摧，但是坚持就是胜利，不放弃是原则，bu后退是意识。钢铁很硬，坚不可摧，但是坚持就是胜利，不放弃是原则，bu后退是意识。钢铁很硬，坚不可摧，但是坚持就是胜利，不放弃是原则，bu后退是意识。",
          }
        }
      }

    },
    name: "BookRead"
  }
</script>
