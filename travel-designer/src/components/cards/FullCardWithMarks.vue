<template>
  <div>
    <div class="my-card">
      <div class="photo">
        <!-- <img :src="cardData.photoUrl" alt="фотография" /> -->
        <img src="../../assets/image.png" alt="фотография" />
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
        class="rate"
        :class="{ active: selectedButton === 1 }"
        @click="rateCard('down')"
      >
        👎
      </button>
      <button
        class="rate"
        :class="{ active: selectedButton === 2 }"
        @click="rateCard('neutral')"
      >
        🤔
      </button>
      <button
        class="rate"
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

export default {
	props: {
		cardId: {
			type: Number,
			required: true,
		},
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
				photoUrl: 'auth_background.jpeg',
				rating: '5.0',
				name: 'Отель на море',
				address: 'Турция, Белек',
				icon: 'food',
				description: 'Прекрасный отель на берегу моря с песчаным пляжем и отличной анимацией Прекрасный отель на берегу моря с песчаным пляжем и отличной анимацией Прекрасный отель на берегу моря с песчаным пляжем и отличной анимацией Прекрасный отель на берегу моря с песчаным пляжем и отличной анимацией Прекрасный отель на берегу моря с песчаным пляжем и отличной анимацией Прекрасный отель на берегу моря с песчаным пляжем и отличной анимацией',
				author: 'thendray'
			}
			// try {
			//   const response = await fetch(`https://your-backend-api.com/cards/${this.cardId}`);
			//   if (!response.ok) {
			//     throw new Error('Network response was not ok');
			//   }
			//   this.cardData = await response.json();
			// } catch (error) {
			//   console.error('Error fetching card data:', error);
			// }
		},
    rateCard(choice) {
      const choiceToNumber = {
        down: 1,
        neutral: 2,
        up: 3,
      };

      const newChoice = choiceToNumber[choice];

      // Если нажата уже выбранная кнопка, сбрасываем выбор
      if (this.selectedButton === newChoice) {
        this.selectedButton = null;
      } else {
        this.selectedButton = newChoice;
      }

      // Здесь можно добавить логику для отправки выбора на сервер
      console.log("Selected Button:", this.selectedButton);
    },
  }
};
</script>

<style scoped>

.my-card {
  background: linear-gradient(to bottom right, rgb(249, 199, 170), rgb(253, 188, 181));
  border-radius: 12px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Небольшая тень */
  padding: 16px;
  width: 30vw;
  position: relative;
  display: flex;
  flex-direction: column;
}


.photo img {
  width: 100%;
  border-radius: 8px; /* Скругленные углы изображения */
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); /* Небольшая тень */
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
  margin: 16px 0 8px;
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
  margin-bottom: 32px;
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

.rate:hover {
  background-color: #e0e0e0;
  transform: scale(1.1);
}

.rate.active {
  background-color: #4caf50;
  /* border-color: #4caf50; */
  color: white;
  transform: scale(1.1);
}

.rate:active {
  transform: scale(0.95);
}
</style>