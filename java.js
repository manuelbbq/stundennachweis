
// Set Standart

let mona = 5; //monat
let mo = mona -1;
let jahr = 2022; //jar
let teilne = "Manuel Martinez Cerecedo"; //name
let kunden_nr = 123456789; //kunden-nr.
let prakti = "Super Firma"; // Firmenname
let anf = 9; // Arbeitsanfang
let ende = 17; // Arbeitsende
let tag = 6;


function setkopfseile(teilne, kunden_nr, prakti, mona, jahr)  {
    document.getElementById('teil').value = teilne;
    document.getElementById('kundennr').value = kunden_nr;
    document.getElementById('Praktikumsstelle').value = prakti;
    document.getElementById('monat').value = mona + ' / ' + jahr;
        }




class Datensatz{
    constructor( jahr, mona, tag, anf, ende ) {
        this.anf = anf;
        this.ende = ende;
        this.tag = tag;
        this.jahr = jahr;
        this.mona = mona;
        this.day = new Date(jahr, mona-1, tag, anf);
    }
    sam_son_feir(){
        if (this.day.getDay() == 6 || this.day.getDay() == 0 ) {
            this.uhr1 = '-' ;
            this.uhr2 = '-' ;



        } else {
            this.uhr1 = this.day.getHours() + ':00'  ;
            this.uhr2 = this.ende +  ':00' ;

        }
    }
    datensatz(){

        this.sam_son_feir()
        let htmlstring = '<tr onclick="menu_safe(this)">'
            htmlstring = '<td onclick="menu_safe()" >'+ this.tag +'</td>';
            htmlstring += '<td>'+ this.uhr1 + '</td>';
            htmlstring += '<td>'+'-'+'</td>';
            htmlstring += '<td>'+ this.uhr2 +'</td>';
            htmlstring += '<td>'+ (ende - anf) + '</td>';
            htmlstring += '<td>'+ '<input type="textarea" >' +'</td>';
            htmlstring += '<td>'+ 'BBQ ' +'</td>';
            htmlstring += '</tr>'

        document.getElementById("tab").innerHTML += htmlstring


}
}
// function daten(jahr, mona, tag, anf, ende){
//
//     let tets = new Datensatz ( jahr, mona, tag, anf, ende );
//     tets.datensatz()
//     console.log(tets);
// }

// <!--    bau das arry-->
function setdates(jahr, mona, anf, ende){

    let dim = new Date(jahr, mona, 0).getDate();
    const my_list = [];
    for (let i = 1; i <= dim; i++) {
        my_list.push(new Datensatz(jahr, mona, i, anf, ende))
    }


    return my_list
    }
function create_table (jahr, mona, tag, anf, ende){
    for (let x of setdates(jahr,mona,anf,ende)) {
        x.datensatz();

    }
}
function start(){
    setkopfseile(teilne, kunden_nr, prakti, mona, jahr)
    create_table (jahr, mona, tag, anf, ende)
}

function menu_safe(){
    alert(event.target.innerHTML)
    let changebox = '<div>'
        changebox += '<button>Edit</button>'
        changebox += '</div>'


    event.target.innerHTML += changebox
}
/*



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
*/
