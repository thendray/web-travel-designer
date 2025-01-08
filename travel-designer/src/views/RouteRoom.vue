<template>
  <div class="room">
      <header class="header">
        <div>участники</div>
        <div>мои карточки</div>
        <div>голосование</div>
        <div class="title-search">
          <div>Название путешествия</div>
          <div>выйти</div>
        </div>
      </header>
      <div class="main-container">
        <div class="card-section">
          <h3>Карточки Вашего Путешествия</h3>
          <button class="filter-button">фильтры</button>
          <div class="cards">
            <div v-for="n in 6" :key="n" class="card"></div>
          </div>
        </div>
        <div class="route-section">
          <h3 class="day-title">День №1</h3>
          <button class="arrow-button">&#x2190;</button>
          <div class="route-planner">
            <h4>Ваш Маршрут</h4>
            <button class="filter-button">фильтры</button>
            <div class="points">
              <div v-for="point in points" :key="point">{{ point }}</div>
            </div>
            <button class="build-route-button">построить маршрут</button>
          </div>
          <div class="map">
            <h4>Яндекс карта</h4>
          </div>
          <button class="arrow-button">&#x2192;</button>
        </div>
      </div>
  </div>
</template>
  
<script>
export default {
    data() {
        return {
            points: ['Точка 1', 'Точка 2', 'Точка 3', 'Точка 4']
        };
    }
};
</script>

<style scoped>
.room {
    font-family: Arial, sans-serif;
    text-align: center;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #e0e0e0;
    padding: 10px;
}

.main-container {
    display: flex;
    padding: 20px;
}

.card-section {
    width: 30%;
    background-color: #e0f7fa;
    padding: 10px;
}

.cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.card {
    width: 80px;
    height: 100px;
    margin: 10px;
    background-color: #b2ebf2;
}

.route-section {
    width: 70%;
    position: relative;
    background-color: #f3e5f5;
    padding: 10px;
}

.route-planner {
    position: relative;
    display: inline-block;
    width: 30%;
    background-color: #f8bbd0;
    vertical-align: top;
    margin-right: 20px;
}

.map {
    display: inline-block;
    width: 60%;
    background-color: #e0f2f1;
    height: 200px;
}

.day-title {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
}

.filter-button, .build-route-button, .arrow-button {
    margin: 10px 0;
}

.title-search {
    display: flex;
    justify-content: space-between;
    width: 20%;
}
</style>