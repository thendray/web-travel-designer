<template>
    <div class="reg-component">
      <header class="header">
        <router-link to="/login" class="header-link">Войти</router-link>
        <router-link to="/" class="header-link">На главную</router-link>
      </header>
      <div class="main-container">
        <OverlayComp></OverlayComp>
        <div class="reg-form">
          <h2>Регистрация</h2>
  
          <div v-if="step === 1">
            <input type="email" placeholder="Почта" v-model="email" />
            <input type="text" placeholder="Имя" v-model="name" />
            <input type="password" placeholder="Пароль" v-model="password" />
            <input type="password" placeholder="Подтвердите пароль" v-model="confirmPassword" />
            <button @click="nextStep">Дальше →</button>
            <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
          </div>
  
          <div v-if="step === 2">
            <div>Можете добавить фото профиля</div>
            <input type="file" @change="uploadFile" ref="fileInput"/>
            <div v-if="this.file" class="image-preview">
              <img :src="this.file" alt="Превью изображения">
            </div>
            <button @click="prevStep">← Назад</button>
            <button class="previous" @click="signUp">Зарегистрироваться</button>
          </div>
        </div>
      </div>
    </div>
  </template>
    
  
<script>
import axios from 'axios';
import OverlayComp from './common/OverlayComp.vue';

export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      step: 1,
      name: '',
      file: null,
      errorMessage: null
    };
  },
  components: {
    OverlayComp
  },
  methods: {
    nextStep() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Пароли не совпадают';
        this.confirmPassword = '';
        // return false;
      } else if(!this.validateEmail(this.email)) {
        this.errorMessage = 'Некорректный формат email';
      } else {
        this.errorMessage = '';
        this.step++;
      }
    },
    prevStep() {
        this.step--;
    },
    uploadFile(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          this.file = reader.result;
          console.log(this.photo);
        };
        reader.readAsDataURL(file);
      } else {
        // this.file = "https://img.icons8.com/ios-glyphs/90/user--v1.png";
      }
    },
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    async signUp() {
      const formData = {
        email: this.email,
        username: this.name,
        password: this.password,
        profilePhoto: this.file 
      };
      console.log(formData);
      // localStorage.setItem("id", 2);
      // this.$router.push("/home");

      try {
        console.log(formData);
        const response = axios.post('/api/users/sign-up', formData)
          .then((response) => {
            console.log("Response", response);
            // Перенаправление пользователя на домашнюю страницу
            localStorage.setItem("isAuth", true);

            const userData = response.data;
            const userId = userData.userId;

            localStorage.setItem("id", userId);
            localStorage.setItem("jwt", userData.jwt);
            this.$router.push("/home");
          })
          .catch((error) => {
            console.log(error);
          });

        console.log(response.data);
      } catch (error) {
        console.error('Error during registration:', error);
      }
    }
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

.header {
  top: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
  background-color: rgba(33, 37, 41, 0.7);
  position: relative;
  z-index: 3;
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
  outline: none;
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

.error {
  color: red;
  margin-top: 4px;
}

.image-preview img {
  max-width: 150px;
  max-height: 150px;
  margin-bottom: 10px;
}


</style>
