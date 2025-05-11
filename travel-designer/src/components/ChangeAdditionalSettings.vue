<template>
    <div class="info-section">
      <div class="item" v-for="(value, key) in fields" :key="key">
        <span class="label">{{ key }}</span>
        <div class="value-button-group">
          <span class="value">{{ value }}</span>
          <button @click="openModal(key)">изменить</button>
        </div>
      </div>
  
      <div v-if="showModal" class="modal-backdrop">
        <div class="modal-main">
          <div class="main-text">Изменить {{ currentField }}</div>
          <div class="content">
            <div class="form-fields">
              <div class="form-group">
                <input v-model="newValue" type="text" />

                <div class="button-container">
                  <button type="button" class="modal-button" @click="handleFind">Найти</button>
                  <button type="button" class="modal-button" @click="handleClear">Очистить</button>
                </div>
              </div>

              <div class="form-group">
                <label>Широта</label>
                <input type="text" v-model="taskCoords[0]" placeholder="Широта"/>
                <label>Долгота</label>
                <input type="text" v-model="taskCoords[1]" placeholder="Долгота"/>
              </div>
            </div>

            <div class="map-container" id="map-container-2"></div>
          </div>

          <div class="button-group">
            <button @click="saveChange">Сохранить</button>
            <button @click="cancelChange">Отмена</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
// import { ref } from 'vue';
import axios from 'axios';

let map = null;

export default {
  props: ['start', 'end', 'id'],
  
  data() {
    return {
      lStart: null,
      lEnd: null,
      roomId: null,
      fields: [],
      showModal: false,
      currentField: '',
      newValue: '',
      taskCoords: [null, null]
    }
  },

  created() {
    this.lStart = this.start;
    this.lEnd = this.end;
    this.fields = {
        "Начальная точка путешествия": this.lStart,
        "Конечная точка путешествия": this.lEnd,
      };
    this.roomId = this.id;

    console.log('roomid', this.roomId);
  },
  watch: {
    showModal(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          if (document.getElementById('map-container-2')) {
            console.log("map-container-2 существует");
            window.ymaps.ready(() => {
              this.initMap();
            });
          }
        });
      }
    },
  },
  methods: {
    handleClear() {
      if (map) {
        map.geoObjects.removeAll();
        this.newValue = ""
      }
    },
    handleFind() {
      if (this.newValue != "") {
        var geoCode = window.ymaps.geocode(this.newValue);
        geoCode.then(
          (res) => {
            console.log("запрос: ", this.newValue, "ответ: ", res.geoObjects);
            res.geoObjects.events
                  .add('mouseenter', (event) => {
                      var geoObject = event.get('target');
                      map.hint.open(geoObject.geometry.getCoordinates(), geoObject.getAddressLine());
                  })
                  .add('mouseleave', () => {
                      map.hint.close(true);
                  })
                  .add('click', (event) => {
                      var geoObject = event.get('target');
                      var coords = geoObject.geometry.getCoordinates();
                      this.taskCoords = coords;

                      console.log("Координаты метки: ", [coords[0].toPrecision(8), coords[1].toPrecision(8)].join(", "))
                  })
                  ;
            
            map.geoObjects.removeAll();
            map.geoObjects.add(res.geoObjects);
            map.setBounds(res.geoObjects.getBounds());
          },
          function(err){
            console.log("Ошибка", err)
          }
        )
      }
    },
    openModal(key) {
      this.currentField = key;
      this.newValue = this.fields[key];
      this.showModal = true;
    },
    saveChange() {
      var request;
      if (this.currentField) {
        this.fields[this.currentField] = this.newValue;
        if (this.currentField == 'Начальная точка путешествия') {
          request = {
            address: this.newValue,
            routeId: this.roomId,
            x: this.taskCoords[0],
            y: this.taskCoords[1],
            isBegin: true
          }
        } else if (this.currentField == 'Конечная точка путешествия') {
          request = {
            routeId: this.roomId,
            address: this.newValue,
            x: this.taskCoords[0],
            y: this.taskCoords[1],
            isBegin: false
          }
        }
      }

      axios.post(`/api/route/add/settings`, request, {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then(response => {
        console.log(`response ${response.data}`);
        this.showModal = false;
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
      });
    },
    cancelChange() {
      this.showModal = false;
    },
    initMap() {
      map = new window.ymaps.Map("map-container-2", {
          center: [55.751574, 37.573856],
          zoom: 9,
          controls: ["zoomControl"]
        }, {
          maxZoom: 18
      });

      this.handleMapClick();
    },
    handleMapClick() {
      map.events.add("click", (e) => {
        console.log(e);
        if (!map.balloon.isOpen()) {
          var coords = e.get("coords");
          this.taskCoords = [coords[0].toPrecision(8), coords[1].toPrecision(8)];

          map.balloon.open(coords, {
            contentHeader: "Событие!",
            contentBody:
              "Координаты щелчка: " +
              this.taskCoords.join(", ") +
              "</p>",
            contentFooter: "<sup>Щелкните еще раз</sup>",
          });

          console.log("Координаты щелчка: ", this.taskCoords.join(", "))
        } else {
          map.balloon.close();
        }
      });
    }
  }
}
</script>

<style scoped>
.info-section {
  background-color: rgba(251, 251, 247, 0.75);
  padding: 20px;
  min-width: 50%;
  margin: 20px auto;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

.item {
  margin-bottom: 30px;
}

.label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;

}

.value-button-group {
  /* display: flex;
  align-items: center; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border-radius: 4px; */
  /* background-color: #f9f9f9; */
  /* padding: 5px 10px; */
  margin-top: 10px;
  /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); */
}

.value {
  background-color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  margin-right: 10px;
  min-width: 200px;
  text-align: left;
  border: 1px solid #ccc;
  min-height: 2rem;
}

button {
  padding: 5px 10px;
  width: 100%;
  margin: 0 5px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  color: rgb(51, 51, 51);
  background-color: rgb(252, 252, 231);
  outline: none;
}

button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  background-color: rgb(252, 252, 219);
  color: rgb(51, 51, 51);
}

.button-group {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  /* right: 0;
  bottom: 0; */
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-main {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 80%; 
  min-width: 500px;
  width: 100%; 
}


.content {
  display: flex;
  gap: 20px; 
  padding-bottom: 10px;
}

.form-fields {
  flex: 2;
  display: flex;
  flex-direction: column; 
}

.form-fields input {
  margin-bottom: 15px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.map-container {
  flex: 5; 
  /* height: 400px;  */
  box-sizing: border-box;
  width: 100%; 
  min-width: 50%; 
}

button {
  margin-right: 10px;
  outline: none;
}

.button-container {
  display: flex;
  width: 100%;
  padding-bottom: 15px;
  justify-content: space-between;
}

.form-group {
    margin-bottom: 15px;
}

.main-text {
	font-size: 1.5rem;
	/* color: rgb(55, 55, 55); */
	text-align: center;
	margin-bottom: 25px;
	z-index: 2;
}

.modal-button {
  background-color: rgb(250, 234, 157);
}
</style>