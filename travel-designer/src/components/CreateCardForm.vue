<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="form-fields">
        <input type="text" placeholder="Поле 1" v-model="localData.field1">
        <input type="text" placeholder="Поле 2" v-model="localData.field2">
        <input type="text" placeholder="Поле 3" v-model="localData.field3">
      </div>
      <button type="button" @click="handleSave">Сохранить</button>
      <button type="button" @click="close">Отмена</button>
      
      <!-- Подключаем модальное окно для алерта -->
      <AlertModal
        v-if="showAlert"
        :message="alertMessage"
        @close="close()"
      />
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import AlertModal from './AlertModal.vue';

export default {
  name: 'CreateCardForm',
  components: {
    AlertModal
  },
  setup(_, { emit }) {
    const localData = reactive({ field1: '', field2: '', field3: '' });
    const showAlert = ref(false);
    const alertMessage = ref('');

    const handleSave = () => {
      console.log('Данные формы:', localData);
      alertMessage.value = 'Данные сохранены!';
      showAlert.value = true;
    };

    const close = () => {
      showAlert.value = false
      emit('close'); // Закрытие формы
    };

    return {
      localData,
      handleSave,
      close,
      showAlert,
      alertMessage
    };
  }
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
}

.form-fields input {
  display: block;
  margin-bottom: 10px;
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
</style>