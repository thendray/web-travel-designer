<template>
    <div v-if="isOpen" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Выберите из избранного</h3>
          <button class="close-btn" @click="closeModal">×</button>
        </div>
        
        <div class="cards-container">
          <div class="cards-row" v-if="favoriteCards.length > 0">
            <div
              v-for="(card) in favoriteCards" 
              :key="card.id" 
              class="card-item"
            >
              <FavForAddCard :card="card"></FavForAddCard>
              <button 
                class="checkbox-btn" 
                :class="{ 'selected': selectedCardId === card.id }"
                @click="selectCard(card.id)"
              >
                <i class="check-icon">✓</i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button 
            class="add-btn" 
            :disabled="!selectedCardId" 
            @click="addSelectedCard"
          >
            Добавить
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';
import FavForAddCard from './FavForAddCard.vue';

  export default {
    name: 'FavoriteModal',
    components: {
        FavForAddCard
    },
    props: {
      isOpen: {
        type: Boolean,
        default: false
      },
      routeId: {
        required: true
      }
    },
    data() {
      return {
        favoriteCards: [], 
        selectedCardId: null
      }
    },
    created() {
        this.fetchFavoriteCards();
    },
    watch: {
      isOpen(newVal) {
        if (newVal) {
          this.fetchFavoriteCards();
        }
      }
    },
    methods: {
     fetchFavoriteCards() {
        axios.get(`/api/card/favorite/${localStorage.getItem("id")}`, {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          }
        })
        .then(response => {
          this.favoriteCards = response.data.cards;
        })
        .catch(error => {
          console.error('Ошибка при получении данных:', error);
        });
      },
      selectCard(id) {
        this.selectedCardId = this.selectedCardId === id ? null : id;
      },
      async addSelectedCard() {
        if (!this.selectedCardId) return;
        const card = this.favoriteCards.filter(c => c.id == this.selectedCardId)[0];
          
        const formData = {
            authorId: localStorage.getItem("id"),
            routeId: this.routeId,
            name: card.name,
            xCoord: card.routePoint.xCoord,
            yCoord: card.routePoint.yCoord,
            description: card.description,
            photo: card.photo,
            address: card.routePoint.address,
            category: card.category
        }
        axios.post('/api/card/copy-card', formData, {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
            })
            .then(() => {
                this.$emit('card-added', this.selectedCardId);
            })
            .catch((error) => {
                console.log(error);
            });
            
      },
      closeModal() {
        this.selectedCardId = null;
        this.$emit('close');
      }
    }
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }
  
  .modal-content {
    background-color: white;
    width: 80%;
    max-width: 800px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid #eee;
  }
  
  .close-btn {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    outline: none;
  }
  
  .cards-container {
    padding: 20px;
    overflow-x: auto;
  }
  
  .cards-row {
    display: flex;
    flex-direction: row;
    gap: 15px;
    min-height: 200px;
  }
  
  .card-item {
    /* width: 150px; */
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  
  .card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .checkbox-btn {
    margin-top: 10px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    align-self: center;
    background: white;
    outline: none;
  }
  
  .checkbox-btn.selected {
    background-color: rgba(190, 255, 192, 0.85);
    border-color: rgba(190, 255, 192, 0.85);
    color: rgb(0, 0, 0);
  }
  
  .check-icon {
    opacity: 0;
  }
  
  .checkbox-btn.selected .check-icon {
    opacity: 1;
  }
  
  .modal-footer {
    padding: 15px 20px;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: flex-end;
  }
  
  .add-btn {
    padding: 8px 20px;
    background-color: rgba(190, 255, 192, 0.85);
    color: rgb(0, 0, 0);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    outline: none;
  }

.add-btn:hover {
  transform: scale(1.05);
  /* box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2); */
  background-color: rgba(170, 255, 173, 0.85);
  color: rgb(51, 51, 51);
}
  
  .add-btn:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
  </style>
  