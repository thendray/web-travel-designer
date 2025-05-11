<template>
    <div class="cards-section">
      <div class="header">
        <div class="main-text">Карточки Вашего Путешествия</div>
        <div class="button-container">
            <!-- <button class="filter-btn">фильтры</button> -->
             <CardFilter :cards=cards v-if="cards" @filtered="filtered"></CardFilter>
        </div>
      </div>
      <div class="cards">
        <div v-for="n in filterCards" :key="n" class="card">
          <FullCardForRoom :card="n" @add-point="addPointToRoute"></FullCardForRoom>
        </div>
      </div>
    </div>
  </template>
<script>

import axios from 'axios';
import FullCardForRoom from '../cards/FullCardForRoom.vue';
import CardFilter from './CardFilter.vue';


export default {
  props: ['id'],
  components: {
    FullCardForRoom,
    CardFilter
  },
  data() {
    return {
      cardIds: [],
      cards: null,
      filterCards: []
    }
  },
  created() {
    const mock = [];
//     const mock = [
//   {
//     id: 1,
//     category: "bed",
//     author: "thendray",
//     rating: "9.0",
//     name: "Отель Метрополь",
//     address: "Театральный пр., 2, Москва, Россия",
//     description: "Исторический отель с роскошными номерами и видом на Большой театр. Идеальное место для отдыха в центре Москвы.",
//     photo: require("../../assets/mock/4.png"),
//     x: 37.620393,
//     y: 55.757399
//   },
//   {
//     id: 2,
//     category: "food",
//     author: "thendray",
//     rating: "9.2",
//     name: "Ресторан White Rabbit",
//     address: "Смоленская пл., 3, Москва, Россия",
//     description: "Высокая кухня с панорамным видом на город. Ресторан White Rabbit предлагает авторские блюда от шеф-повара Владимира Мухина.",
//     photo: require("../../assets/mock/5.png"),
//     x: 37.582645,
//     y: 55.747499
//   },
//   {
//     id: 3,
//     category: "entertainment",
//     author: "thendray",
//     rating: "8.7",
//     name: "Московский планетарий",
//     address: "Садово-Кудринская ул., 5, стр. 1, Москва, Россия",
//     description: "Интерактивные выставки и шоу на куполе Московского планетария подарят незабываемые впечатления и знания о космосе.",
//     photo: require("../../assets/mock/6.png"),
//     x: 37.585223,
//     y: 55.763641
//   }
// ];


    axios.get(`/api/route/${this.id}/cards`, {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then(response => {
        console.log(`response ${response.data}`)
        // this.loading = false;
        this.cards = mock.concat(response.data.cards)
        this.filterCards = this.cards;
      })
      .catch(error => {
        this.cards = mock;
        // this.error = 'Не удалось загрузить данные маршрута';
        console.error('Ошибка при получении данных:', error);
        // this.loading = false;
      });
  },
  methods: {
    filtered(filterCards) {
      this.filterCards = filterCards;
    },
    addPointToRoute(cardId) {
      console.log("add point to route", cardId);
      const request = {
        routeId: this.id,
        cardId: cardId,
        day: localStorage.getItem('currentDay')
      }
      axios.post(`/api/route/add-to-route`, request, {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then(response => {
        console.log(`response ${response.data}`);
        this.$emit('add-point');
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
      });
    }
  }
}

</script>


<style scoped>
.cards-section {
    background-color: rgba(213, 251, 224, 0.3);
    border-radius: 8px;
    padding: 5px;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.5);
    width: 34vw;
    z-index: 2;
}
  
.header {
    text-align: left;
    margin-bottom: 10px;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
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
  background-color: rgb(226, 250, 231);
  outline: none;
}

button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  background-color: rgb(203, 249, 213);
  color: rgb(51, 51, 51);
}


.cards {
    height: 70vh; 
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

/* .card {
    width: 30%;
    height: 90px;
    margin: 5px;
    background-color: rgb(220, 235, 223);
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
} */

.main-text {
    font-size: 1.3rem;
    color: rgb(234, 249, 237);
    text-align: center;
    margin-bottom: 10px;
}

.card {
    background: none;
    border: 0px;
    /* background-color: rgb(221, 242, 251);  */
    /* margin-bottom: 10px; */
    padding: 10px;
    /* border-radius: 5px; */
}
  
</style>