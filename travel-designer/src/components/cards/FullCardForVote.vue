<template>
	<div class="my-card">
		<div class="photo">
			<!-- <img :src="cardData.photoUrl" alt="фотография" /> -->
			<img src="../../assets/image.png" alt="фотография" />
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
			}
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
		}
	},
};
</script>

<style scoped>

.my-card {
  background: linear-gradient(to bottom right, rgb(246, 200, 174), rgb(250, 178, 171));
  border-radius: 12px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Небольшая тень */
  padding: 16px;
  width: 400px;
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
  background-color: rgb(247, 172, 122);
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
</style>