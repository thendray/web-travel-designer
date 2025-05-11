<template>
	<div class="my-card">
		<div class="photo">
			<img :src="cardData.photo" alt="фотография" />
			
		</div>
		<h5 class="name">{{ cardData.name }}</h5>
		<div class="address">
			<div>{{ cardData.routePoint.address }}</div>
		</div>
		
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
		card: {
			required: true,
		},
	},
  computed: {
    iconSrc() {
      return icons[this.cardData.category] || '';
    }
  },
	data() {
		return {
			cardData: {}
		};
	},
	created() {
		this.cardData = this.card;
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  padding: 12px;
  width: 200px;
  position: relative;
  display: flex;
  flex-direction: column;
}


.photo img {
  width: 100%;
  border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); 
  max-height: 30vh;
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
  margin-bottom: 5px;
  font-style: italic;
  color: #333;
  max-height: 10vh;
  overflow-y: auto;
}

.description {
  max-height: 10vh;
  overflow-y: auto;
  margin-top: 5px;
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