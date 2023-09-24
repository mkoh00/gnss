import React, {ReactNode} from "react";
import FixedConatiner from "./FixedConatiner";
import LeftMenu from "../component/LeftMenu";
import TopMenu from "../component/TopMenu";

//todo: home도 적용 필요 -> 일단 보류
interface navigatorContainerProps {
    children: ReactNode;
    onLeftMenuSelect: (selected:string) => void;
}

const NavigatorContainer = ({children, onLeftMenuSelect}:navigatorContainerProps) => {

    const onSelectMountPoint = (selected:string) => {
        //console.log("onSelectMountPoint:", selected);
        onLeftMenuSelect(selected);
    }

    return <FixedConatiner>
        <div className="left-menu-wrapper">
            <LeftMenu onSelect={onSelectMountPoint}/>
        </div>
        <div className='right-part-wrapper'>
            <div className='top-menu-wrapper'>
                <TopMenu/>
            </div>
            <div className='content-wrapper'>
                {children}
            </div>
        </div>
    </FixedConatiner>   
} 
export default NavigatorContainer;