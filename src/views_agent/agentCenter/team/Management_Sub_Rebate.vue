<template>
  <div class="formbox">
    <el-form :model="form" size="small" :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item label="方案名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" autocomplete="off" style="width: 160px;" :disabled="handleType === 'edit'"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-if="editType === 'rebate'">
        <el-col :span="12">
          <el-form-item label="有效会员定义" :label-width="formLabelWidth" prop="region">
            <el-input v-model="form.region" autocomplete="off" style="width: 280px;">
              <template slot="prepend">累计有效投注额度
                <el-select v-model="form.condition" placeholder="" size="small" style="width: 55px; margin-left: -15px;">
                  <el-option label="≥" value="lge"></el-option>
                  <el-option label=">" value="lg"></el-option>
                  <el-option label="=" value="eq"></el-option>
                </el-select></template>
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-input v-model="form.region" autocomplete="off" style="width: 280px;" size="small">
            <template slot="prepend">累计有效投注次数</template>
            <template slot="append">次</template>
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-if="editType === 'rebate'">
        <el-col :span="12">
          <el-form-item label="" :label-width="formLabelWidth" prop="region">
            <el-input v-model="form.region" autocomplete="off" style="width: 280px;">
              <template slot="prepend">累计存款额度
                <el-select v-model="form.condition" placeholder="" size="small" style="width: 55px; margin-left: -15px;">
                  <el-option label="≥" value="lge"></el-option>
                  <el-option label=">" value="lg"></el-option>
                  <el-option label="=" value="eq"></el-option>
                </el-select>
              </template>
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-input v-model="form.region" autocomplete="off" style="width: 280px;" size="small">
            <template slot="prepend">累计存款次数</template>
            <template slot="append">次</template>
          </el-input>
        </el-col>
      </el-row>

      <el-form-item label="返水方式" :label-width="formLabelWidth" v-if="editType === 'backwater'">
        <el-radio v-model="radio" label="1">次日返水</el-radio>
        <el-radio v-model="radio" label="2">即时返水</el-radio>
      </el-form-item>
      <section v-for="it in itemsize1" :key="it">
        <el-row :gutter="10">
          <el-col :span="10">
            <el-form-item label="返水类型" :label-width="formLabelWidth" v-if="editType === 'backwater'">
              <el-cascader
                :options="options"
                style="width: 100%"
                size="small"
                v-model="selectedOptions"
                @change="handleChange">
              </el-cascader>
            </el-form-item>
            <el-form-item label="返佣类型" :label-width="formLabelWidth" size="small"  v-if="editType === 'rebate'">
              <el-select v-model="form.condition1" placeholder="" size="small">
                <el-option label="盈利金额" value="benifits"></el-option>
                <el-option label="有效投注" value="bets"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-input placeholder="请输入内容" v-model="input3" size="small">
              <template slot="prepend">
                <div>
                  <span  v-if="editType === 'backwater'">有效投注</span>
                  <el-select v-model="form.condition" placeholder="" size="small" style="width: 55px; margin-left: -15px;">
                    <el-option label="≥" value="lge"></el-option>
                    <el-option label=">" value="lg"></el-option>
                    <el-option label="=" value="eq"></el-option>
                  </el-select>
                </div>
              </template>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button size="small" @click="itemsize1++">+</el-button>
            <el-button size="small" @click="itemsize1--">-</el-button>
          </el-col>
        </el-row>

        <el-form-item label="返水上限" :label-width="formLabelWidth"  v-if="editType === 'backwater'">
          <el-input v-model="form.region" autocomplete="off" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="打码倍数" :label-width="formLabelWidth"  v-if="editType === 'backwater'">
          <el-input v-model="form.region" autocomplete="off" style="width: 200px;">
            <template slot="append">倍</template>
          </el-input>
        </el-form-item>
        <el-row v-for="item in itemsize" :key="item" :gutter="20" v-if="editType === 'backwater'">
          <el-col :span="12">
            <el-form-item label="返水条件" :label-width="formLabelWidth" size="small" v-if="editType === 'backwater'">
              <el-cascader
                :options="options"
                style="width: 100%"
                size="small"
                v-model="selectedOptions"
                @change="handleChange">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="6"  v-if="editType === 'backwater'">
            <el-input placeholder="请输入内容" size="small">
              <template slot="append">%</template>
            </el-input>
          </el-col>
          <el-col :span="6"  v-if="editType === 'backwater'"> <el-button size="small" @click="itemsize++">+</el-button>  <el-button size="small" @click="itemsize--">-</el-button></el-col>
        </el-row>

        <el-row :gutter="20" v-if="editType === 'rebate'">
          <el-col :span="12">
            <el-form-item label="返佣条件" :label-width="formLabelWidth" size="small">
              <el-input v-model="form.region" autocomplete="off" style="width: 280px;" size="small">
                <template slot="prepend">有效会员</template>
                <template slot="append">人</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-for="item in itemsize" :key="item" :gutter="20"  v-if="editType === 'rebate'">
          <el-col :span="12">
            <el-form-item label="" :label-width="formLabelWidth" size="small">
              <el-cascader
                :options="options"
                style="width: 100%"
                size="small"
                v-model="selectedOptions"
                @change="handleChange">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-input placeholder="请输入内容" size="small">
              <template slot="append">%</template>
            </el-input>
          </el-col>
          <el-col :span="6"> <el-button size="small" @click="itemsize++">+</el-button>  <el-button size="small" @click="itemsize--">-</el-button></el-col>
        </el-row>
        <hr>
      </section>
      <el-form-item label="费用扣除" :label-width="formLabelWidth" v-if="editType === 'rebate'">
        <el-checkbox v-model="checked">存款赠送</el-checkbox>
        <el-checkbox v-model="checked">返水</el-checkbox>
      </el-form-item>
      <el-row :gutter="20" v-if="editType === 'rebate'">
        <el-col :span="12">
          <el-form-item label="" :label-width="formLabelWidth" prop="region">
            <el-input v-model="form.region" autocomplete="off" style="width: 280px;" size="small">
              <template slot="prepend">会员单次存款手续费</template>
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-input v-model="form.region" autocomplete="off" style="width: 280px;" size="small">
            <template slot="prepend">会员单词存款手续费上限</template>
            <template slot="append">元</template>
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-if="editType === 'rebate'">
        <el-col :span="12">
          <el-form-item label="" :label-width="formLabelWidth" prop="region">
            <el-input v-model="form.region" autocomplete="off" style="width: 280px;" size="small">
              <template slot="prepend">会员单次取款手续费</template>
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-input v-model="form.region" autocomplete="off" style="width: 280px;" size="small">
            <template slot="prepend">会员单次取款手续费上限</template>
            <template slot="append">元</template>
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-if="editType === 'rebate'">
        <el-col :span="12">
          <el-form-item label="" :label-width="formLabelWidth" prop="region">
            <el-button style="width: 100%;" @click="choose" type="primary">选择需要扣除费用的优惠活动</el-button>
          </el-form-item>
        </el-col>
        <!--<el-col :span="12">
          <el-input v-model="form.region" autocomplete="off" style="width: 280px;" size="small">
            <template slot="prepend">会员单次取款手续费上限</template>
            <template slot="append">元</template>
          </el-input>
        </el-col>-->
      </el-row>

      <el-form-item label="费用结算" :label-width="formLabelWidth" prop="region" v-if="editType === 'rebate'">
        <el-switch
          v-model="value2"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
        <el-input :disabled="true" size="small" style="width: 180px;margin-left: 15px;" v-model="form.name1"></el-input>
        <el-input v-model="form.region" autocomplete="off" style="width: 280px; margin-left: 0px;" size="small">
          <template slot="prepend">
            <el-select v-model="form.condition2" placeholder="请选择" size="small" style="width: 140px; margin-left: -15px;">
              <el-option label="盈利金额≥3000" value="lge"></el-option>
              <el-option label="盈利金额≥50000" value="lg"></el-option>
              <el-option label="有效投注≥1500" value="eq"></el-option>
            </el-select>
          </template>
          <template slot="append">%</template>
        </el-input>
      </el-form-item>
      <el-form-item label="启用状态" :label-width="formLabelWidth">
        <el-switch
          v-model="value2"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Management_Sub_Rebate',
  data () {
    return {
      options: [{ value: 'zhenren',
        label: '真人',
        children: [{
          value: 'all',
          label: '全部'
        },
        {
          value: 'OG',
          label: 'OG',
          children: [{
            value: 'all',
            label: '全部'
          }, {
            value: 'baijiale',
            label: '百家乐',
            children: [
              {
                value: 'Test.vue',
                label: '测试测试测试'
              }
            ]
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'dianzi',
        label: '电子',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'tiyu',
        label: '体育',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      selectedOptions: [],
      selectedOptions2: [],
      formLabelWidth: '110px',
      radio: '1',
      items: 2,
      itemsize: 1,
      checked: false,
      itemsize1: 1,
      input3: 10000000,
      value2: '',
      form: {
        name: '默认方案',
        name1: '第一个周期固定返佣比例',
        region: '',
        region1: '选择需要扣除费用的优惠活动',
        condition: '≥',
        condition1: 'benifits',
        condition2: '盈利金额≥3000',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    addType: {
      type: String,
      default: 'backwater'
    },
    editType: {
      type: String,
      default: 'backwater'
    },
    handleType: {
      type: String,
      default: 'new'
    }
  },
  created () {
    console.log(111)
  },
  methods: {
    addItems () {
      this.items++
    },
    reduceItems () {
      if (this.items > 1) {
        this.items--
      }
    },
    handleChange (value) {
      console.log(value)
    },
    choose () {
      this.$emit('showInner')
    }
  }
}
</script>
<style lang="scss">

</style>

<style scoped lang="scss">
  .formbox {
    .el-select {
      font-size: 12px;
      padding-left: 0;
      .el-input__inner {
        padding-right: 10px;
      }
    }
    hr {
      border: none;
      background: #dcdfe6;
      height: 1px;
      margin-bottom: 15px;
    }
  }
</style>
