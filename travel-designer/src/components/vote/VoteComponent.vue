<template>
	<div class="for-vote">
		<div class="main-text">Оцените</div>
		<div class="vote-controls">
			<div class="arrow">
				<LeftArrow @click="prevCard"></LeftArrow>
			</div>
			<transition :name="transitionName" mode="out-in">
      <FullCardWithMarks 
        @next-for-vote="nextForVote"
        :card=currentCard 
        :route-id="routeId" 
        :key="currentCard.id" 
        v-if="currentCard"></FullCardWithMarks>
			</transition>
			<div class="arrow">
				<RightArrow @click="nextCard"></RightArrow>
			</div>
		</div>
	</div>
</template>
  
<script>
import LeftArrow from '@/components/common/LeftArrow.vue';
import RightArrow from '@/components/common/RightArrow.vue';
import FullCardWithMarks from '../cards/FullCardWithMarks.vue';

export default {
  components: {
		RightArrow,
		LeftArrow,
    FullCardWithMarks
	},
	props: {
		cards: {
			required: true
		},
		routeId: {
			required: true
		}
	},
  data() {
		return {
			currentCard: null,
      curIndex: 0,
			totalCards: 5,
			transitionName: 'slide-left',
			voteCrads: []
		};
	},
	created() {
		this.voteCrads = this.cards;
		this.totalCards = this.voteCrads.length;
		this.currentCard = this.voteCrads[this.curIndex];
	},
  methods: {
		nextForVote(id) {
			this.voteCrads = this.voteCrads.filter(c => c.id != id);
			this.totalCards = this.voteCrads.length;
      this.curIndex = 0;
      this.currentCard = this.voteCrads[this.curIndex];
		},
		prevCard() {
      if (this.curIndex > 0) {
				this.transitionName = 'slide-left';
				this.curIndex--;
        this.currentCard = this.voteCrads[this.curIndex];
			}
		},
		nextCard() {
			if (this.curIndex + 1 < this.totalCards) {
				this.transitionName = 'slide-right';
				this.curIndex++;
        this.currentCard = this.voteCrads[this.curIndex];
			}
		},
	}
}
</script>

<style scoped>

.main-text {
	font-size: 1.5rem;
	color: rgb(231, 206, 206);
	text-align: center;
	margin-bottom: 25px;
}

.for-vote {
	/* background-color: rgba(243, 200, 178, 0.7); */
	box-shadow: 0 0 25px rgba(0, 0, 0, 0.5);
	padding: 20px;
	border-radius: 10px;
	margin-bottom: 20px;
  min-width: 50vw;
	min-height: 50vh;
  z-index: 2;
	/* text-align: center; */
	/* height: 40vh; */
	/* justify-content: center; */
}

.vote-controls {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 10px;
}

.vote-card {
	background-color: rgb(224, 193, 160);
	padding: 10px;
	border-radius: 5px;
	/* height: 10vh; */
	/* text-align: center;
	justify-content: center; */
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
	transition: opacity 0.5s, transform 0.5s;
}

.slide-left-enter, 
.slide-left-leave-to {
	opacity: 0;
	transform: translateX(40%);
}

.slide-right-enter, 
.slide-right-leave-to {
	opacity: 0;
	transform: translateX(-40%);
}

.arrow {
	align-items: center;
}

</style>
