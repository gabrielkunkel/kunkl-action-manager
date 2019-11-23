import { createStore } from 'redux'

var defaultState = {
    actons: [],
    active_acton: {}
};

function actons(state = defaultState, action) {
  
        switch (action.type) {
            case 'ADD_ACTON':
                return Object.assign({}, state, { actons: [action.data.acton, ...state.actons ]} )
            case 'CHANGE_ACTIVE_ACTON':
                return Object.assign({}, state, { active_action: action.data.text })
            default:
                return state;
        }

}

var store = createStore(actons);

export default store;