
export function getOffsetDays(_date) {
    var date1=new Date().getTime(),date2=new Date(_date).getTime();
    return Math.abs(Math.floor((date1-date2)/(24*3600*1000)-1)) ;
}
export default {
    getOffsetDays
}