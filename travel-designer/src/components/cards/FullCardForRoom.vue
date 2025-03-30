<template>
	<div class="my-card">
		<div class="photo">
			<img :src="cardData.photo" alt="фотография" />
			<!-- <img src="../../assets/image.png" alt="фотография" /> -->
		</div>
		<div class="rating">
			<span>{{ cardData.rating }}</span>
		</div>
		<h5 class="name">{{ cardData.name }}</h5>
		<p class="address">{{ cardData.address }}</p>
		<div class="description">
			<p>{{ cardData.description }}</p>
		</div>
		<div class="footer">
			<span>by {{ cardData.author }}</span>
			<img :src="iconSrc" alt="icon" class="category-icon" />
		</div>
    <div class="adding" @click="addPoint">
      <img src="../../assets/plus.png" alt="icon" class="add-icon"/>
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
    card: {
      required: true
    }
	},
  computed: {
    iconSrc() {
      return icons[this.cardData.category] || '';
    }
  },
	data() {
		return {
			cardData: null
		};
	},
	created() {
		this.fetchCardData();
	},
	methods: {
		async fetchCardData() {
			this.cardData = this.card
		},
    addPoint() {
      console.log("click");
      this.$emit('add-point', this.cardData.id);
    }
	},
};
</script>

<style scoped>

.my-card {
  background: linear-gradient(to bottom right, rgba(203, 249, 213, 0.85), rgba(230, 248, 234, 0.85));
  border-radius: 12px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Небольшая тень */
  padding: 16px;
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
  background-color: rgb(159, 246, 178);
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
  /* margin-top: 5px; */
  margin-bottom: 22px;
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
  width: 30px;
  height: 30px;
}

.add-icon {
  width: 25px;
  height: 25px;
}

.adding {
  position: absolute;
  bottom: -5px;
  left: -5px;
  background-color: rgb(159, 246, 178);
  font-weight: bold;
  border-radius: 50%;
  padding: 8px;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.adding:hover {
  transform: scale(1.2);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  background-color: rgb(106, 243, 136);
}
</style>