<template>
  <div class="number-grow-warp">
    <span ref="numberGrow" :data-time="time" class="number-grow" :data-value="value">0</span>
  </div>
</template>
<script>
export default {
  name: 'count_to',
  props: {
    time: {
      type: Number,
      default: 20000000000
    },
    value: {
      type: Number,
      default: 367888995563.25
    },
    start: {
      type: Number,
      default: 366888995563.25
    }
  },
  methods: {
    numberGrow (ele) {
      let _this = this
      let step = (_this.value * 10) / (_this.time * 1000)
      let current = 0
      let start = this.start
      let t = setInterval(function () {
        start += step
        if (start > _this.value) {
          clearInterval(t)
          start = _this.value
          t = null
        }
        if (current === start) {
          return
        }
        current = start
        ele.innerHTML = _this.formatMoney(current.toString(), 2)
      }, 100)
    },
    formatMoney (s, n) {
      n = n > 0 && n <= 20 ? n : 2
      s = parseFloat((s + '').replace(/[^\d.-]/g, '')).toFixed(n) + ''
      let l = s.split('.')[0].split('').reverse()
      let r = s.split('.')[1]
      let t = ''
      for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
      }
      return t.split('').reverse().join('') + '.' + r
    }
  },
  mounted () {
    this.numberGrow(this.$refs.numberGrow)
  }
}
</script>
<style lang="scss" scoped>
  @import "~@/assets/styles/global";
  .number-grow-warp{
    transform: translateZ(0);
    width: 100%;
    text-align: center;
  }
  .number-grow {
    padding-left: 30px;
    font-family: "Microsoft YaHei";
    font-weight: 700;
    font-size: 18px;
    color: $--color-text-primary;
    margin:66px 0 20px;
    display: block;
    line-height:64px;
  }
</style>
