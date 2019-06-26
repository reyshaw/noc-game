// 图标放大形态
export default {
  bind (el) {
    el.addEventListener('mouseenter', function () {
      el.style.transform = 'scale(1.1)'
      el.style.transformOrigin = '0 50% 50%'
    }, false)
    el.addEventListener('mouseleave', function () {
      el.style.transform = 'scale(1)'
    }, false)
  }
}
