<template>
    <div class="tooltip-container">
        <button class="circle" disabled @mouseover="showTooltip" @mouseout="hideTooltip">?</button>
        <span class="tooltip-text" v-if="tooltipVisible"> {{ text }} </span>
    </div>
</template>
<script>
export default {
    props: {
        text: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            tooltipVisible: false,
        }
    },

    methods: {
        showTooltip() {
            this.tooltipVisible = true;
        },
        hideTooltip() {
            this.tooltipVisible = false;
        }
    },
}
</script>
<style scoped>

.tooltip-container {
  position: relative;
  display: inline-block;
}

.tooltip-text {
  visibility: hidden;
  font-size: 0.8rem;
  width: 250px;
  background-color: #fff;
  color: #333;
  /* text-align: center; */
  border-radius: 5px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 150%; /* Смещение вверх относительно кнопки */
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.tooltip-container:hover .tooltip-text {
  visibility: visible;
}

button {
  padding: 10px 20px;
  /* width: 100%; */
  margin: 0 5px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  color: rgb(51, 51, 51);
  background-color: rgb(220, 246, 255);
  outline: none;
}

button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  background-color: rgb(173, 226, 255);
  color: rgb(51, 51, 51);
}

.circle {
  border-radius: 50% !important;
}
</style>