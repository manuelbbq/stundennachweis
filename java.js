
// Set Standart

let mona = 9; //monat
let jahr = 2022; //jar
let teilne = "Manuel Martinez Cerecedo"; //name
let kunden_nr = 123456789; //kunden-nr.
let prakti = "Super Firma"; // Firmenname
let anf = "09:00"; // Arbeitsanfang
let ende = "17:00"; // Arbeitsende
const my_list = [];

function setkopfseile(teilne, kunden_nr, prakti, mona, jahr)  {
    document.getElementById('teil').value = teilne;
    document.getElementById('kundennr').value = kunden_nr;
    document.getElementById('Praktikumsstelle').value = prakti;
    document.getElementById('monat').value = mona + ' / ' + jahr;
        }




class Datensatz{
    constructor( jahr, mona, tag, anf, ende, bem='') {
        this.anf = anf;
        this.ende = ende;
        this.tag = tag;
        this.jahr = jahr;
        this.mona = mona;
        this.bem = bem;
        this.set_an_ende();
        this.feiertag = this.sam_son_feir();


        // this.sam_son_feir()
        this.set_zeitstunden();

    }
    set_an_ende(){
        console.log(this.anf.slice(-2,))
        this.day = new Date( this.jahr, this.mona -1, this.tag , this.anf.slice(0,2),this.anf.slice(-2,))
        this.day_end = new Date(this.jahr, this.mona -1, this.tag , this.ende.slice(0,2),this.ende.slice(-2,));
    }
    set_zeitstunden(){
        if (this.feiertag== false) {
            let milli = this.day_end - this.day - 3600000
            this.zeitstunden = new Date(milli).toTimeString().split(' ')[0].slice(0, 5);
        } else {
            this.zeitstunden = '-'
        }
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

            fdate.push(new Date(year, x[1]-1, (x[0]), this.anf.slice(0,2),this.anf.slice(-1,-3)));
        }

        let feier = false;
        for (let x of fdate) {



            if (x.valueOf() == this.day.valueOf()) {
                feier = true;
                this.bem = 'feiertag'
                return true

            }

        }

        if (this.day.getDay() == 6 || this.day.getDay() == 0 || feier == true) {
            // this.uhr1 = '-' ;
            // this.uhr2 = '-' ;
            return true

        } else {
            // this.uhr1 = this.day.toTimeString().split(' ')[0].slice(0, 5) ;
            // this.uhr2 = this.day_end.toTimeString().split(' ')[0].slice(0, 5) ;
            return false

        }

    }
    change_my_list(){
        this.anf = document.getElementById('menu_anf').value;
        console.log(this.anf)
        // this.uhr1 = document.getElementById('menu_anf').value;
        this.ende = document.getElementById('menu_end').value;
        // this.uhr2 = document.getElementById('menu_end').value;
        this.bem = document.getElementById('menu_bem').value;
        this.feiertag = false;
        this.set_an_ende();
        this.set_zeitstunden();

        console.log(my_list);









        // // let anf = document.getElementById("menu_anf").value
        // // let hhmm = this.st_min(anf);
        // // this.day.setHours(hhmm[0],hhmm[1]);
        // // let hhmm = this.st_min(end)
        // let val = document.getElementById("menu_anf").value;
        // console.log(val)
        // this.set_time(val, this.day);
        // let val_2 = document.getElementById("menu_end").value;
        // this.set_time(val_2, this.day_end);
        // this.set_zeitstunden()
        //
        // this.bem =  document.getElementById("menu_bem").value;
        // create_table();
        // console.log(my_list);
         document.getElementById('menus').style.display = 'none';
    }

    datensatz(){
        let uhr1 , uhr2 , stunden ;
        if (this.feiertag == true){
            uhr1 = '-';
            uhr2 = '-';
            stunden = "-";
        } else {
             uhr1 = this.day.toTimeString().slice(0, 5);
             uhr2 = this.day_end.toTimeString().slice(0, 5);
             stunden = this.zeitstunden
        }

        let htmlstring = '<tr>';
            htmlstring += '<td onclick="menu_safe()" >'+ this.tag +'</td>';
            htmlstring += '<td id="beginn'+ this.tag +'">'+ uhr1 + '</td>';
            htmlstring += '<td>'+'-'+'</td>';
            htmlstring += '<td id="ende'+ this.tag +'">'+ uhr2 +'</td>';
            htmlstring += '<td>'+ stunden + '</td>';
            htmlstring += '<td id="bemer'+ this.tag +'" class="s6">' + this.bem + '</td>';
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
function create_table (){
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
    create_table ()
    console.log(my_list)
}
function chan(zeile){
    my_list[(zeile)].change_my_list();
    create_table();
}
function menu_safe(){
    document.getElementById('menus').style.display = 'block';
    let zeile =  event.target.innerHTML ;
    let id_b = my_list[zeile-1].anf;
    let id_e = my_list[zeile-1].ende;
    let id_bem = my_list[zeile-1].bem;
    let id_day = my_list[zeile - 1].day.toDateString();
    console.log(id_day);
    let htmlstring = '<h1>'+ id_day +'</h1>';
        htmlstring += '<table><tr>';
        htmlstring += '<th>Beginn</th>';
        htmlstring += '<th>Ende</th></tr>';
        htmlstring += '<tr>';
        htmlstring += '<td><input id="menu_anf" type="time" value="'+ id_b +'"></td>';
        htmlstring += '<td><input id="menu_end" type="time" value="'+ id_e +'"></td>';
        htmlstring += '</tr>'
        htmlstring += '<tr>'
        htmlstring += '<td>Bemerkung</td>'
        htmlstring += '<td ><input type="text" id="menu_bem" value="'+ id_bem + '" ></td>';
        htmlstring += '</tr>'
        htmlstring += '</tr></table>';
        htmlstring += '<input type="button" onclick="chan(' + (zeile-1) + ')" value="save">';
        htmlstring += '<input type="button" onclick="document.getElementById(\'menus\').style.display = \'none\';" value="cancel">';

    // console.log(my_list);<td>
    document.getElementById("menus").innerHTML = htmlstring;

}






