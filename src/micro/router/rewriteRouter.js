import { patchRouter } from '../utils/index';
import { trunApp } from './routerHandle';
 // 重写window的路由跳转
export const rewriteRouter = ()=>{
    window.history.pushState = patchRouter(window.history.pushState, 'micro_push');
    window.history.replaceState = patchRouter(window.history.replaceState, 'micro_replace');
    window.addEventListener('micro_push', trunApp);
    window.addEventListener('micro_replace', trunApp);

    // 回退，前进，都监听路由变化
    window.onpopstate = function(){
        trunApp();
    }
};