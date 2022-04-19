
// Set Standart

let mona = 4; //monat
let mo = mona -1;
let jahr = 2023; //jar
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

        this.bem = bem;
        this.bembbq = bembbq;
        this.set_an_ende()
        this.set_zeitstunden();
        this.sam_son_feir()
    }
    set_an_ende(){
        this.day = new Date(this.jahr, this.mona-1, this.tag, this.anf)
        this.day_end = new Date(this.jahr, this.mona-1, this.tag, this.ende);
    }
    set_zeitstunden(){
        let milli = this.day_end - this.day - 3600000

         this.zeitstunden = new Date(milli).toTimeString().split(' ')[0].slice(0,5);
    }

    sam_son_feir(){
        const feier_22 = [[1,1],[8,3],[15,4],[17,4],[18,4],[1,5],[26,5],[6,6],[3,10],[25,12],[26,12]];
        const feier_23 = [[1,1],[7,4],[9,4],[10,4],[1,5],[18,5],[29,5],[3,10],[25,12],[26,12]];
        let jahr = [];
        let year ;
        let fdate = [];
        if (this.day.getFullYear() == 2022){
            jahr = feier_22;
            year = 2022;

        } else if ( this.day.getFullYear() == 2023){
             jahr = feier_23;
             year = 2023;
        }
        for (let x of jahr) {

            fdate.push(new Date(year,x[1]-1, (x[0]), anf))
        }

        let feier = false;
        for (let x of fdate) {



            if (x.valueOf() == this.day.valueOf()) {
                feier = true;
                this.bem = 'feiertag'

            }

        }

        if (this.day.getDay() == 6 || this.day.getDay() == 0 || feier == true) {
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
        console.log(val)
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


        let htmlstring = '<tr>';
            htmlstring += '<td onclick="menu_safe()" >'+ this.tag +'</td>';
            htmlstring += '<td id="beginn'+ this.tag +'">'+ this.uhr1 + '</td>';
            htmlstring += '<td>'+'-'+'</td>';
            htmlstring += '<td id="ende'+ this.tag +'">'+ this.uhr2 +'</td>';
            htmlstring += '<td>'+ this.zeitstunden + '</td>';
            htmlstring += '<td id="bemer'+ this.tag +'">' + this.bem + '</td>';
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
    let htmlstring = '<tr>';
    htmlstring += '<th className="s1">Tag</th>';
    htmlstring += '<th className="s2">Arbeitsbeginn</th>';
    htmlstring += '<th className="s3"></th>';
    htmlstring += '<th className="s4">Arbeitsende</th>';
    htmlstring += '<th className="s5">Zeitstunden</th>';
    htmlstring += '<th className="s6">Bemerkung</th>';
    htmlstring += '<th className="s7">Vermerk durch BBQ</th>';
    htmlstring += '</tr>';
    document.getElementById("tab").innerHTML = htmlstring

    for (let x of my_list) {
        x.datensatz();

    }
}
function start(){
    setkopfseile(teilne, kunden_nr, prakti, mona, jahr)
    setdates(jahr,mona,anf,ende)
    create_table (jahr, mona, tag, anf, ende)
    console.log(my_list)
}

function menu_safe(){
    document.getElementById('menus').style.display = 'block';
    let zeile =  event.target.innerHTML ;
    let id_b = my_list[zeile-1].uhr1;
    let id_e = my_list[zeile-1].uhr2;
    let id_bem = my_list[zeile-1].bem;

    let htmlstring = '<table><tr>';
        htmlstring += '<th>Beginn</th>';
        htmlstring += '<th>ENde</th></tr>';
        htmlstring += '<tr>';
        htmlstring += '<td><input id="menu_anf" type="time" value="'+ id_b +'"></td>';
        htmlstring += '<td><input id="menu_end" type="time" value="'+ id_e +'"></td>';
        htmlstring += '</tr>'
        htmlstring += '<tr>'
        htmlstring += '<td>Bemerkung</td>'
        htmlstring += '<td ><input type="text" id="menu_bem" value="'+ id_bem + '" ></td>';
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
