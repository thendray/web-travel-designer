<template>
	<div class="routes">
		<div class="main-text">Маршруты для Вас</div>
		<div class="route-controls">
			<div class="arrow">
				<LeftArrow @click="prevRoute"></LeftArrow>
			</div>
			<transition :name="transitionName" mode="out-in">
				<div class="route" :key="currentRoute">маршрут {{ currentRoute }}</div>
			</transition>
			<div class="arrow">
				<RightArrow @click="nextRoute"></RightArrow>
			</div>
		</div>
	</div>
</template>
  
<script>
import LeftArrow from '@/components/common/LeftArrow.vue';
import RightArrow from '@/components/common/RightArrow.vue';

 export default {
    data() {
		return {
			currentRoute: 1,
			totalRoutes: 5,
			transitionName: 'slide-left',
		};
	},
	components: {
		RightArrow,
		LeftArrow
	},
    methods: {
		prevRoute() {
            if (this.currentRoute > 1) {
				this.transitionName = 'slide-left';
				this.currentRoute--;
			}
		},
		nextRoute() {
			if (this.currentRoute < this.totalRoutes) {
				this.transitionName = 'slide-right';
				this.currentRoute++;
			}
		},
	},
}
</script>

<style scoped>

.main-text {
	font-size: 1.5rem;
	/* color: rgb(55, 55, 55); */
	text-align: center;
	margin-bottom: 25px;
	z-index: 3;
}

.routes {
	background-color: rgba(231, 247, 247, 0.8);
	box-shadow: 0 0 25px rgba(0, 0, 0, 0.5);
	padding: 20px;
	border-radius: 10px;
	margin-bottom: 20px;
	/* text-align: center; */
	/* height: 40vh; */
	/* justify-content: center; */
}

.route-controls {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 10px;
}

.route {
	background-color: rgb(160, 224, 224);
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
	transform: translateX(100%);
}

.slide-right-enter, 
.slide-right-leave-to {
	opacity: 0;
	transform: translateX(-100%);
}

.arrow {
	align-items: center;
}

</style>
