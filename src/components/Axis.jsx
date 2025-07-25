import { useRef, useEffect } from "react";
import { select, axisBottom, axisLeft } from "d3";
import { HEIGHT, WIDTH, MARGIN } from "./constants";

export default function Axis({ xScale, yScale }) {
    const xRef = useRef();
    const yRef = useRef();

    useEffect(() => {
        select(xRef.current).call(axisBottom(xScale));
        select(yRef.current).call(axisLeft(yScale));
    }, [xScale, yScale]);

    return (
        <g>
            <g ref={xRef} transform={`translate(0,${HEIGHT - MARGIN.bottom})`} />
            <g ref={yRef} transform={`translate(${MARGIN.left},0)`} />
        </g>
    );
}