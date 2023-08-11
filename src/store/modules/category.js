/**
 * 处理navigationBar中的数据categorys
 */

import { ALL_CATEGORY_ITEM } from '@/constants';
import { getCategory } from '@/api/category';

export default {
    // 独立作用域
    namespaced: true,
    state: () => {
        return {
            categorys: [ALL_CATEGORY_ITEM]
        }
    },
    mutations: {
        /**
         * 为categorys赋值
         */
        setCategorys(state, newCategorys) {
            state.categorys = [ALL_CATEGORY_ITEM, ...newCategorys]
        }
    },
    actions: {
        /**
         * 获取category数据,并自动保存到vuex中
         */
        async useCategoryData(context) {
            const { categorys } = await getCategory()
            context.commit("setCategorys", categorys)
        }
    }
}