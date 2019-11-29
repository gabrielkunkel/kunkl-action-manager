import { applyMiddleware, createStore } from 'redux'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'

var defaultState = {
    parent_actions: [],
    text: "",
    complete: false,
    twin_actions: [],
    child_actions: [],
    active_action: {},
    form: ''
};

function active_action(state = defaultState, action) {
  
        switch (action.type) {
            case 'CHANGE_ACTIVE_ACTION':
                return Object.assign({}, state, action.data );
            case 'ADD_ACTION':
                return Object.assign({}, state, { child_actions: [action.data, ...state.child_actions]});
            case 'UPDATE_ACTION_ADD_FORM':
                return Object.assign({}, state, {form: action.data });
            case 'REPLACE_CHILD_ACTIONS':
                return Object.assign({}, state, { child_actions: action.data} )
            default:
                return state;
        }

}

const logger = createLogger({
    collapsed: true
});

var store = createStore(active_action, applyMiddleware(thunk,logger));

export default store;