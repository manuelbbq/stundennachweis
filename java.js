
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
const my_list = [];

function setkopfseile(teilne, kunden_nr, prakti, mona, jahr)  {
    document.getElementById('teil').value = teilne;
    document.getElementById('kundennr').value = kunden_nr;
    document.getElementById('Praktikumsstelle').value = prakti;
    document.getElementById('monat').value = mona + ' / ' + jahr;
        }




class Datensatz{
    constructor( jahr, mona, tag, anf, ende, bem='', bembbq = '' ) {
        this.anf = anf;
        this.ende = ende;
        this.tag = tag;
        this.jahr = jahr;
        this.mona = mona;
        this.day = new Date(jahr, mona-1, tag, anf)
        this.day_end = new Date(jahr, mona-1, tag, ende);
        this.bem = bem;
        this.bembbq = bembbq;
    }
    set_zeitstunden(){
        let milli = this.day_end - this.day - 3600000
        console.log(new Date(milli-3600000));
         this.zeitstunden = new Date(milli).toTimeString().split(' ')[0].slice(0,5);
    }

    sam_son_feir(){
        if (this.day.getDay() == 6 || this.day.getDay() == 0 ) {
            this.uhr1 = '-' ;
            this.uhr2 = '-' ;



        } else {
            this.uhr1 = this.day.toTimeString().split(' ')[0].slice(0, 5) ;
            this.uhr2 = this.day_end.toTimeString().split(' ')[0].slice(0, 5) ;

        }

    }
    change_my_list(){
        // let anf = document.getElementById("menu_anf").value
        // let hhmm = this.st_min(anf);
        // this.day.setHours(hhmm[0],hhmm[1]);
        // let hhmm = this.st_min(end)
        let val = document.getElementById("menu_anf").value;
        this.set_time(val, this.day);
        let val_2 = document.getElementById("menu_end").value;
        this.set_time(val_2, this.day_end);
        this.set_zeitstunden()

        this.bem =  document.getElementById("menu_bem").value;
        create_table();
        console.log(my_list);
        document.getElementById('menus').style.display = 'none';
    }

    datensatz(){
        this.set_zeitstunden();
        this.sam_son_feir();
        let htmlstring = '<tr>'
            htmlstring = '<td onclick="menu_safe()" >'+ this.tag +'</td>';
            htmlstring += '<td id="beginn'+ this.tag +'">'+ this.uhr1 + '</td>';
            htmlstring += '<td>'+'-'+'</td>';
            htmlstring += '<td id="ende'+ this.tag +'">'+ this.uhr2 +'</td>';
            htmlstring += '<td>'+ this.zeitstunden + '</td>';
            htmlstring += '<td>' + this.bem + '</td>';
            htmlstring += '<td>'+ ' ' +'</td>';
            htmlstring += '</tr>'
        document.getElementById("tab").innerHTML += htmlstring


    }

    set_time(val, tag){
        let hh = val.split(":")
        tag.setHours(hh[0],hh[1]);


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
    for (let i = 1; i <= dim; i++) {
        my_list.push(new Datensatz(jahr, mona, i, anf, ende))
    }


    // return my_list
    }
function create_table (jahr, mona, tag, anf, ende){
    // document.getElementById("tab").innerHTML= ""
    for (let x of my_list) {
        x.datensatz();

    }
}
function start(){
    setkopfseile(teilne, kunden_nr, prakti, mona, jahr)
    setdates(jahr,mona,anf,ende)
    create_table (jahr, mona, tag, anf, ende)
}

function menu_safe(){
    document.getElementById('menus').style.display = 'block';
    let zeile =  event.target.innerHTML ;
    let id_b = document.getElementById( 'beginn' + zeile).innerHTML;
    let id_e = document.getElementById( 'ende' + zeile).innerHTML;


    let htmlstring = '<table><tr>';
        htmlstring += '<th>Beginn</th>';
        htmlstring += '<th>ENde</th></tr>';
        htmlstring += '<tr>';
        htmlstring += '<td><input id="menu_anf" type="time" value="'+ id_b +'"></td>';
        htmlstring += '<td><input id="menu_end" type="time" value="'+ id_e +'"></td>';
        htmlstring += '</tr>'
        htmlstring += '<tr>'
        htmlstring += '<td>Bemerkung</td>'
        htmlstring += '<td ><input type="text" id="menu_bem" ></td>';
        htmlstring += '</tr>'
        htmlstring += '</tr></table>';
        htmlstring += '<input type="button" onclick="my_list[' + (zeile-1) + '].change_my_list()" value="save">';

    // console.log(my_list);<td>
    document.getElementById("menus").innerHTML = htmlstring;

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
