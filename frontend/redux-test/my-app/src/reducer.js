let initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {

  let tempstate = Object.assign({}, state)

  console.log(action)
  switch (action.type) {
    case 'GOOD':
      tempstate.good = tempstate.good + 1
      state = tempstate
      return state
    case 'OK':
      tempstate.ok = tempstate.ok + 1
      state = tempstate
      return state
    case 'BAD':
      tempstate.bad = tempstate.bad + 1
      state = tempstate
      return state
    case 'ZERO':
      tempstate.good = 0
      tempstate.ok = 0
      tempstate.bad = 0
      state = tempstate
      return state
  }
  return state
}


export default counterReducer