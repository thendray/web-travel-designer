<template>
    <div class="modal-overlay" v-if="show">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Изменить фото профиля</h2>
          <button @click="closeModal" class="close-btn">&times;</button>
        </div>
        
        <div class="photo-container">
          <div class="photo-preview-container">
            <img 
              v-if="previewFile" 
              :src="previewFile" 
              alt="Предпросмотр фото" 
              class="photo-preview"
            />
            <div v-else class="no-photo">
              <svg class="photo-icon" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              <span>Нет фото</span>
            </div>
          </div>
          
          <div class="photo-controls">
            <label for="photo-upload" class="upload-btn">
              <svg class="icon" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
              Выбрать фото
              <input 
                type="file" 
                id="photo-upload" 
                accept="image/*" 
                @change="handleFileChange" 
                class="file-input"
              >
            </label>
            
            <button 
              v-if="previewFile" 
              @click="removePhoto" 
              class="remove-btn"
            >
              <svg class="icon" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
              Удалить
            </button>
          </div>
        </div>
        
        <div class="modal-actions">
          <button @click="closeModal" class="cancel-btn">Отмена</button>
          <button @click="saveChanges" class="save-btn" :disabled="!previewFile">Сохранить</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EditPhotoModal',
    props: {
      show: {
        type: Boolean,
        default: false
      },
      currentPhoto: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        previewFile: null,
        selectedFile: null
      }
    },
    created() {
      this.previewFile = this.currentPhoto;  
    },
    methods: {
      handleFileChange(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = () => {
            this.previewFile = reader.result;
            console.log(this.photo);
          };
          reader.readAsDataURL(file);
        }
      },
      removePhoto() {
        this.previewFile = '';
        this.selectedFile = null;
        const fileInput = document.getElementById('photo-upload');
        if (fileInput) fileInput.value = '';
      },
      saveChanges() {
        this.$emit('save', this.previewFile);
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
    outline: none;
  }
  
  .close-btn:hover {
    color: #333;
  }
  
  .photo-container {
    padding: 24px;
  }
  
  .photo-preview-container {
    width: 180px;
    height: 180px;
    margin: 0 auto 24px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f8f9fa;
    border: 2px dashed #e0e0e0;
    position: relative;
    transition: border-color 0.3s;
  }
  
  .photo-preview-container:hover {
    border-color: #c0c0c0;
  }
  
  .photo-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .no-photo {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #9e9e9e;
  }
  
  .photo-icon {
    width: 48px;
    height: 48px;
    fill: #e0e0e0;
    margin-bottom: 8px;
  }
  
  .photo-controls {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 8px;
  }
  
  .upload-btn, .remove-btn {
    display: inline-flex;
    align-items: center;
    padding: 10px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s;
    border: none;
    outline: none;
  }
  
  .upload-btn {
    background-color: rgb(203, 249, 180);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    /* color: white; */
  }
  
  .upload-btn:hover {
    background-color: rgb(191, 250, 162);
    transform: scale(1.05);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
  
  .remove-btn {
    background-color: rgb(253, 215, 212);
    /* color: #e63946; */
    /* border: 1px solid #f1f3f5; */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  
  .remove-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
    background-color: rgb(251, 188, 183);
  }
  
  .icon {
    width: 18px;
    height: 18px;
    margin-right: 8px;
  }
  
  .file-input {
    display: none;
  }
  
  .modal-actions {
    display: flex;
    padding: 16px 24px;
    border-top: 1px solid #f0f0f0;
    justify-content: flex-end;
    gap: 12px;
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
    background-color: rgb(231, 255, 221);
    /* color: white; */
    border: none;
  }
  
  .save-btn:hover {
    background-color: rgb(203, 252, 178);
  }
  
  .save-btn:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
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

  label {
    margin: 0;
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
  