<template>
  <div v-if="hasAccess">
    <div class="room">
      <header class="header">
        <div class="left">
          <nav>
            <router-link :to="`/route-room/${roomId}/members`"  class="header-a">Участники</router-link>
            <router-link :to="`/route-room/${roomId}/own-cards`"  class="header-a">Ваши карточки</router-link>
            <router-link to="/"  class="header-a">Голосование</router-link>
          </nav>
        </div>
        <div class="center">Название вашего путешествия</div>
        <div class="right">
          <nav>
            <router-link :to="`/route-room/${roomId}/settings`"  class="header-a">Настройки</router-link>
            <a @click="exit" class="header-a green">На главную</a>
          </nav>
        </div>
      </header>
      <div class="main-content">
        <OverlayComp></OverlayComp>
        <RoomCards></RoomCards>
        <RoomMap total-days=25></RoomMap>
      </div>
    </div>
  </div>

  <div v-else>
    <!-- Сообщение о недоступности -->
    <h3>У вас нет доступа. Id={{ roomId }}</h3>
  </div>
</template>

<script>
import RoomCards from '@/components/room/RoomCards.vue';
import RoomMap from '@/components/room/RoomMap.vue';
import OverlayComp from '@/components/common/OverlayComp.vue';

export default {
  props: ['id'],
  data() {
    return {
      roomId: null,
      hasAccess: false
    };
  },
  mounted() {
    this.roomId = this.id;
    this.hasAccess = this.id % 2 == 0;
  },

  components: {
    OverlayComp,
    RoomCards,
    RoomMap
  },

  methods: {
    exit() {
      this.$router.push("/home")
    }
  }
};
</script>

<style scoped>
.room {
  display: flex;
  flex-direction: column;
  height: 100vh;

  background-image: url('../assets/room_background.jpeg');
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

.header-a {
  color: rgb(226, 250, 231);
  transition: transform 0.3s ease, color 0.3s ease;
  white-space: nowrap;
  margin: 0 15px;
  font-size: 1.15rem;
  cursor: pointer;
}

.header-a:hover {
  transform: scale(1.1);
  color: rgb(203, 249, 213);
}

.center {
  color: rgb(226, 250, 231);
  margin: 0 auto;
  text-align: center;
  font-size: 1.2rem;
  justify-content: center;
}

.main-content {
  display: flex;
  padding: 20px;
}

</style>