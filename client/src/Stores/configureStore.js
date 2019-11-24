import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'

var defaultState = {
    actons: [],
    active_acton: {},
    form: ''
};

function actons(state = defaultState, action) {
  
        switch (action.type) {
            case 'CHANGE_ACTIVE_ACTON':
                return Object.assign({}, state, { active_action: action.data });
            case 'ADD_ACTON':
                return Object.assign({}, state, { actons: [action.data, ...state.actons]});
            case 'UPDATE_ACTON_ADD_FORM':
                return Object.assign({}, state, {form: action.data });
            default:
                return state;
        }

}

var store = createStore(actons, applyMiddleware(logger));

export default store;