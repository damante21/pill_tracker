import {useState, useEffect} from "react";
import "./PillCount.css"

export default function PillCount(props){
    const [isLow, setIsLow] = useState(false)

    let pillCount = props.pillCount

    // listen for pill count and set color either way so we don't have to reset setIsLow
    useEffect( () => {
        if(pillCount < 10 ){
            setIsLow(true)
        } else {
            setIsLow(false)
        }
    }, [pillCount]);


    return(
        <div className={`${isLow ? "low" : "not-low"}`}>
        <p>Number of pills left</p>
        <p>{pillCount}</p>
        </div>
    )

}