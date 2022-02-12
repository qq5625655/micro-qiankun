let defaultValue = {};  //子应用的沙箱容器
// 声明一个代理沙箱
export class ProxySandbox {
    constructor(){
        this.proxy = null;
        console.log('我是沙箱122');
        this.active();
    }   
    // 沙箱激活
    active(){
        this.proxy = new Proxy(window, {
            get(target, key){
                // 将window上的函数重新指向window上
                if(typeof target[key] === 'function'){
                    return target[key].bind(target);
                }
                console.log('thisss', defaultValue);
                return defaultValue[key] || target[key];
            },
            // 在vue3里面设置window.a的时候，通过set方法设置了
            set(target, key, value){
                defaultValue[key] = value;
                return true;
            },
        });
    }
    // 沙箱销毁
    inactive (){
        defaultValue = {};
    }
}