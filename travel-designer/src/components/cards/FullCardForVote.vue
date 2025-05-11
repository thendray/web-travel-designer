<template>
  <div class="card-modal-container">
    <div class="my-card" ref="cardElement">
      <div class="photo">
        <img @load="onImageLoad" :src="cardData.photoUrl" alt="фотография" />
      </div>
      <div class="rating">
        <span>{{ cardData.rating }}</span>
      </div>
      <h3 class="name">{{ cardData.name }}</h3>
      <p class="address">{{ cardData.address }}</p>
      <div class="description">
        <p>{{ cardData.description }}</p>
      </div>
      <div class="footer">
        <span>by {{ cardData.author }}</span>
        <img :src="iconSrc" alt="icon" class="category-icon" />
      </div>
    </div>
    
    <div class="voting-stats" :style="{ height: cardHeight + 'px' }">
      <h3 class="stats-title">Результаты голосования</h3>
      
      <div class="stats-table-container">
        <table class="stats-table">
          <thead>
            <tr>
              <th>Пользователь</th>
              <th>Оценка</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(vote, index) in voteStatistics" :key="index">
              <td>{{ vote.userName }}</td>
              <td class="vote-emoji">{{ mapMarkToEmoji(vote.mark) }}</td>
            </tr>
            <tr v-if="voteStatistics.length === 0" class="no-votes">
              <td colspan="2">Нет голосов</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="stats-summary" @click="updateCardHeight">
        <div class="summary-item">
          <span class="summary-count">{{ voteStatistics.length }}</span>
          <span class="summary-label">Всего</span>
        </div>
        <div class="summary-item">
          <span class="summary-count">{{ averageMark }}</span>
          <span class="summary-label">Рейтинг</span>
        </div>
        <div class="summary-item">
          <span class="summary-count">{{ positiveVotes }}</span>
          <span class="summary-label">👍</span>
        </div>
        <div class="summary-item">
          <span class="summary-count">{{ neutralVotes }}</span>
          <span class="summary-label">🤔</span>
        </div>
        <div class="summary-item">
          <span class="summary-count">{{ negativeVotes }}</span>
          <span class="summary-label">👎</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const icons = {
  'bed': require('../../assets/bed.png'),
  'food': require('../../assets/food.png'),
  'entertainment': require('../../assets/entertaiment.png'),
  'question': require('../../assets/question.png')
};

export default {
  props: {
    card: {
      required: true,
    },
    id: {
      required: true
    }
  },
  data() {
    return {
      cardData: {
        photoUrl: '',
        rating: '',
        name: '',
        address: '',
        description: '',
        icon: '',
        author: ''
      },
      voteStatistics: [],
      cardHeight: 0
    };
  },
  created() {
    this.fetchCardData();
    this.fetchVoteStatistics();
  },
  computed: {
    iconSrc() {
      return icons[this.cardData.icon] || icons['question'];
    },
    positiveVotes() {
      return this.voteStatistics.filter(vote => vote.mark > 1).length;
    },
    neutralVotes() {
      return this.voteStatistics.filter(vote => vote.mark === 1).length;
    },
    negativeVotes() {
      return this.voteStatistics.filter(vote => vote.mark === 0).length;
    },
    totalMarks() {
      return this.voteStatistics.reduce((sum, vote) => sum + vote.mark, 0);
    },
    averageMark() {
      if (this.voteStatistics.length === 0) return 0;
      return (10.0 * this.totalMarks / (this.voteStatistics.length * 2)).toFixed(2)
    },
  },
  methods: {
    onImageLoad() {
      this.updateCardHeight();
    },
    updateCardHeight() {
      if (this.$refs.cardElement) {
        this.cardHeight = this.$refs.cardElement.offsetHeight;
      }
    },
    async fetchCardData() {
      this.cardData = {
        photoUrl: this.card.photo,
        rating: this.card.rating,
        name: this.card.name,
        address: this.card.routePoint.address,
        icon: this.card.category,
        description: this.card.description,
        author: this.card.author
      }

      this.$nextTick(this.updateCardHeight);
    },
    fetchVoteStatistics() {
      axios.get(`/api/vote/${this.id}/for-card/${this.card.id}`, {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then(response => {
        console.log(`response ${response.data}`)
        this.voteStatistics = response.data.votes;
        // this.voteStatistics = this.voteStatistics.concat(this.voteStatistics);
        // this.voteStatistics = this.voteStatistics.concat(this.voteStatistics);
        // this.voteStatistics = this.voteStatistics.concat(this.voteStatistics);
        // this.voteStatistics = this.voteStatistics.concat(this.voteStatistics);
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
      });
    },
    mapMarkToEmoji(mark) {
      if (mark === 0) return '👎';
      if (mark === 1) return '🤔';
      return '👍';
    }
  }
};
</script>

<style scoped>
.card-modal-container {
  display: flex;
  gap: 20px;
  max-width: 900px;
  margin: 0 auto;
  align-items: flex-start;
}

.my-card {
  background: linear-gradient(to bottom right, rgb(246, 200, 174), rgb(250, 178, 171));
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.12);
  padding: 20px;
  width: 460px;
  position: relative;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.photo {
  width: 100%;
  max-height: 60vh;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.rating {
  position: absolute;
  top: 30px;
  right: 30px;
  background-color: rgb(247, 157, 122);
  font-weight: bold;
  color: white;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  z-index: 2;
  font-size: 1.2rem;
}

.name {
  font-weight: bold;
  margin: 20px 0 8px;
  font-size: 1.8rem;
  color: #333;
}

.address {
  margin-bottom: 10px;
  font-style: italic;
  color: #555;
  font-size: 1rem;
}

.description {
  max-height: 110px;
  overflow-y: auto;
  margin-top: 10px;
  margin-bottom: 40px;
  line-height: 1.6;
  color: #444;
  padding-right: 6px;
  font-size: 1rem;
}

.description::-webkit-scrollbar {
  width: 6px;
}

.description::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: calc(100% - 40px);
  font-size: 0.9rem;
  color: #666;
}

.footer span {
  margin-right: 10px;
  font-style: italic;
}

.category-icon {
  width: 30px;
  height: 30px;
  object-fit: contain;
}

.voting-stats {
  flex: 1;
  background: rgb(248, 229, 227);
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  min-width: 350px;
  max-width: 400px;
  min-height: 250px;
  overflow: hidden;
}

.stats-title {
  text-align: center;
  margin: 0;
  padding: 20px 0;
  color: #333;
  font-size: 1.4rem;
  border-bottom: 1px solid #eee;
  flex-shrink: 0;
}

.stats-table-container {
  flex: 1;
  overflow-y: auto;
  border-bottom: 1px solid #eee;
}

.stats-table-container::-webkit-scrollbar {
  width: 6px;
}

.stats-table-container::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 3px;
}

.stats-table {
  width: 100%;
  border-collapse: collapse;
}

.stats-table th {
  padding: 14px;
  font-weight: 600;
  text-align: left;
  background-color: rgb(249, 218, 214);
  color: #444;
  position: sticky;
  top: 0;
  z-index: 1;
  font-size: 1.1rem;
}

.stats-table td {
  padding: 12px 14px;
  border-top: 1px solid #f0f0f0;
  color: #444;
  font-size: 1rem;
}

.stats-table tbody tr:hover {
  background-color: rgb(249, 218, 214);
}

.vote-emoji {
  font-size: 22px;
  text-align: center;
}

.no-votes {
  text-align: center;
  color: #999;
  font-style: italic;
  padding: 30px 0;
}

.stats-summary {
  display: flex;
  justify-content: space-around;
  padding: 15px 10px;
  background-color: rgb(249, 218, 214);
  flex-shrink: 0;
}

.summary-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.summary-count {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.summary-label {
  font-size: 16px;
  color: #666;
  margin-top: 5px;
}
</style>
