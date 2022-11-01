import React, { memo, useMemo } from 'react';

const Circle = ({ x, y, radius, title }) => {
  
  //memoized calculation for random color
    const color = useMemo(
        () =>
            `#${Math.floor(Math.random() * 0xffffff)
                .toString(16)
                .padEnd(6, '0')}`,
        []
    );


    return (
        <g onMouseEnter={() => console.log(title)}>
            <circle
                cx={x}
                cy={y}
                r={radius - 1}
                fill={'none'}
                strokeWidth={2}
                stroke={color}
                strokeOpacity={0.4}
            />
            <circle cx={x} cy={y} r={radius} fill={color} opacity={0.3} />
            <text x={x - radius / 3} y={y} style={{ fontSize: '14px' }}>
                {title}
            </text>
        </g>
    );
};

export default memo(Circle);
