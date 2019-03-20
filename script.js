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

  title.text(monthName);

}



function init() {

  var year=2018;
  var month=0;

  title(month,year);
}

$(document).ready(init);
