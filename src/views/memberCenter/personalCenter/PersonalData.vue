<template>
  <div class="formbox">
    <el-form :model="form" size="small" ref="validateForm" :label-width="formLabelWidth" :rules="rules"> <!--label-position="right"-->
      <el-form-item prop="account" label="会员账号:">
        <el-input size="small" v-model.trim="form.memberAccount" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item prop="memberName" label="真实姓名:">
        <el-input size="small" placeholder="请填写您的姓名" v-model.trim="form.memberName" :disabled="disables.realName"></el-input>
        <el-tag style="margin-left: 10px;" class="el-icon-warning" type="warning">需与提款卡姓名一致，设定后不得修改</el-tag>
      </el-form-item>
      <el-form-item prop="memberDateBirth" label="出生日期:">
        <el-date-picker
          v-model="form.memberDateBirth"
          :disabled="disables.date"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <el-tag style="margin-left: 10px;" class="el-icon-warning" type="warning">如需修改请联系线上客服</el-tag>
      </el-form-item>
      <el-form-item prop="sex" label="性别:">
        <el-select size="small" v-model="form.sex" placeholder="全部">
          <el-option
            v-for="(gender, index) in CONFIG.GENDER"
            :key="index"
            :label="gender.label"
            :value="gender.value">
          </el-option>
        </el-select>
        <!--<el-tag style="margin-left: 10px;" class="el-icon-warning" type="info">选择所属部门后默认继承部门权限，可在成员列表中单独设置权限</el-tag>-->
      </el-form-item>
      <el-form-item prop="memberWebchart" label="微信:">
        <el-input size="small" placeholder="请输入您的微信号" v-model.trim="form.memberWebchart"></el-input>
      </el-form-item>
      <el-form-item prop="memberQq" label="QQ:">
        <el-input size="small" placeholder="请输入您的QQ" v-model.trim="form.memberQq"></el-input>
      </el-form-item>
      <el-form-item prop="memberMobile" label="手机号码:">
        <el-input size="small" placeholder="请填写您的手机号" v-model.trim.number="form.memberMobile" :disabled="disables.mobile"></el-input>
        <el-tag style="margin-left: 10px;" class="el-icon-warning" type="warning">手机号码绑定后将无法修改</el-tag>
      </el-form-item>
      <el-form-item prop="mobileCode" label="#" v-if="!disables.mobile">
        <el-input size="small" placeholder="输入手机验证码" v-model.trim.number="form.mobileCode"></el-input>
        <el-button size="mini">发送验证码</el-button>
      </el-form-item>
      <el-form-item prop="memberEmail" label="电子邮件:">
        <el-input size="small" placeholder="请填写您的电子邮件" v-model.trim="form.memberEmail" :disabled="disables.email"></el-input>
        <el-tag style="margin-left: 10px;" class="el-icon-warning" type="warning">电子邮箱须作为取回密码的重要凭证，请务必正确填写，绑定后将无法修改</el-tag>
      </el-form-item>
      <el-form-item prop="emailCode" label="#"  v-if="!disables.email">
        <el-input size="small" placeholder="请输入邮件验证码" v-model.trim.number="form.emailCode"></el-input>
        <el-button size="mini">发送邮件</el-button>
      </el-form-item>
      <el-form-item prop="cityDistrict" label="选择地区:">
        <el-cascader
          v-model="form.cityDistrict"
          :options="options"
          @change="handleChange"></el-cascader>
      </el-form-item>
      <el-form-item prop="address" label="详细地址:">
        <el-input type="textarea" size="small" v-model.trim="form.address" style="width: 300px" :rows="4"></el-input>
        <el-tag style="margin-left: 10px;" class="el-icon-warning" type="warning">实物奖励的收货地址</el-tag>
      </el-form-item>
    </el-form>
    <el-button @click="reset">重置信息</el-button>
    <el-button @click="submit">立即修改</el-button>
  </div>
</template>

<script>
import { PATH_CHANGE_PROFILE } from '@/service/member/member_center.url'
import {mapGetters} from 'vuex'
// import types from '@/store/modules/share.types'
export default {
  name: 'personal_data',
  data () {
    let _memberInfo = this.$store.state.baseInfo
    let memberAccount = _memberInfo.memberAccount
    let memberDateBirth = _memberInfo.memberDateBirth || ''
    let sex = _memberInfo.sex
    let memberWebchart = _memberInfo.memberWebchart || ''
    let memberQq = _memberInfo.memberQq || ''
    let memberEmail = _memberInfo.memberEmail || ''
    let memberMobile = _memberInfo.memberMobile || ''
    let address = _memberInfo.address || ''
    let memberName = _memberInfo.memberRealName || ''
    let cityDistrict = _memberInfo.provinceId ? ([String(_memberInfo.provinceId || ''), String(_memberInfo.cityId || '')] || []) : []
    return {
      formLabelWidth: '140px',
      CONFIG: {
        GENDER: [
          {value: 0, label: '男'},
          {value: 1, label: '女'},
          {value: 2, label: '保密'}
        ]
      },
      options: [{ // 需要获取城市的接口
        value: '23',
        label: '广东省',
        children: [{
          value: '1',
          label: '广州市'}, {
          value: '2',
          label: '深圳市'
        }]
      }],
      form: {
        memberAccount, // 会员账号
        memberDateBirth, // 生日
        sex, // 性别, 默认保密
        memberWebchart, // 微信账号
        memberQq, // qq
        memberEmail, // email
        memberMobile, // 电话
        address, // 收货地址

        memberName, // 真实姓名,未定义 _memberInfo.memberRealName
        mobileCode: '', // 手机验证码, 未被定义
        emailCode: '', // 邮箱验证码, 未被定义
        cityDistrict // 那个市哪个区，是个数组[省id,市id,区id],未定义
      },
      disables: { // 是不是允许修改
        realName: false,
        date: false,
        mobile: false,
        email: false
      },
      rules: {
        memberName: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        memberDateBirth: [
          { required: true, message: '请选择出生日期', trigger: 'blur' }
        ],
        sex: [
          // { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        memberWebchart: [
          // { required: true, message: '请输入原密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        memberQq: [
          // { required: true, message: '请输入新设密码', trigger: 'blur' }
        ],
        memberEmail: [
          { required: true, type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
          // { type: 'email', message: '请输入正确的邮箱地址', trigger: 'change' }
        ],
        emailCode: [
          { required: true, message: '请输入邮箱验证码', trigger: 'blur' }
        ],
        memberMobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],
        mobileCode: [
          { required: true, message: '请输入手机验证码', trigger: 'blur' }
        ],
        cityDistrict: [
          { required: true, message: '请选择省市区', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    if (this.form.memberName) {
      this.disables.realName = true
    }
    if (this.form.memberDateBirth) {
      this.disables.date = true
    }
    if (this.form.memberMobile) {
      this.disables.mobile = true
    }
    if (this.form.memberEmail) {
      this.disables.email = true
    }
    // 这里应该有个接口获取当前已经有的信息
  },
  computed: mapGetters(['BASE_INFO']),
  methods: {
    reset () {
      this.$refs['validateForm'].resetFields()
    },
    submit () { // 提交
      this.$refs['validateForm'].validate((valid) => {
        if (valid) {
          // console.log(`valid`)
          let _memberInfo = Object.assign({}, this.memberInfo)
          if (this.form.cityDistrict) {
            this.form.provinceId = this.form.cityDistrict[0]
            this.form.cityId = this.form.cityDistrict[1]
          }
          this.post(PATH_CHANGE_PROFILE, this.form).then(res => {
            _memberInfo.memberDateBirth = this.form.memberDateBirth
            _memberInfo.sex = this.form.sex
            _memberInfo.memberRealName = this.form.memberName
            _memberInfo.memberWebchart = this.form.memberWebchart
            _memberInfo.memberQq = this.form.memberQq
            _memberInfo.memberMobile = this.form.memberMobile
            _memberInfo.memberEmail = this.form.memberEmail
            _memberInfo.provinceId = this.form.cityDistrict[0]
            _memberInfo.cityId = this.form.cityDistrict[1]
            _memberInfo.address = this.form.address
            this.$store.commit('SET_BASE_INFO', _memberInfo)
            this.$message.success('修改成功')
          }, err => {
            this.$message.error(err)
          })
        } else {
          this.$message.error('验证未通过')
          return false
        }
      })
    },
    handleChange (value) {
      // console.log(value)
    }
  }
}
</script>
<style scoped lang="scss">
  .formbox {
    background: #fff;
    width: 90%;
    margin: 20px 80px;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 20px;
    .el-select {
      width: 300px!important;
      font-size: 12px;
      padding-left: 0;
    }
    .el-input,.el-cascader {
      width: 300px;
    }
    hr {
      border: none;
      background: #dcdfe6;
      height: 1px;
      margin-bottom: 15px;
    }
  }
</style>
