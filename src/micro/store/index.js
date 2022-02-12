export const createStore =(initData = {})=> (() => {
    let store = initData;
    const observers = [];
    // 获取store的方法
    
    const getStore = ()=> store;


    const update = (value)=>{
        if(value !== store){
            const oldValue = store;
            store = value;
            observers.forEach(async item => await item(store, oldValue))
        }
    }
    // 添加订阅者
    const subscribe = (fn)=>{
        observers.push(fn);
    }
    return {
        getStore,
        update,
        subscribe,
    }
})();