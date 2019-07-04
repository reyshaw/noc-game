<template>
  <div class="pwd-container">
    <el-tabs type="card" v-model="currentTab">
      <el-tab-pane label="登录密码" name="login">
        <transition name="custom-classes-transition"
                    mode="out-in"
                    enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOut">
          <div class="box" v-if="currentTab === 'login'">
            <el-form :model="form" size="small" ref="validateForm" :label-width="formLabelWidth" :rules="rules">
              <el-form-item prop="memberPassword" label="当前密码:">
                <el-input size="small" type="password" v-model.trim="form.memberPassword" placeholder="请输入登录密码"></el-input>
              </el-form-item>
              <el-form-item prop="newMemberPassowrd" label="新设密码:">
                <el-input size="small" type="password" placeholder="请填写新设密码" v-model.trim="form.newMemberPassowrd"></el-input>
              </el-form-item>
              <el-form-item prop="confirmNewMemberPassword" label="确认密码:">
                <el-input size="small" type="password" placeholder="请填写确认密码" v-model.trim="form.confirmNewMemberPassword"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </transition>
      </el-tab-pane>
      <el-tab-pane label="取款密码" name="withdraw">
        <transition name="custom-classes-transition"
                    mode="out-in"
                    enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOut">
          <div class="box" v-if="currentTab === 'withdraw'">
            <el-form :model="form" size="small" ref="validateForm" :label-width="formLabelWidth" :rules="rules">
              <el-form-item prop="withdrawalPassowrd" label="当前密码:" v-if="!claimPwdIsSet">
                <el-input size="small" type="password" v-model.trim="form.withdrawalPassowrd" placeholder="请输入取款密码"></el-input>
              </el-form-item>
              <el-form-item prop="newWithdrawalPassowrd" label="新设密码:">
                <el-input size="small" type="password" placeholder="请填写新设密码" v-model.trim="form.newWithdrawalPassowrd"></el-input>
              </el-form-item>
              <el-form-item prop="confirmWithdrawalPassword" label="确认密码:">
                <el-input size="small" type="password" placeholder="请填写确认密码" v-model.trim="form.confirmWithdrawalPassword"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </transition>
      </el-tab-pane>
      <el-tab-pane label="游戏客户端" v-if="false" name="game">
        游戏客户端
      </el-tab-pane>
    </el-tabs>
    <div class="btns">
      <el-button @click="submit">立即修改</el-button>
    </div>
  </div>
</template>

<script>
import {PATH_CHANGEPWD_LOGIN, PATH_CHANGEPWD_CLAIM} from '@/service/member/member_center.url'
import {CHANGE_PWD} from '@/service/agent/user.url'
import {mapGetters} from 'vuex'
export default {
  name: 'change_password',
  data () {
    return {
      formLabelWidth: '100px',
      currentTab: 'login', // 默认是修改登录密码
      claimPwdIsSet: false, // 是不是已经设置了取款密码，如果设置了，则需要输入原来的，可能需要接口调
      form: {
        memberPassword: '', // 原密码
        newMemberPassowrd: '', // 新密码
        confirmNewMemberPassword: '' // 确认密码
      },
      rules: {
        memberPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        newMemberPassowrd: [
          { required: true, message: '请输入新设密码', trigger: 'blur' }
        ],
        confirmNewMemberPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' }
        ],
        withdrawalPassowrd: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        newWithdrawalPassowrd: [
          { required: true, message: '请输入新设密码', trigger: 'blur' }
        ],
        confirmWithdrawalPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: mapGetters(['ROLE']),
  methods: {
    submit () { // 立即修改
      this.$refs['validateForm'].validate((valid) => {
        if (valid) {
          let _form = {}
          let _loginPath = PATH_CHANGEPWD_LOGIN
          if (this.ROLE === 'member') {
            _form = this.form
          } else {
            _loginPath = CHANGE_PWD
            _form = {
              agentPassword: this.form.memberPassword,
              newAgentPassword: this.form.newMemberPassowrd,
              agentConfirmPassword: this.form.confirmNewMemberPassword
            }
          }
          this.post(this.currentTab === 'login' ? _loginPath : PATH_CHANGEPWD_CLAIM, _form).then(res => {
            if (res.status) {
              this.$message.success('修改成功, 请重新登录')
              this.$store.dispatch('SET_LOGIN_INFO', {token: null, baseInfo: {}, startPolling: false})
              // this.$store.commit('SET_TOKEN', null)
              // this.$store.commit('SET_BASE_INFO', {})
              setTimeout(() => { this.$router.push(`/${this.ROLE}/index`) }, 500)
            }
          }, err => {
            this.$message.error(err)
          })
        } else {
          this.$message.error('请完善信息')
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.pwd-container {
  /*width: 90%;
  margin: 20px 80px;*/
  box-sizing: border-box;
  .box {
    width: 90%;
    margin: 0 auto;
    margin-top: 20px;
    background: #fff;
    box-sizing: border-box;
    padding: 20px 0;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    .el-form {
      width: 360px;
    }
  }
  .btns {
    background: #fff;
    width: 90%;
    margin-left: 5%;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    .el-button {
      margin-left: 30px;
      margin-bottom: 30px;
    }
  }
}
</style>
