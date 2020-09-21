import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import MyHttpServer from '@/plugins/http.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/reset.css'

// 使用插件
Vue.use(ElementUI);
Vue.use(MyHttpServer)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
