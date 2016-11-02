import React from 'react'
import { Circle, Line } from 'react-konva'

export const Checkpoint = ({x, y}) => (
	<Circle x={x/20} y={y/20} radius={30} fill='red'/>
)

Checkpoint.propTypes = {
  	x: React.PropTypes.number.isRequired,
  	y: React.PropTypes.number.isRequired
}

export default Checkpoint
