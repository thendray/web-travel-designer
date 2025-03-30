<template>
  <div class="route-container">
    <div class="header">
      <div class="main-text">Ваш Маршрут</div>
      <!-- <div class="center-button">
        <button @click="filter">фильтры</button>
      </div> -->
    </div>
    <ul class="list">
      <li 
        v-for="(point, index) in localPoints" 
        :key="index" 
        class="list-item"
        @mouseenter="hoveredIndex = index"
        @mouseleave="hoveredIndex = null"
        @click="showPointInfo(point)"
        draggable="true"
        @dragstart="dragStart(index)"
        @dragover.prevent
        @drop="drop(index)"
      >
        {{ point.name || point }}
        <button 
          v-show="hoveredIndex === index" 
          class="delete-button"
          @click.stop="removePoint(index)"
        >
          -
        </button>
      </li>
    </ul>

    <!-- Модальное окно -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close-button" @click="showModal = false">&times;</span>
        <h2>Информация о точке</h2>
        <div v-if="isObjectPoint">
          <p><strong>Название:</strong> {{ selectedPoint.title || 'Нет названия' }}</p>
          <template v-for="(value, key) in selectedPoint" :key="key">
            <p v-if="key !== 'title'">
              <strong>{{ key }}:</strong> {{ value }}
            </p>
          </template>
        </div>
        <div v-else>
          <p><strong>Значение:</strong> {{ selectedPoint }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      draggedItemIndex: null,
      localPoints: [...this.points],
      hoveredIndex: null,
      showModal: false,
      selectedPoint: null
    };
  },
  props: {
    points: {
      type: Array,
      required: true
    },
    day: {
      required: true
    },
    id: {
      required: true
    }
  },
  computed: {
    isObjectPoint() {
      return this.selectedPoint !== null && typeof this.selectedPoint === 'object';
    },
    pointProperties() {
      if (!this.isObjectPoint) {
        return [];
      }
      return Object.keys(this.selectedPoint).filter(key => key !== 'title');
    }
  },
  watch: {
    points(newPoints) {
      this.localPoints = [...newPoints];
    }
  },
  methods: {
    dragStart(index) {
      this.draggedItemIndex = index;
    },
    drop(index) {
      const draggedItem = this.localPoints[this.draggedItemIndex];

      const request = {
        routeId: this.id,
        cardId: draggedItem.id,
        day: this.day,
        currentPosition: this.draggedItemIndex,
        newPosition: index
      }

      console.log('request', request);

      axios.put(`/api/route/move`, request, {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then(r => {
        console.log('Текущий порядок:', this.localPoints, r);
        this.localPoints.splice(this.draggedItemIndex, 1);
        this.localPoints.splice(index, 0, draggedItem);
        this.draggedItemIndex = null;
        this.$emit('update-points', this.localPoints);
      })
      .catch(error => {
        // this.error = 'Не удалось загрузить данные маршрута';
        console.error('Ошибка при получении данных:', error);
        // this.loading = false;
      });
    },
    filter() {
      alert('Фильтр нажата');
    },
    removePoint(index) {
      const request = {
        routeId: this.id,
        cardId: this.localPoints[index].id,
        day: this.day,
        currentPosition: index
      }
      console.log('Request', request);
      axios.delete(`/api/route/delete-from-route`, {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        data: request
      })
      .then(response => {
        console.log(response);
        this.localPoints.splice(index, 1);
        this.$emit('update-points', this.localPoints);
      })
      .catch(error => {
        // this.error = 'Не удалось загрузить данные маршрута';
        console.error('Ошибка при получении данных:', error);
      });
    },
    showPointInfo(point) {
      this.selectedPoint = point;
      this.showModal = true;
    }
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
  position: relative;
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
  position: relative;
}

.center-button {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.delete-button {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background-color: red;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.delete-button:hover {
  background-color: darkred;
  transform: translateY(-50%) scale(1.1);
}

/* Стили для модального окна */
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
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 80%;
  max-width: 500px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}

.close-button:hover {
  color: red;
}
</style>
