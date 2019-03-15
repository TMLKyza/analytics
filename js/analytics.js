function dataAnalyzer(json, day, euro, eur_lt, km) {
  //modifico analyzedData e dataAnalysis a ogni data aggiunto
  if (typeof day != 'undefined' && typeof euro != 'undefined' && typeof eur_lt != 'undefined' && typeof km != 'undefined') {
    var lts = euro / eur_lt;
    json.data.push({
      "day": day,
      "euro": euro,
      "eur_lt": eur_lt,
      "lts": lts,
      "km": km
    });
  }
  var obj = json;
  obj.distDataAnalysis = linearRegression(json.data, "lts", "km", json.readingErrorPercentage);
  obj.analyzedData = estimatedStats(json);
  obj.timeDataAnalysis = linearRegression(obj.data, "day", "km");
  return obj;
}

function lenght(obj) {
  var i = 0;
  for (var x in obj) {
    if (obj.hasOwnProperty(x)) {
      i++;
    }
  }
  return i;
}

function linearRegression(array, x, y, error) {
  //y=bx
  if (typeof error == 'undefined') {
    var n = lenght(json.analyzedData);
    var sum = 0;
    for (var i = 0; i < n; i++) {
      sum += json.analyzedData[i].kmDay * 1;
    }
    var b = sum / n;
    var dataAnalysis = {
      "B": b,
    };
    return dataAnalysis;
  }
  var sxy = 0,
    sx = 0,
    sy = 0,
    sxx = 0;
  var n = lenght(array);
  for (var i = 0; i < n; i++) {
    sy += array[i][y] * 1;
    sx += array[i][x] * 1;
    sxy += array[i][x] * array[i][y];
    sxx += Math.pow(array[i][x], 2);
  }
  var b = sxy / sxx;
  var dataAnalysis = {
    "B": b,
    "sBperc": b * error
  };

  return dataAnalysis;
}

function estimatedStats(json) {
  var objs = [];
  for (var i = 0; i < lenght(json.data); i++) {
    if (i != 0) {
      var delta = Date.parse(json.data[i].day) - Date.parse(json.data[i - 1].day);
      var estimatedDays = (json.distDataAnalysis.B * json.data[i].lts) / json.timeDataAnalysis.B;
      var estimate = new Date(daysToMs(estimatedDays) + Date.parse(json.data[i].day));
    } else {
      var delta = Date.parse(json.data[i].day) - Date.parse(json.dayone);
      var estimatedDays = (json.distDataAnalysis.B * json.data[i].lts) / json.timeDataAnalysis.B;
      var estimate = new Date(daysToMs(estimatedDays) + Date.parse(json.dayone));
    }
    var obj = {
      "deltaT": msToDay(delta),
      "estKm": json.distDataAnalysis.B * json.data[i].lts,
      "sEstKm": json.distDataAnalysis.sBperc * json.data[i].lts,
      "estTime": estimate,
      "sEstTime": json.distDataAnalysis.sBperc * json.data[i].lts / json.timeDataAnalysis.B,
      "kmDay": json.data[i].km / msToDay(delta)
    };
    objs[i] = obj;
  }
  return objs;
}

function msToDay(ms) {
  return ms / 1000 / 60 / 60 / 24;
}

function daysToMs(day) {
  return day * 24 * 60 * 60 * 1000;
}

function formatDateMonth(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  //return day + ' ' + monthNames[monthIndex] + ' ' + year;
  return monthNames[monthIndex];
}

function formatDateMonthYear(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  //return day + ' ' + monthNames[monthIndex] + ' ' + year;
  return monthNames[monthIndex]+' '+year;
}

function formatDateFull(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}
