import React, {memo} from 'react'

const Graph = ({ x, y, length, horizontal }) => {
  //values for x y graph
    const coords = {
        x1: x,
        y1: y,
        x2: horizontal ? x + length : x,
        y2: horizontal ? y : length + y
      };

  return (
    <g>
      <line {...coords} stroke="#00b3b3" strokeWidth={2} />
    </g>
  )
}

export default memo(Graph)
