import React from 'react'
import { Stage, Layer } from 'react-konva'
import Pod from './Pod'
import Checkpoint from './Checkpoint'

// TODO: add loader when not loaded
export const BattleField = ({width, height, pods, checkpoints, displayDepth, displayOptimal}) => (
		<Stage width={width} height={height}>
			<Layer>
	  		{checkpoints.map((checkpoint, i) => 
	    		<Checkpoint key={i} {...checkpoint}/>
	  		)}
	  		{	pods
	  				.filter(pod => (pod.depth ? (pod.depth<displayDepth) : true) 
	  					&& (displayOptimal ? pod.optimalRoute : true))
	  				.map((pod, i) => 
	    				<Pod key={i} {...pod}/>
	  		)}
	    </Layer>
	 </Stage>
)

BattleField.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  pods: React.PropTypes.array,
  checkpoints: React.PropTypes.array
}

export default BattleField
