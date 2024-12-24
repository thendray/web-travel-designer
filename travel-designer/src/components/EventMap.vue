<template>
    <!-- <div class="container"> -->
      <div ref="mapContainer" class="map-container" id="map-container"></div>
    <!-- </div> -->
  </template>
  
  <script setup>

  import { ref, onMounted } from "vue";
  
  let map = null;
  const mapContainer = ref(null);

  
  onMounted(() => {
    window.ymaps.ready(() => {
      initMap();
      console.log(map.getObjects)
    });
  });
  
//   watch(() => props.placemarks, handlePlaceMarks, { deep: true });
  
//   function handlePlaceMarks() {
//     console.log("handlePlaceMarks");
  
//     if (!map) return;
  
//     map.geoObjects.removeAll();
  
//     props.placemarks.forEach((placemark) => {
//       const { id, lat, lot, title, description, status, createdAt, category } =
//         placemark;
  
//       const balloonContent = `
//         <div class="balloon-content">
//             <h3>${title}</h3>
//             <label>${description}</label>
//             <label><strong>Статус: </strong>${status}</label>
//             <label><strong>Дата создания: </strong>${createdAt}</label>
//             <button class="task-button task-button-open" data-task-id="${id}">Откликнуться</button>
//         </div>`;
//       map.geoObjects.add(
//         new ymaps.Placemark(
//           [lat, lot],
//           {
//             balloonContent: balloonContent,
//           },
//           {
//             iconLayout: "default#image",
//             iconImageHref: getCategoryIconByCategory(category.category),
//             iconImageSize: [60, 60],
//             iconImageOffset: [-25, -45],
//           }
//         )
//       );
//       console.log(placemark);
//     });
//   }
  
//   async function respond(taskId) {
//     try {
//       const userId = localStorage.getItem("id");
  
//       if (!userId) {
//         alert("Пользователь не найден");
//         return;
//       }
//       const url = `https://volunteer-aid.ru/api/task/v1/take/${userId}/${taskId}`;
//       console.log(url);
//       const response = await axios.get(url);
//       alert("Задача взята успешно");
//     } catch (error) {
//       console.error("Failed to take task due to an error:", error);
//       alert("Ошибка взятия задачи!");
//     }
//   }
  
  function initMap() {
    map = new window.ymaps.Map("map-container", {
        center: [55.751574, 37.573856],
        zoom: 9,
        controls: ["default"]
    },
    {
      searchControlProvider: 'yandex#search'
    });
  
    removeMapControls();
    disableMapBehaviors();

    var geoCode = window.ymaps.geocode("Александровский сад");
    geoCode.then(
      function(res){
        var obj = res.geoObjects.get(0);
        console.log("object", obj);

        map.geoObjects.add(res.geoObjects);
      },
      function(err){
        console.log("Ошибка", err)
      }
    )
  
    // handlePlaceMarks();
  }
  
  
  function removeMapControls() {
    if (map) {
        console.log(map.controls)
    //   map.controls.remove("searchControl");
      map.controls.remove("trafficControl");
      map.controls.remove("typeSelector");
      map.controls.remove("fullscreenControl");
      map.controls.remove("rulerControl");
    }
  }
  
  function disableMapBehaviors() {
    if (map) {
    //   map.behaviors.disable(["scrollZoom"]);
    }
  }
  </script>
  
<style scoped>

.map-container {
  width: 100%; 
  height: 400px; 
  min-width: 80%; 
  box-sizing: border-box;
}
</style>