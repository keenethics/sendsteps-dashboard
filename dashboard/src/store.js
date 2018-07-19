import appReducer from './reducers/appReducer';
import dataReducer from './reducers/dataReducer';
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
    appReducer: appReducer,
    dataReducer: dataReducer
    // Other reducers here
});

const initialState = {
    appReducer: {
        // Set initial state values here
        menuOpened: false,
    },
    dataReducer: {
        selectedPhonenumber: null
    }
}
  
const store = createStore(rootReducer, initialState);

export default store;