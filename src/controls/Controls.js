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
      <SlicerHolder>
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
      </SlicerHolder>
    </Container>
  );
};

export default Controls;

// STYLES
const Container = styled.div`
  height: 100%;
  background: black;
  color: white;
`;

const SlicerHolder = styled.div`
  padding: 0 10px;
`;
