<template>
  <div class="current-rating">
    <div class="main-text">Текущий Рейтинг</div>
    <!-- <div class="table-wrapper"> -->
      <!-- <div class="scrollable-table"> -->
        <div v-for="card in cards" :key="card.id" class="card-item" @click="openModal(card)">
          <div class="card-info">
            <img :src="iconSrc(card.category)" alt="Category Icon" class="category-icon" />
            <h3 class="card-name">{{ card.name }}</h3>
          </div>
          <div class="card-rating">
            <span class="rating-value">{{ card.rating }}</span>
          <!-- </div> -->
        <!-- </div> -->
      </div>
    </div>

    <div v-if="selectedCard" class="modal-overlay" @click="closeModal">
      <div @click.stop>
        <!-- <button class="close-button" @click="closeModal">×</button> -->
        <FullCardForVote :card="selectedCard" :id="id"></FullCardForVote>
      </div>
    </div>
  </div>
</template>

<script>
import FullCardForVote from '../cards/FullCardForVote.vue';
import axios from 'axios';

const icons = {
  'bed': require('../../assets/bed.png'),
  'food': require('../../assets/food.png'),
  'entertainment': require('../../assets/entertaiment.png'),
  'question': require('../../assets/question.png')
};

export default {
  props: ["id"],
  components: {
    FullCardForVote
  },
  data() {
    return {
      cards: null,
      selectedCard: null,
    };
  },
  created() {
    this.cards = [
        // {
        //   id: 1,
        //   category: "bed",
        //   author: "thendray",
        //   rating: "9.0",
        //   name: "Отель Метрополь",
        //   address: "Театральный пр., 2, Москва, Россия",
        //   description: "Исторический отель с роскошными номерами и видом на Большой театр. Идеальное место для отдыха в центре Москвы.",
        //   photo: require("../../assets/icon.jpeg"),
        //   x: 37.620393,
        //   y: 55.757399
        // },
        // {
        //   id: 2,
        //   category: "food",
        //   author: "thendray",
        //   rating: "9.2",
        //   name: "Ресторан White Rabbit",
        //   address: "Смоленская пл., 3, Москва, Россия",
        //   description: "Высокая кухня с панорамным видом на город. Ресторан White Rabbit предлагает авторские блюда от шеф-повара Владимира Мухина.",
        //   photo: require("../../assets/mock/5.png"),
        //   x: 37.582645,
        //   y: 55.747499
        // },
        // {
        //   id: 3,
        //   category: "entertainment",
        //   author: "thendray",
        //   rating: "8.7",
        //   name: "Московский планетарий",
        //   address: "Садово-Кудринская ул., 5, стр. 1, Москва, Россия",
        //   description: "Интерактивные выставки и шоу на куполе Московского планетария подарят незабываемые впечатления и знания о космосе.",
        //   photo: require("../../assets/mock/6.png"),
        //   x: 37.585223,
        //   y: 55.763641
        // }
      ];
      axios.get(`/api/route/${this.id}/cards`, {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then(response => {
        console.log(`response ${response.data}`)
        // this.loading = false;
        this.cards = response.data.cards;
      })
      .catch(error => {
        // this.error = 'Не удалось загрузить данные маршрута';
        console.error('Ошибка при получении данных:', error);
        // this.loading = false;
      }); 
  },
  methods: {
    openModal(card) {
      this.selectedCard = card;
    },
    closeModal() {
      this.selectedCard = null;
    },
    iconSrc(iconStr) {
      return icons[iconStr] || '';
    }
  },
};
</script>

<style scoped>
.current-rating {
  padding: 20px;
  background-color: rgba(243, 200, 178, 0.7);
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  width: 32%;
  max-height: 80vh;
  overflow-y: auto;
  z-index: 4;
  min-height: 80vh;
}

.main-text {
	font-size: 1.5rem;
	color: rgb(56, 10, 10);
	text-align: center;
	margin-bottom: 25px;
	/* z-index: 2; */
}


.card-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  /* border-bottom: 1px solid #eee; */
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin: 10px;
  background-color: rgb(251, 222, 219);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.card-item:hover {
  background-color: rgb(248, 197, 193);
}

.card-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.category-icon {
  width: 24px;
  height: 24px;
}

.card-name {
  font-size: 18px;
  margin: 0;
}

.card-rating {
  font-size: 18px;
  font-weight: bold;
  color: #ffa500;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  position: relative;
  z-index: 5;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.modal-photo {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 15px;
}
</style>