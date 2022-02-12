// import { lifeCycle } from '../lifeCycle';
import { performScript } from './performScript';
// 子应用的声明周期处理, 环境变量设置
// import { SnapShootSandbox } from './snapshootSandbox';
import { ProxySandbox } from './proxySandbox';
const isCheckLifeCycl = lifeCycle => 
lifeCycle && lifeCycle.bootstrap && lifeCycle.mount && lifeCycle.unmount

export const sandBox = (app, script)=>{
    const proxy = new ProxySandbox();
    if(!app.proxy){
        app.proxy = proxy;
    }
    // 设置环境变量
    window.__MICRO_WEB__ = true;
    const lifeCycle = performScript(script, app.name, app.proxy.proxy); //app.proxy.proxy 想当于是一个window对象
    console.log('lifeCycle', lifeCycle)
    // console.log('lifeCycle', lifeCycle);
    // 声明周期内容
    if(isCheckLifeCycl(lifeCycle)){
        app.bootstrap = lifeCycle.bootstrap;
        app.mount = lifeCycle.mount;
        app.unmount = lifeCycle.unmount;
    }
}