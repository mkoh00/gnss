import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FixedConatiner from "../container/FixedConatiner"
import LeftMenu from "../component/LeftMenu";

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
    <FixedConatiner>
        <div className="left-menu-wrapper">
            <LeftMenu onSelect={onSelectMountPoint}/>
        </div>
        <div className='content-wrapper'>
            <object data={dataUrl}
              width='100%'
              height='100%'
              type="text/html">
            </object>
        </div>
    </FixedConatiner>    
  );
};

export default DashBoard;
