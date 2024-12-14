<template>
    <div class="alert-backdrop">
      <div class="alert-modal">
        <div class="alert-content">
          <p>{{ message }}</p>
        </div>
        <button @click="close">ОК</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AlertModal',
    props: {
      message: {
        type: String,
        required: true
      }
    },
    emits: ['close'],
    setup(_, { emit }) {
      const close = () => {
        emit('close');
      };
  
      return {
        close
      };
    }
  };
  </script>
  
  <style scoped>
  .alert-backdrop {
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
  
  .alert-modal {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
  }
  
  .alert-content p {
    margin-bottom: 20px;
  }
  
  .alert-modal button {
    padding: 10px 20px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .alert-modal button:hover {
    background-color: #0056b3;
  }
  </style>