<template lang="pug">
setting-form(:store='store' :setting='setting')
</template>
<script>
import { Epage } from 'epage-iview'

const { SettingForm, settingExtend } = Epage.setting

export default {
  components: { SettingForm },
  extends: settingExtend,
  methods: {}
}
</script>
