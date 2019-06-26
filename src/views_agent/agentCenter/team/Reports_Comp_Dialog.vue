<template>
  <el-dialog :visible.sync="dialogFormVisible" class="team-dialog" width="400px">
    <h1>游戏类型选择
      <el-radio v-model="radio" size="mini" label="0">全部</el-radio>
      <el-radio v-model="radio" size="mini" label="1">反选</el-radio>
    </h1>
    <el-tree :data="data"
             :props="defaultProps"
             default-expand-all
             show-checkbox
             node-key="id"
             :default-checked-keys="setArr"
             ref="tree"
             highlight-current> <!--:default-expanded-keys="[2, 3]"-->
    </el-tree>
    <div class="dialog-footer">
      <el-button @click="handleGameType('cancel')" size="mini">取 消</el-button>
      <el-button type="primary" @click="handleGameType('confirm')" size="mini">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {getAllIds} from '@/assets/scripts/utils'
export default {
  name: 'Reports_Comp_Dialog',
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    this.$nextTick(() => {
      this.allArr = getAllIds(this.data, 'children')
    })
    return {
      radio: '0',
      setArr: [1], // 默认设置的
      allArr: [],
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleGameType (type) { // 取消/确定
      this.$emit(type, this.getCheckedKeys())
    },
    getCheckedKeys () {
      return this.$refs.tree.getCheckedKeys()
    },
    setCheckedKeys () {
      this.$refs.tree.setCheckedKeys(this.setArr)
    }
  },
  watch: {
    radio (val, oval) {
      if (Number(val) === 0) { // 全选
        this.setArr = this.allArr
      } else { // 反选
        const arr = this.getCheckedKeys()
        this.setArr = this.allArr.filter(item => !arr.includes(item))
      }
      this.setCheckedKeys()
    }
  }
}
</script>

<style scoped>

</style>
