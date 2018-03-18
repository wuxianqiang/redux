# redux

```js
function createStore(reducer) {
  let state

  function dispatch(action) {
    state = reducer(state, action)
    listeners.forEach(item => item())
  }
  let listeners = []
  let subscribe = (fn) => {
    listeners.push(fn)
    return () => {
      listeners = listeners.filter(item => item !== fn)
    }
  }
  dispatch({})
  let getState = () => JSON.parse(JSON.stringify(state))
  return {
    getState,
    dispatch,
    subscribe
  }
}
```

`createStore`相当一个容器，里面存储着所有的状态，`dispatch`函数是定义要修改的状态，怎样修改状态定义在`reducer`方法中，`reducer`方法执后得到一个新的状态后又会存储在容器中。

```js
despatch -> reducer -> state -> createStore
```
状态一旦更新，就要渲染我们的视图，所有代码中使用发布订阅模式，`listeners`存放我们所有的订阅函数，以后通过`subscribe`方法来订阅，订阅之后的返回值就是移除订阅，发布是在`dispatch`中，也就是状态要更新的时候，就要渲染视图。

----------------------------------------------------
案例：
```html
<button id="plus">+</button>
<span id="text"></span>
<button id="less">-</button>
```

```js
const PLUS = 'plus'
const LESS = 'less'

function reducer(state = {number: 0}, action) {
  switch (action.type) {
    case PLUS:
      return {
        number: state.number + action.amount
      }
    case LESS:
      return {
        number: state.number - action.amount
      }
  }
  return state
}

let store = createStore(reducer)

function render() {
  text.innerHTML = store.getState().number
}

render()

store.subscribe(render)

plus.addEventListener('click', function () {
  store.dispatch({
    type: PLUS,
    amount: 1
  })
})

less.addEventListener('click', function () {
  store.dispatch({
    type: LESS,
    amount: 1
  })
})
```
## 原理分析

状态管理，不允许直接修改状态信息（`store.state.xxx='xxx'`）这样修改状态，redux不允许的原因是redux是统一的状态管理，直接修改会导致状态管理混乱。

## 路由

```js
// path='/'可以匹配所以路径哦，如果不想让其他地方匹配，exact来处理可以精准匹配
ReactDOM.render(
  <HashRouter>
    <div>
      <Route path='/' exact component={A}/>
      <Route path='/user' render={()=>{
        let loginInfo = localStorage.getItem('ass_id')
        if (!loginInfo) {
          return (<div>请先登入</div>)
          // 权限控制
        }
        return <B />
      }}/>
      <Route path='/user/singin' component={C}/>
    </div>
  </HashRouter>,
  document.getElementById('root')
);
```
基于`<Link/>`组件的`state`属性实现信息传递，URL路径并没有变，隐藏式传递参数，刷新页面数据丢失，这样可以禁止用户刷新
```js
<Link to={{pathname: `/custom/detail`, state: {id}} />

//渲染页面
let {location: {state}} = this.props
let id = state.id //接收数据，刷新时数据会丢失
```
`<Link/>`和<NavLink/>相比，后者可以增加一些选中的样式，默认选中的样式是`active`
必须基于路由渲染才有`history`,`location `,`match `
