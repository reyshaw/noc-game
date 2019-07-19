<template>
  <div class="menu">
    <div class="time">
      {{ $t(`top.current_time`) }}({{$t(`top.${this.location}`)}}): {{this.timer}}
    </div>
    <ul>
      <li v-if="loginRole === 'member'"><a href="javascript: void(0);">{{ $t(`top.client_download`) }}</a><span>|</span></li>
      <li v-if="loginRole === 'member'"><a href="javascript: void(0);">{{ $t(`top.mobile_version`) }}</a><span>|</span></li>
      <li v-if="loginRole === 'member'"><a href="javascript: void(0);" @click="addToCollection">{{ $t(`top.for_collection`) }}</a><span>|</span></li>
      <li v-if="loginRole === 'member'"><a href="javascript: void(0);" @click="showDialog('line')">{{ $t(`top.line_detection`) }}</a><span>|</span></li>
      <li v-if="loginRole === 'member'"><a href="javascript: void(0);" @click="showDialog('licence')">{{ $t(`top.licence`) }}</a><span>|</span></li>
      <li><a href="javascript: void(0);">{{ $t(`top.customer_service`) }}</a><span>|</span></li>
      <li>
        <span><a>{{ $t(`top.simplified_chinese`) }}<img class="langFlag" src="../../../assets/imgs/u39.png" alt="国旗"></a></span>
        <ul style="z-index: 999">
          <li v-for="(item, index) in langs" :key="index"  @click="changeLanguage($event,item.key)">
            <span><a>{{item.name}}<img class="langFlag" :src="require(`../../../assets/imgs/${item.flag}.png`)" alt="国旗"></a></span>
          </li>
        </ul>
      </li>
    </ul>
    <el-dialog :visible.sync="dialogVisible" :class="{eld850:dialogType === 'licence'}" :modal-append-to-body='false'>
      <line-detection v-if="dialogType === 'line'" @close = "dialogVisible = false"></line-detection>
      <show-licence v-if="dialogType === 'licence'" @close = "dialogVisible = false"></show-licence>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from '@/assets/scripts/utils'
import { setLocalStorage } from '@/assets/scripts/storage'
import LineDetection from './LineDetection'
import ShowLicence from './ShowLicence'
import {mapState} from 'vuex'
// import store from '@/store/share.store'
export default {
  name: 'top_tooltips',
  components: {
    LineDetection,
    ShowLicence
  },
  data () {
    let langs = [
      { key: 'cn', name: '简体中文', flag: 'u39' },
      { key: 'tw', name: '繁體中文', flag: 'u39' },
      { key: 'en', name: 'English', flag: 'u39' }
    ]
    return {
      langs,
      location: 'beijing',
      timer: '',
      dialogVisible: false,
      dialogType: 'line'
    }
  },
  props: {
  },
  computed: mapState(['loginRole']),
  created () {
  },
  mounted () {
    const _this = this
    this.timer = setInterval(function () { // 定时器实现时间跳动
      const timeArr = formatDate(new Date()).split('-')
      _this.timer = timeArr[0] + '/' + timeArr[1] + '/' + timeArr[2]
    }, 1000)
  },
  methods: {
    changeLanguage (ref, key) { // 语言变换
      // ref.target.parentElement.parentElement.parentElement.style.display = 'none'
      this.selectedLang = key
      this.$i18n.locale = this.selectedLang
      setLocalStorage('lang', this.selectedLang)
      // location.reload()
    },
    addToCollection () { // 加入收藏
      try {
        window.sidebar.addPanel(location.href, document.title, '')
      } catch (e) {
        try {
          window.external.AddFavorite(location.href, document.title)
        } catch (e) {
          this.$alert('抱歉您所使用的浏览器暂时无法完成操作,\n请使用Ctrl+D进行添加', '收藏失败', {
            confirmButtonText: '确定',
            type: 'warning',
            center: true,
            callback: () => {
              void (0)
            }
          })
        }
      }
    },
    showDialog (type) {
      this.dialogType = type
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped lang="scss">
.menu{
  width: 1000px;
  height: 50px;
  float: right;
  display: flex;
  flex-direction: row-reverse;
  .time{
    width: 250px;
    text-align: center;
  }
  &>ul{
    list-style-type: none;
    position: relative;
    margin-right: 17px;
    &>li{
      cursor: pointer;
      a{
        color: #ccc;
      }
      a:hover{
        color: #fff;
      }
      float: left;
      span{
        margin-left: 7px;
        margin-right: 7px;
      }
    }
    & li:last-child{
      text-align: left;
      span{
        margin-left: 0;
      }
      &>ul{
        visibility: hidden;
        opacity: 0;
        text-align: left;
        position: absolute;
        top: 40px;
        right: 0px;
        list-style-type: none;
        &>li:last-child{
          span{
            img{
              margin-left: 10px;
            }
          }
        }
        &>li{
          color: #fff;
          line-height: 28px;
          background-color: #630638;
          padding-right: 6px;
          padding-left: 6px;
          span{
            margin-right: 0px;
          }
          &:hover{
            background-color: #666;
          }
        }
      }
      &:hover ul{
        transition: .5s ease-in-out;
        visibility: visible;
        opacity: 0.8;
      }
    }
  }
}
.langFlag{
  vertical-align: middle;
  padding-left: 3px;
  width: 18px;
  height: 12px;
}
</style>
