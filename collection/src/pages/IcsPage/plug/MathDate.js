
export function getOffsetDays(_date) {
    var date1=new Date().getTime(),date2=new Date(_date).getTime();
    return Math.floor((date1-date2)/(24*3600*1000)-1);
}
export function getOffsetDays1(_date) {
    var date3=new Date().getTime(),date4=new Date(_date).getTime();
    return Math.floor((date3-date4)/(24*3600*1000))  
}
export default {
    getOffsetDays,
    getOffsetDays1
}