<template>
  <div>
    <el-tabs type="card" @tab-click="onTabClick" class="bgf">
      <el-tab-pane :label="tab.label" v-for="(tab, index) in list" :key="index">
        <ul class="inner-ul" v-if="tab.sub">
          <li v-for="(li, idx) in tab.sub" :key="idx" @click="handleSubClick(li, idx)" :class="{active: activeIndex === idx}">{{li.label}}</li>
        </ul>
      </el-tab-pane>
    </el-tabs>
    <div class="desc">
      {{currentText}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rules',
  data () {
    return {
      activeIndex: 0, // 二级导航激活的下标
      currentText: '', // 激活的游戏规则
      list: [
        { value: 'zr',
          label: '真人视讯',
          comp: '',
          sub: [
            {value: 'OG', label: 'OG'},
            {value: 'BG', label: 'BG'},
            {value: 'BBIN', label: 'BBIN'},
            {value: 'AG', label: 'AG'}
          ]
        },
        { value: 'dz',
          label: '电子游艺',
          comp: '',
          sub: [
            {value: 'MG', label: 'MG'},
            {value: 'JDB', label: 'JDB'},
            {value: 'FG', label: 'FG'},
            {value: 'PT', label: 'PT'}
          ]
        },
        { value: 'ty',
          label: '体育游戏',
          comp: '',
          sub: [
            {value: 'OG', label: 'OG'},
            {value: 'SB', label: '沙巴'},
            {value: 'HG', label: '皇冠'}
          ]
        },
        { value: 'cp',
          label: '彩票游戏',
          comp: '',
          sub: [
            {value: 'OG', label: 'OG'},
            {value: 'VR', label: 'VR'},
            {value: 'BBIN', label: 'BBIN'}
          ]
        },
        { value: 'by',
          label: '捕鱼游戏',
          comp: '',
          sub: [
            {value: 'OG', label: 'OG'},
            {value: 'BG', label: 'BG'},
            {value: 'AG', label: 'AG'},
            {value: 'MG', label: 'MG'}
          ]
        },
        { value: 'qp',
          label: '棋牌游戏',
          comp: '',
          sub: [
            {value: 'KY', label: 'KY'},
            {value: 'VG', label: 'VG'},
            {value: 'GF', label: 'GF'},
            {value: 'NW', label: 'NW'},
            {value: 'LG', label: 'LG'}
          ]
        },
        { value: 'jj',
          label: '电子竞技',
          comp: '',
          sub: [
            {value: 'FY', label: 'FY'},
            {value: 'HC', label: '皇朝'}
          ]
        }
      ]
    }
  },
  created () {
    this.handleSubClick(this.list[0]['sub'][0], 0)
  },
  methods: {
    handleSubClick (item, index) {
      this.activeIndex = index
      this.currentText = item
    },
    onTabClick (evt) {
      this.handleSubClick(this.list[evt.index]['sub'][0], 0)
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
