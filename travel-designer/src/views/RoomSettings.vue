<template>
  <div v-if="settings">
    <div class="settings-page">
      <header class="header">
        <div class="center"> {{ settings.name }}</div>
        <div class="right">
            <nav>
              <a @click="exit" class="header-a">Выйти</a>
            </nav>
          </div>
      </header>
      <OverlayComp></OverlayComp>
      
      <div class="main-content">
        <div class="container">
          <ChangeBaseSettings :login=settings.login :password=settings.password 
            :name=settings.name :day-count=settings.days :card-max=settings.cardLimit
          ></ChangeBaseSettings>
          <ChangeAdditionalSettings :start=settings.beginAddress :end=settings.endAddress></ChangeAdditionalSettings>
        </div>
        <div class="category-section">
          <div class="main-text">Категории карточек</div>
          <div class="categories">
            <span class="category">
              <BedIcon></BedIcon>
            </span>
            <h5>Отели</h5>
            <span class="category">
              <FoodIcon></FoodIcon>
            </span>
            <h5>Еда</h5>
            <span class="category">
              <EntertaimentIcon></EntertaimentIcon>
            </span>
            <h5>Развлечения</h5>
            <span class="category">
              <QuestionIcon></QuestionIcon>
            </span>
            <h5>Другое</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <WaitLoading></WaitLoading>
  </div>
  
</template>

<script>
import BedIcon from '@/components/category/BedIcon.vue';
import EntertaimentIcon from '@/components/category/EntertaimentIcon.vue';
import FoodIcon from '@/components/category/FoodIcon.vue';
import QuestionIcon from '@/components/category/QuestionIcon.vue';
import ChangeAdditionalSettings from '@/components/ChangeAdditionalSettings.vue';
import ChangeBaseSettings from '@/components/ChangeBaseSettings.vue';
import OverlayComp from '@/components/common/OverlayComp.vue';
import WaitLoading from '@/components/common/WaitLoading.vue';
import axios from 'axios';

export default {
    props: ["id"],
    data() {
        return {
            roomId: null,
            settings: null
        }
    },
    components: {
      ChangeBaseSettings,
      ChangeAdditionalSettings,
      BedIcon,
      FoodIcon,
      EntertaimentIcon,
      OverlayComp,
      QuestionIcon,
      WaitLoading
    },

    created() {
      this.roomId = this.id;
      axios.get(`/api/route/${this.roomId}`, {
        headers: {
          'accept': 'application/json'
        }
      })
      .then(response => {
        this.settings = response.data;
        console.log(`response ${this.settings}`)
        this.loading = false;
      })
      .catch(error => {
        this.error = 'Не удалось загрузить данные маршрута';
        console.error('Ошибка при получении данных:', error);
        this.loading = false;
      });
    },
    methods: {
      exit() {
        this.$router.push(`/route-room/${this.roomId}`)
      }
    }
}

</script>

<style scoped>
.settings-page {
  display: flex;
  flex-direction: column;
  height: 100vh;

  background-image: url('../assets/room_settings_background.jpeg');
  background-size: cover;
  background-position: center;
}

.header {
  display: flex;
  justify-content: space-between;
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

.center {
  color: rgb(252, 252, 231);
  margin: 0 auto;
  text-align: center;
  font-size: 1.2rem;
  justify-content: center;
}

.header-a {
  color: rgb(252, 252, 231);
  transition: transform 0.3s ease, color 0.3s ease;
  white-space: nowrap;
  margin: 0 15px;
  font-size: 1.1rem;
  cursor: pointer;
}

.header-a:hover {
  transform: scale(1.1);
  color: rgb(253, 253, 208);
}

.main-text {
	font-size: 1.5rem;
	/* color: rgb(55, 55, 55); */
	text-align: center;
	margin-bottom: 25px;
	z-index: 2;
}

.main-content {
  z-index: 2;
}

.container {
  display: flex;
  justify-content: center;
  gap: 20px; /* Расстояние между блоками */
  margin-bottom: 20px; /* Отступ снизу */
  margin-top: 10vh;
}
.category-section {
  background-color: rgba(251, 251, 247, 0.75);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 20px auto; 
  max-width: 80%; 
  text-align: center;
}

.categories {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px; /* Расстояние между категориями */
  margin-bottom: 10px;
  margin-left: 50px;
  margin-right: 50px;
}

.category {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.add-category {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>