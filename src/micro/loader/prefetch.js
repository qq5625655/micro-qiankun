import { getList } from '../const/index'
import { parseHtml } from './index'

export const prefetch = async ()=>{
    const list = getList().filter(item=> !window.location.pathname.startsWith(item.activeRule));
    // 获取所有的子应用列表，不包括当前正在显示的
    await Promise.all(list.map(async item=> await parseHtml(item.entry, item.name)))
}