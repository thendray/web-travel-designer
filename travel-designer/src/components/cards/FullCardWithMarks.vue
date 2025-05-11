<template>
  <div>
    <div class="my-card">
      <div class="my-photo">
        <img :src="cardData.photoUrl" alt="фотография" />
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
    <div class="controls">
      <button
        class="rate neg"
        :class="{ active: selectedButton === 1 }"
        @click="rateCard('down')"
      >
        👎
      </button>
      <button
        class="rate norm"
        :class="{ active: selectedButton === 2 }"
        @click="rateCard('neutral')"
      >
        🤔
      </button>
      <button
        class="rate good"
        :class="{ active: selectedButton === 3 }"
        @click="rateCard('up')"
      >
        👍
      </button>
    </div>
  </div>
</template>


<script>

const icons = {
  'bed': require('../../assets/bed.png'),
  'food': require('../../assets/food.png'),
  'entertainment': require('../../assets/entertaiment.png'),
  'question': require('../../assets/question.png')
};

import axios from 'axios';

export default {
	props: {
		card: {
			required: true,
		},
    routeId: {
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
      selectedButton: null
		};
	},
	created() {
		this.fetchCardData();
	},
  computed: {
    iconSrc() {
      return icons[this.cardData.icon] || '';
    }
  },
	methods: {
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
		},
    rateCard(choice) {
      const choiceToNumber = {
        down: 1,
        neutral: 2,
        up: 3,
      };

      const newChoice = choiceToNumber[choice];

      if (this.selectedButton === newChoice) {
        this.selectedButton = null;
      } else {
        this.selectedButton = newChoice;
      }

      console.log("Selected Button:", this.selectedButton);
      const request = {
        userId: localStorage.getItem("id"),
        cardId: this.card.id,
        routeId: this.routeId,
        mark: newChoice - 1
      }

      axios.post(`/api/vote/create`, request, {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      })
        .then((response) => {
          console.log("Response", response.data);
          this.$emit('nextForVote', this.card.id);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  }
};
</script>

<style scoped>

.my-card {
  background: linear-gradient(to bottom right, rgb(249, 199, 170), rgb(253, 188, 181));
  border-radius: 12px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  padding: 16px;
  width: 30vw;
  position: relative;
  display: flex;
  flex-direction: column;
}

.my-photo img {
  width: 70%;
  border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  margin-top: px;
  max-height: 40vh;
}

.rating {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgb(146, 238, 250);
  font-weight: bold;
  border-radius: 50%;
  padding: 8px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.name {
  font-weight: bold;
  margin: 16px 0 4px;
}

.address {
  margin-bottom: 8px;
	font-style: italic;
  color: #333;
}

.description {
  max-height: 10vh;
  overflow-y: auto;
	margin-top: 8px;
  margin-bottom: 20px;
}

.footer {
  display: flex;
  justify-content: flex-end;
	align-items: flex-end;
  position: absolute;
  bottom: 8px;
  right: 8px;
	width: 100%;
	/* min-height: 100px; */
}

.footer span {
  margin-right: 8px;
}

.category-icon {
  width: 36px;
  height: 36px;
}

.controls {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.rate {
  background-color: #f0f0f0;
  outline: none;
  /* border: 2px solid #ccc; */
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 24px;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s, transform 0.2s;
  margin-top: 10px;

}

.neg:hover {
  background-color: #af4c4c;
  transform: scale(1.1);
}

.norm:hover {
  background-color: #e0e075;
  transform: scale(1.1);
}

.good:hover {
  background-color: #92e05f;
  transform: scale(1.1);
}

.neg.active {
  background-color: #af4c4c;
  /* border-color: #4caf50; */
  color: white;
  transform: scale(1.1);
}

.norm.active {
  background-color: #e0e075;
  /* border-color: #4caf50; */
  color: white;
  transform: scale(1.1);
}

.good.active {
  background-color: #92e05f;
  /* border-color: #4caf50; */
  color: white;
  transform: scale(1.1);
}


.rate:active {
  transform: scale(0.95);
}
</style>
