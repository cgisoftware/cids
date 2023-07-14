import mitt from 'mitt'

const CLOSE_CONTENT = 'close_content'
const SAVE = 'save'
const CANCEL = 'cancel'
const SEND = 'send'
const EXPORT_ZOOM = 'export_zoom'

const emitter = mitt()

const publisher = (channel = undefined) => {
  return {
    closeContent: () => emitter.emit(`${channel}${CLOSE_CONTENT}`),
    save: () => emitter.emit(`${channel}${SAVE}`),
    cancel: () => emitter.emit(`${channel}${CANCEL}`),
    exportZoom: (data) => emitter.emit(`${channel}${EXPORT_ZOOM}`, data),
    send: (event, data) => emitter.emit(`${channel}${SEND}${event}`, data),
  }
}

const subscriber = (channel = undefined) => {
  return {
    closeContent: (func) => emitter.on(`${channel}${CLOSE_CONTENT}`, func),
    save: (func) => emitter.on(`${channel}${SAVE}`, func),
    cancel: (func) => emitter.on(`${channel}${CANCEL}`, func),
    listen: (event, func) => emitter.on(`${channel}${SEND}${event}`, func),
    exportZoom: (func) => emitter.on(`${channel}${EXPORT_ZOOM}`, func),
    destroy: (event, func) => {
      emitter.off(`${channel}${CLOSE_CONTENT}`)
      emitter.off(`${channel}${SAVE}`)
      emitter.off(`${channel}${CANCEL}`)
      emitter.off(`${channel}${SEND}${event}`, func)
    }
  }
}

window.publisher = publisher
window.subscriber = subscriber

export { publisher, subscriber }