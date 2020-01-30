import React from "react";
import styled from "styled-components";
// comps
import SliderControl from "./sliderControl/SliderControl";

const Controls = ({ appData, onUpdate }) => {
  const { settings } = appData;

  const updateSettings = (key, newValue) => {
    const newSetting = { ...settings[key], value: newValue };
    onUpdate({
      ...appData,
      settings: { ...settings, [key]: newSetting }
    });
  };

  return (
    <Container>
      <ControlsUI>
        <SliderControl
          labelStyle={{ minWidth: 150 }}
          label={"Blur:"}
          displayValue={true}
          step={1}
          min={settings.testRange.min}
          max={settings.testRange.max}
          value={settings.testRange.value}
          onChange={value => updateSettings("testRange", value)}
        />
      </ControlsUI>
    </Container>
  );
};

export default Controls;

// STYLES
const Container = styled.div`
  padding-top: 5px;
  background: black;
  color: white;
`;

const ControlsUI = styled.div`
  margin: 15px;
`;
