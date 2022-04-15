


let mona = 11; //monat
let mo = mona -1;
let jahr = 2022; //jar
let teilne = "Manuel Martinez Cerecedo"; //name
let kunden_nr = 123456789; //kunden-nr.
let prakti = "Super Firma"; // Firmenname
let anf = 9; // Arbeitsanfang
let ende = 17; // Arbeitsende
document.getElementById('teil').value = teilne
document.getElementById('kundennr').value = kunden_nr
document.getElementById('Praktikumsstelle').value = prakti
document.getElementById('monat').value = mona + ' / ' + jahr
    <!--    bau das arry-->

function gdm(year, month) {
    return new Date(year, month, 0).getDate();
}

let dim = gdm(jahr, mona);
const sql_data1 = [];


for (let i = 0; i < dim; i++) {

    let astart = new Date(jahr,mo,i+1,anf,0);
    let aende = new Date(jahr,mo,i+1,ende,0);
    let zst = aende.getHours()-astart.getHours();
    console.log(astart)

    if (astart.getDay() == 6 || astart.getDay() == 0 ){

        sql_data1.push(['>'+(i+1),'><input class="s2" value="-">',' class = "minus">-', '><input class="s4" type="text" value="-"','>-','><input class="intable" type="text">','><input class="intable2" type="text">']);

    } else {
        sql_data1.push(['>'+(i + 1),'><input class="s2" type="text" value="' + astart.getHours() + ':00"', ' class = "minus">-', '><input class="s4" type="text" value="' + aende.getHours() + ':00"','>'+ zst, '><input class="intable"  type="text">', '><input class="intable2"  type="text">']);
    }
}
console.log(sql_data1)


//bau Tabelle
for (let i = 0; i < dim; i++) {
    // const sql_data = [[i,"10",'3'],["test",'safsdf','safdsfs',]]
    document.getElementById("tab").innerHTML += '<tr id="row'+i+'"></tr>';
    for (let x of sql_data1[i]) {
        let row = "row"+i;
        // alert(x)
        document.getElementById(row).innerHTML += '<td' + x + '</td>'

    }
}

