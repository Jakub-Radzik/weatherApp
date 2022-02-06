export const CoordinatesFormat = (coord, directionChar) => {
    let newSign;
    let result = '';

    if (directionChar === "N")
    {
        newSign = coord>=0 ? directionChar : "S";
    }
    else if(directionChar === "E")
    {
        newSign = coord>=0 ? directionChar : "W";
    }

    coord = Math.abs(coord);
    let degrees = Math.floor(coord);

    let newCalculation = (coord - degrees)*60;
    let minutes = Math.floor(newCalculation).toString();
    let seconds = Math.floor(newCalculation-minutes).toString();

    minutes = minutes.length===1 ? "0"+minutes : minutes;
    seconds = seconds.length===1 ? "0"+seconds : seconds;

    result=`${degrees}°${minutes}'${seconds}" ${newSign}`;
    return result;
}