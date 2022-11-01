import React, { Fragment, useEffect, useState, useCallback, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDetails } from '../redux/actions/details.actions';
//components
import Graph from './Graph';
import Circle from './Circle';
//custom hooks
import { useGetRange } from '../hooks/useGetRange';

const Chart = () => {

    const dispatch = useDispatch();
    const details = useSelector((state) => state.details);
    const [values, setValues] = useState([]);

    useEffect(() => {
        // to dispatch API
        dispatch(fetchDetails());
    }, [dispatch]);

    useEffect(() => {
        //setting state from API
        setValues(details.data);
    }, [details]);

    //memoized function to get minimun from API data based on field passed
    const getMin = useCallback((key) => {
        let mathMax = Number.MAX_VALUE;
        let maxValue = 0;
        values?.forEach((element) => {
            if (element[key] < mathMax) {
                maxValue = element[key];
                mathMax = element[key];
            }
        });
        return maxValue;
    },[values]);

    //function to get maximum from API data based on field passed
    const getMax = (key) => values?.reduce((acc, cur) => cur[key] > acc ? cur[key] : acc, 0);
        
    //variables for charts and SVG
    const maxRadius = getMax('headcount');
    const mostSalary = getMax('salary');
    const mostCompRatio = getMax('compratio');
    let minCompRatio = getMin('compratio');
    let minSalary = getMin('salary');

    //setting markings on x,y coordinates with custom hook
    let rangeY = useGetRange(minSalary, mostSalary, 20);
    let rangeX = useGetRange(minCompRatio, mostCompRatio, 5);
    rangeX.push(mostCompRatio);
    rangeY.push(mostSalary);

    //variable for chart positions
    const chartHeight = mostSalary + maxRadius / 2;
    const chartWidth = (mostCompRatio - minCompRatio) * 10 + maxRadius + 100;

    //for svg viewbox
    const translateX = minSalary - maxRadius;
    const translateY = minCompRatio;

    return (
        <div
            style={{
                position: 'relative',
                height: chartHeight,
                width: chartWidth,
                left: 100,
                top: 100,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                }}
            >
                <svg
                    viewBox={`${translateX} ${translateY} ${chartWidth + 30} ${chartHeight + 30}`}
                    width={chartWidth}
                    height={chartHeight}
                >
                    <text
                        x={(mostCompRatio + minCompRatio) / 2}
                        y={chartHeight + minCompRatio - 2 + 30}
                        style={{ fontSize: '12px' }}
                    >
                        {'Compratio'}
                    </text>
                    {rangeX.map((val, index) => (
                        <Fragment key={index}>
                            <text
                                x={(val - minCompRatio) * 10}
                                y={chartHeight + minCompRatio - 2 + 20}
                                style={{ fontSize: '12px' }}
                            >
                                {val}
                            </text>
                            <line
                                x1={(val - minCompRatio) * 10}
                                x2={(val - minCompRatio) * 10}
                                y1={chartHeight + minCompRatio}
                                y2={chartHeight + minCompRatio - 5}
                                stroke='green'
                                strokeWidth={2}
                            />
                        </Fragment>
                    ))}

                    <Graph
                        x={minSalary - maxRadius}
                        y={chartHeight + minCompRatio - 2}
                        length={chartWidth}
                        horizontal={true}
                    />
                    {rangeY.reverse().map((val, index) => (
                        <Fragment key={index}>
                            <text
                                x={minSalary - maxRadius - 20}
                                y={chartHeight - val}
                                style={{ fontSize: '12px', color: 'red' }}
                            >
                                {val}
                            </text>
                            <line
                                x1={minSalary - maxRadius + 2}
                                x2={minSalary - maxRadius + 5}
                                y1={chartHeight - val - 2}
                                y2={chartHeight - val - 2}
                                stroke='green'
                                strokeWidth={2}
                            />
                        </Fragment>
                    ))}
                    <Graph
                        x={minSalary - maxRadius + 2}
                        y={0}
                        length={chartHeight + minCompRatio}
                        horizontal={false}
                    />

                    {values?.map((datum, index) => {
                        return (
                            <Circle
                                key={datum.title}
                                x={datum.compratio * 10 - minCompRatio * 10}
                                y={chartHeight - datum.salary}
                                radius={datum.headcount / 2}
                                title={datum.title}
                                xLabel={datum.compratio}
                                yLabel={datum.salary}
                            />
                        );
                    })}
                </svg>
            </div>

            <div
                style={{
                    display: 'flex',
                    position: 'absolute',
                    bottom: '-52px',
                    width: '100%',
                    left: '35px',
                    justifyContent: 'space-around',
                }}
            ></div>
        </div>
    );
};

export default memo(Chart);
