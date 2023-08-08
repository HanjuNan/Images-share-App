import { computed } from "vue"
import { useWindowSize } from "@vueuse/core"
import { PC_DEVICE_WIDTH } from "@/constants"
/**
 * 判断当前是否移动设备,判断依据屏幕宽度是否大于一个指定宽度（1280）
 * @returns 
 */

const { width } = useWindowSize()

export const isMobileTerminal = computed(() => {
    //来获取页面的根元素，即 <html> 元素
    return width.value < PC_DEVICE_WIDTH
})