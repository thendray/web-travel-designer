<template>
  <div class="itinerary">
    <div class="header">
      <div class="arrow">
        <LeftArrow @click="prevDay"></LeftArrow>
      </div>
      <div class="day-selector">
        <div class="main-text">День № {{ day }}</div>
        <select v-model.number="day" id="daySelector"> </select>
      </div>
      <div class="arrow">
        <RightArrow @click="nextDay"></RightArrow>
      </div>
    </div>
    <div class="content">
      <RoutePoints :points="points" :day="day" :id="id" @update-points="updatePoints"></RoutePoints>
      <div ref="mapC" class="map" id="map-container"></div>
    </div>
    <div class="footer">
      <button class="build-route-btn" @click="drawRoute">построить маршрут</button>
      <button class="build-route-btn" @click="removeAllLines">очистить маршрут</button>
      <button class="build-route-btn" @click="detailedRoute">посмотреть детализацию</button>
    </div>
  </div>
  </template>
  
<script>
import LeftArrow from '../common/LeftArrow.vue'
import RightArrow from '../common/RightArrow.vue';
import RoutePoints from './RoutePoints.vue';
import axios from 'axios';

// import { ref } from 'vue';

let map = null;
// const mapC = ref(null);

export default {
    data() {
        return {
          day: 1,
          points: [],
          placemarks: [],
          activeFilter: null, 
          filterButtons: [], 
          showAllButton: null,
          categories: [ {ru:"отель", en: "bed"}, {ru: "развлечения", en: "entertainment"}, {ru: "еда", en: "food"}, {ru: "другое", en: "question"}],
          filterPoints: []
        };
    },
    props: {
      totalDays: {
        type: Number,
        required: true,
        default: 1
      },
      id: {
        required: true
      }
    }, 
    components: {
        LeftArrow,
        RightArrow,
        RoutePoints
    },
    created() {
//       this.points = [
//   {
//     id: 1,
//     category: "bed",
//     author: "thendray",
//     rating: "9.0",
//     name: "Отель Метрополь",
//     description: "Исторический отель с роскошными номерами и видом на Большой театр. Идеальное место для отдыха в центре Москвы.",
//     photoUrl: require("../../assets/mock/4.png"),
//     routePoint: {
//       y: 37.620393,
//       x: 55.757399,
//       address: "Театральный пр., 2, Москва, Россия",
//     }
//   },
//   {
//     id: 2,
//     category: "food",
//     author: "thendray",
//     rating: "9.2",
//     name: "Ресторан White Rabbit",
//     description: "Высокая кухня с панорамным видом на город. Ресторан White Rabbit предлагает авторские блюда от шеф-повара Владимира Мухина.",
//     photoUrl: require("../../assets/mock/5.png"),
//     routePoint: {
//       y: 37.582645,
//       x: 55.747499,
//       address: "Смоленская пл., 3, Москва, Россия",
//     }
//   },
//   {
//     id: 3,
//     category: "entertainment",
//     author: "thendray",
//     rating: "8.7",
//     name: "Московский планетарий",
//     address: "Садово-Кудринская ул., 5, стр. 1, Москва, Россия",
//     description: "Интерактивные выставки и шоу на куполе Московского планетария подарят незабываемые впечатления и знания о космосе.",
//     photoUrl: require("../../assets/mock/6.png"),
//     routePoint: {
//       y: 37.585223,
//       x: 55.763641,
//       address: "Садово-Кудринская ул., 5, стр. 1, Москва, Россия",
//     }
//   }
// ];
      this.fetchData();
    },
    mounted() {
      const selectElement = document.getElementById('daySelector');
      for (let d = 1; d <= this.totalDays; d++) {
        selectElement.add(new Option(d, d));
      }

      if (document.getElementById('map-container')) {
        window.ymaps.ready(() => {
          this.initMap();
          console.log("карта инициализирована!");
        });
      }

      this.fetchData();
      // this.interval = setInterval(this.fetchData, 10000); // TODO вернуть
    },
    beforeUnmount() {
      clearInterval(this.interval);
    },
    watch: {
      points: {
        handler() {
          this.filterPoints = this.points;
          this.filterButtons.forEach(button => {
          button.deselect();
           });
          this.updatePlacemarks();
        },
        deep: true
      }
    },
    methods: {
      fetchData() {
        axios.get(`/api/route/${this.id}/details/${this.day}`, {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then(response => {
        this.points = response.data.pointNamesInOrder;
        console.log(`response ${this.points}`);
        this.filterPoints = this.points;
      localStorage.setItem('currentDay', this.day);
      })
      .catch(error => {
        this.error = 'Не удалось загрузить данные маршрута';
        console.error('Ошибка при получении данных:', error);
        this.loading = false;
      });
      },
      prevDay() {
        if (this.day > 1) {
          // this.points = this.points.map(x => x.substring(0, x.length - 1));
          this.day = this.day - 1;
          this.fetchData();
        }
      },
      nextDay() {
        if (this.day < this.totalDays) {
          // this.points = this.points.map(x => x + "0");
          this.day = this.day + 1;
          this.fetchData();
        }
      },
      initMap() {
        map = new window.ymaps.Map("map-container", {
          center: [55.751574, 37.573856],
          zoom: 9,
          controls: []
        }, {
          maxZoom: 18
        });

        this.removeMapControls();
        this.disableMapBehaviors();
        this.addFilterButtonsToMap();

        this.updatePlacemarks();
      },
      removeMapControls() {
        if (map) {
          map.controls.add("zoomControl");
        }
      },
      disableMapBehaviors() {
        if (map) {
         // map.behaviors.disable(["scrollZoom"]);
        }
      },
      updatePoints(newPoints) {
        console.log("updatePoints");
        this.points = newPoints;
      },

      updatePlacemarks() {
        if (!map) return;
        
        // Очищаем существующие метки
       
        map.geoObjects.removeAll();
        
        
        // Добавляем новые метки
        this.filterPoints.forEach((point, index) => {
          const placemark = this.createNumberedPlacemark(
            point,
            index + 1,
            {
              balloonContent: point.name || '',
              hintContent: point.name + ` Точка ${index + 1}`,
              category: point.category
            }
          );
          
          map.geoObjects.add(placemark);
          this.placemarks.push(placemark);
        });
        
        // Если есть точки, устанавливаем зум чтобы все точки были видны
        if (this.filterPoints.length > 0) {
          map.setBounds(map.geoObjects.getBounds(), {
            checkZoomRange: true,
            zoomMargin: 10
          });
        }
      },

      createNumberedPlacemark(point, number, properties = {}) {

        // Определяем цвет в зависимости от типа точки
        const colors = {
          'food': '#FF5252',
          'bed': '#4285F4',
          'entertainment': '#43A047',
          'question':  '#c543f4'
        };

        const color = colors[point.category] || '#4285F4';

        // И используем в макете
        const CustomNumberIconContentLayout = window.ymaps.templateLayoutFactory.createClass(
          '<div style="background-color: ' + color + '; color: #fff; font-weight: bold; ' +
          'border-radius: 50%; width: 24px; height: 24px; line-height: 24px; ' + 
          'text-align: center; font-size: 14px;">$[properties.iconContent]</div>'
        );
        
        return new window.ymaps.Placemark([point.routePoint.xCoord, point.routePoint.yCoord], 
          // Содержимое балуна и иконки
          {
            ...properties,
            iconContent: number.toString()
          }, 
          // Опции метки
          {
            // Используем кастомный макет для содержимого метки
            iconLayout: 'default#imageWithContent',
            iconImageHref: '', // Прозрачная 1x1 px картинка
            iconImageSize: [24, 24],
            iconImageOffset: [-12, -12],
            // Макет содержимого иконки
            iconContentLayout: CustomNumberIconContentLayout
          }
        );
      },

      drawRoute() {
        if (this.points.length < 2) return;
        
        // Собираем координаты всех точек
        const coordinates = this.points.map(point => [point.routePoint.xCoord, point.routePoint.yCoord]);
        
        // Создаем ломаную линию
        const polyline = new window.ymaps.Polyline(coordinates, {}, {
          strokeColor: '#1976D2',
          strokeWidth: 4,
          strokeOpacity: 0.7
        });
        
        map.geoObjects.add(polyline);
      },

      removeAllLines() {
        map.geoObjects.removeAll();
        this.updatePlacemarks();
      },

      addFilterButtonsToMap() {
        if (!map) return;
        
        // Очищаем массив кнопок фильтров
        this.filterButtons = [];
        const ButtonLayout = window.ymaps.templateLayoutFactory.createClass([
           
        ].join(''));
        

        // Добавляем кнопки для каждой категории
        this.categories.forEach((category, index) => {
        
          
          const button = new window.ymaps.control.Button({
            data: {
              content: category.ru
            },
            options: {
              selectOnClick: true,
              selected: true, // Изначально все категории видимы
              float: 'left',
              floatIndex: 100 + index,
              layaout: ButtonLayout
            }
          });
          
          // Сохраняем категорию в свойствах кнопки
          button.category = category;
          
          // Добавляем обработчик клика
          button.events.add('click', () => {
            if (button.isSelected()) {
              // Если кнопка выбрана, показываем точки этой категории
              this.showPointsByCategory(category);
            } else {
              // Если кнопка не выбрана, скрываем точки этой категории
              this.hidePointsByCategory(category);
            }
          });
          
          // Добавляем кнопку на карту
          map.controls.add(button);
          this.filterButtons.push(button);
        });
      },

      // Показать точки определенной категории
      showPointsByCategory(category) {
        // Находим точки этой категории, которые еще не отображены

        const toShow = this.points.filter(point => 
          point.category === category.en
        ).concat(this.filterPoints);

        this.filterPoints = this.points.filter(point =>
          toShow.includes(point)
        )

        console.log(this.filterPoints);
        
        this.updatePlacemarks();
      },

      // Скрыть точки определенной категории
      hidePointsByCategory(category) {
        console.log("hide", category)

        this.filterPoints = this.filterPoints.filter(point =>
          point.category !== category.en
        )

        console.log(this.filterPoints);
        
        this.updatePlacemarks();
      },

      updateMapBounds() {
        if (this.placemarks.length > 0) {
          // Устанавливаем границы карты
          map.setBounds(map.geoObjects.getBounds(), {
            checkZoomRange: true,
            zoomMargin: 10
          }).then(() => {
            // После установки границ проверяем текущий zoom
            const currentZoom = map.getZoom();
            const maxZoom = 18;
            
            // Если текущий zoom больше максимально допустимого, уменьшаем его
            if (currentZoom > maxZoom) {
              map.setZoom(maxZoom);
            }
          });
        }
      },

      detailedRoute() {
        const formattedPairs = this.filterPoints.map(point => `${point.routePoint.xCoord}%2C${point.routePoint.yCoord}`);
        const urlPart = formattedPairs.join('~');

        const url = `https://yandex.ru/maps/?ll=&mode=routes&rtext=${urlPart}&rtt=pd&ruri=~&source=serp_navig`;
        
        window.open(url, '_blank');
      },
      addPointToRoute() {
        this.fetchData();
      }
    }
};
</script>
  
<style scoped>
.itinerary {
  flex: 2;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  z-index: 2;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: rgba(234, 249, 237, 0.6);
  padding-bottom: 10px;
  border-radius: 8px;
  margin-bottom: 5px;
}
  
.arrow {
	align-items: center;
  margin-left: 5px;
  margin-right: 15px;;
}

.content {
  display: flex;
  flex: 1;
}

.filter-btn {
  background-color: #b39ddb;
  border: none;
  width: 100%;
  margin-bottom: 10px;
  padding: 5px;
  cursor: pointer;
  border-radius: 3px;
}

.points {
  list-style-type: none;
  padding: 0;
}

.points li {
  background-color: #d1c4e9;
  margin: 5px 0;
  padding: 5px;
  border-radius: 3px;
  text-align: center;
}

.map {
  flex: 1;
  width: 100%;
  /* min-width: 50%; */
  height: 100%;
  /* z-index: 3; */
  margin-bottom: 5px;
  max-height: 75vh;
  max-width: 75vw;
}
  
.footer {
  padding: 10px;
  background-color: rgba(234, 249, 237, 0.6);
  display: flex;
  justify-content: center;
  border-radius: 8px;
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


.main-text {
  font-size: 1.3rem;
  color: rgb(19, 21, 21);
  text-align: center;
  /* margin-bottom: 10px; */
}

.day-selector {
  display: flex;
  align-items: center; 
  gap: 10px;
}

select {
  /* padding: 5px; */
  border-radius: 4px;
  border: 1px solid #ccc;
  outline: none;
  /* height: 100px; */
  /* max-height: 100px;
  overflow-y: auto; */

}

</style>