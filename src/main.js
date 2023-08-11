import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.scss'
import router from './router'
import store from "@/store"
import { useREM } from './utils/flexible'
import useTheme from "@/utils/theme"
import mLibs from "./libs"
//注册svg-icons
import 'virtual:svg-icons-register'

//动态设置rem
useREM()
//动态设置主题
useTheme()

createApp(App).use(router).use(store).use(mLibs).mount('#app')
