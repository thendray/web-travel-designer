<template>
  <div class="modal-backdrop">
    <div class="modal-this">
      <div class="content-this">
        <div class="form-fields">
          <div class="form-group">
            <label>Название места</label>
            <input type="text" v-model="name" placeholder="название">
          </div>
          <div class="form-group">
            <label>Описание</label>
            <textarea v-model="description" placeholder="можете добавить описание места" rows="4"></textarea>
          </div>

          <div class="form-group">
              <label>Адресс</label>
              <div class="explanation">
                <input type="text" placeholder="введите адрес" v-model="address" />
                <ExplainingButton text="Введите адрес или исчерпывающее название места и нажмите кнопку 'Найти'. Нажмите на карте рядом с нужным местом, поля с координатами должны оказаться заполнены. Если нужного места не нашлось, можете найти его сами, щекнув на карту рядом с желаемым местом."></ExplainingButton>
              </div>
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

          <div class="form-group">
            <label>Добавить фотографию</label>
            <input type="file" @change="previewImage" accept="image/*">
            <div v-if="imageUrl" class="image-preview">
              <img :src="imageUrl" alt="Превью изображения">
            </div>
          </div>
          
          <div class="form-group">
            <label>Выберите категорию</label>
            <div class="icon-group">
              <div 
                v-for="(category, index) in categories" 
                :key="index" 
                :class="['icon', index === selectedCategory ? 'selected' : '']" 
                @click="selectCategory(index)"
              >
                <img :src="category.icon" :alt="category.name">
              </div>
            </div>
          </div>

        </div>
        <div ref="mapC" class="map-container" id="map-container-0"></div>
      </div>
      <div class="action-buttons">
        <button type="button" @click="handleSave" >Создать</button>
        <button type="button" @click="handleClose" class="del">Отмена</button>
      </div>

      <!-- Подключаем модальное окно для алерта -->
      <AlertModal v-if="showAlert" :message="alertMessage" @close="handleClose" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import AlertModal from './AlertModal.vue';
import ExplainingButton from '../common/ExplainingButton.vue';


import axios from "axios";
// import { toRaw } from 'vue';

export default {
  props: {
    id: {
      require: true
    }
  },
  components: {
    AlertModal,
    ExplainingButton
  },
  setup(props, {emit}) {
    const mapC = ref(null);
    const name = ref("");
    const description = ref("");
    const imageUrl = ref(null);
    const address = ref("");

    const showAlert = ref(false);
    const alertMessage = ref("");
    const taskCoords = ref([null, null]);
    const defImage = ref(null);

    const categories = [
        { name: 'Отель', icon: require('../../assets/bed.png'), serverName: 'bed' },
        { name: 'Еда', icon: require('../../assets/food.png'), serverName: 'food' },
        { name: 'Развлечения', icon: require('../../assets/entertaiment.png'), serverName: 'entertainment' },
        { name: 'Другое', icon: require('../../assets/question.png'),  serverName: 'question' }
    ];
    
    const selectedCategory = ref(0);
    
    let map = null;

    onMounted(() => {
      if (document.getElementById('map-container-0') && window.ymaps && window.ymaps.ready) {
        window.ymaps.ready(initMap);
      }
      defaultImage();
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
      map = new window.ymaps.Map("map-container-0", {
        center: [55.751574, 37.573856],
        zoom: 9,
        controls: ['zoomControl']
      }, {
        maxZoom: 18,
        minZoom: 3
    });

      handleMapClick();
    }

    function defaultImage() {
      const imagePath = require("../../assets/no-image.png");
      fetch(imagePath)
        .then(response => response.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.onload = (event) => {
            console.log("inside", event.target.result);
            defImage.value = event.target.result;
          };
          reader.readAsDataURL(blob);
        })
        .catch(error => {
          console.error("Error loading image:", error);
        });
    }

    function handleSave() {
      const userId = localStorage.getItem('id') || 2;
      const photo = imageUrl.value !== null ? imageUrl.value : defImage.value;
      console.log("defImage", defImage.value);
      console.log("photo", photo);
     
      const formData = {
        authorId: userId,
        routeId: props.id || 4,
        name: name.value,
        xCoord: taskCoords.value[0],
        yCoord: taskCoords.value[1],
        description: description.value,
        photo: photo,
        address: address.value,
        category: categories[selectedCategory.value].serverName
      }
      // const rawFormData = toRaw(formData);
      axios.post('/api/card/create-card', formData, {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          }
        })
          .then((response) => {
            console.log("Response", response);
            alertMessage.value = 'Данные сохранены!';
            showAlert.value = true;
          })
          .catch((error) => {
            console.log(error);
          });
    }

    function handleClose() {
      showAlert.value = false;
      emit('close-adding-new-card');
    }

    function handleFind() {
      console.log('Поиск текста из 4-го поля:', address.value);
      if (address.value != "") {
        var geoCode = window.ymaps.geocode(address.value);
        geoCode.then(
          function(res) {
            console.log("запрос: ", address, "ответ: ", res.geoObjects);
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
        address.value = ""
      }
    }

    function previewImage(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrl = reader.result;
        };
        reader.readAsDataURL(file);
      }
    }

    function selectCategory(index) {
      selectedCategory.value = index;
      console.log(selectedCategory);
    }

    return {
      mapC,
      name,
      description,
      imageUrl,
      address,
      showAlert,
      alertMessage,
      handleSave,
      handleClose,
      handleFind,
      taskCoords,
      handleClear,
      previewImage,
      categories,
      selectCategory,
      selectedCategory,
      defaultImage
    };
  }
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-this {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 80%; 
  min-width: 500px; 
  width: 100%;
  max-height: 95%;
  overflow-y: auto; 
}

.content-this {
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
  margin-bottom: 5px;
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
  padding: 10px 20px;
  width: 100%;
  margin: 0 5px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  color: rgb(51, 51, 51);
  background-color: rgb(209, 242, 212);
  outline: none;
}

button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  background-color: rgb(188, 240, 192);
  color: rgb(51, 51, 51);
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

.form-group {
    margin-bottom: 5px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 1.0rem;
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
    /* border: 1px solid #ccc; */
    background-color: #f0f0f0;
    cursor: pointer;
    /* transition: background-color 0.3s; */
    box-sizing: border-box;

}

.half-width:hover {
    background-color: #e0e0e0;
}

textarea {
  width: 100%;
  resize: vertical; 
  min-height: 5vh;
  max-height: 12vh;
}

.explanation {
  display: flex;
}

.del {
  background-color: rgb(225, 218, 248);
}

.del:hover {
  background-color: rgb(213, 201, 250);
}

.image-preview img {
  max-width: 150px;
  max-height: 150px;
  margin-top: 10px;
}

.icon-group {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.icon {
  cursor: pointer;
  border-radius: 50%;
  overflow: hidden;
  width: 50px;
  height: 50px;
  transition: transform 0.2s;
}

.icon img {
  width: 100%;
  height: 100%;
}

.icon.selected {
  transform: scale(1.1);
  box-shadow: 0 0 5px 2px rgb(130, 225, 138);
}

</style>