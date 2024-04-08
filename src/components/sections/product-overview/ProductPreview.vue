<script lang="ts" setup>
import Motorcycle from '@/assets/img/motorcycle.jpg'
</script>

<template>
  <div
    class="aspect-[4/3] bg-no-repeat bg-contain bg-center"
    :style="{ backgroundImage: `url(${Motorcycle})` }"
  ></div>
</template>
