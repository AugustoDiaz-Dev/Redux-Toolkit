const redux = require('redux');
const produce = require('immer').produce;

const initialState = {
    name: "Augusto",
    address: {
        street: 'Kirova 25',
        city: 'Kamen Rybolov', 
        state: 'Primorsky Krai'
    }
}

const STREET_UPDATED = 'STREET_UPDATED'

const updateStreet = (street) => {
    return {
        type: STREET_UPDATED,
        payload: street
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case STREET_UPDATED:
            // Nested return statement
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload
            //     }
            // }
            return produce(state, (draft) => {
                draft.address.street = action.payload
            })
        default:
            return state;
    }
}

const store = redux.createStore(reducer);
console.log('Initial State', store.getState());
const unsubscribe = store.subscribe(() => {
    console.log('Updated State', store.getState());
} );
store.dispatch(updateStreet('Kirova 26'));
unsubscribe();
