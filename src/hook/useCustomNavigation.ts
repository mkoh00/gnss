import { useNavigate } from "react-router-dom";
import {useState} from "react";

interface useCustomNavigationReturn {
    //goToParent: (state?: unknown) => void,
    goToPrevious: () => void,
    goToPath: (path: string, state?: unknown) => void
    resetNavigationStack: (path: string, state?: unknown) => void
}

const useCustomNavigation = (): useCustomNavigationReturn => {
    const navigate = useNavigate();
    //const [pathName]=useState("")


    // const goToParent = (state?: unknown) => {
    //     navigate('../', { state });
    //     //console.log("pathName0:",Object(state).pathName)
    // }

    const goToPrevious = () => {
        navigate(-1);
        //console.log("pathName1:",Object(state).pathName)
    }

    const goToPath = (path: string, state?: unknown) => {
        //console.log("aaState!!",state)
        navigate(path, { state });
        //console.log("pathName2:",Object(state).pathName)
    }

    // 기존의 스택을 초기화하고 지정된 경로로 이동
    const resetNavigationStack = (path: string, state?: unknown) => {
        navigate(path, { state, replace: true });
    }

    return {
        //goToParent,
        goToPrevious,
        goToPath,
        resetNavigationStack
    }
}

export default useCustomNavigation;