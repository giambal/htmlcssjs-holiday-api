// ---- FUNZIONE PER PRENDERE MESE NEL FORMATO GIUSTO ----

function getMonthName(month) {

  var mom=moment();

  mom.month(month);

  var monthName=mom.format("MMMM");

  return monthName;
}

// ---- FUNZIONE PER STAMPARE IL TITOLO ----

function title(month,year) {

  var title=$("#title");

  var monthName=getMonthName(month);
  var dayCount=daysCount(year,month);
  title.text(monthName + ": " + "1-" + dayCount);

}

// ---- FUNZIONE PER CONTARE QUANTI GIORNI HA IL MESE ----

function daysCount(year,month) {

  var mom=moment();
  mom.month(month);
  mom.year(year);

  var dayCount=mom.daysInMonth();
  return dayCount;
}



function init() {

  var year=2018;
  var month=0;

  title(month,year);
}

$(document).ready(init);
