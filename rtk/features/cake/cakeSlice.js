const createSlice = require('@reduxjs/toolkit').createSlice;
// createSlice under the hood uses immer library
const initialState = {
    numOfCakes: 10
}

const cakeSlice = createSlice({ 
    name: 'cake', 
    initialState, 
    reducers: {
        ordered: (state) => {
            state.numOfCakes--;
        }, 
        restocked: (state, action) => {
            state.numOfCakes += action.payload
        }
    }
})

module.exports = cakeSlice.reducer 
module.exports.cakeActions = cakeSlice.actions