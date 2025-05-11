<template>
  <div class="travel-card"  @mouseenter="showCopyButton = true" @mouseleave="showCopyButton = false">
    <div class="photo-grid">
      <div
        v-for="(photo, index) in photos"
        :key="index"
        class="photo"
        :style="{ backgroundImage: `url(${photo})` }"
      ></div>
      <div
        v-for="index in 4 - photos.length"
        :key="'default-' + index"
        class="photo default-photo"
      >
        <span>📷</span>
      </div>
    </div>

    <div class="route-info">
      <h2 class="title">{{ title }}</h2>
      <div class="duration">
        <span class="icon">⏳</span> {{ duration }} дней
      </div>
      <div class="airports">
        <div class="airport">
          <span class="icon">✈️</span> {{ startPoint }}
        </div>
        <div class="airport">
          <span class="icon">🛬</span> {{ endPoint }}
        </div>
      </div>
    </div>
    
    <div class="top-places">
      <h3>Топ-3 места</h3>
      <div
        v-for="(place, index) in topPlaces"
        :key="index"
        class="place"
      >
        <div class="place-icon">
          <img :src="getCategoryIcon(place.category)" alt="Иконка" />
        </div>
        <div class="place-info">
          <div class="place-name">{{ place.name }}</div>
          <div class="place-address truncate-text">{{ place.address }}</div>
        </div>
      </div>
    </div>

    <button 
      v-show="showCopyButton" 
      class="copy-button" 
      @click="copyCardInfo"
      title="Копировать маршрут"
    >
      <span class="emoji">📋</span>
    </button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    route: {
      required: true
    }
  },
  data() {
    return {
      showCopyButton: false,
      photos: [],
      title: "",
      duration: "",
      startPoint: "",
      endPoint: "",
      topPlaces: [],
      id: null
    }
  },
  created() {
    var categories = ["landmark", "neighborhood", "museum"]
    this.photos = this.route.photos;
    this.title = this.route.name;
    this.duration = this.route.days;
    this.startPoint = this.route.beginAddress;
    this.endPoint = this.route.endAddress;
    this.topPlaces = this.route.topPlaces.map((topPlace, index) => {
      return {
        name: topPlace.name,
        address: topPlace.address,
        category: categories[index % categories.length] 
      };
    });
    this.id = this.route.id;
  },
  methods: {
    copyCardInfo() {
      const request = {
        userId: localStorage.getItem("id"),
        routeId: this.id
      }
      axios.post('/api/route/copy', request, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          }
        })
        .then(() => {
          alert(`Скопировано. В скором времени маршрут появится в Вашем кабинете.`);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getCategoryIcon(category) {
      switch (category) {
        case "landmark":
          return "https://cdn-icons-png.flaticon.com/512/684/684908.png";
        case "museum":
          return "https://cdn-icons-png.flaticon.com/512/684/684822.png";
        case "neighborhood":
          return "https://cdn-icons-png.flaticon.com/512/684/684809.png"; 
        default:
          return "https://cdn-icons-png.flaticon.com/512/684/684809.png"; 
      }
    },
  },
};
</script>
<style scoped>
.travel-card {
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 90vw; 
  min-width: 90%;
  display: flex;
  gap: 24px;
  padding: 24px;
  position: relative;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  width: 40%;
}

.photo {
  aspect-ratio: 1;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.default-photo {
  background-color: #e0e0e0;
  font-size: 32px;
  color: #999999;
}

.route-info {
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.title {
  font-size: 28px;
  margin: 0;
  color: #333333;
  font-weight: 600;
}

.duration,
.airport {
  /* font-size: 16px; */
  color: #555555;
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  font-size: 20px;
}

.top-places {
  width: 30%;
}

.top-places h3 {
  font-size: 22px;
  margin: 0 0 16px;
  color: #333333;
  font-weight: 600;
}

.place {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.place-icon img {
  width: 24px;
  height: 24px;
}

.place-info {
  flex: 1;
}

.place-name {
  font-size: 16px;
  color: #333333;
  font-weight: 500;
}

.place-address {
  font-size: 14px;
  color: #666666;
}

.copy-button {
  position: absolute;
  bottom: 12px; 
  right: 12px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
  outline: none;
}

.copy-button span {
  font-size: 26px;
}

.copy-button:hover {
  transform: scale(1.1);
  background-color: #f5f5f5;
}

.copy-button:active {
  transform: scale(0.95);
}

.emoji {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.truncate-text {
  max-width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>