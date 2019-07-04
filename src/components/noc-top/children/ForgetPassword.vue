<template>
  <!--忘记密码弹框-->
  <el-dialog :visible.sync="show" @close="$emit('update', false)" :modal-append-to-body='false'>
    <div class="diaContent">
      <div class="closeImg" @click="show = false">
        <i class="el-icon-close"></i>
      </div>
      <div class="diaTitle">
        重置密码
      </div>
      <div class="diaStep">
        <el-steps :space="200" :active="1" finish-status="success">
          <el-step title="填写账户名"></el-step>
          <el-step title="验证身份"></el-step>
          <el-step title="设置新密码"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
      </div>
      <div class="diaForm">
        <el-form ref="form" :model="diaForm" label-width="80px">
          <el-form-item label="会员账号" prop="userName">
            <el-input v-model="diaForm.userName" placeholder="请输入要找回的账号">
              <i slot="prefix" class="iconfont iconuser-fill"></i>
            </el-input>
          </el-form-item>
          <el-form-item  label="验证码" prop="verificationCode">
            <el-input v-model="diaForm.verificationCode" placeholder="请输入图像验证码">
              <i slot="prefix" class="iconfont iconsafety-certificate"></i>
            </el-input>
          </el-form-item>
          <el-form-item  >
            <img class="verifyCodeImg" src="@/assets/imgs/u233.png" alt="">
            <span class="changeCode">看不清？<a href="javascript: void (0);">换一张</a></span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 215px">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'forget_password',
  data () {
    return {
      show: this.dialogVisible,
      diaForm: {
        userName: '',
        verificationCode: ''
      }
    }
  },
  created () {
  },
  mounted () {
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    dialogVisible () {
      this.show = this.dialogVisible
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
  .diaContent{
    position: relative;
    .diaTitle{
      line-height: 50px;
      font-size: 20px;
      padding-left: 28px;
    }
    .diaStep{
      padding: 10px 20px;
      padding-left: 180px;
    }
    .diaForm{
      width: 35%;
      padding: 60px 300px;
    }
    .closeImg{
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
    }
  }
</style>
