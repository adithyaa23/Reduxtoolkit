const redux = require('redux');
const createStore = redux.createStore


const USER_FETCHE_REQUEST = 'USER_FETCHED_REQUEST'
const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS'
const USER_FETCH_ERROR = 'USER_FETCH_ERROR'

const initialState ={
    loading:false,
    data:[],
    error:''
}

const fetchUserRequest = ()=>{
    return{
        type:USER_FETCHE_REQUEST,
    }
}

const fetchUserSuccess = (users)=>{
    return{
        type:USER_FETCHE_SUCCESS,
        payload:users
    }
}

const fetchUserError = (error)=>{
    return{
        type:USER_FETCHE_SUCCESS,
        payload:error
    }
}

const asyncCallReducer=(state=initialState, action)=>{
    switch(action.type){
        case USER_FETCHE_REQUEST:
            return{
                ...state,
                loading:true
            }
        case USER_FETCH_SUCCESS:
                return{                   
                    loading:false,
                    users:action.payload,
                    error:''
                }
        case USER_FETCH_ERROR:
                return{                   
                    loading:false,
                    users:[],
                    error:action.payload
                }

        default:{
            return state;
        }
    }
}

const rootReducer = redux.combineReducers({
    asyncActon:asyncCallReducer
})
const store = createStore(rootReducer)

