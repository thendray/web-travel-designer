<template>
  <div class="button-container">
    <button class="create-button" @click="click">Создать</button>
    <CreateCardForm v-if="showForm" @close="close"></CreateCardForm>
  </div>
</template>

<script>
import { ref } from 'vue';
import CreateCardForm from './components/CreateCardForm.vue';

export default {
  name: 'App',
  components: {
    CreateCardForm
  },
  setup() {
    const showForm = ref(false);

    return {
      showForm
    };
  },
  methods: {
    click() {
      this.showForm = true;
      console.log('showForm: ', this.showForm)
    },
    close() {
      this.showForm = false
    }
  }
};
</script>

<style scoped>
.button-container {
  text-align: center;
  padding: 20px 0;
}

.create-button {
  padding: 10px 20px;
  margin: 20px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}
</style>