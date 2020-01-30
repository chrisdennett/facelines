import React, { useState } from "react";
import * as Space from "react-spaces";
//
import TopBar from "./top-bar/TopBar";
import Display from "./display/Display";
import Controls from "./controls/Controls";
import { defaultAppData } from "./appData";

function App() {
  const [appData, setAppData] = useState(defaultAppData);
  const [optionsVisible, setOptionsVisible] = useState(true);

  return (
    <Space.ViewPort>
      <Space.Top size={60}>
        <Space.Info>
          {sizeInfo => (
            <TopBar
              title={appData.title}
              infoUrl={appData.infoUrl}
              optionsVisible={optionsVisible}
              setOptionsVisible={setOptionsVisible}
              width={sizeInfo.width}
            />
          )}
        </Space.Info>
      </Space.Top>
      <Space.Fill trackSize={true}>
        <Space.Info>
          {sizeInfo => <Display sizeInfo={sizeInfo} appData={appData} />}
        </Space.Info>
      </Space.Fill>
      {optionsVisible && (
        <Space.BottomResizable size={180} scrollable={true}>
          <Controls onUpdate={setAppData} appData={appData} />
        </Space.BottomResizable>
      )}
    </Space.ViewPort>
  );
}

export default App;
