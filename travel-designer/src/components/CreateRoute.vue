<template>
    <div class="create-route">
        <div class="main-text">Создайте собственный маршрут</div>
        <button class="create-button" @click="createRoute">создать</button>
        <button class="create-button">присоединиться к созданию</button>
    </div>
</template>

<script>
export default {
  methods: {
    createRoute() {
      this.$router.push("/create-route");
    }
  }
}
</script>

<style scoped>

.main-text {
	font-size: 1.5rem;
	/* color: rgb(55, 55, 55); */
	text-align: center;
	margin-bottom: 25px;
	z-index: 3;
}

.create-route {
  background-color: rgba(231, 247, 247, 0.7);
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: center;
  justify-content: space-between;
}

.create-button {
  padding: 10px 20px;
  width: 35%;
  margin: 0 5px;
  margin-left: 10px;
  margin-right: 10px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  color: rgb(51, 51, 51);
  background-color: rgb(221, 242, 251);
  font-size: 1.2rem;
  font-weight: 800;
  outline: none;
  /* white-space: nowrap;  */
}

.create-button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  background-color: rgb(173, 226, 255);
  color: rgb(51, 51, 51);
}

</style>