import appReducer from './reducers/appReducer';
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
    appReducer: appReducer,
    // Other reducers here
});

const initialState = {
    appReducer: {
        // Set initial state values here
        menuOpened: false,
    }
}
  
const store = createStore(rootReducer, initialState);

export default store;