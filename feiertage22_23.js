const feier_22 = [[1,1],[8,3],[15,4],[17,4],[18,4],[1,5],[26,5],[6,6],[3,10],[25,12],[26,12]]
const feier_23 = [[1,1],[7,4],[9,4],[10,4],[1,5],[18,5],[29,5],[3,10],[25,12],[26,12]]
const fdate = [];
for (let x of feier_22) {

    fdate.push(new Date(2022,x[1]-1, (x[0]), 12))
}
check = new Date('2022-10-10-08:30')
for (let x of fdate) {
    console.log(x);
    if(x.valueOf() == check.valueOf()){
        console.log('feier');
}

}
console.log(fdate);
console.log(check)