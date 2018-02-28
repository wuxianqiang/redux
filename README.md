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
`reducer`定义怎样修改状态，`render`表示重新渲染视图，`dispatch`接收两个参数，改的类型，改的数据
