<template>
    <div class="modal">
      <div class="modal-content">
        <span class="close" @click="$emit('close')">&times;</span>
        <h2>Редактировать информацию</h2>
        <form @submit.prevent="saveChanges">
          <label for="new-email">Email:</label>
          <input type="email" v-model="localUser.email">
          <label for="new-login">Логин:</label>
          <input type="text" v-model="localUser.login">
          <button type="submit">Сохранить</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['user'],
    data() {
      return {
        localUser: { ...this.user },
      };
    },
    methods: {
      saveChanges() {
        this.$emit('save', this.localUser);
      },
    },
  };
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    width: 300px;
  }
  
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 24px;
  }
  
  form > input {
    width: 100%;
    padding: 8px;
    margin: 10px 0;
  }
  
  form > button {
    width: 100%;
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    outline: none;
  }
  
  form > button:hover {
    background-color: #218838;
  }
  </style>
  