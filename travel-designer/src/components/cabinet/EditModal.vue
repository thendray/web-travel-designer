<template>
    <div class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Редактировать информацию</h2>
          <button @click="$emit('close')" class="close-btn">&times;</button>
        </div>
        
        <form @submit.prevent="saveChanges" class="edit-form">
          <div class="form-group">
            <label for="new-email">Email</label>
            <input 
              type="email" 
              id="new-email" 
              v-model="localUser.email" 
              placeholder="Введите email"
              class="form-input"
            >
          </div>
          
          <div class="form-group">
            <label for="new-login">Логин</label>
            <input 
              type="text" 
              id="new-login" 
              v-model="localUser.username" 
              placeholder="Введите логин"
              class="form-input"
            >
          </div>
          
          <div class="modal-actions">
            <button type="button" @click="$emit('close')" class="cancel-btn">Отмена</button>
            <button type="submit" class="save-btn">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EditInfoModal',
    props: {
      show: {
        type: Boolean,
        default: false
      },
      user: {
        type: Object,
        default: () => ({ email: '', username: '' })
      }
    },
    data() {
      return {
        localUser: { ...this.user }
      }
    },
    watch: {
      user: {
        handler(newVal) {
          this.localUser = { ...newVal }
        },
        deep: true
      }
    },
    methods: {
      saveChanges() {
        this.$emit('save', this.localUser);
        this.closeModal();
      },
      closeModal() {
        this.$emit('close');
      }
    }
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
    animation: fadeIn 0.3s ease;
  }
  
  .modal-content {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 420px;
    overflow: hidden;
    transform: translateY(0);
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    border-bottom: 1px solid #f0f0f0;
  }
  
  h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: #333;
  }
  
  .close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #888;
    padding: 0;
    line-height: 1;
    transition: color 0.2s;
  }
  
  .close-btn:hover {
    color: #333;
  }
  
  .edit-form {
    padding: 24px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-size: 0.875rem;
    color: #64748b;
    font-weight: 500;
  }
  
  .form-input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.875rem;
    transition: border-color 0.2s, box-shadow 0.2s;
    background-color: #f8fafc;
  }
  
  .form-input:focus {
    outline: none;
    border-color: #4361ee;
    box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
  }
  
  .form-input::placeholder {
    color: #94a3b8;
  }
  
  .modal-actions {
    display: flex;
    padding-top: 16px;
    border-top: 1px solid #f0f0f0;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
  }
  
  .save-btn, .cancel-btn {
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s;
    min-width: 80px;
    outline: none;
  }

  .save-btn {
    background-color: rgb(203, 249, 180);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    border: none;
    /* color: white; */
  }
  
  .save-btn:hover {
    background-color: rgb(191, 250, 162);
    transform: scale(1.05);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
  
  .cancel-btn {
    background-color: white;
    color: #64748b;
    border: 1px solid #e2e8f0;
  }
  
  .cancel-btn:hover {
    background-color: #f8fafc;
    border-color: #cbd5e1;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  </style>
  