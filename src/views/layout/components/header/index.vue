<template>
    <div class=" duration-500 dark:bg-zinc-800 w-full bg-white border-b border-b-zinc-200 px-2 py-1
     dark:border-b-zinc-700">
        <div class=" flex items-center">
            <img 
             class=" h-4 cursor-pointer mr-2"
             @click="onToHome"
             src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png" />
             <header-search-vue class=" mr-1"></header-search-vue>
             <header-theme-vue class=" mr-1"></header-theme-vue>
             <header-my-vue></header-my-vue>
        </div>
    </div>
 </template>
 
 <script setup>
import { useRouter } from "vue-router";
import headerSearchVue from "./header-search/index.vue";
import headerMyVue from "./header-my.vue"
import headerThemeVue from "./header-theme.vue"

const router = useRouter()
// 点击Logo跳转到首页
const onToHome = () => {
    router.push("/")
}
 </script>
 
 <style scoped>
 
 </style>