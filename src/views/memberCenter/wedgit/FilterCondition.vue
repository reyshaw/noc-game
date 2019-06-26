<template>
  <section class="condition-wrapper">
    <div class="top">
      <span>{{this.title}}</span>
      <strong @click="showBase = !showBase"><i></i>{{this.subTitle}}</strong>
    </div>
    <div class="bottom" v-if="showBase">
      <article>
        <slot name="base-query"></slot>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FilterCondition',
  props: {
    title: {
      type: String,
      default: '筛选查询'
    },
    subTitle: {
      type: String,
      default: '收起筛选'
    }
  },
  data () {
    return {
      showBase: true
    }
  }
}
</script>

<style scoped lang="scss">
  section {
    border: 1px solid #cbd1e3;
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
    border-radius: 3px;
    overflow: hidden;
    div {
      width: 100%;
      height: 45px;
      font-size: 14px;
      color: #67757c;
      background: #fff;
      &.top {
        box-sizing: border-box;
        padding: 0 20px;
        line-height: 45px;
        strong {
          float: right;
          margin-right: 20px;
        }
      }
      &.bottom {
        background: #f0f0f0;
        min-height: 45px;
        float: left;
        height: auto;
        article {
          ul {
            float: left;
            display: inline-block;
            font-size: 14px;
            box-sizing: border-box;
            color: #67757c;
            width: 100%;
            background: #fff;
            li {
              float: left;
              box-sizing: border-box;
              margin-left: 10px;
              height: 45px;
              line-height: 45px;
              input[type='text'] {
                /*width: 100px;*/
                height: 28px;
                font-size: 12px;
                color: #67757c;
                box-sizing: border-box;
                text-indent: 5px;
                border: 1px solid #dcdfe6;
                border-radius: 5px;
              }
              input[type='date'] {
                color: #67757c;
                height: 28px;
                font-size:12px;
                text-indent: 5px;
              }
              select {
                color: #67757c;
                height: 28px;
                font-size:12px;
                border: 1px solid #dcdfe6;
                border-radius: 5px;
                padding-right: 10px;
                option {
                  height: 28px;
                }
              }
              button {
                background: #3db879;
                /*width: 110px;
                height: 32px;
                border: none;
                outline: none;
                color: #fff;
                font-size: 14px;*/
              }
              &.right {
                float: right;
                margin-right: 15px;
              }
            }
          }
        }
      }
    }
  }

</style>
