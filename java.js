
// Set Standart

let mona = 10; //monat
let jahr = 2022; //jar
let teilne = "Manuel Martinez Cerecedo"; //name
let kunden_nr = 123456789; //kunden-nr.
let prakti = "Super Firma"; // Firmenname
let anf = "09:30"; // Arbeitsanfang
let ende = "17:00"; // Arbeitsende
let pause = 60; // Pause in Minuten
const my_list = []; // Liste für Datensatzobject

function setkopfseile(teilne, kunden_nr, prakti, mona, jahr)  {
    document.getElementById('teil').value = teilne;
    document.getElementById('kundennr').value = kunden_nr;
    document.getElementById('Praktikumsstelle').value = prakti;
    document.getElementById('monat').value = mona + ' / ' + jahr;
        }




class Datensatz{
    constructor( jahr, mona, tag, anf, ende, pause,bem='') {
        this.anf = anf;
        this.ende = ende;
        this.tag = tag;
        this.jahr = jahr;
        this.mona = mona;
        this.bem = bem;
        this.pause = pause;
        // this.set_an_ende();
        this.feiertag = this.sam_son_feir();
        // this.set_zeitstunden();

    }
    // Erstellen für Datum
    set_anf_date(){
        return  new Date( this.jahr, this.mona -1, this.tag , this.anf.slice(0,2),this.anf.slice(-2,))
    }
    set_end_date(){
        return  new Date(this.jahr, this.mona -1, this.tag , this.ende.slice(0,2),this.ende.slice(-2,));

    }

    // Berechen der Anwesenheit
    set_zeitstunden(){
        if (this.feiertag== false) {
            let day = this.set_anf_date();
            let day_end = this.set_end_date();

            let milli = day_end - day - 3600000 -this.pause * 60000
            return  new Date(milli).toTimeString().split(' ')[0].slice(0, 5);
        } else {
            return  '-'
        }
    }
// Feiertage check
    sam_son_feir(){
        const feier_22 = [[1,1],[8,3],[15,4],[17,4],[18,4],[1,5],[26,5],[6,6],[3,10],[25,12],[26,12]];
        const feier_23 = [[1,1],[7,4],[9,4],[10,4],[1,5],[18,5],[29,5],[3,10],[25,12],[26,12]];
        let jahr = [];
        let year ;
        let fdate = [];
        let day = this.set_anf_date();

        if (day.getFullYear() == 2022){
            jahr = feier_22;
            year = 2022;

        } else if ( day.getFullYear() == 2023){
             jahr = feier_23;
             year = 2023;
        }
        for (let x of jahr) {
            fdate.push(new Date(year, x[1]-1, (x[0]), this.anf.slice(0,2),this.anf.slice(-2,)));
        }

        let feier = false;
        for (let x of fdate) {
            //     console.log('feier ' + x)
            // console.log(day)

            if (x.valueOf() == day.valueOf()) {
                feier = true;
                this.bem = 'feiertag'
            }

        }

        if (day.getDay() == 6 || day.getDay() == 0 || feier == true) {
            // this.uhr1 = '-' ;
            // this.uhr2 = '-' ;

            return true

        } else {

            return false

        }

    }
    //ändern des Objektes durch daten vom Menu
    change_my_list(){
        this.anf = document.getElementById('menu_anf').value;
        console.log(this.anf)
        this.ende = document.getElementById('menu_end').value;
        this.bem = document.getElementById('menu_bem').value;
        this.feiertag = false;
        this.pause = document.getElementById("menu_pause").value;
        console.log(my_list);
        document.getElementById('menus').style.display = 'none';
    }
// Erstellen der HTML für das Objekt
    datensatz(){
        let uhr1 , uhr2 , stunden ;
        let day = this.set_anf_date();
        let day_end = this.set_end_date();
        if (this.feiertag == true){
            uhr1 = '-';
            uhr2 = '-';
            stunden = "-";
        } else {
             uhr1 = day.toTimeString().slice(0, 5);
             uhr2 = day_end.toTimeString().slice(0, 5);
             stunden = this.set_zeitstunden();
        }

        let htmlstring = '<tr>';
            htmlstring += '<td onclick="menu_safe()" >'+ this.tag +'</td>';
            htmlstring += '<td id="beginn'+ this.tag +'">'+ uhr1 + '</td>';
            htmlstring += '<td>'+'-'+'</td>';
            htmlstring += '<td id="ende'+ this.tag +'">'+ uhr2 +'</td>';
            htmlstring += '<td>'+ stunden + '</td>';
            htmlstring += '<td id="bemer'+ this.tag +'" class="s6">' + this.bem + '</td>';
            htmlstring += '<td>'+ ' ' +'</td>';
            htmlstring += '</tr>';
        document.getElementById("tab").innerHTML += htmlstring;
    }


}

// <!--    Erstelle my_list -->

function setdates(jahr, mona, anf, ende, pause){
    let dim = new Date(jahr, mona, 0).getDate();
    for (let i = 1; i <= dim; i++) {
        my_list.push(new Datensatz(jahr, mona, i, anf, ende, pause))
    }
}

// Erstelle table für die Daten aus my_list
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

// functio für onload
function start(){
    setkopfseile(teilne, kunden_nr, prakti, mona, jahr)
    setdates(jahr,mona,anf,ende, pause)
    create_table ()
    console.log(my_list)
}

//function für den save button
function chan(zeile){
    my_list[(zeile)].change_my_list();
    create_table();
}

// function für change Menü
function menu_safe(){
    document.getElementById('menus').style.display = 'block';
    let zeile =  event.target.innerHTML ;
    let id_b = my_list[zeile-1].anf;
    let id_e = my_list[zeile-1].ende;
    let id_bem = my_list[zeile-1].bem;
    let id_day = my_list[zeile - 1].set_anf_date().toDateString();
    let id_pause = my_list[zeile -1].pause;
    console.log(id_day);
    let htmlstring = '<h1>'+ id_day +'</h1>';
        htmlstring += '<table><tr>';
        htmlstring += '<th>Beginn</th>';
        htmlstring += '<th>Ende</th>';
        htmlstring += '<th>Pause</th></tr>';
        htmlstring += '<tr>';
        htmlstring += '<td><input id="menu_anf" type="time" value="'+ id_b +'"></td>';
        htmlstring += '<td><input id="menu_end" type="time" value="'+ id_e +'"></td>';
        htmlstring += '<td><input id="menu_pause" type="text" value="'+ id_pause +'"></td>';
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






