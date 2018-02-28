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
