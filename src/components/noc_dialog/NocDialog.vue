<template>
  <div class="noc-dialog">
    <el-dialog
      title="提示"
      :modal="false"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      :width="width">
      <div class="dialogBody">
        <i class="el-icon-error close" @click="closeDialog" v-pointer></i>
        <div v-if="dialogTitle" class="title">
          <span>{{this.dialogTitle}}</span>
        </div>
        <div class="content">
          <slot name="dialog-content"></slot>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'noc_dialog',
  components: {
  },
  props: {
    width: {
      type: String,
      default: '570px'
    },
    dialogTitle: {
      type: String,
      default: ''
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  methods: {
    closeDialog () {
      this.$emit('closeDialog')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/global";
  .noc-dialog{
    .close{
      font-size: 40px;
      color: #fff;
      position: absolute;
      top: 0;
      right: -54px;
      &:hover{
        color: #999999;
      }
    }
    .dialogBody{
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      .title{
        background-color: #2457bf;
        span{
          display: inline-block;
          color: #fff;
          margin-left: 12px;
          line-height: 30px;
        }
      }
      .content{
        width: 100%;
        min-height: 250px;
        background-color: white;
        padding: 5px;
        box-sizing: border-box;
      }
    }
  }
</style>
