import { applyMiddleware, createStore } from 'redux'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'

var defaultState = {
    actions: [],
    active_action: {},
    form: ''
};

function actons(state = defaultState, action) {
  
        switch (action.type) {
            case 'CHANGE_ACTIVE_ACTION':
                return Object.assign({}, state, { active_action: action.data });
            case 'ADD_ACTION':
                return Object.assign({}, state, { actions: [action.data, ...state.actions]});
            case 'UPDATE_ACTION_ADD_FORM':
                return Object.assign({}, state, {form: action.data });
            default:
                return state;
        }

}

const logger = createLogger({
    collapsed: true
});

var store = createStore(actons, applyMiddleware(thunk,logger));

export default store;