export const perfromScriptForFunction = (script, appName, global)=>{

    window.proxy = global;
    
    const scriptText = ()=>`
        return ((window)=>{
            ${script}
            return window['${appName}']
        })(window.proxy)
    `
    return new Function(scriptText)();
}

export const performScript = (script, appName, global)=>{
    // window.appName
    // 之所以要有返回值，并且指向window.vue的这种形式，是因为需要得到子应用的声明周期
    // return eval(script);
    window.proxy = global;
    const scriptText = `
    ((window)=>{
        ${script}
        return window['${appName}']
    })(window.proxy)`
    // evel指向完成后，函数指向的是call 
    return eval(scriptText);
}