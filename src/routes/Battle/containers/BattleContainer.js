import { connect } from 'react-redux'
import { fetchInitialData, fetchTurn, fetchPrevTurn, runTurns, fetchPrediction, setVisibleDepth } from '../modules/Battle'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import Battle from '../components/Battle'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapActionCreators = {
    onNewFightClick: fetchInitialData,
    onTurnClick: fetchTurn,
    onPrevTurnClick: fetchPrevTurn,
    onRunClick: runTurns,
    onPredictClick: fetchPrediction,
    onDepthChange: setVisibleDepth
}


const mapStateToProps = (state) => {
    var res = {
        podsNumber: state.battle.pods ? state.battle.pods.length : 0,
        checkpointsNumber: state.battle.checkpoints ? state.battle.checkpoints.length : 0,
        laps: state.battle.laps || 0,
        checkpoints: state.battle.checkpoints || [],
        pods: state.battle.pods || [],
        displayDepth: state.battle.displayDepth || 40,
        displayOptimalRoute: state.battle.displayOptimalRoute || false,
        depth: state.battle.depth
    };
    return res;
}

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const counter = (state) => state.counter
    const tripleCount = createSelector(counter, (count) => count * 3)
    const mapStateToProps = (state) => ({
      counter: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapActionCreators)(Battle)
