<template>
  <div class="itinerary">
    <div class="header">
      <div class="arrow">
        <LeftArrow @click="prevDay"></LeftArrow>
      </div>
      <div class="day-selector">
        <div class="main-text">День № {{ day }}</div>
        <select v-model.number="day" id="daySelector" @change="handleDayChange"> </select>
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
// import FullCard from '../cards/FullCard.vue';
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
          filterPoints: [],
          extraPoint: null,
          showExtra: true
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
        RoutePoints,
        // FullCard
    },
    created() {
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
      handleDayChange() {
        console.log('Выбран день:', this.day);
        
        this.fetchData();
      },
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
        this.extraPoint = response.data.extraPoint;
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
       
        map.geoObjects.removeAll();
        
        this.filterPoints.forEach((point, index) => {
          const balloonContent = `
  <style scoped>
    .c-my-card {
      background: linear-gradient(to bottom right, rgba(167, 202, 252, 0.85), rgba(181, 249, 253, 0.85));
      border-radius: 12px; 
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
      position: relative;
      display: flex;
      flex-direction: column;
    }
    .c-name {
      font-weight: bold;
      margin: 8px 0 4px;
    }
    .c-address {
      margin-bottom: 8px;
      font-style: italic;
      color: #333;
    }
    .c-description {
      max-height: 10vh;
      overflow-y: auto;
      margin-top: 4px;
      margin-bottom: 16px;
    }
    .c-footer {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      position: absolute;
      bottom: 8px;
      right: 8px;
      width: 100%;
    }
    .c-footer span {
      margin-right: 8px;
    }
  </style>
  <div class="c-my-card">
    <h5 class="c-name">${point.name}</h5>
    <p class="c-address">${point.routePoint.address}</p>
    <div class="c-description">
      <p>${point.description}</p>
    </div>
    <div class="c-footer">
      <span>by ${point.author}</span>
    </div>
  </div>
`;

          const placemark = this.createNumberedPlacemark(
            point,
            index + 1,
            {
              balloonContent: balloonContent,
              hintContent: point.name + ` Точка ${index + 1}`,
              category: point.category
            }
          );
          
          map.geoObjects.add(placemark);
          this.placemarks.push(placemark);
        });

        if (this.extraPoint && this.showExtra) {
          const extraPlacemark = new window.ymaps.Placemark(
            [this.extraPoint.x, this.extraPoint.y],
            {
              balloonContent: `${this.extraPoint.address}`,
              hintContent: '✈️ Отправная точка путешествия',
              iconContent: '✈️' 
            },
            {
              iconLayout: 'default#imageWithContent',
              iconContentLayout: window.ymaps.templateLayoutFactory.createClass(
                  '<div style="font-size: 24px;">$[properties.iconContent]</div>'
              ),
        
              iconImageHref: '',  
              iconImageSize: [50, 50],
              iconImageOffset: [-20, -20]
              
            }
          );
          
          map.geoObjects.add(extraPlacemark);
        }
        
        if (this.filterPoints.length > 0) {
          map.setBounds(map.geoObjects.getBounds(), {
            checkZoomRange: true,
            zoomMargin: 10
          });
        }
      },

      createNumberedPlacemark(point, number, properties = {}) {

        const colors = {
          'food': '#FF5252',
          'bed': '#4285F4',
          'entertainment': '#43A047',
          'question':  '#c543f4'
        };

        const color = colors[point.category] || '#4285F4';

        const CustomNumberIconContentLayout = window.ymaps.templateLayoutFactory.createClass(
          '<div style="background-color: ' + color + '; color: #fff; font-weight: bold; ' +
          'border-radius: 50%; width: 24px; height: 24px; line-height: 24px; ' + 
          'text-align: center; font-size: 14px;">$[properties.iconContent]</div>'
        );
        
        return new window.ymaps.Placemark([point.routePoint.xCoord, point.routePoint.yCoord], 
          {
            ...properties,
            iconContent: number.toString()
          }, 
          {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '',
            iconImageSize: [24, 24],
            iconImageOffset: [-12, -12],
            iconContentLayout: CustomNumberIconContentLayout
          }
        );
      },

      drawRoute() {
        if (this.points.length < 2) return;
        
        const coordinates = this.filterPoints.map(point => [point.routePoint.xCoord, point.routePoint.yCoord]);
        
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
        
        this.filterButtons = [];
        
        const colors = {
          'food': '#FF5252',
          'bed': '#4285F4',
          'entertainment': '#43A047',
          'question': '#c543f4'
        };
        
        this.categories.forEach((category, index) => {
          const buttonColor = colors[category.en] || '#FF5252';

          const styleNormal = `
            border-radius: 10px;
            padding: 4px 14px;
            margin: 2px 4px 0 0;
            font-size: 15px;
            font-family: inherit;
            color: #fff;
            border: none;
            cursor: pointer;
            font-weight: 400;
            background-color: ${buttonColor};
            box-shadow: 0 2px 7px rgba(60,60,90,.11);
            transition: box-shadow 0.12s, background-color 0.14s, color 0.14s;
            outline: none;
            letter-spacing: 0.3px;
            user-select: none;
          `;

          const styleSelected = `
            border-radius: 10px;
            padding: 4px 14px;
            margin: 2px 4px 0 0;
            font-size: 15px;
            font-family: inherit;
            color: #363636;
            border: 1.2px solid #d1d1d1;
            cursor: pointer;
            font-weight: 400;
            background-color: #f4f4f6;
            box-shadow: none;
            outline: none;
            letter-spacing: 0.3px;
            user-select: none;
          `;

          const CategoryButtonLayout = window.ymaps.templateLayoutFactory.createClass(
            `<button style="{% if state.selected %}${styleSelected}{% else %}${styleNormal}{% endif %}">
              {{ data.content }}
            </button>`
          );

          const button = new window.ymaps.control.Button({
            data: {
              content: category.ru,
              color: buttonColor
            },
            options: {
              selectOnClick: true,
              selected: true,
              float: 'left',
              floatIndex: 100 + index,
              layout: CategoryButtonLayout
            }
          });
          
          button.category = category;
          
          button.categoryColor = buttonColor;

          button.events.add('click', () => {
            if (button.isSelected()) {
              this.showPointsByCategory(category);
            } else {
              this.hidePointsByCategory(category);
            }
          });
          
          map.controls.add(button);
          this.filterButtons.push(button);
        });
      },

      showPointsByCategory(category) {

        const toShow = this.points.filter(point => 
          point.category === category.en
        ).concat(this.filterPoints);

        this.filterPoints = this.points.filter(point =>
          toShow.includes(point)
        )

        console.log(this.filterPoints);

        if (category.en == 'question') {
          this.showExtra = true;
        }
        
        this.updatePlacemarks();
      },

      hidePointsByCategory(category) {
        this.filterPoints = this.filterPoints.filter(point =>
          point.category !== category.en
        )
        if (category.en == 'question') {
          this.showExtra = false;
        }
        
        this.updatePlacemarks();
      },

      updateMapBounds() {
        if (this.placemarks.length > 0) {

          map.setBounds(map.geoObjects.getBounds(), {
            checkZoomRange: true,
            zoomMargin: 10
          }).then(() => {

            const currentZoom = map.getZoom();
            const maxZoom = 18;
            
            if (currentZoom > maxZoom) {
              map.setZoom(maxZoom);
            }
          });
        }
      },

      detailedRoute() {
        var formattedPairs = this.filterPoints.map(point => `${point.routePoint.xCoord}%2C${point.routePoint.yCoord}`);
        // if (this.extraPoint && this.showExtra) {
        //   formattedPairs = [`${this.extraPoint.x}%2C${this.extraPoint.y}`].concat(formattedPairs)
        // }
        const urlPart = formattedPairs.join('~');

        const url = `https://yandex.ru/maps/?ll=&mode=routes&rtext=${urlPart}&rtt=pd&ruri=~&source=serp_navig`;
        
        window.open(url, '_blank');
      },
      addPointToRoute() {
        this.fetchData();
      },
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