<template>
  <div class="StepContent">
    <div class="step">
      <div class="title">
        <div class="mainTitle">
          {{this.titleContent}}
        </div>
        <div class="stepNumber">
          {{this.stepNumber}}
        </div>
        <div class="subTitle">
          步骤
        </div>
      </div>
      <div class="content">
        <slot></slot>
        <div v-if="showMore" class="moreBank">更多银行 <i class="el-icon-caret-bottom"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'step',
  components: {
  },
  props: {
    stepNumber: {
      type: Number,
      default: 1
    },
    titleContent: {
      type: String,
      default: ''
    },
    showMore: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.StepContent{
  margin-bottom: 20px;
  width: 100%;
  border: 1px solid #CAD1E2;
  overflow: hidden;
  .step{
    overflow: hidden;
    .title{
      overflow: hidden;
      width: 150px;
      min-height: 260px;
      background-color: #8897BD;
      float: left;
      position: relative;
      padding-bottom: 1000px;
      margin-bottom: -990px;
      .mainTitle{
        width: 77px;
        font-size: 18px;
        color: white;
        position: absolute;
        top: 90px;
        left: 40px;
        z-index: 1;
      }
      .subTitle{
        font-size: 18px;
        color: white;
        text-align: right;
      }
      .stepNumber{
        font-family: "Microsoft YaHei";
        font-style: italic;
        color: #9CA8C7;
        display: inline-block;
        margin-left: -50px;
        font-weight: bold;
        font-size: 276px;
        line-height: 240px;
      }
    }
    .content{
      width: calc(100% - 150px);
      min-height: 220px;
      box-sizing: border-box;
      padding: 15px 10px;
      float: left;
      position: relative;
      padding-bottom: 1000px;
      margin-bottom: -990px;
      .moreBank{
        position: absolute;
        bottom: 10px;
        right: 15px;
      }
    }
  }
}
</style>
