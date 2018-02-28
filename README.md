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

`createStore`相当一个容器，里面存储着所有的状态，`dispatch`函数是定义要修改的状态，怎样修改状态定义在`reducer`方法中，`reducer`方法执后得到一个新的状态后又会存储在容器中，`dispatch({})`表示第一次执行的时候有个默认的默认状态，`getState`是获取状态，默认是不允许外界通过其他方法来修改我们的状态，必须通过`dispatch`函数派发一个事件来修改，所以这里使用深拷贝。

```js
despatch -> reducer -> state -> createStore
```

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
