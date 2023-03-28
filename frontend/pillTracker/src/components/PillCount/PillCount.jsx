import {useState, useEffect} from "react";
import "./PillCount.css"

export default function PillCount(props){
    const [isLow, setIsLow] = useState(false)

    let pillCount = props.pillCount

    useEffect( () => {
        if(pillCount < 10 ){
            setIsLow(true)
        }
    }, [pillCount]);


    return(
        <div className={`${isLow ? "low" : "not-low"}`}>
        <p>Number of pills left</p>
        <p>{pillCount}</p>
        </div>
    )

}