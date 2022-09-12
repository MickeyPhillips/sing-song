import BaseGrid from "./baseGrid";
import React from "react";
import { folder, useControls } from "leva";
const WaveformGrid = ({ amplitude = 1.0 }) => {
  const { frequencyHz } = useControls({
    "Wave Generator": folder({
      frequencyHz: {
        value: 2,
        min: 0.0,
        max: 30,
        step: 0.05
      }
      
    })
  });

  const periodSec = 1 / frequencyHz;
  const b = (2 * Math.PI) / periodSec;
  const normQuadrantHypotenuse = Math.hypot(0.5, 0.5);
  const getValueForNormalizedCoord = (
    normGridX,
    normGridY,
    elapsedTimeSec = 0
  ) => {
    const normRadialOffset =
      Math.hypot(normGridX - 0.5, normGridY - 0.5) / normQuadrantHypotenuse;
    const phaseShift = elapsedTimeSec;
    return amplitude * Math.sin(b * normRadialOffset + phaseShift);
  };
//   return React.createElement(BaseGrid, {
//     getValueForNormalizedCoord: getValueForNormalizedCoord
//   });
  return (
    <BaseGrid getValueForNormalizedCoord={getValueForNormalizedCoord}></BaseGrid>
  )
};
export default WaveformGrid;
