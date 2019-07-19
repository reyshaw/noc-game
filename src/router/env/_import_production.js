module.exports = {
  _import: file => () => import('@/views/' + file + '.vue'),
  __import: file => () => import('@/views_agent/' + file + '.vue')
}
