import Clipboard from 'clipboard'
import {Message} from 'element-ui'

const handleCopy = function (className) {
  let clip = new Clipboard(className)
  clip.on('success', e => {
    Message.success('复制成功')
    clip.destroy() // 释放内存
  })
  clip.on('error', e => { // 不支持复制
    Message.error('该浏览器不支持自动复制')
    clip.destroy() // 释放内存
  })
}
export default handleCopy
