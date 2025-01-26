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
      <RoutePoints :points="points" @update-points="updatePoints"></RoutePoints>
      <div ref="mapC" class="map" id="map-container"></div>
    </div>
    <div class="footer">
      <button class="build-route-btn">построить маршрут</button>
    </div>
  </div>
  </template>
  
<script>
import LeftArrow from '../common/LeftArrow.vue'
import RightArrow from '../common/RightArrow.vue';
import RoutePoints from './RoutePoints.vue';

// import { ref } from 'vue';

let map = null;
// const mapC = ref(null);

export default {
    data() {
        return {
          day: 1,
          points: [],
        };
    },
    props: {
      totalDays: {
        type: Number,
        required: true,
        default: 1
      }
    }, 
    components: {
        LeftArrow,
        RightArrow,
        RoutePoints
    },
    created() {
      this.points = ["Точка 1", "Точка 2", "Точка 3", "Точка 4"]
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
      this.interval = setInterval(this.fetchData, 1000); // 
    },
    beforeUnmount() {
      clearInterval(this.interval);
    },
    methods: {
      fetchData() {
        // this.points = [...this.points, "newName"]
        // console.log(this.points);
      },
      prevDay() {
        if (this.day > 1) {
          this.points = this.points.map(x => x.substring(0, x.length - 1));
          this.day = this.day - 1;
        }
      },
      nextDay() {
        if (this.day < this.totalDays) {
          this.points = this.points.map(x => x + "0");
          this.day = this.day + 1;
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
      }
    },
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