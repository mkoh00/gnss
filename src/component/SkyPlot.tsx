import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigatorContainer from "../container/NavigatorContainer"
import moment from "moment";
import "moment/locale/ko";

interface DataType {
  time_stamp: string;
  sat_type: string;
  sat_id: string;
  azimuth: number;
  elevation: number;
  resp: number;
}

interface Props {
  mountPoint: string;
}

interface SkyPlotData {
  sat: string;
  satType: string;
  posX: number;
  posY: number;
  azimuth: number;
  elevation: number;
  color: string;
  tooltip: string;
}

const SkyPlot: React.FC<Props> = ({ mountPoint }) => {

  const [selectedMountPoint, setSelectedMountPoint] = useState<string>(mountPoint);

  const [skyPlotDataArray, setSkyPlotDataArray] = useState(new Array<SkyPlotData>());
  const [gpsArr, setGpsArr] = useState(new Array<string>());
  const [glonassArr, setGlonassArr] = useState(new Array<string>());
  const [galileoArr, setGalileoArr] = useState(new Array<string>());
  const [beidouArr, setBeidouArr] = useState(new Array<string>());

  const [data, setData] = useState<DataType[]>([]);

  const [autoReload, setAutoReload] = useState(true);
  const [updatedTime, setUpdatedTime] = useState('');

  const onSelectMountPoint = (selected:string) => {
    console.log("onSelectMountPoint:", selected);
    setSelectedMountPoint(selected);
  }  

  const getSkyPlotData = () => {
    //console.log("onSelectMountPoint:", selected);
    //setDataUrl(defaltUrl+selected);
    fetch("http://localhost:5001/getSkyPlotData?mount_point=" + selectedMountPoint)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
    
      setUpdatedTime(moment(new Date()).format("YYYY/MM/DD HH:mm:ss"));
  }  

  useEffect(() => {
    getSkyPlotData();
  }, [selectedMountPoint]);


  useEffect(()=>{
    if(data && data.length > 0){
      makeSkyPlotData();
    }

    // 5초마다 reload
    //setTimeout(() => {
    //  window.location.reload();
    //}, 5000);

    const countdown = setInterval(() => {
      if (autoReload) {
        getSkyPlotData();
      }
    }, 1000);
    return () => clearInterval(countdown);

  },[data]);
  

  const xl: number[] = [0, 100];
  const yl: number[] = [0, 100];
  const radius = (xl[1]-xl[0] < yl[1]- yl[0] ? xl[1]-xl[0] : yl[1]-yl[0] ) * 0.45;  //상하좌우 45%

  const getColorFromSatType = (satType:string) => {
    if(satType == 'GPS') return 'green';
    else if(satType == 'Galileo') return 'blue';
    else if(satType == 'GLONASS') return 'red';
    else if(satType == 'Beidou') return 'orange';
    return 'black';
  }

  const makeSkyPlotData = () => {
    
    let skyPlotDataArr = new Array<SkyPlotData>();
    let satliteInfoMap = new Map<string, Array<string>>();
    data.forEach(satPosData => {
      if(satPosData.azimuth == 0 && satPosData.elevation == 0) return;
      //const azi = 90 / 180 * Math.PI;
      //const ele = 90 / 180 * Math.PI;
      const azi = satPosData.azimuth / 180 * Math.PI;
      const ele = satPosData.elevation / 180 * Math.PI;
      const posX = radius * Math.sin(azi) * ( 1.0 - 2.0 * ele / Math.PI) + 50;
      const posY = 50 - radius * Math.cos(azi) * ( 1.0 - 2.0 * ele / Math.PI);

      //console.log("azi = " + satPosData.azimuth + " , ele = " + satPosData.elevation);
      //console.log("posX(%) = " + posX + " , posY(%) = " + posY);
      
      let skyPlotData:SkyPlotData = {
        sat: satPosData.sat_id,
        satType: satPosData.sat_type,
        posX: posX,
        posY: posY,
        azimuth : satPosData.azimuth,
        elevation : satPosData.elevation,
        color : getColorFromSatType(satPosData.sat_type),
        tooltip : 'azi = ' + satPosData.azimuth + ", ele = " + satPosData.elevation
      }
      skyPlotDataArr.push(skyPlotData);

      if(!satliteInfoMap.has(satPosData.sat_type)){
        let sateliteTypeArr = new Array<string>();
        satliteInfoMap.set(satPosData.sat_type, sateliteTypeArr);
      }
      let sateliteTypeArr = satliteInfoMap.get(satPosData.sat_type);
      if(sateliteTypeArr) sateliteTypeArr.push(satPosData.sat_id);

    });
    setSkyPlotDataArray(skyPlotDataArr);
    if(satliteInfoMap.has("GPS")) {
      const gpsTypeArr = satliteInfoMap.get("GPS");
      if(gpsTypeArr) setGpsArr(gpsTypeArr);
      //console.log("gpsTypeArr = ", gpsTypeArr);
    } 
    if(satliteInfoMap.has("GLONASS")) {
      const glonassTypeArr = satliteInfoMap.get("GLONASS");
      if(glonassTypeArr) setGlonassArr(glonassTypeArr);
      console.log("glonassTypeArr = ", glonassTypeArr);
    } 
    if(satliteInfoMap.has("Galileo")) {
      const galileoTypeArr = satliteInfoMap.get("Galileo");
      if(galileoTypeArr) setGalileoArr(galileoTypeArr);
      console.log("galileoTypeArr = ", galileoTypeArr);
    } 
    if(satliteInfoMap.has("Beidou")) {
      const beidouTypeArr = satliteInfoMap.get("Beidou");
      if(beidouTypeArr) setBeidouArr(beidouTypeArr);
      console.log("beidouTypeArr = ", beidouTypeArr);
    } 


    
  };
  

  return (
    <NavigatorContainer onLeftMenuSelect={onSelectMountPoint}>
      <div className="skyplot-wrapper">
        <div className="skyplot-update-time">updated : {updatedTime}</div>
        <div className="skyplot">
          <h4>{selectedMountPoint} Sky Plot</h4>
          <div style={{position: 'relative', width:'80vh', height:'80vh', border:'solid 1px grey'}}>
          {skyPlotDataArray.map((skyPlotData, index) => (
                <div className="skyplot-text" style={{left: `${skyPlotData.posX}%`, top:`${skyPlotData.posY}%`, color: skyPlotData.color}}>
                  <span data-tooltip={skyPlotData.tooltip}>{skyPlotData.sat}</span> 
                </div>
          ))}
          </div>
        </div>
        <div className="satelite-info">
            <div className="satelite-type-arr">
              <div className="satelite-type-title" style={{color:'green'}}>GPS:{gpsArr.length}</div>
              {gpsArr.map((sat_id, index) => (
                  <div className="sat-id-text" style={{color:'green'}}>{sat_id}</div> 
              ))}
            </div>
            <div className="satelite-type-arr">
            <div className="satelite-type-title" style={{color:'red'}}>GLO:{glonassArr.length}</div>
              {glonassArr.map((sat_id, index) => (
                  <div className="sat-id-text" style={{color:'red'}}>{sat_id}</div> 
              ))}
            </div>
            <div className="satelite-type-arr">
            <div className="satelite-type-title" style={{color:'blue'}}>GAL:{galileoArr.length}</div>
              {galileoArr.map((sat_id, index) => (
                  <div className="sat-id-text" style={{color:'blue'}}>{sat_id}</div> 
              ))}
            </div>
            <div className="satelite-type-arr">
              <div className="satelite-type-title" style={{color:'orange'}}>BDS:{beidouArr.length}</div>
              {beidouArr.map((sat_id, index) => (
                  <div className="sat-id-text" style={{color:'orange'}}>{sat_id}</div> 
              ))}
            </div>
        </div>
      </div>
    </NavigatorContainer> 
  );
};

export default SkyPlot;
