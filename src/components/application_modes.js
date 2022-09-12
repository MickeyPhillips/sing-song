const APPLICATION_MODE_WAVE_FORM = "∿ waveform";
const APPLICATION_MODE_MICROPHONE = "🎤 Microphone";
const getSupportedApplicationModes = () => {
  return [APPLICATION_MODE_WAVE_FORM, APPLICATION_MODE_MICROPHONE]
};
const isAudioMode = (mode) => {
  return (
    mode === APPLICATION_MODE_MICROPHONE
  );
};
export {
  APPLICATION_MODE_WAVE_FORM,
  APPLICATION_MODE_MICROPHONE,
  getSupportedApplicationModes,
  isAudioMode
};
