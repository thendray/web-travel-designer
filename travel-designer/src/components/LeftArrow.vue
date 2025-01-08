<template>
    <div class="arrow">
        <div class="arrow-top"></div>
        <div class="arrow-bottom"></div>
    </div>
</template>

<style scoped>

.arrow {
  cursor: pointer;
  height: 60px;
  position: absolute;
  transform: translateX(-50%) translateY(-50%);
  transition: transform 0.1s;
  width: 25px;
}

.arrow-top, .arrow-bottom {
  background-color: rgb(102, 102, 102);
  height: 4px;
  right: -5px;
  position: absolute;
  top: 50%;
  width: 100%;
}

.arrow-top:after, .arrow-bottom:after {
  background-color: #fff;
  content: "";
  height: 100%;
  position: absolute;
  top: 0;
  transition: all 0.15s;
}

.arrow-top {
  transform: rotate(-45deg);
  transform-origin: bottom left;
}

.arrow-top:after {
  right: 100%;
  left: 0;
  transition-delay: 0s;
}

.arrow-bottom {
  transform: rotate(45deg);
  transform-origin: top left;
}

.arrow-bottom:after {
  right: 0;
  left: 100%;
  transition-delay: 0.15s;
}

.arrow:hover .arrow-top:after {
  right: 0;
  transition-delay: 0.15s;
}

.arrow:hover .arrow-bottom:after {
  left: 0;
  transition-delay: 0s;
}

.arrow:active {
  transform: translateX(-50%) translateY(-50%) scale(0.9);
}

</style>