<template>
  <Layout />
</template>
<script lang="ts" setup>
import Layout from '@/layout/index.vue'
</script>
<style>
.route-enter-active,
.route-leave-active {
  transition: all 0.4s ease-out;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(15px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
</style>
