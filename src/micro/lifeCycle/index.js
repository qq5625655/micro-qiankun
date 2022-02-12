import { findAppByRouter } from '../utils/index'
import { getMainLifecycle } from '../const/mainLifeCycle'
import  { loadHtml } from '../loader/index'

export const lifeCycle = async ()=>{
    // 获取上一个子应用
    const prevApp = findAppByRouter(window.__ORIGIN_APP__);
    // 获取到当前子应用
    const nextApp = findAppByRouter(window.__CURRENT_SUB_APP__);
    console.log('nextApp', nextApp);
    if(!nextApp){
        return;
    }
    if(prevApp && prevApp.unmount){
        if(prevApp.proxy){
            prevApp.proxy.inactive(); // 将沙箱销毁
        }
        await destoryed(prevApp);
    }
    const app = await beforeLoad(nextApp);
    await mounted(app);
}

export const beforeLoad = async (app)=>{
    // 主应用的beforeLoad
    await runMainLifeCycle('beforeLoad');
    app && app.bootstrap &&  app.bootstrap();
    // 加载子应用htlm里的script内容
    const subApp = await loadHtml(app);

    subApp && subApp.bootstrap && subApp.bootstrap();
    return subApp;
};
export const mounted = async (app)=>{

    app && app.mount && app.mount({
        appInfo:app.appInfo,
        entry: app.entry,
    });
    await runMainLifeCycle('mounted')
};
export const destoryed = async (app)=>{
    app && app.unmount && app.unmount();
    // 对应执行主应用的声明周期
    console.log('unmount', app.unmount);
    // 主应用于子应用不一样
    await runMainLifeCycle('destoryed');
};

export const runMainLifeCycle = async (type)=>{
    const mainLife = getMainLifecycle();
    await Promise.all(mainLife[type].map(async item => await item()));
}