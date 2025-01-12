<template>
    <div class="category">
      <img src='../../assets/entertaiment.png' alt="Category Icon" class="icon" />
    </div>
  </template>
  
  <script>
  export default {
    name: 'CategoryIcon',
  };
  </script>
  
<style scoped>
.icon {
    width: 100%;
    /* height: 100%; */
    /* color: #000; */
    object-fit: cover; /* Обеспечивает сохранение соотношения сторон картинки */
}

.category {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: rgb(240, 240, 240);
    box-shadow: 10 10 25px rgba(0, 0, 0, 0.5);
}

</style>