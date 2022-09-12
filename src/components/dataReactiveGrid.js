import BaseGrid from "./baseGrid";
import React from "react";
function interpolateValueForNormalizedCoord(bars, normalizedCoord) {
  if (bars === undefined || !bars || bars.length === 0) {
    return 0;
  }
  // Interpolate from the bar values based on the normalized Coord
  let rawIdx = normalizedCoord * (bars.length - 1);
  let valueBelow = bars[Math.floor(rawIdx)];
  let valueAbove = bars[Math.ceil(rawIdx)];
  return valueBelow + (rawIdx % 1) * (valueAbove - valueBelow);
}
const DataReactiveGrid = ({ dataRef, amplitude = 1.0 }) => {
  const normQuadrantHypotenuse = Math.hypot(0.5, 0.5);
  const getValueForNormalizedCoord = (normGridX, normGridY) => {
    const normRadialOffset =
      Math.hypot(normGridX - 0.5, normGridY - 0.5) / normQuadrantHypotenuse;
    return (
      amplitude *
      interpolateValueForNormalizedCoord(
        dataRef === null || dataRef === void 0 ? void 0 : dataRef.current,
        normRadialOffset
      )
    );
  };
//   return React.createElement(BaseGrid, {
//     getValueForNormalizedCoord: getValueForNormalizedCoord
//   });
    return (
        <BaseGrid getValueForNormalizedCoord={getValueForNormalizedCoord}></BaseGrid>
    );
};
export default DataReactiveGrid;