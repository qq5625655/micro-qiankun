import { fetchResource } from '../utils/fetchResource';
import { sandBox } from '../sandBox';
// import { performScript } from '../sandBox/performScript';
// 加载html的方法
export const loadHtml  = async (app)=>{
    let container  = app.container;
    let entry = app.entry;
    let name = app.name
    const [dom, scripts] = await parseHtml(entry, name);
    // console.log(scripts);
    console.log('dom', dom)
    let ct = document.querySelector(container);
    if(!ct){
        throw Error('容器不存在!');
    }
    ct.innerHTML = dom;
    scripts.map((item) => {
        // performScript(item, app.name, window);
        sandBox(app, item);
    });
    return app;
};

export const cacher = {};
export const parseHtml = async(entry, name)=>{
    if (cacher[name]){
        return cacher[name]
    }
    let allScript = []
    const html = await fetchResource(entry);
    const div = document.createElement('div');
    div.innerHTML = html;
    const [dom, scriptUrl, script] = await getResource(div, entry);    
    const fetchScripts = await Promise.all(scriptUrl.map(async item => await fetchResource(item)));
    allScript = script.concat(fetchScripts);
    caches[name] = [dom, allScript];
    return [dom, allScript];
}

export const getResource = async (root, entry)=>{
    const scriptUrl = [];
    const script = [];
    const dom = root.outerHTML;
    // 深度解析
    function deepParse(element){
        const children = element.children;
        const parent = element.parent;
        if(element.nodeName.toLowerCase() === 'script'){
            const src = element.getAttribute('src');
            if(!src){
                script.push(element.outerHTML);
            }else{
                if(src.startsWith('http')){
                    scriptUrl.push(src);
                }else{
                    scriptUrl.push(`http:${entry}/${src}`);
                }
            }
            if(parent){
                parent.replaceChild(document.createComment('此js文件已经被微前端替换'), element);
            }
        }
        if(element.nodeName.toLowerCase() === 'link'){
            const href = element.getAttribute('href');
            if(href.endsWith('.js')){
                if(href.startsWith('http')){
                    scriptUrl.push(href);
                }else{
                    scriptUrl.push(`http:${entry}/${href}`);
                }
            }
        }
        for (let i = 0; i < children.length; i++) {
            deepParse(children[i]);
            
        }
    }
    deepParse(root);
    return [dom, scriptUrl, script];
}
