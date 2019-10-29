import {LOGIN, LOGOUT} from "../../../constants/CredentialActionTypes";

const initialState = {
  credentials: {
      username: '',
      extension: ''
  },
  isAuthenticated: false
};

function credentialReducer(state=initialState, action){
    switch(action.type){
        case LOGIN:
            return Object.assign({}, state, {
                credentials: action.payload,
                isAuthenticated: true
            });
        case LOGOUT:
            return Object.assign({}, state, {
                credentials: action.payload,
                isAuthenticated: false
            });
        default: return state;
    }
}

export default credentialReducer;