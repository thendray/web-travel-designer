<template>
  <div class="voting-page">
    <header class="header">
      <div class="center">Голосование</div>
      <div class="right">
        <nav>
          <a @click="exit" class="header-a">Выйти</a>
        </nav>
      </div>
    </header>
    <OverlayComp></OverlayComp>

    <div class="content">
      <TableStatistic></TableStatistic>
      <div class="rate-card">
        <VoteComponent></VoteComponent>
      </div>
    </div>

  </div>
</template>
  
<script>
import OverlayComp from '@/components/common/OverlayComp.vue';
import TableStatistic from '@/components/vote/TableStatistic.vue';
import VoteComponent from '@/components/vote/VoteComponent.vue';

export default {
  props: ["id"],
  components: {
    TableStatistic,
    VoteComponent,
    OverlayComp
  },
  data() {
    return {
      cards: [
        { id: 1, name: 'Карточка номер 1', rating: 5 },
        { id: 2, name: 'Карточка номер 2', rating: 4 },
        { id: 3, name: 'Карточка номер 3', rating: 3.7 },
        { id: 4, name: 'Карточка номер 4', rating: 3.3 },
        { id: 1, name: 'Карточка номер 1', rating: 5 },
      ],
      currentCardIndex: 0,
      selectedCard: null,
      roomId: null
    };
  },
  created() {
    this.roomId = this.id;
  },
  computed: {
    currentCard() {
      return this.cards[this.currentCardIndex];
    },
  },
  methods: {
    logout() {
      console.log('Logged out');
    },
    previousCard() {
      if (this.currentCardIndex > 0) {
        this.currentCardIndex--;
      }
    },
    nextCard() {
      if (this.currentCardIndex < this.cards.length - 1) {
        this.currentCardIndex++;
      }
    },
    rateCard(rating) {
      console.log(`Card rated with: ${rating}`);
    },
    exit() {
        this.$router.push(`/route-room/${this.roomId}`)
      }
  },
};
</script>

<style scoped>
.voting-page {
  display: flex;
  flex-direction: column;
  height: 100vh;

  background-image: url('../assets/vote_background.jpeg');
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
  color: rgb(231, 206, 206);
  margin: 0 auto;
  text-align: center;
  font-size: 1.2rem;
  justify-content: center;
}

.header-a {
  color: rgb(231, 206, 206);
  transition: transform 0.3s ease, color 0.3s ease;
  white-space: nowrap;
  margin: 0 15px;
  font-size: 1.1rem;
  cursor: pointer;
}

.header-a:hover {
  transform: scale(1.1);
  color: rgb(224, 169, 169);
}

.main-text {
	font-size: 1.5rem;
	/* color: rgb(55, 55, 55); */
	text-align: center;
	margin-bottom: 25px;
	z-index: 2;
}
.content {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.rate-card {
  width: 60%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center
}
  
.card-display {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  min-height: 100px;
}

.card-content {
  position: relative;
}
  
button {
  margin: 0 5px;
}


</style>