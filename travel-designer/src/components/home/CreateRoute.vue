<template>
  <div class="create-route">
    <div class="main-text">Создайте собственный маршрут</div>
    <button class="create-button" @click="createRoute">создать</button>
    <button class="create-button" @click="showJoinModal = true">присоединиться к созданию</button>

    <!-- Модальное окно для присоединения к комнате -->
    <div v-if="showJoinModal" class="modal">
      <div class="modal-content">
        <span class="close-button" @click="showJoinModal = false">&times;</span>
        <h2>Присоединиться к комнате</h2>
        <form @submit.prevent="joinRoom">
          <div class="form-group">
            <label for="roomId">Логин комнаты:</label>
            <input 
              type="text" 
              id="roomId" 
              v-model="roomCredentials.login" 
              placeholder="Введите ID комнаты"
              required
            >
          </div>
          <div class="form-group">
            <label for="roomPassword">Пароль комнаты:</label>
            <input 
              type="password" 
              id="roomPassword" 
              v-model="roomCredentials.password" 
              placeholder="Введите пароль комнаты"
              required
            >
          </div>
          <div class="form-actions">
            <button type="button" class="cancel-button" @click="showJoinModal = false">Отмена</button>
            <button type="submit" class="submit-button">Присоединиться</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      showJoinModal: false,
      roomCredentials: {
        roomId: '',
        login: '',
        password: ''
      }
    };
  },
  methods: {
    createRoute() {
      this.$router.push("/create-route");
    },
    joinRoom() {
      console.log('Присоединение к комнате:', this.roomCredentials);
      const formData = {
        userId: localStorage.getItem("id"),
        routeLogin: this.roomCredentials.login,
        routePassword: this.roomCredentials.password
      };

      axios.post('/api/route/login', formData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          }
        })
        .then(response => {
          this.showJoinModal = false;
          alert(`Вы успешно присоединились к комнате ${response.data.routeId}`);
          this.$router.push(`/route-room/${response.data.routeId}`);
        
        })
        .catch(error => {
          alert('Ошибка при присоединении к комнате: ' + error.message);
        });
  
    }
  }
}
</script>

<style scoped>
.main-text {
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 25px;
  z-index: 3;
}

.create-route {
  background-color: rgba(231, 247, 247, 0.7);
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: center;
  justify-content: space-between;
}

.create-button {
  padding: 10px 20px;
  width: 35%;
  margin: 0 5px;
  margin-left: 10px;
  margin-right: 10px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  color: rgb(51, 51, 51);
  background-color: rgb(221, 242, 251);
  font-size: 1.2rem;
  outline: none;
}

.create-button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  background-color: rgb(173, 226, 255);
  color: rgb(51, 51, 51);
}

/* Стили для модального окна */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 400px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 24px;
  cursor: pointer;
  color: #555;
}

.close-button:hover {
  color: #000;
}

h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #444;
  text-align: left;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  box-sizing: border-box;
}

input:focus {
  border-color: rgb(173, 226, 255);
  outline: none;
  box-shadow: 0 0 4px rgba(173, 226, 255, 0.5);
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.cancel-button, .submit-button {
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  width: 48%;
}

.cancel-button {
  background-color: #f1f1f1;
  color: #333;
}

.cancel-button:hover {
  background-color: #ddd;
}

.submit-button {
  background-color: rgb(173, 226, 255);
  color: #333;
}

.submit-button:hover {
  background-color: rgb(143, 209, 245);
  transform: translateY(-2px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
</style>
