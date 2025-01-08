<!-- <template>
    <div class="button-container">
      <button class="create-button" @click="click">Создать</button>
      <CreateCardForm v-if="showForm" @close="close"></CreateCardForm>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import CreateCardForm from '../components/CreateCardForm.vue';
  
const showForm = ref(false);
  
function click() {
    showForm.value = true;
    console.log('showForm: ', showForm);
}
function close() {
    showForm.value = false
}
</script>
  
  <style scoped>
  .button-container {
    text-align: center;
    padding: 20px 0;
  }
  
  .create-button {
    padding: 10px 20px;
    margin: 20px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
  }
  </style> -->
<template>
    <div class="page-layout">
      <header class="header">
        <div class="left">
          <nav>
            <router-link to="/"  class="header-a">О нас</router-link>
            <router-link to="/"  class="header-a">Возможности</router-link>
          </nav>
        </div>
        <div class="center">Конструктор Путешествий</div>
        <div class="right">
          <nav>
            <a @click="exit" class="header-a green">Выйти</a>
            <a class="header-a green">Кабинет</a>
          </nav>
        </div>
      </header>
  
      <div class="content">
        <OverlayComp></OverlayComp>
        <div class="card-container">
          <CardFeed></CardFeed>
        </div>
  
        <div class="actions-container">
          <RouteFeed></RouteFeed>
          <CreateRoute></CreateRoute>
        </div>
      </div>
  
      <FooterComp class="py-2 foo"></FooterComp>
  </div>
</template>

<script>

import CardFeed from '@/components/CardFeed.vue';
import CreateRoute from '@/components/CreateRoute.vue';
import RouteFeed from '@/components/RouteFeed.vue';
import FooterComp from '@/components/FooterComp.vue';
import OverlayComp from '@/components/OverlayComp.vue';

export default {
  data() {
    return {
      currentRoute: 1,
      totalRoutes: 5,
    };
  },
  components: {
    CardFeed,
    RouteFeed,
    CreateRoute,
    FooterComp,
    OverlayComp
  },
  methods: {
    prevRoute() {
      if (this.currentRoute > 1) {
        this.currentRoute--;
      }
    },
    nextRoute() {
      if (this.currentRoute < this.totalRoutes) {
        this.currentRoute++;
      }
    },
    exit() {
      this.$router.push("/")
      console.log("exit");
    },
  },
};
</script>

<style scoped>

.page-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;

  background-image: url('../assets/main_background.jpeg');
  background-size: cover;
  background-position: center;
}

.header {
  display: flex;
  justify-content: space-between;
  background-color: #f8f8f8;
  top: 0;
  width: 100%;
  display: flex;
  padding: 10px 20px;
  background-color: rgba(33, 37, 41, 0.45);
  z-index: 2;
}

.header .left,
.header .right {
  display: flex;
  gap: 15px;
}

nav {
  display: flex;
}

.header-a {
  color: rgb(220, 252, 255);
  transition: transform 0.3s ease, color 0.3s ease;
  white-space: nowrap;
  margin: 0 15px;
  font-size: 1.15rem;
  cursor: pointer;
}

.header-a:hover {
  transform: scale(1.1);
  color: rgb(188, 248, 254);
}

.green {
  color: rgb(221, 255, 220);
}

.green:hover {
  color: rgb(199, 250, 198);
}

.center {
  color: rgb(221, 242, 251); 
  margin: 0 auto;
  text-align: center;
  font-size: 1.2rem;
  justify-content: center;
}

.content {
  display: flex;
  flex: 1;
  padding: 20px;
  gap: 20px;
}

.card-container {
  z-index: 2;
  flex: 0 0 280px;
}


.actions-container {
  z-index: 3;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.foo {
  background-color: rgba(33, 37, 41, 0.5);
}
</style>