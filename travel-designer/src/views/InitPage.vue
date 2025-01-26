
<template>
    <div class="main-container d-flex flex-column min-vh-100 text-white">
      <header class="header-overlay py-3">
        <div class="page-header">
          <nav>
            <a href="#" class="header-a">О нас</a>
            <a href="#" class="header-a">Возможности</a>
          </nav>
          <div class="main-text">Конструктор Путешествий</div>
          <nav>
            <a href="#" class="header-a">Новости</a>
            <a href="#" class="header-a">Контакты</a>
          </nav>
        </div>
      </header>

      <main class="main position-relative d-flex flex-column align-items-center justify-content-center flex-grow-1 text-center py-3">
        <OverlayComp></OverlayComp>
        <div class="container position-relative z-index-2">
          <div class="container">
            <div v-for="(slide, index) in slides" :key="index" v-show="currentSlide === index" class="slide display-4 my-5">
                {{ slide }}
            </div>
          </div>

          <div class="centre-button">
            <button @click="login">Войти</button>
            <button @click="register">Зарегистрироваться</button>
          </div>
        </div>
      </main>
  
      <FooterComp class="py-3"></FooterComp>
    </div>
  </template>
  
<script>
import FooterComp from '@/components/home/FooterComp.vue';
import OverlayComp from '@/components/common/OverlayComp.vue';


export default {
  data() {
    return {
      slides: ["🌍 Исследуйте мир 🌍", "✈️ Легко планируйте путешествия ✈️", "🏖️ Наслаждайтесь отдыхом 🏖️"],
      currentSlide: 0,
      infoVisible: false,
    };
  },
  components: {
    FooterComp,
    OverlayComp
  },
  methods: {
    toggleInfo() {
      this.infoVisible = !this.infoVisible;
    },
    login() {
      this.$router.push("/login");
    },
    register() {
      this.$router.push("/sign-up");
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    },
  },
  mounted() {
    setInterval(this.nextSlide, 3000); // Меняем слайды каждые 3 секунды
  },
};

  </script>
  
<style scoped>
  
.main-container {
  background-image: url('../assets/home_background.jpeg');
  background-size: cover;
  background-position: center;
  height: 70vh;
}

  
.header-overlay {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: rgba(33, 37, 41, 0.7);
}

.header-overlay div {
  display: flex;
  align-items: center;
  width: 100%;
}

nav {
  display: flex;
}


.position-relative .z-index-2 {
  z-index: 2;
}

footer {
  flex-shrink: 0;
}

.main-text {
  color: rgb(250, 237, 186); 
  margin: 0 auto;
  text-align: center;
  font-size: 1.5rem;
  justify-content: center;
}

.header-a {
  color: rgb(255, 248, 220);
  transition: transform 0.3s ease, color 0.3s ease;
  white-space: nowrap;
  margin: 0 15px;
  font-size: 1.1rem;
}

.header-a:hover {
  transform: scale(1.1);
  color: rgb(250, 237, 186); 
}

.centre-button {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  margin: 0 5px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  outline: none;
}

button:hover {
  transform: scale(1.075);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
}

button:first-of-type {
  background-color: rgb(250, 237, 186);
  color: rgb(99, 111, 122);
}

button:last-of-type {
  background-color: rgb(255, 248, 220); 
  color: rgb(91, 102, 113);
  border: 2px solid rgb(91, 102, 113);
}

</style>