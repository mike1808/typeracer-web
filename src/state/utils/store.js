import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

const composeEnhancers = composeWithDevTools({});

export const createOurReducers = ourReducers => combineReducers({
    ...ourReducers,
    form,
});

export const createOurStore = (reducers, initialState, rootSaga, sagaMonitor) => {
    const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
    const middleware = applyMiddleware(routerMiddleware(history), sagaMiddleware);

    const store = createStore(
        createOurReducers(reducers),
        initialState,
        composeEnhancers(middleware),
    );

    const saga = sagaMiddleware.run(rootSaga);
    saga.done.catch((error) => {
        throw error;
    });

    if (sagaMonitor) {
        sagaMonitor.assignDispatch(store.dispatch);
    }


    return store;
};

export default createOurStore;
