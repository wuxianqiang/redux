function createStore(reducer) { //容器
  let state // 默认undefined
  function dispatch(action) { //派发事件
    state = reducer(state, action) //处理状态，外界操作
    listeners.forEach(item => item())
  }
  let listeners = [] //存放所有的监听函数
  let subscribe = (fn) => {
    listeners.push(fn)
    return () => {
      listeners = listeners.filter(item => item !== fn)
    } // 取消绑定的函数
  }
  dispatch({}) // 用户的状态覆盖掉自身的状态
  let getState = () => JSON.parse(JSON.stringify(state))
  return {
    getState,
    dispatch,
    subscribe
  }
}

const CHANGE_TITLE = 'change_title'

function reducer(state = {
  title: '标题'
}, action) { //修改状态
  switch (action.type) {
    case CHANGE_TITLE:
      return { ...state,
        title: action.content
      }
  }
  return state //如果容器状态
}

let store = createStore(reducer)

function render () { //渲染视图
  document.querySelector('.title').innerHTML = store.getState().title
}
store.subscribe(render) //第一次渲染

let unSubscribe = store.subscribe(() => alert(1)) //第一次调用执行，第二次调用解绑

setTimeout(function () {
  store.dispatch({type: CHANGE_TITLE, content: '标题'})
  // render() // 更改后重新渲染
  unSubscribe()
})