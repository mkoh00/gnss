import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigatorContainer from "../container/NavigatorContainer"

interface Props {
  mountPoint: string;
}

const ObservationDetail: React.FC<Props> = ({ mountPoint }) => {

  const defaltUrl = "http://218.153.121.205:3000/public/dashboard/dbdfd6aa-7773-459f-8bed-60ed492aee35?tab=99-pseudo_range&mount_point=";
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

export default ObservationDetail;
