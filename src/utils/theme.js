import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants'
import { watch } from 'vue'
import store from '../store'

/**
 * 监听主题变更
 */
let matchMidia
const watchSystemThemeChange = () => {
  // 仅需一次初始化
  if (matchMidia) return
  matchMidia = window.matchMedia('(prefers-color-scheme: dark)')
  // 监听主题变化
  matchMidia.onchange = (THEME_SYSTEM) => {
    changeTheme(THEME_SYSTEM)
  }
}

const changeTheme = (theme) => {
  let themeClassName = ''
  switch (theme) {
    case THEME_LIGHT:
      themeClassName = 'light'
      break
    case THEME_DARK:
      themeClassName = 'dark'
      break
    case THEME_SYSTEM:
      watchSystemThemeChange()
      themeClassName = matchMidia.matches ? 'dark' : 'light'
      break
  }
  //修改html的class
  document.querySelector('html').className = themeClassName
}

/**
 * 初始化主题
 */

export default () => {
  // 当主题发生改变时,或者进入系统时,可以进行html class的配置
  watch(
    () => store.getters.themeType,
    (val) => {
      changeTheme(val)
    },
    {
      // 初始化执行一次
      immediate: true
    }
  )
}
