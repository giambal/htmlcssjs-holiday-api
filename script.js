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
  var dayCount=daysCount(month,year);
  title.text(monthName + ": " + "1-" + dayCount);

}

// ---- FUNZIONE PER CONTARE QUANTI GIORNI HA IL MESE ----

function daysCount(month,year) {

  var mom=moment();
  mom.month(month);
  mom.year(year);

  var dayCount=mom.daysInMonth();
  return dayCount;
}

// ---- FUNZIONE PER PRENDERE I GIORNI ----

function getDay(month,year,day) {
  var mom=moment();
  mom.month(month);
  mom.year(year);
  mom.date(day);

  var dayCount=mom.daysInMonth();

  var date=mom.format("DD-MMMM-dddd YYYY");
  return date;
}

// ---- FUNZIONE PER STAMPARE IL CALENDARIO ----

function calendar(month,year) {

  var dayCount=daysCount(month,year);
  var calendarList=$("#daylist");

  var template=$("#day-template").html();
  var compiled= Handlebars.compile(template);

  var mom=moment();
  mom.month(month);
  mom.year(year);

  for (var day = 1; day <= dayCount; day++) {

    var tempDate={

      date: getDay(month,year,day),
      machineDate:getMachineDate(month,year,day)
    };

    var finalHTML=compiled(tempDate);
    calendarList.append(finalHTML);
  }
}

// ---- FUNZIONE PER IL RICHIAMO DELL'AJAX ----

function getHolidays(month,year) {

  var holidays={

    month:month,
    year:year

  };

  $.ajax({

    url : "https://flynn.boolean.careers/exercises/api/holidays",
    method : "GET",
    data : holidays,
    success : function(data,state) {

      if (data.success) {

        ajaxRes(data.response);
        console.log(holidays);
      }
    },
    error : function(request, state, error) {

      console.log("request", request);
      console.log("state", state);
      console.log("error", error);
    }
  });

}

// ---- FUNZIONE CHE TRASFORMA LA DATA IN QUELLA DELL'AJAX ----

function getMachineDate(month,year,day) {

  var mom=moment();
  mom.month(month);
  mom.year(year);
  mom.date(day);

  var dayCount=mom.daysInMonth();

  var machine=mom.format("YYYY-MM-DD");
  return machine;
}

// ---- FUNZIONE CHE PRENDE IL RISULTATO DELL'AJAX ----

function ajaxRes(holidays) {

  for (var i = 0; i < holidays.length; i++) {
    var holiday=holidays[i];
    var holidayName=holiday.name;
    var holidayDate=holiday.date;

    var thisHoliday = $("div[data-date='" + holidayDate + "']");

    thisHoliday.addClass("red").text(thisHoliday.text() + " " + holidayName);
  }

}

// ---- FUNZIONE PER AVANZAMENTO MESE ----

function nextMonth(month,year) {

  month++;
  removeMonth();
  title(month,year);

  calendar(month,year);

  getHolidays(month,year);
  return month;
}

// ---- FUNZIONE PER MESE PRECENTE ----

function prevMonth(month,year) {

  month-- ;
  removeMonth();
  title(month,year);

  calendar(month,year);

  getHolidays(month,year);
  return month;
}

// ---- FUNZIONE PER PIALLARE IL MESE ----

function removeMonth() {

  var title=$("#title");
  title.text(" ");

  var box=$(".box");
  box.remove();
}



function init() {

  var year=2018;
  var month=0;

  title(month,year);

  calendar(month,year);

  getHolidays(month,year);

  $(".fa-backward").click(function () {
    if (month>0) {

      month=prevMonth(month,year);
    }
  })

  $(".fa-forward").click(function () {
    if (month<11) {

      month=nextMonth(month,year);
    }
  })
}

$(document).ready(init);
