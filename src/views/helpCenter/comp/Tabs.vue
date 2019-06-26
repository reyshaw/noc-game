<template>
  <div>
    <el-tabs type="card" @tab-click="onTabClick" class="bgf" v-if="list.length">
      <el-tab-pane :label="tab.label" v-for="(tab, index) in list" :key="index">
        <ul class="inner-ul" v-if="('sub' in tab)">
          <li v-for="(li, idx) in tab.sub" :key="idx" @click="handleSubClick(li, idx)" :class="{active: subIndex === idx}">{{li.label}}</li>
        </ul>
      </el-tab-pane>
    </el-tabs>
    <div class="desc">
      {{currentText}}
    </div>
  </div>
</template>

<script>
import CONFIG from '../js/tab.data'
export default {
  name: 'Tabs',
  data () {
    return {
      subIndex: 0, // 二级导航激活的下标
      currentText: '', // 激活的游戏规则
      list: [], // Tab栏
      hasSub: false // 是不是又子项
    }
  },
  created () {
    let _path = this.$route.path.split('/')
    let last = _path[_path.length - 1]
    let _list = CONFIG[last.toUpperCase() + ''] // 匹配的是最后一根斜杠后的内容
    if (_list) {
      this.list = _list
      if ('sub' in _list[0]) {
        this.hasSub = true
        this.handleSubClick(this.list[0]['sub'][0], 0)
      } else {
        this.onTabClick({index: 0})
      }
    }
  },
  methods: {
    handleSubClick (item, index) {
      this.subIndex = index
      this.currentText = item
    },
    onTabClick (evt) {
      if (this.hasSub) {
        this.handleSubClick(this.list[evt.index]['sub'][0], 0)
      } else {
        this.currentText = this.list[evt.index].label
      }
    }
  }
}
</script>
<style scoped lang="scss">
  div {
    ul.inner-ul {
      width: 100%;
      box-sizing: border-box;
      margin: 0 15px;
      display: inline-block;
      border-bottom: 1px dashed #999;
      height: 30px;
      li {
        float: left;
        padding: 5px;
        font-size: 14px;
        margin: 0 10px;
        &:hover {
          cursor: pointer;
          color: red;
        }
        &.active {
          font-weight: bold;
          color: red;
        }
      }
    }
    .desc {
      box-sizing: border-box;
      padding: 15px;
    }
  }
</style>
