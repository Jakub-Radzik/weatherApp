export const TimestampToDate = (timestamp) => {
    let date = new Date(timestamp * 1000);
    let hours = date.getHours()<10 ? "0"+date.getHours() : date.getHours(); //17->17 | 9->09
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
}