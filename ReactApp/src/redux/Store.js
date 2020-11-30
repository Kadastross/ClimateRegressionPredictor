import { combineReducers, createStore, compose } from 'redux';
import ClimateChange from './modules/ClimateChange.js'

const reducer = combineReducers({
    ClimateChange
});

const store = compose(window.devToolsExtension ?
    window.devToolExtension(): f=> f)(createStore)(reducer)

export default store;
