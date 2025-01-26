<template>
  <div class="auth-component">
    <header class="header">
      <router-link to="/sign-up" class="header-link">Зарегестрироваться</router-link>
      <router-link to="/" class="header-link">На главную</router-link>
    </header>
    <div class="main-container">
      <OverlayComp></OverlayComp>
      <div class="auth-form">
        <h2>Вход</h2>
        <input type="email" placeholder="Почта" v-model="email" />
        <input type="password" placeholder="Пароль" v-model="password" />
        <button @click="login">Войти</button>
      </div>
    </div>
  </div>
</template>


<script>
import OverlayComp from './common/OverlayComp.vue';


export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  components: {
    OverlayComp
  },
  methods: {
    login() {
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
.auth-component {
  background-image: url("../assets/auth_background.jpeg");
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

.auth-form {
  background: rgba(255, 255, 255, 0.8);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  z-index: 2;
}

.auth-form h2 {
  margin-bottom: 20px;
  color: rgb(51, 51, 51);
  font-weight: normal;
}

.auth-form input {
  display: block;
  width: 100%;
  min-width: 35vh;
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

.top-buttons {
  position: absolute;
  top: 10px;
  right: 10px;
}

.top-buttons button {
  margin-left: 10px;
  padding: 5px 10px;
  border-radius: 4px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}
</style>
