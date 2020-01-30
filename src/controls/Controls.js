import React from "react";
import styled from "styled-components";
// comps
import SliderControl from "./sliderControl/SliderControl";
import { SwitchControl } from "./switchControl/SwitchControl";

const Controls = ({ appData, onUpdate }) => {
  const { settings } = appData;

  const updateSettings = (key, newValue) => {
    const newSetting = { ...settings[key], value: newValue };
    onUpdate({
      ...appData,
      settings: { ...settings, [key]: newSetting }
    });
  };

  const updateBoolean = (key, newValue) => {
    onUpdate({
      ...appData,
      settings: { ...settings, [key]: newValue }
    });
  };

  return (
    <Container>
      <ControlsUI>
        <SwitchControl
          label={"Show Vertical Lines"}
          defaultChecked={settings.showVerticalLines}
          checked={settings.showVerticalLines}
          onUpdate={value => updateBoolean("showVerticalLines", value)}
        />
        <SwitchControl
          label={"Show Horizontal Lines"}
          defaultChecked={settings.showHorizontalLines}
          checked={settings.showHorizontalLines}
          onUpdate={value => updateBoolean("showHorizontalLines", value)}
        />
        <SliderControl
          labelStyle={{ minWidth: 150 }}
          label={settings.pointOffset.label}
          displayValue={true}
          min={settings.pointOffset.min}
          max={settings.pointOffset.max}
          value={settings.pointOffset.value}
          onChange={value => updateSettings("pointOffset", value)}
        />
        <SliderControl
          labelStyle={{ minWidth: 150 }}
          label={settings.lineThickness.label}
          displayValue={true}
          min={settings.lineThickness.min}
          max={settings.lineThickness.max}
          value={settings.lineThickness.value}
          onChange={value => updateSettings("lineThickness", value)}
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
