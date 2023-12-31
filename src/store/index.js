
import { createStore } from 'vuex'
import getters from "./getters"
import category from "./modules/category"
import theme from './modules/theme'
import createPersistedState from "vuex-persistedstate"

const store = createStore({
    getters,
    modules: {
        category,
        theme
    },
    plugins:[
        createPersistedState({
            // 保存到localStorage中的key值
            key: 'imooc-front',
            // 需要保存的模块
            paths: ['category', 'theme'],

        })
    ]
})


export default store