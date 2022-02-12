import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import { registerMicroApps } from './micro/start';
// import { start } from './micro/start';
import { starMicroApp } from './utils/qiankun';
// import { leftNav } from './store';

// import { loading } from './store';
import { createStore } from './micro/index';


// 通过window注入的形式去进行改变
const store = createStore();

window.store = store;

starMicroApp();
// const storeData = store.getStore();

// 注册、加载、启动子应用
// starMicroApp();
// registerMicroApps(leftNav.navList, {
//     beforeLoad:[
//         ()=>{
//             console.log('开始加载');
//             loading.openLoading();
//         }
//     ],
//     mounted:[
//         ()=>{
//             console.log('渲染完成');
//             loading.closeLoading();
//         }
//     ],
//     destoryed:[
//         ()=>{
//             console.log('卸载完成');
//         }
//     ],
// });
// start();

createApp(App).use(router()).mount('#micro_web_main_app')
