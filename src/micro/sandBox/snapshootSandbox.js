// 快照沙箱
// 应用场景，比较老版本的浏览器
export class SnapShootSandbox {
    constructor(){
        this.proxy = window;
        this.active();
    }
    // 沙箱激活
    active(){
        this.snapshoot = new Map();
        for (const key in window) {
            this.snapshoot[key] = window[key];
            
        }
    }
    //销毁
    inactive(){
        for (const key in window) {
            // const element = array[index];
            // this.snapshoot[key] = window[key];
            if(window[key] !== this.snapshoot[key]){
                window[key] = this.snapshoot[key];
            }  
        }
    }
}