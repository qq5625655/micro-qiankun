import { getList, setList } from './const/index';
import { rewriteRouter } from './router/rewriteRouter';
import { currentApp } from './utils/index'; 
import { setMainLifecycle} from './const/mainLifeCycle';
import { prefetch } from './loader/prefetch';


// 路由拦截
rewriteRouter();
// 注册微前端

export const registerMicroApps = (appList, liftCycle)=>{
    setList(appList); //子应用的相关内容
    setMainLifecycle(liftCycle); //主应用的声明周期
}
// 开始执行微前端
export const start = ()=>{
    // 当前子应用列表是否为空
    const apps = getList();
    if(!apps.length){
        // console.log('子应用列表为空');
        throw Error('子应用列表为空');
    }
    const app = currentApp();
    if(app){
        const { pathname, hash } = window.location;
        const url = pathname + hash;
        window.history.pushState('', '', url);
        window.__CURRENT_SUB_APP__ = app.activeRule;
        
    }
    prefetch();
    
};