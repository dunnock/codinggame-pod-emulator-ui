import React from 'react'
import { Circle, Line, Group, Text } from 'react-konva'

export const Pod = ({position, velocity, orientation, target, nextCheckpointId, depth, optimalRoute, pathCost, targetEstimate, totalCostEstimate, action, checkpoint1Angle, _stepsToCheckpoint1}) => {
	if(!position) return <Text x={0} y={0} text="incorrect pod data"/>;
	let targetLine;
	if (target) targetLine = <Line points={ [ position.x/20, position.y/20, target.x/20, target.y/20 ] } strokeWidth={1} stroke='orange' opacity='0.3'/>;
	return  (
		<Group>
			<Group x={position.x/20} y={position.y/20}>
				<Circle x={0} y={0} radius={8} opacity={.5} fill={fillColor(nextCheckpointId, depth, optimalRoute)} 
						onMouseOver={log.bind({position, velocity, target, nextCheckpointId, depth, optimalRoute, pathCost, targetEstimate, totalCostEstimate, action, checkpoint1Angle, _stepsToCheckpoint1})}/>
				<Line points={ [ 0, 0, velocity.x/20, velocity.y/20 ] } strokeWidth={2} stroke='green'/>
				<Line points={ [ 0, 0, orientation.x/20, orientation.y/20 ] } strokeWidth={1} stroke='red'/> 
			</Group>
			{targetLine}
		</Group>
		);
}

Pod.propTypes = {
	position: React.PropTypes.shape({
  		x: React.PropTypes.number.isRequired,
  		y: React.PropTypes.number.isRequired
  	}),
  	velocity: React.PropTypes.shape({
  		x: React.PropTypes.number.isRequired,
  		y: React.PropTypes.number.isRequired
  	}),
  	orientation: React.PropTypes.shape({
  		x: React.PropTypes.number.isRequired,
  		y: React.PropTypes.number.isRequired
  	}),
  	target: React.PropTypes.shape({
  		x: React.PropTypes.number.isRequired,
  		y: React.PropTypes.number.isRequired,
	  	thrust: React.PropTypes.number.isRequired
  	}),
}

export default Pod

function fillColor(nextCheckpointId, depth, optimalRoute) {
	if(optimalRoute) return 'blue';
	return ['#FFAAAA', '#CCAAAA', '#AAAAAA'][nextCheckpointId];
}

function log() {
	console.log(JSON.stringify(this));
}