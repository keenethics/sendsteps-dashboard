import appReducer from './reducers/appReducer';
import apiReducer from './reducers/apiReducer';
import dataReducer from './reducers/dataReducer';
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
    appReducer: appReducer,
    apiReducer: apiReducer,
    dataReducer: dataReducer
    // Other reducers here
});

// Set initial state values here
const initialState = {
    appReducer: {
        menuOpened: false,
    },
    apiReducer: {
        apiError: null,
        isLoading: false
    },
    dataReducer: {
        selectedPhonenumber: null
    }
}
  
const store = createStore(rootReducer, initialState);

export default store;