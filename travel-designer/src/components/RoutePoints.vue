<template>
    <div class="route-container">
      <div class="header">
        <div class="main-text">Ваш Маршрут</div>
        <div class="center-button">
            <button @click="filter">фильтры</button>
        </div>
      </div>
      <ul class="list">
        <li
          v-for="(point, index) in localPoints"
          :key="index"
          class="list-item"
          draggable="true"
          @dragstart="dragStart(index)"
          @dragover.prevent
          @drop="drop(index)"
        >
          {{ point }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        draggedItemIndex: null,
        localPoints: [...this.points],
      };
    },
    props: {
        points: {
            type: Array,
            required: true,
            default: () => ["Точка 1", "Точка 2", "Точка 3", "Точка 4", "3", "3", "5", "d", "a", "s"]
        }
    },
    methods: {
      dragStart(index) {
        this.draggedItemIndex = index;
      },
      drop(index) {
        const draggedItem = this.localPoints[this.draggedItemIndex];
        this.localPoints.splice(this.draggedItemIndex, 1);
        this.localPoints.splice(index, 0, draggedItem);
        this.draggedItemIndex = null;
  
        // Печатаем текущий порядок в консоль
        console.log('Текущий порядок:', this.localPoints);
      },
      filter() {
        alert('Фильтр нажата');
      },
    },
  };
  </script>
  
<style scoped>
.route-container {
    width: 200px;
    background-color: rgba(213, 251, 224, 0.5);
    padding: 10px;
    border-radius: 8px;
    margin-right: 5px;
    margin-bottom: 5px;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.5);
    height: 70vh;
}
  
.header {
    margin-bottom: 15px;
}
  
.main-text {
    font-size: 1.3rem;
    color: rgb(240, 249, 242);
    text-align: center;
    margin-bottom: 10px;
}

button {
  padding: 8px 10px;
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
  
.list {
    max-height: 80%;
    overflow-y: auto;
    padding: 0;
}
  
.list-item {
    background-color: rgb(220, 235, 223);
    padding: 10px;
    margin-bottom: 5px;
    cursor: move;
    list-style: none;
    border-radius: 5px;
}

.center-button {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}
</style>