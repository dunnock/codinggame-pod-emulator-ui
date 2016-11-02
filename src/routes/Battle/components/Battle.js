import React, { PropTypes } from 'react'
import classes from './Battle.scss'
import BattleField from './BattleField'
import DepthSlider from '../containers/DepthSlider'
import OptimalRouteSwitch from '../containers/OptimalRouteSwitch'

export const Battle = ( { podsNumber, checkpointsNumber, laps, pods, checkpoints, depth, displayDepth, displayOptimalRoute, onNewFightClick, onTurnClick, onPrevTurnClick, onRunClick, onPredictClick } ) => {
  return <div className={classes['Battle']}>
    <div>Battle: { podsNumber } pods and { checkpointsNumber } checkpoints to run { laps } laps. Depth {depth}</div>
    	<a onClick={ onNewFightClick }>Start new fight</a>
        {' · '}
    	<a onClick={ onTurnClick }>next turn</a>
        {' · '}
      <a onClick={ onPrevTurnClick }>prev turn</a>
        {' · '}
      <a onClick={ onRunClick }>run</a>
        {' · '}
      <a onClick={ onPredictClick }>predict</a>
        {' · '}
      <OptimalRouteSwitch texton="display all" textoff="display optimal" checked={displayOptimalRoute}/>
      <DepthSlider/>
    <BattleField width={1000} height={1000} pods={pods} checkpoints={checkpoints} displayDepth={displayDepth} displayOptimal={displayOptimalRoute}/>
    { pods.filter(pod => pod.optimalRoute?true:false).map(pod => <div>{JSON.stringify(pod.action)}</div>) }
  </div>;
}

Battle.propTypes = {
  podsNumber: PropTypes.number.isRequired,
  checkpointsNumber: PropTypes.number.isRequired,
  laps: PropTypes.number.isRequired,
  onNewFightClick: PropTypes.func.isRequired,
  onPrevTurnClick: PropTypes.func.isRequired,
  pods: PropTypes.array,
  checkpoints: PropTypes.array
}

export default Battle
