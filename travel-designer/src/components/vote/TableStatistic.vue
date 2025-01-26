<template>
  <div class="current-rating">
    <div class="main-text">Текущий Рейтинг</div>
    <div class="table-wrapper">
      <table>
        <tbody>
          <tr v-for="card in cards" :key="card.id" @click="openModal(card)">
            <td>
              <div class="card-row">
                <div class="card-header">
                  <h3>{{ card.name }}</h3>
                  <div class="category-icon">Иконка</div>
                </div>
                <p>Описание: {{ card.description }}</p>
                <p class="author">by {{ card.author }}</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h3>{{ selectedCard.name }}</h3>
      <p>Полное описание: {{ selectedCard.description }}</p>
      <p>Автор: {{ selectedCard.author }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["roomId"],
  data() {
    return {
      cards: [
        { id: 1, name: 'Карточка номер 1', rating: 5 },
        { id: 2, name: 'Карточка номер 2', rating: 4 },
        { id: 3, name: 'Карточка номер 3', rating: 3.7 },
        { id: 4, name: 'Карточка номер 4', rating: 3.3 },
        { id: 1, name: 'Карточка номер 1', rating: 5 },
      ],
      currentCardIndex: 0,
      showModal: false,
      selectedCard: null,
      localRoomId: null
    };
  },
  created() {
    this.localRoomId = this.roomId;
  },
  methods: {
    openModal(card) {
      this.selectedCard = card;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedCard = null;
    },
  }
}

</script>

<style scoped>

.main-text {
  font-size: 1.5rem;
  /* color: rgb(55, 55, 55); */
  text-align: center;
  margin-bottom: 25px;
  z-index: 2;
}


.current-rating {
  width: 30%;
  height: 80vh;
  overflow-y: auto;
  border: 1px solid #ddd;
}

.table-wrapper {
  width: 100%;
  max-height: 100%;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

.rate-card {
  width: 60%;
  text-align: center;
}

.card-display {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  min-height: 100px;
}

.controls {
  margin-top: 20px;
}

button {
  margin: 0 5px;
}

.card-row {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  position: relative;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-icon {
  background-color: #e0f7fa;
  border-radius: 50%;
  padding: 10px;
  font-size: 12px;
}

.author {
  text-align: right;
  font-style: italic;
}

.rate-card {
  width: 60%;
  text-align: center;
}

.card-display {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  min-height: 150px;
}

.controls {
  margin-top: 20px;
}

button {
  margin: 0 5px;
}

.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 600px;
  width: 90%;
}

.close {
  position: absolute;
  right: 20px;
  top: 10px;
  cursor: pointer;
  font-size: 20px;
}

</style>