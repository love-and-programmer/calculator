<template>
  <a-modal v-model="isEditModalVisible" :title="editModalTitle" @Ok="save">
    <template slot="footer">
      <a-button key="back" @click="cancel">取消</a-button>
      <a-button key="submit" type="primary" :loading="isSaving" @click="save">
        儲存
      </a-button>
    </template>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>
<script>
export default {
  name: 'KarmaModel',
}
</script>
