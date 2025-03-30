<template>
	<div class="my-card">
		<div class="photo">
			<img :src="cardData.photoUrl" alt="фотография" />
			<!-- <img src="../../assets/image.png" alt="фотография" /> -->
		</div>
		<!-- <div class="rating">
			<span>{{ cardData.rating }}</span>
		</div> -->
		<h5 class="name">{{ cardData.name }}</h5>
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
  computed: {
    iconSrc() {
      return icons[this.cardData.icon] || '';
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
				author: '',
				icon: '',
        coords: []
			}
		};
	},
	created() {
		this.fetchCardData();
	},
	methods: {
		async fetchCardData() {
			this.cardData = {
				photoUrl: require("../../assets/mock/3.png"),
				rating: '5.0',
				name: 'ION Luxury Adventure Hotel',
				address: 'Несьявеллир, Исландия',
				icon: 'bed',
				description: 'Геотермальные источники и склон вулкана Хейнгидль — отель ION Luxury Adventure Hotel находится в заповедной зоне. В 18 км от него — Национальный парк Тингведлир, который включен в список всемирного наследия ЮНЕСКО.',
				author: 'thendray',
        coords: [55.763641, 37.585223]
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
	},
};
</script>

<style scoped>

.my-card {
  background: linear-gradient(
    to bottom right, 
    rgba(191, 255, 255, 0.85), rgba(190, 255, 192, 0.85)
    );
  border-radius: 12px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Небольшая тень */
  padding: 12px;
  width: 200px;
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
  background-color: rgb(140, 249, 198);
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