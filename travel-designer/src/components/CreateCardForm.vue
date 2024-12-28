<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="content">
        <div class="form-fields">
          <input type="text" placeholder="Поле 1" v-model="field1" />
          <input type="text" placeholder="Поле 2" v-model="field2" />
          <input type="text" placeholder="Поле 3" v-model="field3" />
          <input
            type="text"
            v-model="taskCoords[0]"
            placeholder="Широта"
          />
          <input
            type="text"
            v-model="taskCoords[1]"
            placeholder="Долгота"
          />
          <input type="text" placeholder="Поле 4" v-model="field4" />
          <button type="button" @click="handleFind">Найти</button>
        </div>
        <div ref="mapC" class="map-container" id="map-container"></div>
      </div>
      <button type="button" @click="handleSave">Сохранить</button>
      <button type="button" @click="handleClose">Отмена</button>

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
    const taskCoords = ref([0, 0]);

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
          taskCoords.value = coords;
          map.balloon.open(coords, {
            contentHeader: "Событие!",
            contentBody:
              "Координаты щелчка: " +
              [coords[0].toPrecision(6), coords[1].toPrecision(6)].join(", ") +
              "</p>",
            contentFooter: "<sup>Щелкните еще раз</sup>",
          });

          console.log("Координаты щелчка: ", [coords[0].toPrecision(6), coords[1].toPrecision(6)].join(", "))
        } else {
          map.balloon.close();
        }
      });

      map.events.add("contextmenu", function (e) {
        map.hint.open(e.get("coords"), "Кто-то щелкнул правой кнопкой");
      });

      map.events.add("balloonopen", function () {
        map.hint.close();
      });
    }

    function initMap() {
      map = new window.ymaps.Map(mapC.value, {
        center: [55.751574, 37.573856],
        zoom: 9,
        controls: ['default']
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
          function(res){
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

                      console.log("Координаты метки: ", [coords[0].toPrecision(6), coords[1].toPrecision(6)].join(", "))
                  })
                  ;

            map.geoObjects.add(res.geoObjects);
            map.setBounds(res.geoObjects.getBounds());
          },
          function(err){
            console.log("Ошибка", err)
          }
        )
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
      taskCoords
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
  height: 400px; 
  box-sizing: border-box;
  width: 100%; 
  min-width: 50%; 
}

button {
  margin-right: 10px;
}
</style>