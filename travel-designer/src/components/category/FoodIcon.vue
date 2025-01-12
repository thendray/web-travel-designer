<template>
    <div class="category">
      <img src='../../assets/food.png' alt="Category Icon" class="icon" />
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
    object-fit: cover; /* Обеспечивает сохранение соотношения сторон картинки */
}

.category {
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: rgb(240, 240, 240);
    width: 40px;
    height: 40px;
}

</style>