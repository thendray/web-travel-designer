<template>
  <div class="travel-card">
    <!-- Блок с фотографиями -->
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

    <!-- Основной контент (информация о путешествии и топ-3 места) -->
    <div class="content">
      <!-- Информация о путешествии -->
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

      <!-- Топ-3 места -->
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
            <div class="place-address">{{ place.address }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    photos: {
      type: Array,
      default: () => [require('../../assets/mock/4.png'), require('../../assets/mock/5.png'), require('../../assets/mock/6.png')],
    },
    title: {
      type: String,
      default: "Тестовое путешествие",
    },
    duration: {
      type: Number,
      default: 10,
    },
    startPoint: {
      type: String,
      default: "Аэропорт Москвы (SVO)",
    },
    endPoint: {
      type: String,
      default: "Аэропорт Москвы (DME)",
    },
    topPlaces: {
      type: Array,
      default: () => [
        {
          name: "Отель Метрополь",
          address: "Театральный пр., 2, Москва, Россия",
          category: "landmark",
        },
        {
          name: "Ресторан White Rabbit",
          address: "Смоленская пл., 3, Москва, Россия",
          category: "neighborhood",
        },
        {
          name: "Московский планетарий",
          address: "Садово-Кудринская ул., 5, стр. 1",
          category: "museum",
        },
      ],
    },
  },
  methods: {
    getCategoryIcon(category) {
      // Возвращаем URL иконки в зависимости от категории
      switch (category) {
        case "landmark":
          return "https://cdn-icons-png.flaticon.com/512/684/684908.png"; // Иконка достопримечательности
        case "museum":
          return "https://cdn-icons-png.flaticon.com/512/684/684822.png"; // Иконка музея
        case "neighborhood":
          return "https://cdn-icons-png.flaticon.com/512/684/684809.png"; // Иконка района
        default:
          return "https://cdn-icons-png.flaticon.com/512/684/684809.png"; // Иконка по умолчанию
      }
    },
  },
};
</script>

<style scoped>
.travel-card {
  background-color: rgba(240, 249, 242, 0.7);;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 40vw;
  display: flex;
  gap: 16px;
  padding: 16px;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  width: 50%;
}

.photo {
  aspect-ratio: 1;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.default-photo {
  background-color: #e0e0e0;
  font-size: 16px;
  color: #999999;
}

.content {
  flex: 1; /* Основной контент занимает оставшееся пространство */
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-left: 20px;
}

.route-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.title {
  font-size: 18px;
  margin: 0;
  color: #333333;
  font-weight: 600;
}

.duration,
.airport {
  font-size: 14px;
  color: #555555;
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  font-size: 16px;
}

.top-places {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.top-places h3 {
  font-size: 16px;
  margin: 0;
  color: #333333;
  font-weight: 600;
}

.place {
  display: flex;
  align-items: center;
  gap: 8px;
}

.place-icon img {
  width: 20px;
  height: 20px;
}

.place-info {
  flex: 1;
}

.place-name {
  font-size: 14px;
  color: #333333;
  font-weight: 500;
}

.place-address {
  font-size: 12px;
  color: #666666;
}
</style>