import update from 'immutability-helper';
//ACTIONS
const SIGN_UP = 'SIGN_UP'

//Action Creators
export const SignUp = (user) => ({
    type: SIGN_UP,
    user: user
})

//Reducer
const initialState = {
    user:-1
}

export default function reducer(state = initialState, action) {
    let newState = state;
    switch(action.type) {
        case SIGN_UP:
            newState = update(state, {
                user: {$set: action.user},
            });
        break;
    }
    
    return newState;
    }

