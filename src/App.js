import React, { useState } from "react";
import * as Space from "react-spaces";
//
import TopBar from "./top-bar/TopBar";
import Display from "./display/Display";
import Controls from "./controls/Controls";
import { defaultAppData } from "./appData";

function App() {
  const [appData, setAppData] = useState(defaultAppData);

  return (
    <Space.ViewPort>
      <Space.Top size={60}>
        <TopBar title={appData.title} infoUrl={appData.infoUrl} />
      </Space.Top>
      <Space.Fill trackSize={true}>
        <Space.Info>
          {sizeInfo => <Display sizeInfo={sizeInfo} appData={appData} />}
        </Space.Info>
      </Space.Fill>
      <Space.BottomResizable size={100}>
        <Controls onUpdate={setAppData} appData={appData} />
      </Space.BottomResizable>
    </Space.ViewPort>
  );
}

export default App;
