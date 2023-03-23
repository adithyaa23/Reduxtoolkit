const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers

const CAKE_ORDERED ='CAKE_ORDERED'   //action constant
const CAKE_RESTOCK = 'CAKE_RESTOCK'
const ICECREAM_ORDERED='ICECREAM_ORDERED'
const ICECREAM_RESTOCKED='ICECREAM_RESTOCKED'

function orderCake(){      //action function
    return{
        type:CAKE_ORDERED,
        quantity:1
    } 
}

function restockCake(qty){
    return{
        type:CAKE_RESTOCK,
        payload:qty
    }
}

function orderIcecream(qty=1){
    return {
        type:ICECREAM_ORDERED,
        payload:qty
    }
}
function restockIcecream(quant=1){
    return {
        type:ICECREAM_RESTOCKED,
        payload:quant
    }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const cakeState = {
    numOfCake:10
}

const cakeReducer =(state=cakeState,action)=>{    //reducer
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCake:state.numOfCake-1
            }
        case CAKE_RESTOCK:
            return{
                ...state,
                numOfCake:state.numOfCake+action.payload
            }  
    
        default:
            return state;
    }
}

const icecreamState = {
    numOfIcecream:20
}

const Icecreamreducer=(state=icecreamState,action)=>{
    switch(action.type){
        case ICECREAM_ORDERED:
            return{
                ...state,
                numOfIcecream:state.numOfIcecream-3
            }
            case ICECREAM_RESTOCKED:
                return{
                    ...state,
                    numOfIcecream:state.numOfIcecream+action.payload
                }
            default:
                return state;
    }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const rootReducer = combineReducers({
    cake:cakeReducer,
    iceCream:Icecreamreducer
})
const store = createStore(rootReducer)    //create store..execution starts here

console.log('Initial State',store.getState())

store.subscribe(()=>console.log(store.getState()))

// store.dispatch(orderCake());    //dispatching or calling action
// store.dispatch(restockCake(3))
// store.dispatch(orderCake());
// store.dispatch(orderCake());

const actions = bindActionCreators({orderCake,restockCake,orderIcecream,restockIcecream},store.dispatch)
actions.orderCake();
actions.restockCake(2);
actions.orderCake();
actions.orderIcecream();
actions.restockIcecream(2);