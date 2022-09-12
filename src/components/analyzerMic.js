import React, { useEffect, useRef } from "react";
import AudioMotionAnalyzer from "audiomotion-analyzer";
const AnalyzerMic = ({ freqDataRef }) => {
  const audioRef = useRef(null);
  const analyzerRef = useRef(null);
  const micStream = useRef(null);
  const disableMic = () => {
    if (
      micStream === null || micStream === void 0 ? void 0 : micStream.current
    ) {
      analyzerRef.current.disconnectInput(micStream.current);
      micStream.current = null;
    }
  };
  const enableMic = () => {
    disableMic();
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then((stream) => {
          
          if (audioRef.current) {
            audioRef.current.pause();
          }
          
          micStream.current = analyzerRef.current.audioCtx.createMediaStreamSource(
            stream
          );
          
          analyzerRef.current.connectInput(micStream.current);
          
          analyzerRef.current.volume = 0;
        })
        .catch((err) => {
          alert("Microphone access denied by user");
        });
    } else {
      alert("User mediaDevices not available");
    }
  };
  const updateFreqData = (instance) => {
    if (!freqDataRef.current || freqDataRef.current === undefined) {
      freqDataRef.current = new Array(instance.getBars().length);
    }
    let barIdx = 0;
    for (const bar of instance.getBars()) {
      freqDataRef.current[barIdx] = bar.value[0];
      barIdx++;
    }
  };
  useEffect(() => {
    if (!audioRef.current) {
      return;
    }
    if (analyzerRef.current) {
      return;
    }
    analyzerRef.current = new AudioMotionAnalyzer(undefined, {
      source: audioRef.current,
      mode: 2,
      useCanvas: false,
      onCanvasDraw: updateFreqData
    });
    analyzerRef.current.volume = 0;
    enableMic();
  }, []);

  return (
    <audio ref={audioRef} crossOrigin="anonymous" />
  )
};
export default AnalyzerMic;
