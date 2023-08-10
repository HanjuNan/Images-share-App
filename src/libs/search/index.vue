<template>
   <div 
    class="group relative p-0.5 rounded-xl border-white duration-500
    hover:bg-red-100/40"
    ref="containerTarget"
    >
        <div>
            <!-- 搜索小图标 -->
            <m-svg-icon 
             class=" w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2"
             name="search"
             color="#707070"
            ></m-svg-icon>

            <!-- 输入框 -->
            <input 
             class=" block w-full h-[22px] pl-4 outline-0 
             bg-zinc-100 caret-zinc-400 rounded-xl 
             text-zinc-900 tracking-wide text-sm font-semibold border 
             border-zinc-100 focus:border-red-300 duration-500
             group-hover:bg-white group-hover:border-zinc-200" 
             type="text"
             placeholder="搜索"
             v-model="inputValue"
             @keyup.enter="onSearchHandler"
             @focus="onFocusHandler"
             @blur="onBlurHandler"
             />

             <!-- 删除按钮 -->
            <m-svg-icon 
             v-show="inputValue"
             @click="onClearClick"
             name="input-delete"
             class=" h-1.5 w-1.5 absolute translate-y-[-50%] top-[50%] right-9
              cursor-pointer duration-500"
             ></m-svg-icon>

             <!-- 分割线 -->
            <div class=" opacity-0 h-1.5 w-[1px] absolute translate-y-[-50%] top-[50%]
             right-[62px] duration-500 bg-zinc-200 group-hover:opacity-100"></div>

             <!--  搜索按钮(通用组件) -->
             <m-button 
              class="opacity-0 absolute translate-y-[-50%] top-[50%] right-3 rounded-full
              group-hover:opacity-100 duration-1000" 
              icon="search" 
              iconColor="#fff"
              @click="onSearchHandler"
             ></m-button>
        </div>
        <!-- 下拉区 -->
        <transition name="slide">
            <div 
             v-if="$slots.dropdown"
             v-show="isFocus"
             class=" max-h-[368px] w-full text-base overflow-auto bg-white
             absolute z-20 left-0 top-[26px] p-2 rounded border border-zinc-200
             duration-200 hover:shadow-2xl">
                <slot name="dropdown" />
            </div>
        </transition>

   </div>
</template>

<script>
// 双向绑定
const EMIT_UPDATE_MODELVALUE = 'update:modelValue'
// search
const EMIT_SEARCH = 'search'
// 删除所有文本
const EMIT_CLEAR = 'clear'
// 输入事件
const EMIT_INPUT = 'input'
// 获取焦点
const EMIT_FOCUS= 'focus'
// 失去焦点
const EMIT_BLUR = 'blur'

</script>

<script setup>
import { ref, watch } from 'vue'
import { useVModel } from "@vueuse/core"
import { onClickOutside } from '@vueuse/core'

/**
 * 1. 输入内容实现双向绑定
 * 2. 搜索按钮在hover是展示
 * 3.一键清空文本功能
 * 4. 触发搜索功能
 * 5. 控制下拉展示区的展示
 * 6. 事件处理
 */
//接收属性
const props = defineProps({
    modelValue: {
        required: true,
        type: String
    }
})
// 注册事件
const emits = defineEmits([EMIT_UPDATE_MODELVALUE, EMIT_SEARCH, 
EMIT_CLEAR, EMIT_INPUT, EMIT_FOCUS, EMIT_BLUR])

const inputValue = useVModel(props)
// 监听用户输入行为
watch(inputValue, (val) => {
    emits(EMIT_INPUT, val)
})

/**
 * 点击删除按钮,删除文本
 */
const onClearClick = () => {
    inputValue.value = ''
    emits(EMIT_CLEAR, '')
}

/**
 * 触发搜索
 */
const onSearchHandler = () => {
    emits('EMIT_SEARCH', inputValue.value)
}

// 判断input是否获取到焦点
const isFocus = ref(false)
const containerTarget = ref(null)

/**
 * 输入框获取焦点事件处理函数
 */
const onFocusHandler = () => {
    isFocus.value = true
    emits(EMIT_FOCUS)
}

/**
 * 失去焦点
 */
const onBlurHandler = () => {
    isFocus.value = false
    emits(EMIT_BLUR)
}

// onClickOutside vueuse中的方法
// 监听是否处于点击范围
onClickOutside(containerTarget, () => {
    isFocus.value = false
})

</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
    transition: all 0.5s;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateY(40px);
}

</style>