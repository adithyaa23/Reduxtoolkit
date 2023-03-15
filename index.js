const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators

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

function orderIcecream(){
    return {
        type:ICECREAM_ORDERED,
        quantity:1
    }
}
function restockIcecream(quant){
    return {
        type:ICECREAM_RESTOCKED,
        quantity:quant
    }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const initialState = {
    numOfCake:10,
    numOfIcecream:20
}

const reducer =(state=initialState,action)=>{    //reducer
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


const Icecreamreducer=(state=initialState,action)=>{
    switch(action.type){
        case ICECREAM_ORDERED:
            return{
                ...state,
                numOfIcecream:state.numOfIcecream-3
            }
            default:
                return state;
    }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const store = createStore(reducer)    //create store..execution starts here

console.log('Initial State',store.getState())

store.subscribe(()=>console.log(store.getState()))

// store.dispatch(orderCake());    //dispatching or calling action
// store.dispatch(restockCake(3))
// store.dispatch(orderCake());
// store.dispatch(orderCake());

const actions = bindActionCreators({orderCake,restockCake},store.dispatch)
actions.orderCake();
actions.restockCake();
actions.orderCake();