## 流程
- 劫持路由，通过重写pushState, replaceState等相关方法，劫持路由。
- 注册子应用，将相关数据传入。
- 执行start，函数，创建第一个app。
- 当路由改变的时候，进行解析，加载html，js等相关内容。
- css隔离有三种
- 1.css的moudules，webpack使用就是这种
- 2.dom的shoxadom
- 3.minicss插件就是现在用的一个css隔离
- 4.css-in-js，清空子应用的内容，不会撞衫

- 好莱坞原则，不必联系我，我有需要的时候联系你
- 子应用不通过父应用传递，可以通过custom的方式，进行监听。比如，同一个容器里面。
- 例如vue3，传递到vue2的数据，可以现在vue2emit，test1，然后在vue3监听test1，再emit，test2，然后在vue2里面监听test2，这个时候就能拿到数据了。