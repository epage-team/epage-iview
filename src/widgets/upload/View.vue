<template lang="pug">
.ep-widget.ep-upload-widget
  template(v-if='mode === "display"')
    .ep-upload-files(v-for='(file, index) in model[schema.key]' :key='"_"+index')
      a.ep-file-name(
        @click='getDownload(file.url, file.name)'
      ) {{file.name}}

  template(v-else)
    Upload(
      v-if='schema.key'
      :id='schema.key'
      :accept='schema.option.accept'
      :format='schema.option.format | string2Array'
      :action='schema.option.action'
      :multiple='schema.option.multiple'
      :with-credentials='schema.option.withCredentials'
      :show-upload-list='false'
      :max-size='schema.option.maxSize'
      :headers='headers'
      :data='schema.option.data'
      :type='schema.option.type'
      :name='schema.name'
      :before-upload='onBeforeUpload'
      :on-success='handleSuccessUpload'
      :on-error='handleUploadError'
      :on-format-error='handleUploadFormatError'
      :on-exceeded-size='handleSizeError'
    )
      Button(type='ghost' icon='ios-cloud-upload-outline') {{schema.placeholder}}
    template(v-if="schema.option.showUploadList")
      .ep-upload-files(v-for='(file, index) in model[schema.key]' :key='"_"+index')
        a.ep-file-name(
          @click='getDownload(file.url, file.name)'
        ) {{file.name}}
        Icon.ep-file-remove(
          type='ios-trash-outline'
          @click.native.stop='handleRemoveFile(index)'
        )
</template>
<script>
import viewExtend from '../../extends/view'
import Epage from 'epage'
const { isNotEmptyString } = Epage.helper

export default {
  filters: {
    string2Array (val) {
      if (typeof val === 'string') {
        return val.split(',')
      } else {
        return val
      }
    }
  },
  extends: viewExtend,
  computed: {
    headers () {
      const result = {}
      const { headers } = this.schema.option
      if (Array.isArray(headers)) {
        headers.forEach(item => {
          if (
            isNotEmptyString(item.key) &&
            isNotEmptyString(item.value)) {
            result[item.key.trim()] = item.value.trim()
          }
        })
      }
      return result
    }
  },
  methods: {
    onBeforeUpload (file) {
      const fileLen = this.model[this.schema.key].length
      const multiple = this.schema.option.multiple

      if (fileLen && !multiple) {
        this.$Message.error('不支持多文件上传')
        return false
      }

      const extra = this.model[this.schema.key].find(v => file.name === v.name)
      if (fileLen && extra) {
        this.$Message.error('不能重复上传')
        return false
      }

      this.$emit('on-before-upload', ...arguments)
    },
    handleSuccessUpload (res, file, fileList) {
      const { adapter } = this.schema.option
      try {
        /* eslint no-new-func: 0 */
        const getFile = new Function('data', adapter)
        var finallfile = getFile(res)

        if (!finallfile.name || !finallfile.url) return
      } catch (e) {
        console.log(`返回数据不对 需要做适配：${e}`)
      }
      const curFile = { name: finallfile.name, url: finallfile.url }
      const value = this.model[this.schema.key] || []
      value.push(curFile)
      this.store.updateModel({ [this.schema.key]: [...value] })

      this.$emit('on-upload-success', ...arguments)
    },
    handleUploadError (error, file, fileList) {
      if (error) this.$emit('on-upload-error', ...arguments)
    },
    handleUploadFormatError (file, fileList) {
      this.$Message.warning({
        content: `仅支持 ${this.schema.option.format} 格式文件的上传`,
        duration: 4
      })
      this.$emit('on-upload-format-error', ...arguments)
    },
    handleRemoveFile (index) {
      const files = this.model[this.schema.key]

      files.splice(index, 1)
      this.store.updateModel({ [this.schema.key]: files })

      this.$emit('on-remove-file', ...arguments)
    },
    handleSizeError (file, fileList) {
      this.$Message.warning({
        content: `上传文件大小不能超过 ${this.schema.option.maxSize} kb`,
        duration: 5
      })

      this.$emit('on-size-error', ...arguments)
    },
    getDownload (url, name) {
      this.$Message.info('文件已开始下载，请勿重复点击操作！')

      fetch(url).then(res => {
        return res.blob().then(blob => {
          this.funDownload(blob, name)
        })
      })
    },
    // 下载文件方法
    funDownload (content, filename) {
      const eleLink = document.createElement('a')
      // 字符内容转变成blob地址
      const blob = new Blob([content])

      eleLink.download = filename
      eleLink.style.display = 'none'
      eleLink.href = URL.createObjectURL(blob)
      // 触发点击
      document.body.appendChild(eleLink)
      eleLink.click()
      // 然后移除元素
      document.body.removeChild(eleLink)
    }
    // handleProgressUpload (event, file, fileList) {
    //   this.$emit('on-progress-upload', arguments)
    // },
    // handlePreviewFile (file) {
    //   this.$emit('on-preview', arguments)
    // },
  }
}
</script>
