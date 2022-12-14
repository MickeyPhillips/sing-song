import React, { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Lut } from "three/examples/jsm/math/Lut.js";
import { Matrix4 } from "three";
import { folder, useControls } from "leva";
import * as THREE from "three";
const BaseGrid = ({ getValueForNormalizedCoord }) => {
  const {
    nGridRows,
    nGridCols,
    cubeSideLength,
    cubeSpacingScalar
  } = useControls({
    Grid: folder(
      {
        nGridRows: {
          value: 100,
          min: 1,
          max: 500,
          step: 1
        },
        nGridCols: {
          value: 100,
          min: 1,
          max: 500,
          step: 1
        },
        cubeSideLength: {
          value: 0.025,
          min: 0.01,
          max: 0.5,
          step: 0.005
        },
        cubeSpacingScalar: {
          value: 5,
          min: 1,
          max: 10,
          step: 0.5
        }
      },
      { collapsed: true }
    )
  });
  const meshRef = useRef(null);
  const tmpMatrix = useMemo(() => new Matrix4(), []);
  useEffect(() => {
    const lut = new Lut("cooltowarm");
    const normQuadrantHypotenuse = Math.hypot(0.5, 0.5);
    let instanceIdx, normGridX, normGridY, normRadialOffset;
    for (let row = 0; row < nGridRows; row++) {
      for (let col = 0; col < nGridCols; col++) {
        instanceIdx = row * nGridCols + col;
        normGridX = row / nGridRows;
        normGridY = col / nGridCols;
        normRadialOffset =
          Math.hypot(normGridX - 0.5, normGridY - 0.5) / normQuadrantHypotenuse;
        meshRef.current.setColorAt(instanceIdx, lut.getColor(normRadialOffset));
      }
    }
    meshRef.current.instanceColor.needsUpdate = true;
  }, [
    nGridRows,
    nGridCols,
    cubeSideLength,
    cubeSpacingScalar,
    getValueForNormalizedCoord
  ]);
  useFrame(({ clock }) => {
    const elapsedTimeSec = clock.getElapsedTime();
    const gridSizeX = nGridRows * cubeSpacingScalar * cubeSideLength;
    const gridSizeY = nGridCols * cubeSpacingScalar * cubeSideLength;
    let instanceIdx, normGridX, normGridY, x, y, z;
    for (let row = 0; row < nGridRows; row++) {
      for (let col = 0; col < nGridCols; col++) {
        instanceIdx = row * nGridCols + col;
        normGridX = row / nGridRows;
        normGridY = col / nGridCols;
        z = getValueForNormalizedCoord(normGridX, normGridY, elapsedTimeSec);
        x = gridSizeX * (normGridX - 0.5);
        y = gridSizeY * (normGridY - 0.5);
        meshRef.current.setMatrixAt(
          instanceIdx,
          tmpMatrix.setPosition(x, y, z)
        );
      }
    }
  
    meshRef.current.instanceMatrix.needsUpdate = true;
  });
  const color = `rgb(${Math.floor(Math.random() * 255) + 120},${Math.floor(Math.random() * 255) + 120},${Math.floor(Math.random() * 255) + 120})`;
//   
    return (
        <instancedMesh
            ref={meshRef}
            castShadow={true}
            receiveShadow={true}
            args={[new THREE.BoxGeometry(), new THREE.MeshBasicMaterial(), nGridRows * nGridCols]}
        >
            <boxGeometry 
            attach="geometry"
            args={[cubeSideLength, cubeSideLength, cubeSideLength, 1]}
            />
            <meshBasicMaterial attach="material" color={color} toneMapped={false}/>
        </instancedMesh>
    )
};
export default BaseGrid;
