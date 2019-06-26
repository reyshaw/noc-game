<template>
  <div class="formbox">
    <el-form :model="form" size="medium" ref="validateForm">
      <el-form-item prop="account">
        <el-input v-model="form.account" autocomplete="off" class="inputStyle" placeholder="请设置会员账号">
          <i slot="prefix" class="iconfont iconuser-fill"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" autocomplete="off" class="inputStyle" placeholder="请设置6-12位登录密码">
          <i slot="prefix" class="iconfont iconlock-fill"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="pwdConfirm">
        <el-input v-model="form.pwdConfirm" autocomplete="off" class="inputStyle" placeholder="请再次输入密码">
          <i slot="prefix" class="iconfont iconlock-fill"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="agreement" class="agreement">
        <el-checkbox v-model="form.agreement">已阅读并同意《用户服务协议》</el-checkbox>
      </el-form-item>
      <el-form-item class="submitItem">
        <el-button type="primary" class="submit">立即注册</el-button>
      </el-form-item>
    </el-form>
    <div class="jumpToLogin"><a href="javascript: void(0);">已有账号，立即登录</a></div>
  </div>
</template>

<script>
export default {
  name: 'fast_register',
  data () {
    return {
      form: {
        account: '',
        password: '',
        agreement: true,
        pwdConfirm: ''
      }
    }
  },
  props: {
  },
  created () {
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.el-form{
  text-align: center;
  .inputStyle{
    width: 300px;
  }
  .agreement{
    margin-left: 38px;
    text-align: left;
  }
  .submitItem{
    margin-bottom: 0;
    .submit{
      width: 80%;
      height: 45px;
    }
  }
}
.jumpToLogin{
  text-align: right;
  margin-right: 40px;
}
</style>
