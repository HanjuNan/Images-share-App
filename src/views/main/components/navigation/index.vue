<template>
  <mobile-navigation v-if="isMobileTerminal"></mobile-navigation>
</template>

<script setup>
import { ref } from "vue";
import { isMobileTerminal } from '@/utils/flexible';
import mobileNavigation from './mobile/index.vue';
import pcNavigation from './pc/index.vue';
import { useStore } from 'vuex';

const store = useStore()
// 触发category获取数据
store.dispatch('category/useCategoryData')


</script>

<style lang="scss" scoped>

</style>