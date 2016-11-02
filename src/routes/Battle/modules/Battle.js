import fetch from 'isomorphic-fetch'
import bindActionCreators from 'redux'

// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_INITIAL_DATA = 'Battle.REQUEST_INITIAL_DATA'
export const RECEIVE_INITIAL_DATA = 'Battle.RECEIVE_INITIAL_DATA'
export const REQUEST_PODS = 'Battle.REQUEST_PODS'
export const RECEIVE_PODS = 'Battle.RECEIVE_PODS'

import {DISPLAY_OPTIMAL_ROUTE} from '../containers/OptimalRouteSwitch'
import {SET_VISIBLE_DEPTH} from '../containers/DepthSlider'

// ------------------------------------
// Actions
// ------------------------------------

function requestInitialData() {
    return {
        type: REQUEST_INITIAL_DATA
    }
}

function receiveInitialData(json) {
    return {
        type: RECEIVE_INITIAL_DATA,
        checkpoints: json.checkpoints,
        pods: json.pods,
        laps: json.laps
    }
}

function requestPods() {
    return {
        type: REQUEST_PODS
    }
}

function receivePods(json) {
    return {
        type: RECEIVE_PODS,
        pods: json.pods,
        depth: json.depth
    }
}


/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk!
 */


export function fetchInitialData () {
    return (dispatch) => {

        // First dispatch: the app state is updated to inform
        // that the API call is starting.

        dispatch(requestInitialData())

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.

        return fetch(game_api_url + '/init_race')
            .then(response => response.json())
            .then(json =>
                // We can dispatch many times!
                // Here, we update the app state with the results of the API call.
                dispatch(receiveInitialData(json))
            )
    }
}

export function fetchTurn () {
    return (dispatch) => {
        dispatch(requestPods())
        return fetch(game_api_url + '/turn')
            .then(response => response.json())
            .then(json =>
                dispatch(receivePods(json))
            )
    }
}


export function fetchPrevTurn () {
    return (dispatch) => {
        dispatch(requestPods())
        return fetch(game_api_url + '/prev_turn')
            .then(response => response.json())
            .then(json =>
                dispatch(receivePods(json))
            )
    }
}


export function runTurns () {
    return (dispatch) => {
        return fetchTurn()(dispatch).then(any =>
            setTimeout(runTurns().bind(this, dispatch), 500))
/*        
        dispatch(requestPods())
        return fetch(game_api_url + '/turn')
            .then(response => response.json())
            .then(json =>
                dispatch(receivePods(json))
            ).then(any =>
                
            )*/
    }
}


export function fetchPrediction () {
    return (dispatch) => {
        dispatch(requestPods())
        return fetch(game_api_url + '/predict')
            .then(response => response.json())
            .then(json =>
                dispatch(receivePods(json))
            )
    }
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [REQUEST_INITIAL_DATA]: (state, action) => ( { 
            ...state, 
            loading: true
        } ),
    [RECEIVE_INITIAL_DATA]: (state, action) => ( { 
            ...state, 
            loading: false, 
            checkpoints: action.checkpoints,
            pods: action.pods,
            laps: action.laps
        } ),
    [REQUEST_PODS]: (state, action) => ( { 
            ...state, 
            loading: true
        } ),
    [RECEIVE_PODS]: (state, action) => ( {
            ...state, 
            loading: false, 
            pods: action.pods,
            depth: action.depth
        } ),
    [SET_VISIBLE_DEPTH]: (state, action) => ( {
            ...state, 
            displayDepth: action.displayDepth
        } ),
    [DISPLAY_OPTIMAL_ROUTE]: (state, action) => ( {
            ...state, 
            displayOptimalRoute: action.displayOptimalRoute
        } )
}

// ------------------------------------
// Reducer
// ------------------------------------

export default function battleReducer (state = {}, action) {
        console.log(`battleReducer ${JSON.stringify(action.type)}`);


    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
