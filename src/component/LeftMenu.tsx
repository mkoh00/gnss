import React, { useState, useEffect } from "react";

interface DataType {
  mount_point: string;
}

interface LeftMenuProps {
  onSelect: (selected:string) => void;
}

const LeftMenu = ({onSelect}: LeftMenuProps) => {

  const [data, setData] = useState<DataType[]>([]);

  // 마운트 포인트 목록을 얻어와서 메뉴에 표시
  useEffect(() => {
    fetch("http://localhost:5001/getMountPoints")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
      <div className="left-menu">
        <ul>
        {data.map((mountPoint) => {
          return (
            <li className="menu-li" onClick={() => onSelect(mountPoint.mount_point)}>
              <a href="#">{mountPoint.mount_point}</a>
            </li>
          );
        })}
        </ul>
      </div>      
  );
};
export default LeftMenu;



