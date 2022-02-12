import { isTrunChild } from '../utils/index'
import {  lifeCycle } from '../lifeCycle'
// isTrunChild()
export const trunApp = ()=>{
    console.log('__CURRENT_SUB_APP111', window.__CURRENT_SUB_APP__)
    if(isTrunChild()){
        lifeCycle();
        console.log('路由切换了');
    }
    
}