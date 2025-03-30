<template>
    <div class="loading-container" :class="{ 'overlay': overlay }">
      <div class="spinner-container">
        <div class="spinner">
          <div class="spinner-circle"></div>
          <div class="spinner-circle-outer"></div>
        </div>
        <div v-if="message" class="spinner-text">{{ message }}</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoadingSpinner',
    props: {
      message: {
        type: String,
        default: 'Загрузка...'
      },
      overlay: {
        type: Boolean,
        default: true
      }
    }
  }
  </script>
  
  <style scoped>
  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    min-height: 200px;
  }
  
  .loading-container.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.85);
    z-index: 9999;
  }
  
  .spinner-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .spinner {
    position: relative;
    width: 70px;
    height: 70px;
  }
  
  .spinner-circle {
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border: 4px solid transparent;
    border-top-color: #4285f4;
    border-radius: 50%;
    animation: spin 1.2s linear infinite;
  }
  
  .spinner-circle-outer {
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border: 4px solid transparent;
    border-radius: 50%;
    border-right-color: #db4437;
    border-bottom-color: #f4b400;
    border-left-color: #0f9d58;
    animation: spin-reverse 0.8s linear infinite;
  }
  
  .spinner-text {
    margin-top: 20px;
    font-size: 16px;
    font-weight: 500;
    color: #555;
    text-align: center;
    font-family: 'Arial', sans-serif;
    letter-spacing: 0.5px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes spin-reverse {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(-360deg); }
  }
  </style>
  