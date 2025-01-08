<!-- CardLane.vue -->
<template>
    <div class="card-lane-wrapper">
      <div class="main-text">Карточки для Вас</div>
      <div class="card-lane">
        <div class="card" v-for="n in cards" :key="n">карточка {{ n }}</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      cards: {
        type: Array,
        default: () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      }
    }
  }
  </script>
  
  <style scoped>
  .card-lane-wrapper {
    width: 250px;
    max-height: 70vh; 
    min-width: 50vh;
    overflow-y: auto; 
    background-color: rgba(183, 208, 233, 0.3);
    border-radius: 10px;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.5);
    margin-top: 5vh;
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
    background-color: rgb(221, 242, 251); 
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
  }
  </style>