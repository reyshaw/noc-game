module.exports = {
  _import: file => require('@/views/' + file + '.vue').default,
  __import: file => require('@/views_agent/' + file + '.vue').default
}
