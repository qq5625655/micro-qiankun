import { getList } from '../const'
export const patchRouter = (globalEvent, eventName)=>{
    return function (){
        const e = new Event(eventName);
        globalEvent.apply(this, arguments);
        dispatchEvent(e);
    }
}

export const currentApp = ()=>{
    const currentUrl = window.location.pathname.match(/(\/\w+)/)[0];
    return filterApp('activeRule', currentUrl);
}

export const findAppByRouter = (router)=>{
    return filterApp('activeRule', router);
};
export const filterApp = (key, value)=>{
    const currentApp = getList().filter((item)=>item[key] === value);
    return currentApp && currentApp.length ? currentApp[0] : {};
}

export const isTrunChild = ()=>{
    window.__ORIGIN_APP__ = window.__CURRENT_SUB_APP__;
    
    if(window.__CURRENT_SUB_APP__ === window.location.pathname.match(/(\/\w+)/)[0]){
        return false;
    }
    let currentApp = window.location.pathname.match(/(\/\w+)/);
    if(!currentApp){
        return;
    }
    window.__CURRENT_SUB_APP__ = currentApp[0];
    return true;
};