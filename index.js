const { createStore } = require("redux");

// constants
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const INCREMENT_BY_VALUE = "INCREMENTBYVALUE";

// Initial State

const initialCounterState = {
  count: 0,
};

// Action create
const incrementCounter = () => {
  return {
    type: INCREMENT,
  };
};
const decrementCounter = () => {
  return {
    type: DECREMENT,
  };
};
const incrementByValueCounter = (value) => {
  return {
    type: INCREMENT_BY_VALUE,
    payload: value,
  };
};

//Create Pure Reducer
const createReducer = (state = initialCounterState, action) => {
  console.log(action);
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    case INCREMENT_BY_VALUE:
      return {
        ...state,
        count: state.count + action.payload,
      };

    default:
      return state;
  }
};

//store -> getState(), dispatch(), subscribe()

const store = createStore(createReducer);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(incrementCounter());
store.dispatch(decrementCounter());
store.dispatch(incrementByValueCounter(10));

// // first initialize a state
