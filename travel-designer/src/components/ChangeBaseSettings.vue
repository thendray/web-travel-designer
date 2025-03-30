<template>
  <div class="info-section">
    <div class="item" v-for="(value, key) in fields" :key="key">
      <span class="label">{{ key }}</span>
      <div class="value-button-group">
        <span class="value">{{ value }}</span>
        <button @click="openModal(key)">изменить</button>
      </div>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h3>Изменить {{ currentField }}</h3>
        <input v-model="newValue" type="text" />
        <div class="button-group">
          <button @click="saveChange">Сохранить</button>
          <button @click="cancelChange">Отмена</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['login', 'password', 'name', 'dayCount', 'cardMax', 'id'],
  data() {
    return {
      lLogin: null,
      lPassword: null,
      lName: null,
      lDayCount: null,
      lCardMax: null,
      fields: [],
      showModal: false,
      currentField: '',
      newValue: '',
      roomId: null
    };
  },
  mounted() {
    this.lLogin = this.login;
    this.lPassword = this.password;
    this.lName = this.name;
    this.lDayCount = this.dayCount;
    this.lCardMax = this.cardMax;
    this.roomId = this.id;

    this.fields = {
        'Логин комнаты': this.lLogin,
        'Пароль комнаты': this.lPassword,
        'Название путешествия': this.lName,
        'Количество дней': this.lDayCount,
        'Количество карточек': this.lCardMax
      };
  },
  methods: {
    openModal(key) {
      this.currentField = key;
      this.newValue = this.fields[key];
      this.showModal = true;
    },
    saveChange() {
      if (this.currentField) {
        this.fields[this.currentField] = this.newValue;
      }
      this.showModal = false;
    },
    cancelChange() {
      this.showModal = false;
    }
  }
};
</script>

<style scoped>
.info-section {
  background-color: rgba(251, 251, 247, 0.75);
  padding: 20px;
  min-width: 50%;
  margin: 20px auto;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.label {
  flex: 2;
  font-weight: bold;
  margin-right: 10px;
}

.value-button-group {
  display: flex;
  align-items: center;
  flex: 3;
}

.value {
  background-color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  margin-right: 10px;
  min-width: 20vh; 
  text-align: left;
  border: 1px solid #ccc;
  min-height: 2rem;
  box-sizing: border-box;
}

button {
  padding: 5px 10px;
  width: 100%;
  margin: 0 5px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  color: rgb(51, 51, 51);
  background-color: rgb(252, 252, 231);
  outline: none;
}

button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  background-color: rgb(253, 253, 208);
  color: rgb(51, 51, 51);
}

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
  z-index: 3;
}

.modal-content {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
  text-align: center;
  z-index: 3;
}

.modal-content h3 {
  margin-bottom: 20px;
  font-size: 20px;
}

.modal-content input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.button-group {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
</style>