export { default as viewExtend } from './extends/view'
export { default as Render } from './render'
export { default as Epage } from 'epage'

export const inputWidget = require('./widgets/input')
export const textareaWidget = require('./widgets/textarea')
export const inputNumberWidget = require('./widgets/inputNumber')
export const selectWidget = require('./widgets/select')
export const cascaderWidget = require('./widgets/cascader')
export const autoCompleteWidget = require('./widgets/autoComplete')
export const radioWidget = require('./widgets/radio')
export const checkboxWidget = require('./widgets/checkbox')
export const datePickerWidget = require('./widgets/datePicker')
export const timePickerWidget = require('./widgets/timePicker')
export const switchWidget = require('./widgets/switch')
export const rateWidget = require('./widgets/rate')
export const uploadWidget = require('./widgets/upload')
export const lineWidget = require('./widgets/line')
// export const subTableWidget = require('./widgets/subTable')
export const gridWidget = require('./widgets/grid')
export const buttonWidget = require('./widgets/button')

export default [{
  title: 'Base',
  key: 'base',
  widgets: [
    inputWidget,
    textareaWidget,
    inputNumberWidget,
    selectWidget,
    cascaderWidget,
    autoCompleteWidget,
    radioWidget,
    checkboxWidget,
    datePickerWidget,
    timePickerWidget,
    switchWidget,
    rateWidget,
    uploadWidget,
    lineWidget,
    // subTableWidget,
    gridWidget,
    buttonWidget
  ]
}]
