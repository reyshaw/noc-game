<template>
  <div class="noc-pagination">
    <slot></slot>
    <el-pagination
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizeArr"
      :page-size="pageSizeArr[0]"
      size="mini"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>

</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      currentPage: 1,
      pageSizeArr: [50, 100, 500, 1000, 5000]
    }
  },
  props: {
    total: {
      type: Number,
      default: 0
    }
  },
  methods: {
    onSizeChange (val) { // 单页长度变化
      this.currentPage = 1
      this.$emit('page-size-change', val)
    },
    onCurrentChange (val) { // 当前页改变
      this.currentPage = val
      this.$emit('page-num-change', val)
    }
  }
}
</script>

<style scoped lang="scss">
.noc-pagination {
  background: #fff;
  width: 100%;
  height: 50px;
  /*display: inline-block;*/
  font-size: 14px;
  color: #767676;
  box-sizing: border-box;
  /*position: relative;*/
  padding-left: 30px;
  border-top: 1px solid #cbd1e3;
  /*top: 13px;*/
  ul {
    float: left;
    line-height: 50px;
    li {
      float: left;
      margin-right: 10px;
      max-width: 100px;
    }
  }
  .el-pagination {
    margin-top: 10px;
    margin-right: 15px;
    text-align: right;
    box-sizing: border-box;
  }
}
</style>
