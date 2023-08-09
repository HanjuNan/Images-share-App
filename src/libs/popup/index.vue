<template>
   <div>
        
        <teleport to='body'>
            <!-- 蒙版 -->
            <transition name="fade">
                <div @click="emits('update:modelValue', false)" v-if="modelValue" class=" w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"></div>
            </transition>
            
            <!-- 内容 -->
            <transition name="popup-down-up">
                <div v-if="modelValue" v-bind="$attrs" class=" w-screen bg-white z-50 fixed bottom-0">
                    <slot />
                </div>
            </transition>
           
        </teleport>
       
   </div>
</template>

<script setup>
import { watch } from 'vue'
import { useScrollLock } from "@vueuse/core"
const props = defineProps({
    modelValue: {
        required: true,
        type: Boolean
    }
})

const emits = defineEmits(['update:modelValue'])

// 锁定滚动
const isLocked = useScrollLock(document.body)
watch(() => props.modelValue, (val) => {
    isLocked.value = val
},{
    immediate: true
})

</script>

<style lang="scss" scoped>

// fade动画
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s;
}
// 准备进入和离开完成
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

// 内容
.popup-down-up-enter-active,
.popup-down-up-leave-active {
    transition: all 0.3s;
}

.popup-down-up-enter-from,
.popup-down-up-leave-to {
    transform: translateY(100%);
}


</style>