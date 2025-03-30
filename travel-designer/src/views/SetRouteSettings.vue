<template>
  <div class="route-settings">
    <header class="header">
      <div class="center">Ваше Путешествие</div>
      <router-link to="/home" class="header-link">Отмена</router-link>
    </header>
    <div class="main-page">
      <OverlayComp></OverlayComp>
      <div class="settings-form">
        <div v-if="step === 1">
          <h2>Настройки</h2>

          <div>
            <label>Название вашего путешествия</label>
            <input type="text" placeholder="Название путешествия" v-model="travelName" />
          </div>
          <label>Логин комнаты</label>
          <div class="input-row">
            <input class="gen" type="text" placeholder="Логин комнаты" v-model="roomLogin" />
            <button class="b-gen" @click="generateLogin">сгенерировать</button>
          </div>
          <div>
            <label>Пароль от комнаты</label>
            <input type="password" placeholder="Пароль от комнаты" v-model="roomPassword" />
          </div>
          <button @click="nextStep">Далее</button>

        </div>
        <div v-if="step === 2">
          <h2></h2>

          <div>
            <label>Максимальное колиичество карточек</label>
            <div class="input-row">
              <input class="gen" type="number" placeholder="Количество карточек" v-model="maxCards" />
              <ExplainingButton text="Максимальное количество предложений в одной категории от одного участника. Например каждый может предложить не больше чем 10 отелей, 10 кафе/ресторанов, и тд"></ExplainingButton>
            </div>
          </div>
          <label>Колличество дней путешествия</label>
          <input type="number" placeholder="Дни путешествия" v-model="tripDays" />
          <button type="button" @click="previousStep">Назад</button>
          <button class="create-b" @click="createTrip">Создать</button>

        </div>
      </div>
    </div>
</div>
</template>

<script>
import ExplainingButton from '@/components/common/ExplainingButton.vue';
import OverlayComp from '@/components/common/OverlayComp.vue';
import axios from 'axios';


export default {
data() {
    return {
        step: 1,
        travelName: '',
        roomLogin: '',
        roomPassword: '',
        maxCards: '',
        tripDays: '',
        tooltipVisible: false,
        userId: null
    };
},
components: {
    OverlayComp,
    ExplainingButton
},
created() {
  this.userId = localStorage.getItem("id") || 2
},
methods: {
    nextStep() {
        this.step = 2;
    },
    previousStep() {
        this.step = 1;
    },
    createTrip() {
      const requestData = {
        id: 0,
        creatorId: this.userId,
        name: this.travelName,
        login: this.roomLogin,
        password: this.roomPassword,
        cardLimit: this.maxCards,
        days: this.tripDays
      };

      axios.post('/api/route/create', requestData, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then(response => {
        const responseData = response.data
        console.log('Success:', responseData);

        this.$router.push(`/route-room/${responseData.routeId}`);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    },
    generateLogin() {
        this.roomLogin = 'generatedLogin';
    }

},
};
</script>

<style scoped>
.route-settings {
  display: flex;
  flex-direction: column;
  height: 100vh;

  background-image: url('../assets/settings_background.jpeg');
  background-size: cover;
  background-position: center;
}

.header {
  display: flex;
  justify-content: space-between;
  background-color: rgb(248, 248, 248);
  top: 0;
  width: 100%;
  display: flex;
  padding: 10px 20px;
  background-color: rgba(33, 37, 41, 0.45);
  z-index: 2;
}

.header div {
  display: flex;
  align-items: center;
  width: 100%;
}

.center {
  color: rgb(255, 247, 220); 
  margin: 0 auto;
  text-align: center;
  font-size: 1.3rem;
  justify-content: center;
}

.header-link {
  color: rgb(255, 247, 220);
  transition: transform 0.3s ease, color 0.3s ease;
  white-space: nowrap;
  margin: 0 15px;
  font-size: 1.1rem;
}

.header-link:hover {
  transform: scale(1.1);
  color: rgb(249, 235, 189);
  }

.main-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.settings-form {
  background: rgba(249, 241, 227, 0.6);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  z-index: 2;
}

.settings-form h2 {
  margin-bottom: 20px;
  color: rgb(51, 51, 51);
  font-weight: normal;
}

.settings-form input {
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
  /* width: 100%; */
  margin: 0 5px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  color: rgb(51, 51, 51);
  background-color: rgb(255, 247, 220);
  outline: none;
}

button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  background-color: rgb(249, 235, 189);
  color: rgb(51, 51, 51);
}

label {
  display: block;
  margin-bottom: 5px;
  margin-left: 5px;
  font-weight: bold;
  font-size: 0.9rem;
  color: #333;
  /* color: #888888; */
  font-weight: bold;
  text-align: left;
}

.input-row {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  /* justify-content: center; */
}

.gen {
  flex: 3;
  box-sizing: border-box;
  margin-right: 10px;
  margin-bottom: 0px !important;
}

.create-b {
  margin-top: 10px;
  margin-left: 20px;
}


</style>