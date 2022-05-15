import { createReducer, createNamespacer } from '../commons/utils/reducer';

const initialState = {
    isLoggedIn: false,
    userDetails: {
        first_name: 'Ravindra',
        last_name: "Karale"
    },
}
const namespacer = createNamespacer("SESSION")

const reducer = createReducer(initialState, {
    [namespacer("SET_LOGGED_IN")]: (state, action) => {
        return {
            ...state,
            isLoggedIn: action.payload.value
        }
    },
    [namespacer("SET_USER_DATA")]: (state, action) => {
        return {
            ...state,
            userDetails: action.payload.value
        }
    },
})

export default reducer;