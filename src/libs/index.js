
import svgIcon from "./svg-icon/index.vue"
import popup from "./popup/index.vue"
import { defineAsyncComponent } from "vue"

export default {
    install(app) {
        // app.component("m-svg-icon", svgIcon)
        // app.component("m-popup", popup)

        // 1.获取当前路径下所有文件夹中的index.vue
        const components = import.meta.glob('./*/index.vue')
        console.log("components = ",components);
        // 2.遍历获取到的组件模块
        for (const [fullPath, fn] of Object.entries(components)) {
            // 3.利用app.component进行注册
            const componentName = 'm-' + fullPath.replace("./","").split("/")[0]
            app.component(componentName, defineAsyncComponent(fn))
        }
        

    }
}