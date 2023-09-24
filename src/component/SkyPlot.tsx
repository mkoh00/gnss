import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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
  
  const [skyPlotDataArray, setSkyPlotDataArray] = useState<SkyPlotData[]>(new Array<SkyPlotData>());

  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    fetch("http://localhost:5001/getSkyPlot")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(()=>{
    if(data && data.length > 0){
      makeSkyPlotData();
    }

    // 5초마다 reload
    //setTimeout(() => {
    //  window.location.reload();
    //}, 5000);

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
    
    let skyPlotDataArr:SkyPlotData[] = new Array<SkyPlotData>();
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
    });
    setSkyPlotDataArray(skyPlotDataArr);
  };
  

  return (
    <div className="container mt-5">
      <h3>{mountPoint} Sky Plot</h3>
      <div style={{position: 'relative', width:'80vh', height:'80vh', border:'solid 1px grey'}}>
      {skyPlotDataArray.map((skyPlotData, index) => (
            <div className="skyplot-text" style={{left: `${skyPlotData.posX}%`, top:`${skyPlotData.posY}%`, color: skyPlotData.color}}>
              <span data-tooltip={skyPlotData.tooltip}>{skyPlotData.sat}</span> 
            </div>
      ))}
      </div>
    </div>
  );
};

export default SkyPlot;
