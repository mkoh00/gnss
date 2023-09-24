import React from "react";

const MenuItem = ( menu:any, isActive:boolean ) => {
  
  console.log("menu = ", menu);
  console.log("menu name = ", menu.name);

    return isActive === true ? (
        <div className="sidebar-item active">
          <p>{menu.menu.name}</p>
        </div>
      ) : (
        <div className="sidebar-item ">
          <p>{menu.menu.name}</p>
        </div>
      );
  };
  export default MenuItem;