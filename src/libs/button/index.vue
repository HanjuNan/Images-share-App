<template>
   <button 
    class=" text-sm text-center rounded duration-150
        flex justify-center items-center"
        :class="[
            typeEnum[type],
            sizeEnum[sizeKey].button,
            {
                'active:scale-105': isActiveAn
            }
        ]"
     >  
        <!-- loading -->
        <m-svg-icon 
         class=" w-2 h-2 animate-spin mr-1" 
         v-if="loading" name="loading">
        </m-svg-icon>
        <!-- icon按钮 -->
        <m-svg-icon 
         v-if="icon" :name="icon"
         class=" m-auto"
         :class="sizeEnum[sizeKey].icon"
         :color="iconColor"
         :fillClass="iconClass"
         ></m-svg-icon>
         <!-- 文字按钮 -->
         <slot v-else />
   </button>
</template>

<script>
// 1. 构建type风格可选项和size大小可选项
// type 可选项:表示按钮风格
const typeEnum = {
    primary: 'text-white bg-zinc-800 hover:bg-zinc-900 active:bg-zinc-800',
    main: 'text-white bg-main hover:bg-hover-main active:bg-main',
    info: 'text-zinc-800 bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-200'
}

// size 可选项: 表示按钮的大小.区分文字按钮和icon按钮
const sizeEnum = {
    // 文字按钮
    default: {
        button: ' w-8 h-4 text-base'
    },

    // icon按钮
    'icon-default': {
        button: 'w-4 h-4',
        icon: 'w-1.5 h-1.5'
    },
    small: {
        button: 'w-7 h-3 text-base',
        icon: ''
    },
    'icon-small': {
        button: 'w-3 h-3',
        icon: 'w-1.5 h-1.5'
    }
}

</script>

<script setup>
import { computed } from 'vue'
    /**
     * 1. 构建type风格可选项和size大小可选项
     * 2. 通过props让开发者控制按钮
     * 3. 区分icon button 和 text button
     * 4. 依据当前的数据,实现视图
     * 5. 处理点击事件
     */

// 2. 通过props让开发者控制按钮
const props = defineProps({   
    // icon 图标
    icon: String,
    // icon 颜色
    iconColor: String,
    // icon 图标类名 (tailwind)
    iconClass: String,
    // 按钮风格
    type: {
        type: String,
        default: 'main',
        validate(val) {
            //1.获取所有可选项
            const keys = Object.keys(typeEnum)
            //2.开发者指定的风格在可选项中吗
            const result = keys.includes(val)
            if (!result) {
                throw new Error(`你的type必须是${keys.join('、')}中的一个`)
            }
            return result
        }
    },
    // 大小风格
    size: {
        type: String,
        default: 'default',
        validate(val) {
            //1.获取所有可选项
            const keys = Object.keys(sizeEnum).filter(key => !key.includes('icon'))
            //2.开发者指定的风格在可选项中吗
            const result = keys.includes(val)
            if (!result) {
                throw new Error(`你的size必须是${keys.join('、')}中的一个`)
            }
            return result
        }
    },
    // 按钮点击时,是否需要动画
    isActiveAn: {
        type: Boolean,
        default: true
    },
    // 加载状态
    loading: {
        type: Boolean,
        default: false
    }
})

// 3. 区分icon button 和 text button
const sizeKey = computed(() => {
    return props.icon ? 'icon-' + props.size : props.size
})

</script>

<style scoped>

</style>