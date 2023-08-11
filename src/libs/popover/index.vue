<template>
  <div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <div ref="referenceTarget">
      <!-- 具名插槽: 触发弹层的视图 -->
      <slot name="reference" />
    </div>
    <!-- 气泡展示 -->
    <transition name="slide">
      <div
        ref="contentTarget"
        v-show="isVisable"
        class=" dark:border-zinc-700 absolute p-1 z-20 bg-white dark:bg-zinc-900 border rounded-md"
        :style="contentStyle"
      >
        <!-- 匿名插槽: 弹出层视图中展示的内容 -->
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>

// 延迟关闭时间
const DELAY_TIME = 100


//左上
const PROP_TOP_LEFT = 'top-left'
//右上
const PROP_TOP_RIGHT = 'top-right'
//左下
const PROP_BOTTOM_LEFT = 'bottom-left'
//右下
const PROP_BOTTOM_RIGHT = 'bottom-right'

const placementEnum = [
  PROP_TOP_LEFT,
  PROP_TOP_RIGHT,
  PROP_BOTTOM_LEFT,
  PROP_BOTTOM_RIGHT
]
</script>

<script setup>
/**
 * 注意:我们还需要指定气泡展示的位置
 * 1.指定所有可选位置的常量,并生成enum
 * 2.通过prop控制指定位置
 * 3.获取元素的DOM,创建读取元素尺寸的方法
 * 4.生成气泡的样式对象,用来控制每个位置对应的样式
 * 5.根据prop,计算样式对象
 */

import { ref, nextTick, watch } from 'vue'

const props = defineProps({
  // 控制气泡弹出位置,给出开发者错误提示
  placement: {
    type: String,
    default: PROP_BOTTOM_LEFT,
    validator(val) {
      const result = placementEnum.includes(val)
      if (!result) {
        throw new Error(
          `你的placement必须是${placementEnum.join('、')}中的一个`
        )
      }
      return result
    }
  }
})

const isVisable = ref(false)

/**
 * 鼠标移入触发
 */
 let timeout;
const onMouseenter = () => {
  isVisable.value = true
  if (timeout) {
    clearTimeout(timeout)
  }
}

/**
 * 鼠标移出触发
 */

const onMouseleave = () => {
    timeout = setTimeout(() => {
        isVisable.value = false
        timeout = null
    },DELAY_TIME)
}

/**
 * 计算元素尺寸
 */
const referenceTarget = ref(null)
const contentTarget = ref(null)
const useElementSize = (target) => {
  if (!target) return {}
  return {
    //offsetWidth 是一个用于获取元素宽度的属性。
    // 它是一个包括元素的内容宽度、内边距和边框的总宽度的值。
    // 换句话说，offsetWidth 表示了元素在页面上占据的实际宽度。
    width: target.offsetWidth,
    height: target.offsetHeight
  }
}

/**
 * 气泡样式
 */
const contentStyle = ref({
  top: 0,
  left: 0
})

// 计算: 期望气泡展示的时候再进行计算
watch(isVisable, (val) => {
  if (!val) return
  // 等待元素渲染
  // vue在数据变化之后,需要等待一段时间DOM才会发生变化
  nextTick(() => {
    switch (props.placement) {
      // 左上
      case PROP_TOP_LEFT:
        contentStyle.value.top = 0
        contentStyle.value.left =
          -useElementSize(contentTarget.value).width + 'px'
        break
      // 右上
      case PROP_TOP_RIGHT:
        contentStyle.value.top = 0
        contentStyle.value.left =
          useElementSize(referenceTarget.value).width + 'px'
        break
      // 左下
      case PROP_BOTTOM_LEFT:
        contentStyle.value.top =
          useElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left =
          -useElementSize(contentTarget.value).width + 'px'
        break
      // 右下
      case PROP_BOTTOM_RIGHT:
        contentStyle.value.top =
          useElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left =
          useElementSize(referenceTarget.value).width + 'px'
        break
    }
  })
})
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s, transform 0.3;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
