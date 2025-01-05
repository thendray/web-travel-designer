<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="content">
        <div class="form-fields">
          <div class="form-group">
            <label>Поле 1</label>
            <input type="text" v-model="field1" placeholder="Поле 1">
          </div>
          <div class="form-group">
            <label>Поле 2</label>
            <input type="text" v-model="field2" placeholder="Поле 2">
          </div>
          <div class="form-group">
              <label>Поле 3</label>
              <input type="text" v-model="field3" placeholder="Поле 3">
          </div>
          <div class="form-group">
              <label>Поле 4</label>
              <input type="text" placeholder="Поле 4" v-model="field4" />
              <div class="button-container">
                <button type="button" class="half-width" @click="handleFind">Найти</button>
                <button type="button" class="half-width" @click="handleClear">Очистить</button>
              </div>
          </div>

          <div class="form-group">
            <label>Широта</label>
            <input type="text" v-model="taskCoords[0]" placeholder="Широта"/>
            <label>Долгота</label>
            <input type="text" v-model="taskCoords[1]" placeholder="Долгота"/>
          </div>
          
        </div>
        <div ref="mapC" class="map-container" id="map-container"></div>
      </div>
      <div class="action-buttons">
        <button type="button" @click="handleSave" class="styled-button">Сохранить</button>
        <button type="button" @click="handleClose" class="styled-button">Отмена</button>
      </div>

      <!-- Подключаем модальное окно для алерта -->
      <AlertModal v-if="showAlert" :message="alertMessage" @close="handleClose" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import AlertModal from './AlertModal.vue';

export default {
  components: {
    AlertModal
  },
  setup(props, {emit}) {
    const mapC = ref(null);
    const field1 = ref("");
    const field2 = ref("");
    const field3 = ref("");
    const field4 = ref("");

    const showAlert = ref(false);
    const alertMessage = ref("");
    const taskCoords = ref([null, null]);

    let map = null;

    onMounted(() => {
      if (window.ymaps && window.ymaps.ready) {
        window.ymaps.ready(initMap);
      }
    });

    function handleMapClick() {
      map.events.add("click", function (e) {
        if (!map.balloon.isOpen()) {
          var coords = e.get("coords");
          taskCoords.value = [coords[0].toPrecision(8), coords[1].toPrecision(8)];
          map.balloon.open(coords, {
            contentHeader: "Событие!",
            contentBody:
              "Координаты щелчка: " +
              taskCoords.value.join(", ") +
              "</p>",
            contentFooter: "<sup>Щелкните еще раз</sup>",
          });

          console.log("Координаты щелчка: ", taskCoords.value.join(", "))
        } else {
          map.balloon.close();
        }
      });

      // map.events.add("contextmenu", function (e) {
      //   map.hint.open(e.get("coords"), "Кто-то щелкнул правой кнопкой");
      // });

      map.events.add("balloonopen", function () {
        map.hint.close();
      });
    }

    function initMap() {
      map = new window.ymaps.Map("map-container", {
        center: [55.751574, 37.573856],
        zoom: 9,
        controls: ['default']
      }, {
        maxZoom: 18
    });

      removeMapControls();
      disableMapBehaviors();
      handleMapClick();
    }

    function removeMapControls() {
      if (map) {
        map.controls.remove("searchControl");
        map.controls.remove("trafficControl");
        map.controls.remove("typeSelector");
        map.controls.remove("fullscreenControl");
        map.controls.remove("rulerControl");
      }
    }

    function disableMapBehaviors() {
      if (map) {
        // map.behaviors.disable(["scrollZoom"]);
      }
    }

    function handleSave() {
      console.log('Данные формы:', field1.value, field2.value, field3.value);
      alertMessage.value = 'Данные сохранены!';
      showAlert.value = true;
    }

    function handleClose() {
      showAlert.value = false;
      emit('close');
    }

    function handleFind() {
      console.log('Поиск текста из 4-го поля:', field4.value);
      if (field4.value != "") {
        var geoCode = window.ymaps.geocode(field4.value);
        geoCode.then(
          function(res) {
            console.log("запрос: ", field4, "ответ: ", res.geoObjects);
            res.geoObjects.events
                  // При наведении на метку показываем хинт с названием станции метро.
                  .add('mouseenter', function (event) {
                      var geoObject = event.get('target');
                      map.hint.open(geoObject.geometry.getCoordinates(), geoObject.getAddressLine());
                  })
                  // Скрываем хинт при выходе курсора за пределы метки.
                  .add('mouseleave', function () {
                      map.hint.close(true);
                  })
                  .add('click', function (event) {
                      var geoObject = event.get('target');
                      var coords = geoObject.geometry.getCoordinates();
                      taskCoords.value = coords

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
    }

    function handleClear() {
      if (map) {
        map.geoObjects.removeAll();
        field4.value = ""
      }
    }

    return {
      mapC,
      field1,
      field2,
      field3,
      field4,
      showAlert,
      alertMessage,
      handleSave,
      handleClose,
      handleFind,
      taskCoords,
      handleClear
    };
  }
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 80%; /* Увеличиваем максимальную ширину */
  min-width: 500px; /* Минимальная ширина для модального окна */
  width: 100%; /* Адаптивная ширина */
}


.content {
  display: flex; /* Используем Flexbox */
  gap: 20px; /* Отступ между формой и картой */
  padding-bottom: 10px;
}

.form-fields {
  flex: 2; /* Занимает оставшееся пространство */
  display: flex;
  flex-direction: column; /* Поля располагаются вертикально */
}

.form-fields input {
  margin-bottom: 15px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.map-container {
  flex: 5; /* Карта занимает больше места */
  /* height: 400px;  */
  box-sizing: border-box;
  width: 100%; 
  min-width: 50%; 
}

button {
  margin-right: 10px;
}

.button-container {
  display: flex;
  width: 100%;
  padding-bottom: 15px;
  justify-content: space-between;
}

.action-buttons {
    display: flex;
    justify-content: center;
    margin-top: 10px; 
    margin-left: 30%;
    margin-right: 30%;
}

/* Стиль для всех кнопок */
.styled-button {
  width: 100%;
  padding: 10px 20px;
  margin: 5px;
  border: 1px solid #ccc;
  background-color: #a2ffec;
  cursor: pointer;
  transition: background-color 0.3s;
}

/* При наведении мыши */
.styled-button:hover {
    background-color: #ffe2b6;
}

.form-group {
    margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 14px;
  color: #333;
  /* color: #888888; */
  font-weight: bold;
}

input[type="text"] {
    width: calc(100% - 20px);
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

.half-width {
    flex: 1;
    padding: 10px;
    margin: 5px;
    /* font-size: 16px; */
    border: 1px solid #ccc;
    background-color: #f0f0f0;
    cursor: pointer;
    transition: background-color 0.3s;
    box-sizing: border-box;

}

.half-width:hover {
    background-color: #e0e0e0;
}

</style>