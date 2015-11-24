import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../_reducers';
import storage from 'redux-storage';
import createEngine from 'redux-storage/engines/localStorage';
import * as ActionTypes from '../_constants/ActionTypes';

const actionsToCache = [
    ActionTypes.SIGNIN_FIELD_UPDATE,
    ActionTypes.SERVER_DATA_ASSET_INDEX,
    ActionTypes.SERVER_DATA_BALANCE,
    ActionTypes.SERVER_DATA_BUY,
    ActionTypes.SERVER_DATA_PAYOUT_CURRENCIES,
    ActionTypes.SERVER_DATA_ACCOUNT_LIMITS,
    ActionTypes.SERVER_DATA_ACCOUNT_SETTINGS,
];

const reducer = storage.reducer(rootReducer);
const engine = createEngine('binary');
const filteredEngine = storage.decorators.filter(engine, [
    ['account'],
    ['assetSelector'],
    ['assets'],
    ['profitTable'],
    ['statement'],
    ['signin'],
]);

const debouncedFilteredEngine = storage.decorators.debounce(filteredEngine, 1000);

const middleware = storage.createMiddleware(debouncedFilteredEngine, [], actionsToCache);
const finalCreateStore = applyMiddleware(middleware)(createStore);
const initStore = finalCreateStore(reducer);
const load = storage.createLoader(debouncedFilteredEngine);


export const loadedStorePromise = load(initStore).then(() => {return initStore;});
export const store = initStore;
