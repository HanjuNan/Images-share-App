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

/**
 * 动态指定 rem 基准值, 最大为40px
 * 根据用户的屏幕宽度,进行一些计算,把计算出来的值赋值给html根标签作为font-size大小
 */
export const useREM = () => {
    //定义最大的font-size
    const MAX_FONT_SIZE = 40
    document.addEventListener('DOMContentLoaded', () => {
        // 拿到html标签
        const html = document.querySelector('html')
        // 计算fontSize,根据屏幕宽度 / 10
        let fontSize = window.innerWidth / 10
        fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
        // 赋值给html
        html.style.fontSize = fontSize + 'px'
    })
}