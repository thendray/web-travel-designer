<template>
    <div class="cards-section">
      <div class="header">
        <div class="main-text">Карточки Вашего Путешествия</div>
        <div class="button-container">
            <button class="filter-btn">фильтры</button>
        </div>
      </div>
      <div class="cards">
        <div v-for="n in cardIds" :key="n" class="card">
          <FullCardForRoom :card-id="n"></FullCardForRoom>
        </div>
      </div>
    </div>
  </template>
<script>

import FullCardForRoom from '../cards/FullCardForRoom.vue';

export default {
  components: {
    FullCardForRoom
  },
  data() {
    return {
      cardIds: []
    }
  },
  created() {
    this.cardIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
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