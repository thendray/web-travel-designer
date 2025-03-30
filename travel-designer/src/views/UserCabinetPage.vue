<template>
  <div class="profile-page">
    <header class="header">
      <div class="center">Личный кабинет</div>
      <div class="right">
        <nav>
          <a @click="showDeleteConfirmation" class="header-a">Удалить аккант</a>
        </nav>
        <nav>
          <a @click="exit" class="header-a">Выйти</a>
        </nav>
      </div>
    </header>
    <OverlayComp></OverlayComp>
    <div class="first-row">
      <div class="profile-card">
        <div class="profile-image">
          <img :src="user.profilePic || 'default-avatar.png'" alt="Фото профиля" />
        </div>
        <div class="profile-details">
          <p>
            <span class="label">Email:</span>
            <span>{{ user.email || "Не указан" }}</span>
          </p>
          <p>
            <span class="label">Логин:</span>
            <span>{{ user.login || "Не указан" }}</span>
          </p>
          <button class="edit-btn" @click="showEditModal = true">Редактировать</button>
        </div>
      </div>
      <div class="favorite">
        <div class="text-fav">Избранное</div>
        <div class="cards-container">
          <div class="cards">
            <div v-for="(card, index) in favouriteCards" :key="index" class="card-container">
              <div> 
                <CabinetCard :card-id="card"></CabinetCard> 
              </div>
            </div>
          </div>
       </div>
      </div>
    </div>
    <div class="next-row">
      <div class="text-route">Комнаты путешествий</div>
      <div class="routes-container">
        <div class="routes">
          <div v-for="route in travelRoutes" :key="route.id" :route="route" class="route-container">
            <div> 
              <CabinetRouteCard @click="goToRouteRoom"></CabinetRouteCard> 
            </div>
          </div>
        </div>
      </div>
    </div>
    <EditModal
      v-if="showEditModal"
      :user="user"
      @close="showEditModal = false"
      @save="updateUserInfo"
    />

    <div v-if="showDeleteModal" class="delete-confirmation-modal">
      <div class="delete-confirmation-content">
        <h3>Подтверждение удаления</h3>
        <p>Вы уверены, что хотите удалить свой аккаунт? Это действие невозможно отменить.</p>
        <div class="delete-confirmation-buttons">
          <button @click="confirmDeleteAccount" class="confirm-delete-btn">Да, удалить</button>
          <button @click="cancelDeleteAccount" class="cancel-delete-btn">Отмена</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CabinetCard from '@/components/cabinet/CabinetCard.vue';
import CabinetRouteCard from '@/components/cabinet/CabinetRouteCard.vue';
import EditModal from '@/components/cabinet/EditModal.vue';
import OverlayComp from '@/components/common/OverlayComp.vue';

export default {
  props: ["id"],
  components: {
    CabinetCard,
    CabinetRouteCard,
    EditModal,
    OverlayComp
  },
  data() {
    return {
      roomId: null,
      user: {
        email: 'user@example.com',
        login: 'username',
        profilePic: 'profile-pic.jpg',
      },
      favouriteCards: [
        { id: 1, name: 'Карточка 1' },
      ],
      travelRoutes: [
        { id: 1, name: 'Комната 1' }
      ],
      showEditModal: false,
      showDeleteModal: false
    };
  },
  created() {
    this.roomId = this.id;
    this.user.profilePic = require("../assets/icon.jpeg");
  },
  methods: {
    updateUserInfo(updatedUser) {
      this.user = updatedUser;
      this.showEditModal = false;
    },
    exit() {
      this.$router.push(`/home`)
    },
    showDeleteConfirmation() {
      this.showDeleteModal = true;
    },
    cancelDeleteAccount() {
      this.showDeleteModal = false;
    },
    confirmDeleteAccount() {
      console.log('Аккаунт удален');
      this.showDeleteModal = false;
      this.$router.push(`/`);
    },
    goToRouteRoom() {
      this.$router.push('/route-room/6');
    }
  },
};
</script>

<style scoped>
.profile-page {
  display: flex;
  flex-direction: column;
  /* height: 100vh; */

  background-image: url('../assets/cabinet_background.jpeg');
  background-size: cover;
  background-position: center;
}

.header {
  display: flex;
  justify-content: space-between;
  top: 0;
  width: 100%;
  display: flex;
  padding: 10px 20px;
  background-color: rgba(33, 37, 41, 0.45);
  z-index: 2;
}

.header .left,
.header .right {
  display: flex;
  gap: 15px;
}

nav {
  display: flex;
}

.center {
  color: rgb(203, 249, 180);
  margin: 0 auto;
  text-align: center;
  font-size: 1.2rem;
  justify-content: center;
}

.header-a {
  color: rgb(203, 249, 180);
  transition: transform 0.3s ease, color 0.3s ease;
  white-space: nowrap;
  margin: 0 15px;
  font-size: 1.1rem;
  cursor: pointer;
}

.header-a:hover {
  transform: scale(1.1);
  color: rgb(181, 247, 147);
}

.main-text {
	font-size: 1.5rem;
	/* color: rgb(55, 55, 55); */
	text-align: center;
	margin-bottom: 25px;
	z-index: 2;
}

.favorite {
  width: 70vw;
  z-index: 2;
  padding-right: 20px;
}

.text-fav {
	font-size: 1.4rem;
	color: rgb(203, 249, 180);
	text-align: center;
  margin-top: 10px;
  position:static;
  font-weight: bold;
}

.text-route {
	font-size: 1.5rem;
	color: rgb(203, 249, 180);
	text-align: center;
  margin-top: 10px;
  position:static;
  z-index: 2;
  font-weight: bold;
}


.first-row {
  display: flex;
  z-index: 2;
  justify-content: space-around;
  align-items: center;
}


.cards-container {
  background-color: rgba(213, 251, 224, 0.3);
  border-radius: 16px;
  overflow-x: auto;
}

.cards {
  display: flex;
  padding: 20px;
}

.card-container {
  /* display: flex; */
  flex-direction: column;
  align-items: center;
  margin: 10px;
}

.routes-container {
  margin-right: 60px;
  margin-left: 60px;
  background-color: rgba(213, 251, 224, 0.3);
  border-radius: 16px;
  overflow-x: auto;
}

.routes {
  display: flex;
  padding: 20px;
}

.route-container {
  /* display: flex; */
  flex-direction: column;
  align-items: center;
  margin: 10px;
}

.next-row {
  margin-bottom: 20px;
  z-index: 2;
}

.profile-card {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(213, 251, 224, 0.3);
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  padding: 20px;
  margin: 20px;
  height: 30vh;
}

.profile-image img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

.profile-details {
  flex: 1;
  background-color: rgba(182, 245, 193, 0.8);
  border-radius: 16px;
  padding: 10px;
}

.profile-details p {
  margin: 8px 0;
}

.label {
  font-weight: bold;
  font-size: 1.2rem;
  margin-right: 8px;
  z-index: 2;
}

.edit-btn {
  padding: 10px 20px;
  background-color: rgba(200, 248, 213, 0.883);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  outline: none;
  margin-top: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.edit-btn:hover {
  background-color: rgba(193, 250, 209, 0.883);;
}

.delete-confirmation-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.delete-confirmation-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
  max-width: 90%;
}

.delete-confirmation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.confirm-delete-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-delete-btn {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>