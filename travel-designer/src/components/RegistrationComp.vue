<template>
    <div class="reg-component">
      <header class="header">
        <router-link to="/login" class="header-link">Войти</router-link>
        <router-link to="/" class="header-link">На главную</router-link>
      </header>
      <div class="main-container">
        <div class="overlay"></div>
        <div class="reg-form">
          <h2>Регистрация</h2>
  
          <div v-if="step === 1">
            <input type="email" placeholder="Почта" v-model="email" />
            <input type="password" placeholder="Пароль" v-model="password" />
            <input type="password" placeholder="Подтвердите пароль" v-model="confirmPassword" />
            <button @click="nextStep">Дальше →</button>
          </div>
  
          <div v-if="step === 2">
            <input type="text" placeholder="Имя" v-model="name" />
            <input type="file" @change="uploadFile" />
            <button @click="prevStep">← Назад</button>
            <button class="previous" @click="signUp">Зарегистрироваться</button>
          </div>
        </div>
      </div>
    </div>
  </template>
    
  
  <script>
    export default {
      data() {
        return {
          email: "",
          password: "",
          confirmPassword: "",
          step: 1,
          name: '',
          file: null
        };
      },
      methods: {
        nextStep() {
            this.step++;
        },
        prevStep() {
            this.step--;
        },
        uploadFile(event) {
            this.file = event.target.files[0];
        },
        signUp() {
          // логика авторизации, возможно, через API
          console.log(`Email: ${this.email}, Password: ${this.password}`);

          this.$router.push("/home");
        },
        register() {
          // логика перехода на страницу регистрации
          alert("Переход на страницу регистрации");
        },
        goHome() {
          // логика перехода на главную страницу
          alert("Переход на главную страницу");
        },
      },
    };
  </script>
  
  <style scoped>
  .reg-component {
    background-image: url("../assets/reg_background.jpeg");
    background-size: cover;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
  }
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
  
  .header {
    top: 0;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 10px 20px;
    background-color: rgba(33, 37, 41, 0.7);
  }
  
  .header div {
    display: flex;
    align-items: center;
    width: 100%;
  }
  
  .header-link {
    color: rgb(220, 246, 255);
    transition: transform 0.3s ease, color 0.3s ease;
    white-space: nowrap;
    margin: 0 15px;
    font-size: 1.1rem;
  }
  
  .header-link:hover {
    transform: scale(1.1);
    color: rgb(173, 226, 255);
  }
  
  .main-container {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
  
  .reg-form {
    background: rgba(255, 255, 255, 0.8);
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    text-align: center;
    z-index: 2;
  }
  
  .reg-form h2 {
    margin-bottom: 20px;
    color: rgb(51, 51, 51);
    font-weight: normal;
  }
  
  .reg-form input {
    display: block;
    width: 100%;
    min-width: 40vh;
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
  }
  
  button {
    padding: 10px 20px;
    width: 100%;
    margin: 0 5px;
    border: none;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    color: rgb(51, 51, 51);
    background-color: rgb(220, 246, 255);
  }
  
  button:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
    background-color: rgb(173, 226, 255);
    color: rgb(51, 51, 51);
  }

  .previous {
    margin-top: 10px;
  }
  
 
  </style>
  