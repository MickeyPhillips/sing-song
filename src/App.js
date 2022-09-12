import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"
import Login from "./Login"
import Dashboard from "./Dashboard"

import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import DataReactiveGrid from "./components/dataReactiveGrid";
import WaveformGrid from "./components/waveformGrid";
import { useControls, Leva } from "leva";
import * as THREE from "three";
import {
  APPLICATION_MODE_MICROPHONE,
  APPLICATION_MODE_WAVE_FORM,
  getSupportedApplicationModes,
  isAudioMode
} from "./components/application_modes";
import AnalyzerMic from "./components/analyzerMic";

const code = new URLSearchParams(window.location.search).get("code")

const App = () => {
  const { mode, amplitude } = useControls({
    mode: {
      value: APPLICATION_MODE_WAVE_FORM,
      options: getSupportedApplicationModes()
    },
    amplitude: { value: 1.0, min: 0.0, max: 5.0, step: 0.01 }
  });
  const freqDataRef = useRef(null);
  const getAppropriateAnalyzerComponent = (mode) => {
    switch (mode) {
      case APPLICATION_MODE_MICROPHONE:
        
        return <AnalyzerMic freqDataRef={freqDataRef}/>
      default:
        
        return <></>
    }
  };
  const color = "#04d9ff"
  return (<>
  <h1 style={{zIndex: "2", position: "absolute", top: 0, display: "flex", justifyContent: "center", color: "white", width: "100vw"}}>S<span style={{color: color}}>(</span>IO<span style={{color: color}}>)</span>NG</h1>
  {code ? <Dashboard code={code} /> : <Login />}
  <Suspense fallback={<span>Loading...</span>}>
      {getAppropriateAnalyzerComponent(mode)}
      <Canvas 
      camera={
        {
          fov: 45,
          near: 1,
          far: 1000,
          position: [-17, -6, 6,5],
          up: [0, 0, 1]
        }

      }>
        <color attach="background" args={['#191920']} />
        <ambientLight />
        <fog attach="fog" args={['#191920', 0, 100]} />
        {
          isAudioMode(mode)
            ? <DataReactiveGrid amplitude={amplitude} dataRef={freqDataRef} />
            : <WaveformGrid amplitude={amplitude} />
        }
        {/* <Stats /> */}
        <OrbitControls />
      </Canvas>
      <Leva collapsed={false} />
    </Suspense>
  
  </>
    
  )
};
export default App;

