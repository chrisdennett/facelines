import React from "react";
import styled from "styled-components";
import "@material/switch/dist/mdc.switch.css";
import "@material/form-field/dist/mdc.form-field.css";
import { Switch } from "@rmwc/switch";

export const SwitchControl = ({
  value,
  onUpdate,
  label,
  className,
  defaultChecked = false
}) => (
  <StyledSwitch
    className={className}
    defaultChecked={defaultChecked}
    checked={value}
    onChange={e => onUpdate(e.currentTarget.checked)}
    label={label}
  />
);

const StyledSwitch = styled(Switch)`
  label {
    margin-left: 5px;
    color: white;
  }
  padding: 10px;

  .mdc-switch:not(.mdc-switch--checked) .mdc-switch__track {
    background-color: #fff;
    border-color: #fff;
  }

  .mdc-switch.mdc-switch--checked .mdc-switch__track {
    background-color: rgb(255, 196, 0);
    border-color: rgb(255, 196, 0);
  }
  .mdc-switch.mdc-switch--checked .mdc-switch__thumb {
    background-color: rgb(255, 196, 0);
    border-color: rgb(255, 196, 0);
  }
`;
