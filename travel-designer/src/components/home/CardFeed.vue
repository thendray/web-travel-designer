<template>
    <div class="card-lane-wrapper">
      <div class="main-text">Карточки для Вас</div>
      <div class="card-lane" v-if="recCards">
        <div class="card" v-for="n in recCards" :key="n"> 
          <FullCard :card-data="n"></FullCard>
        </div>
      </div>
    </div>
    <!-- <div v-else>
      <WaitLoading></WaitLoading>
    </div> -->
  </template>
  
<script>
import axios from 'axios';
import FullCard from '../cards/FullCard.vue';
// import WaitLoading from '../common/WaitLoading.vue';

export default {
    components: {
      FullCard,
      // WaitLoading
    },
    data() {
      return {
        recCards: null
      }
    },
    // props: {
    //   cards: {
    //     type: Array,
    //     default: () => [
    //       {icon: "bed", author: "thendray", rating: "8.0", name: "Отель Attrap Reves", address: "Альпы Верхнего Прованса, Франция", description: "Огромный стеклянный пузырь с уютным травяным полом, панорамными стенами и крышей — так выглядят апартаменты в этом отеле. Бонусом в каждом номере установлен телескоп: где еще смотреть на звезды, если не здесь. Материал, из которого сделаны стены и пол похож на стекло, но он не пропускает ультрафиолетовые лучи днем, а ночью удерживает сырость и насекомых снаружи", photoUrl: require('../../assets/mock/1.png')},
    //       {icon: "bed", author: "thendray", rating: "8.5", name: "Arctic TreeHouse Hotel", address: "Рованиеми, финская Лапландия", description: "Полюбоваться северным сиянием прямо у подножия векового леса — вот зачем потоки туристов ежегодно стекаются сюда. Arctic TreeHouse Hotel находится на самом популярном туристическом направлении: здесь не только идеально видно северное сияние, но и до Деревни Санта-Клауса рукой подать.", photoUrl: require('../../assets/mock/2.png')},
    //       {icon: "bed", author: "thendray", rating: "8.8", name: "ION Luxury Adventure Hotel", address: "Несьявеллир, Исландия", description: "Геотермальные источники и склон вулкана Хейнгидль — отель ION Luxury Adventure Hotel находится в заповедной зоне. В 18 км от него — Национальный парк Тингведлир, который включен в список всемирного наследия ЮНЕСКО..", photoUrl: require('../../assets/mock/3.png')},
    //     ]
    //   }
    // },
    created() {
      axios.get(`/api/recommendation/place/${localStorage.getItem('id')}`, {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then(response => {
        this.recCards = response.data.cards;
        // console.log(this.recCards);
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
      });
    },
  }
  </script>
  
  <style scoped>
  .card-lane-wrapper {
    width: 250px;
    max-height: 80vh; 
    min-width: 25vw;
    overflow-y: auto; 
    background-color: rgba(183, 208, 233, 0.3);
    border-radius: 10px;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.5);
    min-height: 80vh;
    /* margin-top: 5vh; */
  }

  .main-text {
    font-size: 1.3rem;
    color: rgb(240, 249, 249);
    text-align: center;
    margin-top: 10px;
  }
  
  .card-lane {
    padding: 10px;
  }
  
  .card {
    background: none;
    border: 0px;
    /* background-color: rgb(221, 242, 251);  */
    margin-bottom: 10px;
    padding: 10px;
    /* border-radius: 5px; */
  }
  </style>