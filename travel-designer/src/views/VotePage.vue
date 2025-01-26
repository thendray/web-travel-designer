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

    <div class="content">
      <TableStatistic></TableStatistic>
      <div class="rate-card">
        <h2>Оцените</h2>
        <div class="card-display">
          <div class="card-content">
            <div class="card-header">
              <h3>{{ currentCard.name }}</h3>
              <div class="category-icon">Иконка</div>
            </div>
            <p>Описание карточки</p>
            <p class="author">by Author</p>
          </div>
        </div>
        <div class="controls">
          <button @click="previousCard">⬅️</button>
          <button @click="rateCard('down')">👎</button>
          <button @click="rateCard('neutral')">🤔</button>
          <button @click="rateCard('up')">👍</button>
          <button @click="nextCard">➡️</button>
        </div>
      </div>
    </div>

  </div>
</template>
  
<script>
import TableStatistic from '@/components/vote/TableStatistic.vue';

export default {
  props: ["id"],
  components: {
    TableStatistic
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
    }
  },
};
</script>

<style scoped>
.voting-page {
  font-family: Arial, sans-serif;
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
  color: rgb(188, 240, 192);
  margin: 0 auto;
  text-align: center;
  font-size: 1.2rem;
  justify-content: center;
}

.header-a {
  color: rgb(188, 240, 192);
  transition: transform 0.3s ease, color 0.3s ease;
  white-space: nowrap;
  margin: 0 15px;
  font-size: 1.1rem;
  cursor: pointer;
}

.header-a:hover {
  transform: scale(1.1);
  color: rgb(156, 235, 162);
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

.current-rating {
  width: 30%;
  height: 80vh;
  overflow-y: auto;
  border: 1px solid #ddd;
}

.rate-card {
  width: 60%;
  text-align: center;
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
  
.controls {
  margin-top: 20px;
}

button {
  margin: 0 5px;
}


</style>