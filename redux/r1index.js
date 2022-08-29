const redux = require('redux');
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;

const applyMiddleware = redux.applyMiddleware;
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();

// Action

const CAKE_ORDER = 'CAKE_ORDER';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICE_CREAM_ORDER = 'ICE_CREAM_ORDER';
const ICE_CREAM_RESTOCKED = 'ICE_CREAM_RESTOCKED';
// An action is an object that has a type property.
// An action creator is a function that returns an object. 
function orderCake() {
    return {
        type: CAKE_ORDER, 
        payload: 1
    }
}

function orderIceCream(qty = 1) {
    return {
        type: ICE_CREAM_ORDER,
        payload: qty
    }
}

function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty
    }
}

function restockIceCream(qty = 1) {
    return {
        type: ICE_CREAM_RESTOCKED,
        payload: qty
    }
}

// const initialState = {
//     numberOfCakes: 10, 
//     numberOfIceCreams: 20
// }

const initialCakeState = {
    numberOfCakes: 10
}
const initialIceCreamState = {
    numberOfIceCreams: 20
}

// Reducer

// (previousState, action) => newState

// The reducer function is a pure function that receives state and action as arguments and returns the next state of the application. 
const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case CAKE_ORDER:
            return {
                ...state,
                numOfCakes: state.numberOfCakes - 1
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numberOfCakes + action.payload
            }
        default:
            return state;
    }
}
const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case ICE_CREAM_ORDER:
            return {
                ...state,
                numOfIceCreams: state.numberOfIceCreams - 1
            }
        case ICE_CREAM_RESTOCKED:
            return {
                ...state,
                numOfIceCreams: state.numberOfIceCreams + action.payload
            }
        case CAKE_ORDER: 
        return {
            ...state, 
            numOfIceCreams: state.numberOfIceCreams - 1
        }
        default:
            return state;
    }
}

// Store

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

const store = createStore(rootReducer, applyMiddleware(logger));
// console.log('Initial State', store.getState());

const unsubscribe = store.subscribe(() => {});

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3));

const actions = bindActionCreators({orderCake, restockCake, orderIceCream, restockIceCream}, store.dispatch);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);
actions.orderIceCream();
actions.orderIceCream();
actions.restockIceCream(2);

unsubscribe();