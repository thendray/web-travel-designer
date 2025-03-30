<template>
  <div v-if="!loading">
    <div class="my-container">
    <header class="header">
      <div class="center">Ваши карточки</div>
      <div class="right">
          <nav>
            <a @click="exit" class="header-a">Выйти</a>
          </nav>
        </div>
    </header>
    <OverlayComp></OverlayComp>
    <div class="main-content">
      <div class="cards-container">
        <div class="cards">
          <div v-for="(card, index) in cards" :key="index" class="card-container">
            <div> 
              <OwnCard :card="card"></OwnCard> 
            </div>
            <div class="card-buttons">
              <button @click="deleteCard(card.id)" class="del">удалить</button>
              <button @click="editCard(card.id)" class="edit">редактировать</button>
            </div>
          </div>
        </div>
      </div>
      <div class="to-center">
        <button class="add-button" @click="addCard">создать новую</button>
      </div>
    </div>

    <div v-if="showCreateModal">
      <CreateCardForm :id="this.roomId" @close-adding-new-card="closeAddingNewCard"></CreateCardForm>
    </div>

    <!-- Модальное окно удаления -->
    <div v-if="showDeleteModal" class="modal">
      <div class="modal-content">
        <p>Вы уверены, что хотите удалить эту карточку?</p>
        <div class="button-group"> 
          <button @click="confirmDelete">Подтвердить</button>
          <button @click="showDeleteModal = false" class="del">Отмена</button>
        </div>
      </div>
    </div>

    <!-- Модальное окно редактирования -->
    <div v-if="showEditModal">
      <UpdateCardForm @update-adding-new-card="saveEdit" :card-id="currentCardIndex"></UpdateCardForm>
    </div>

  </div>
  </div>
  <div v-else>
    <WaitLoading></WaitLoading>
  </div>
  
</template>

<script>
import OwnCard from '@/components/cards/OwnCard.vue';
import OverlayComp from '@/components/common/OverlayComp.vue';
import WaitLoading from '@/components/common/WaitLoading.vue';
import CreateCardForm from '@/components/own-cards/CreateCardForm.vue';
import UpdateCardForm from '@/components/own-cards/UpdateCardForm.vue';
import axios from 'axios';

export default {
  props: ["id"],
  data() {
    return {
      cards: null,
      showDeleteModal: false,
      showEditModal: false,
      showCreateModal: false,
      currentCardIndex: null,
      roomId: null,
      loading: true
    }
  },
  created() {
    this.roomId = this.id;
    const userId = localStorage.getItem('id') || 2;
    axios.get(`/api/route/${this.roomId}/user-cards/${userId}`, {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then(response => {
        this.cards = response.data.cards;
        console.log(`response ${response.data.cards}`)
        this.loading = false;
      })
      .catch(error => {
        this.error = 'Не удалось загрузить данные маршрута';
        console.error('Ошибка при получении данных:', error);
        this.loading = false;
      });
  },
  components: {
    OverlayComp,
    OwnCard,
    CreateCardForm,
    UpdateCardForm,
    WaitLoading
  },
  methods: {
    addCard() {
      this.showCreateModal = true;
    },
    closeAddingNewCard() {
      console.log("close");
      this.showCreateModal = false;
    },
    deleteCard(index) {
      this.currentCardIndex = index;
      this.showDeleteModal = true;
    },
    confirmDelete() {
      if (this.currentCardIndex !== null) {
        this.cards.splice(this.currentCardIndex, 1);
        this.currentCardIndex = null;
      }
      this.showDeleteModal = false;
    },
    editCard(index) {
      this.currentCardIndex = index;
      this.showEditModal = true;
    },
    saveEdit() {
      // Логика сохранения изменений
      this.showEditModal = false;
    },
    exit() {
      this.$router.push(`/route-room/${this.roomId}`);
    }
  },
}
</script>

<style scoped>
.my-container {
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center; */
  display: flex;
  flex-direction: column;
  height: 100vh;

  background-image: url('../assets/cards_background.png');
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
  color: rgb(188, 240, 192);
  margin: 0 auto;
  text-align: center;
  font-size: 1.2rem;
  justify-content: center;
}

.header-a {
  color: rgb(188, 240, 192);
  transition: transform 0.3s ease, color 0.3s ease;
  white-space: nowrap;
  margin: 0 15px;
  font-size: 1.1rem;
  cursor: pointer;
}

.header-a:hover {
  transform: scale(1.1);
  color: rgb(156, 235, 162);
}

.main-text {
	font-size: 1.5rem;
	/* color: rgb(55, 55, 55); */
	text-align: center;
	margin-bottom: 25px;
	z-index: 2;
}

.main-content {
  /* display: flex;
  justify-content: center;
  flex-direction: column; */
  /* margin: 10px; */
  /* max-width: 75vw; */

  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  z-index: 2;
  /* align-items: center; */
}

.cards-container {
  /* flex-grow: 1; */
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center;  */
  overflow-x: auto;
  margin-right: 60px;
  margin-left: 60px;
  background-color: rgba(213, 251, 224, 0.3);
  border-radius: 8px;
}

.cards {
  display: flex;
  padding: 20px;
}

.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
}

.card-content {
  background-color: #e0ffff;
  width: 200px;
  height: 300px;
  border-radius: 15px;
}

.card-buttons {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 10px;
}
  
.add-button {
  max-width: 30%;
  margin-top: 5vh;
  padding: 10px 20px;
  display: grid;
  justify-items: center;
  align-items: start;
}

.exit-button {
  margin: auto 0;
  padding: 5px 10px;
}

.to-center {
  display: grid;
  justify-items: center;
  align-items: start;
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
  background-color: rgb(209, 242, 212);
  outline: none;
}

button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  background-color: rgb(188, 240, 192);
  color: rgb(51, 51, 51);
}

.del {
  background-color: rgb(225, 218, 248);
}

.del:hover {
  background-color: rgb(213, 201, 250);
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

.button-group {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
</style>