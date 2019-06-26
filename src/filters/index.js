import Vue from 'vue'

Vue.filter('formatMoney', function (val) {
  return parseFloat(val).toFixed(2)
})
