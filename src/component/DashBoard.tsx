import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigatorContainer from "../container/NavigatorContainer"

interface Props {
  mountPoint: string;
}

const DashBoard: React.FC<Props> = ({ mountPoint }) => {

  const defaltUrl = "http://218.153.121.205:3000/public/dashboard/81f9cdc2-a89c-41f2-9a0d-f7d0a1e5976c?tab=65-tab-1&mount_point=";
  const defaltMountPoint = "PPGS"
  const [dataUrl, setDataUrl] = useState<string>(defaltUrl+defaltMountPoint);
  // 

  const onSelectMountPoint = (selected:string) => {
    //console.log("onSelectMountPoint:", selected);
    setDataUrl(defaltUrl+selected);
  }

  return (
    <NavigatorContainer onLeftMenuSelect={onSelectMountPoint}>
            <object data={dataUrl}
              width='100%'
              height='100%'
              type="text/html">
            </object>
    </NavigatorContainer>    
  );
};

export default DashBoard;
