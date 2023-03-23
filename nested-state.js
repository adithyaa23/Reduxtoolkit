const redux = require('redux')
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators;
const produce = require('immer').produce
const reduxLogger = require('redux-logger');
const logger = reduxLogger

const initialState = {
  name: "Vishwas",
  address: {
    street: "123 Main st",
    city: "Boston",
    state: "MA",
  },
};

const STREET_UPDATED = "STREET_UPDATED";

const updateStreet = (streetData) => {
  return {
    type: STREET_UPDATED,
    payload: streetData,
  };
};

const updateStreerReducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
    //   return {      logic without Immmer
    //     ...state,
    //     address: {
    //       ...state.address,
    //       street: action.payload,
    //     },
    //   };
    return produce(state,(draft)=>{       // with Immer
        draft.address.street = action.payload;
    })
    default: {
      return state;
    }
  }
};

const rootReducer =  redux.combineReducers({
    strretUpd:updateStreerReducer
})
const store = createStore(rootReducer)

console.log(store.getState())
const subscribe = store.subscribe(()=>{
    console.log('Updated State', store.getState());
})
const actions = bindActionCreators({updateStreet},store.dispatch)
actions.updateStreet('Malta');
subscribe();
