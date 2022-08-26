const redux = require('redux'); // Step 4
const createStore = redux.createStore; // Step 4
const applyMiddleware = redux.applyMiddleware; // Step 5
const thunkMdw = require('redux-thunk').default // Step 5
const axios = require('axios'); // Step 6
// Step 0, initialState
const initialState = {
    loading: false, 
    users: [], 
    error: ''
}
// 1- Create the constants for the actions.
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'
// 2- Define the action creators. 
const fetchUsersRequest = () => ({
    type: FETCH_USERS_REQUEST
})
const fetchUsersSuccess = users => ({
    type: FETCH_USERS_SUCCESS,
    payload: users
})
const fetchUsersFailure = error => ({
    type: FETCH_USERS_FAILURE,
    payload: error
})
// 3- Define the reducer function. 
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload,
            }
        default:
            return state
    }
}
// 4- Create the store.
const store = createStore(reducer, applyMiddleware(thunkMdw)); // Steps 4 & 5
// 5- Install axios and redux-thunk.
// 6- Define the action creators (This is the way to write async actions in your app)
const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUsersRequest());
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
                // response.data is the users array.
                const users = response.data.map(user => user.id)
                dispatch(fetchUsersSuccess(users))
            }
        ).catch(error => {
            // error.message is the error message
            dispatch(fetchUsersFailure(error.message))
    })
}}

// 7- Subscribe to the store and dispatche the asyncronous action creator. 
store.subscribe(() => {console.log(store.getState())})
store.dispatch(fetchUsers())