module.exports = {
  _import: file => () => import('@/views/' + file + '.vue'),
  __import: file => () => import('@/views_agent/' + file + '.vue')
}
//
// module.exports = {
//   _import: function (file) {
//     return function (file) {
//       return import('@/views/' + file + '.vue')
//     }
//   },
//   __import: function (file) {
//     return function (file) {
//       return import('@/views_agent/' + file + '.vue')
//     }
//   }
// }
