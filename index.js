// redux 统一的状态管理，不能直接更改状态
function createStore(reducer) { // 将状态放在盒子里，别人改不了
  let state
  dispatch({})
  function dispatch(action) { // 派发 参数是action动作，规定action是一个对象，必须有一个type属性{type: '自定义'}
    state = reducer(state, action) // 调用写好的方法，这个方法会返回一个新的状态
  }

  let getState = () => JSON.parse(JSON.stringify(state)) //获取状态的方法
  return {
    getState,
    dispatch
  }
}

let initState = {
  titleState: {
    color: 'red',
    txt: '标题'
  },
  contentState: {
    color: 'green',
    txt: '内容'
  }
}
// 宏 常亮
const CHANGE_TITLE_TEXT = 'change_title_text'
const CHANGE_CONTENT_COLOR = 'change_content_color'

function reducer (state = initState, action) { //负责如何更改状态
  switch (action.type) { // 更改状态要调用一个新的状态覆盖掉
    case CHANGE_TITLE_TEXT:
      return { ...state,
        titleState: { ...state.titleState,
          txt: action.txt
        }
      }
      break;
    case CHANGE_CONTENT_COLOR:
      return { ...state,
        contentState: { ...state.contentState,
          color: action.color
        }
      }
      break;
  }
  return state
}
let store = createStore(reducer)

function renderTitle() {
  let title = document.querySelector('.title')
  title.innerHTML = store.getState().titleState.txt
  title.style.color = store.getState().titleState.color
}

function renderContent() {
  let content = document.querySelector('.content')
  content.innerHTML = store.getState().contentState.txt
  content.style.color = store.getState().contentState.color
}

function renderApp() {
  renderTitle()
  renderContent()
}
renderApp()

setTimeout(() => {
  store.dispatch({
    type: CHANGE_TITLE_TEXT,
    txt: '长标题'
  }) // 除了type的其他参数叫payload
  store.dispatch({
    type: CHANGE_CONTENT_COLOR,
    color: 'red'
  }) // 除了type的其他参数叫payload
  renderApp() // 每次派发完成都需要render
}, 3000)