//@ts-nocheck
import React, { CSSProperties, ReactNode, useEffect, useState } from 'react';

interface FixedConatinerProps {
    children: ReactNode;
}

const containerStyle: CSSProperties = {
    width: `${window.innerWidth}px`,
    height: `${window.innerHeight}px`,
    background: `#FFFFFF`,
    position: `fixed`,
};

const FixedConatiner = ({ children }: FixedConatinerProps) => {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    //const [mobileNavi, setMobileNavi] = useState(window.visualViewport?.height);

    useEffect(() => {
        const handleResize = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.clientHeight;

            //setMobileNavi(window.visualViewport?.height);
            setWidth(window.innerWidth);
            //setHeight(window.innerHeight);
            setHeight(documentHeight);
            console.log("windowHeight = ", windowHeight);
            console.log("documentHeight = ", documentHeight);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            // cleanup
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    //return <div style={containerStyle}>{children}</div>;
    return <div style={{
        width: `100%`,
        height: `${height}px`,
        background: `#FFFFFF`,
        //position: `fixed`,
        overflow: 'hidden',
        touchAction: 'none',
        }}>{children}
    </div>;
};
export default FixedConatiner;
