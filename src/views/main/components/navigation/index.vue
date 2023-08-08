<template>
  <mobile-navigation v-if="isMobileTerminal" :data="categorysData"></mobile-navigation>
</template>

<script setup>
import { ref } from "vue";
import { isMobileTerminal } from '@/utils/flexible';
import mobileNavigation from './mobile/index.vue';
import pcNavigation from './pc/index.vue';

import { getCategory } from '@/api/category';

const categorysData = ref([])

const getCategoryData = async () => {
    const { categorys } = await getCategory()
    categorysData.value = categorys
    console.log(categorysData.value);
}

getCategoryData()

</script>

<style lang="scss" scoped>

</style>