
<template>
   <div class="bg-white dark:bg-zinc-900 duration-500 sticky top-0 left-0 z-10">
     <ul
       ref="ulTarget"
       class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden"
     >
       <!-- 汉堡按钮 -->
       <li
         @click="onShowPopup"
         class="z-20 fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white dark:bg-zinc-900 shadow-l-white dark:shadow-l-zinc"
       >
         <m-svg-icon class="w-1.5 h-1.5" name="hamburger"></m-svg-icon>
       </li>
       <!-- 滑块 -->
       <li
         ref="sliderTarget"
         :style="sliderStyle"
         class="absolute h-[22px] bg-zinc-900 dark:bg-zinc-800 rounded-lg duration-200 overflow-hidden"
        
       ></li>
       <!-- 循环items -->
       <li
         class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
         :class="{
            ' text-zinc-100 ' : currentCategoryIndex === index
         }"
         v-for="(item, index) in data"
         :key="item.id"
         :ref="setItemRef"
         @click="onItemClick(index)"
       >
         {{ item.name }}
       </li>
     </ul>
     <m-popup v-model="isVisible">我是内容</m-popup>
   </div>
 </template>

<script setup>
import { useScroll } from '@vueuse/core'
import { onBeforeUpdate, ref, watch } from 'vue'
// vite构建的项目中,我们可以使用defineProps方法
defineProps({
  data: {
    type: Array,
    required: true
  }
})

// 滑块
// 滑块
const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '52px',
  height: '22px'
})

// 获取所有的item元素
let itemRefs = []
const setItemRef = (el) => {
  // console.log("el = ",el);
  if (el) {
    itemRefs.push(el)
  }
}

// 数据改变之后,DOM变化之前
onBeforeUpdate(() => {
  itemRefs = []
})

// 获取ul元素
const ulTarget = ref(null)
// 通过vueUse提供的useScroll获取响应式的scroll滚动距离
const { x: ulScrollLeft } = useScroll(ulTarget)

//选中item下标
const currentCategoryIndex = ref(0)
// watch监听
watch(currentCategoryIndex, (val) => {
  // console.log('currentCategoryIndex = ', val)

  const { left, width } = itemRefs[val].getBoundingClientRect()
  // 滑块的位置 = ul横向滚动位置 + 当前元素的left
  sliderStyle.value = {
    transform: `translateX(${ulScrollLeft.value + left - 10 + 'px'})`,
    width: width + 'px',
    height: '22px'
  }
})

// item点击事件
const onItemClick = (index) => {
  currentCategoryIndex.value = index
}

// 控制popup组件展示与隐藏
const isVisible = ref(false)

// 汉堡点击事件
const onShowPopup = () => {
    isVisible.value = true
}

</script>

