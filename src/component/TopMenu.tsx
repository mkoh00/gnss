import React, { useState, useEffect, useRef } from "react";
import useCustomNavigation from "../hook/useCustomNavigation"
import { Link, useLocation } from "react-router-dom";


const TopMenu = () => {

  const location = useLocation();

  const { goToPath } = useCustomNavigation();

  const menus = [
    { name: "Home", path: "/" },
    { name: "Signal Strength", path: "/snr" },
    { name: "Skyplot", path: "/skyplot" },
    { name: "Observation Detail", path: "/obs" },
  ];

  // URL의 path값을 받아올 수 있다.
  const pathName = useLocation().pathname;

  return (
      <div className="top-menu">
        {menus.map((menu, index) => {
          return (
            <div className="top-menu-item">
              <Link style={{textDecoration:'none', color:'indigo'}} to={menu.path} key={index}>
                 {menu.name}
              </Link>
            </div>  
          );
        })}
      </div>      
  );
};
export default TopMenu;



