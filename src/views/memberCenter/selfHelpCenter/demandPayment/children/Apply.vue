<template>
  <div class="apply-wrapper">
    <div class="container">
      <step :stepNumber="1" :titleContent="'信息填写'">
        <div class="applyForm">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="存款方式">
              <el-select v-model="form.depositway" placeholder="请选择存款方式" size="mini">
              <el-option
                v-for="(item, index) in depositway"
                :key="index"
                :label="item.wayName"
                :value="item.wayNo">
              </el-option>
            </el-select>
              <el-select v-model="form.payway" placeholder="请选择支付方式" size="mini">
                <el-option
                  v-for="(item, index) in payway"
                  :key="index"
                  :label="item.wayName"
                  :value="item.wayNo">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="存款时间">
              <el-date-picker
                size="mini"
                v-model="form.depositTime"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"></el-date-picker>
            </el-form-item>
            <el-form-item label="订单号/昵称">
              <el-input v-model="form.transactionCode" placeholder="请输入订单号/昵称" size="mini" :style="inputStyle"></el-input>
            </el-form-item>
            <el-form-item label="存款姓名">
              <el-input v-model="form.accountName" placeholder="请输入存款姓名" size="mini" :style="inputStyle"></el-input>
            </el-form-item>
            <el-form-item label="存款金额">
              <el-input v-model="form.depositAmount" placeholder="请输入存款金额" size="mini" :style="inputStyle"></el-input>
            </el-form-item>
            <el-form-item label="上传截图">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple
                :limit="1"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过600kb</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="备注信息">
              <el-input type="textarea" v-model="form.remark" placeholder="请输入备注信息" size="mini" :style="inputStyle"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" size="small" @click="handleWithdraw">立即催款</el-button>
            </el-form-item>
          </el-form>
        </div>
      </step>
    </div>
  </div>
</template>

<script>
import Step from '../../../financeCenter/children/Step'
import pickerMix from '@/mixins/picker.mix'
// import { PATH_LIST_LUCKY } from '@/service/member/member_center.url'

export default {
  name: 'apply',
  mixins: [pickerMix],
  components: {
    Step
  },
  data () {
    return {
      depositway: [
        {wayName: '在线支付', wayNo: '1'},
        {wayName: '转账支付', wayNo: '2'},
        {wayName: '点卡支付', wayNo: '3'},
        {wayName: '扫码支付', wayNo: '4'},
        {wayName: '网银支付', wayNo: '5'}
      ],
      payway: [
        {wayName: '在线支付', wayNo: '1'},
        {wayName: '转账支付', wayNo: '2'},
        {wayName: '点卡支付', wayNo: '3'},
        {wayName: '扫码支付', wayNo: '4'},
        {wayName: '网银支付', wayNo: '5'}
      ],
      fileList: [],
      inputStyle: 'width: 350px;',
      form: {
        depositway: '',
        depositTime: '',
        transactionCode: '',
        accountName: '',
        depositAmount: '',
        remark: ''
      }
    }
  },
  created () {
  },
  methods: {
    handleWithdraw () {
      console.log(1)
    }
  }
}
</script>

<style scoped lang="scss">
  .container{
    margin: 0 auto;
    width: 1350px;
    height: auto;
    background-color: white;
    border-radius: 5px;
    padding: 15px;
  }
</style>
