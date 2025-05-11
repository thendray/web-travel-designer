<template>
	<div class="my-card">
		<div class="photo">
			<img :src="cardData.photoUrl" alt="фотография" />
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
			<span>{{ cardData.coords[0] }}</span>
            <span>{{ cardData.coords[1] }}</span>
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
			require: true
		}
	},
  computed: {
    iconSrc() {
      return icons[this.cardData.icon] || '';
    }
  },
	data() {
		return {
			cardData: {}
		};
	},
	created() {
		this.fetchCardData();
	},
	methods: {
		fetchCardData() {
			console.log("card", this.card);
			this.cardData = {
				photoUrl: this.card.photo,
				rating: this.card.rating,
				name: this.card.name,
				address: this.card.routePoint.address,
				icon: this.card.category,
				description: this.card.description,
				
        coords: [this.card.routePoint.xCoord, this.card.routePoint.yCoord]
			}
		},
	},
};
</script>

<style scoped>

.my-card {
  background: linear-gradient(
    to bottom right, 
    rgba(188, 167, 251, 0.85), rgba(168, 248, 175, 0.85)
    );
  border-radius: 12px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  padding: 16px;
  width: 300px;
  position: relative;
  display: flex;
  flex-direction: column;
}


.photo img {
  width: 100%;
  border-radius: 8px; 
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); 
  max-height: 40vh;
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