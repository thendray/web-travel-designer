<template>
	<div class="my-card">
		<div class="photo">
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
		<div class="adding">
			<button 
        @click="toggleLike" 
        class="like-button" 
        :class="{ 'liked': isLiked }" 
        :disabled="isLiked">
        <img src="../../assets/love.png" alt="icon" class="add-icon"/>
        <span v-if="isLiked" class="like-toast">Добавлено в избранное</span>
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
		cardData: {
			required: true,
		},
	},
	data() {
		return {
      isLiked: false,
      showToast: false
		};
	},
	created() {
		
	},
  computed: {
    iconSrc() {
      return icons[this.cardData.icon] || '';
    }
  },
	methods: {
    toggleLike() {
      if (!this.isLiked) {
        this.isLiked = true;
        
        this.showToastMessage();
      }
    },
    showToastMessage() {
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    },
		addPoint() {

		}
	},
};
</script>

<style scoped>

.my-card {
	background: linear-gradient(to bottom right, rgba(167, 202, 252, 0.85), rgba(181, 249, 253, 0.85));
  border-radius: 12px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Небольшая тень */
  padding: 16px;
  width: 300px;
  position: relative;
  display: flex;
  flex-direction: column;
}


.photo img {
  width: 100%;
  border-radius: 8px; /* Скругленные углы изображения */
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); /* Небольшая тень */
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

.adding {
  position: absolute;
  bottom: -7px;
  left: -7px;
  background-color: rgb(183, 143, 247);
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

.adding:hover {
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  background-color: rgb(169, 121, 246);
}

.add-icon {
  width: 60px;
  height: 60px;
}

.like-button {
  display: inline-flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  padding: 5px;
  transition: all 0.3s ease;
}

.like-button img {
  transition: transform 0.3s ease;
}

.like-button.liked {
  background-color: rgba(255, 0, 0, 0.1);
  border-radius: 50%;
  cursor: default;
}

.like-button.liked img {
  transform: scale(1.1);
  filter: invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%);
}

.like-toast {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: rgb(255, 255, 255);
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 1;
  transition: opacity 0.3s ease;
  margin-bottom: 5px;
  animation: fadeInOut 3s forwards;
}

@keyframes fadeInOut {
  0% { opacity: 0; }
  10% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; }
}
</style>