// 输入框聚焦
export default {
  update (el, bind) {
    if (bind.value) {
      el.focus()
    }
  }
}
