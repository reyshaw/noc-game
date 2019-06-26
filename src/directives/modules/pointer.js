// 鼠标小手形态
export default {
  bind (el) {
    el.addEventListener('mouseenter', function () {
      el.style.cursor = 'pointer'
    }, false)
  }
}
