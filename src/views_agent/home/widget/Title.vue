<template>
  <div class="desc">
    <em>{{em}}</em>
    <p class="bottom" v-if="bottom">{{bottom}}</p>
    <p>{{content}}</p>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    em: {
      type: String,
      default: ''
    },
    bottom: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: '请传值内容'
    }
  }
}
</script>

<style scoped lang="scss">
  .desc {
    width: 1200px;
    height: 235px;
    margin: 0 auto;
    color: #fff;
    padding: 55px 0;
    box-sizing: border-box;

    em {
      display: inline-block;
      float: left;
      width: 50%;
      height: 100%;
      font-size: 100px;
      line-height: 100%;
      letter-spacing: 48px;
      text-align: center;
    }

    p {
      font-size: 16px;

      &.bottom {
        margin-top: 50px;
        margin-bottom: 8px;
      }
    }
  }
</style>
