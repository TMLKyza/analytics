function usageGraph() {
  var xvals = [],
    yvals = [],
    yvalsEst = [];
  for (var i = 0; i < lenght(json.data); i++) {
    xvals[i] = formatDateMonth(new Date(json.data[i].day));
    yvals[i] = json.data[i].km * 1;
    yvalsEst[i] = json.analyzedData[i].estKm;
  }
  var ctx = $("#usage");
  var chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: xvals,
      datasets: [{
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor:'rgb(205,220,57)',
        label: "real",
        data: yvals,
      }, {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor:'rgb(128,203,196)',
        label: "estimated",
        data: yvalsEst,
      }]
    },
    options: {
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'km'
          }
        }]
      },
      maintainAspectRatio: false,
      responsive: false
    }
  });
}

function fuelDistrib() {
  var opts = {
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'km'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'ltrs'
        }
      }]
    },
    maintainAspectRatio: false,
    responsive: false
  };
  var dat = [];
  for (var i = 0; i < lenght(json.data); i++) {
    dat[i] = {
      "x": json.data[i].lts,
      "y": json.data[i].km
    };
  }
  var ctx = $("#fuelDistrib");
  var chart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        backgroundColor:'rgb(205,220,57)',
        type: 'scatter',
        label: 'Data2',
        data: dat,
        borderColor: "transparent"
      }]
    },
    options: opts,
  });
}

function histokm_lt() {
  var opts = {
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'km/lt'
        }
      }],
    },
    maintainAspectRatio: false,
    responsive: false
  };
  var x = [],
    y = [];
  for (var i = 0; i < lenght(json.data); i++) {
    x[i] = formatDateFull(new Date(json.data[i].day));
    y[i] = json.data[i].km / json.data[i].lts;
  }
  var ctx = $("#histokm_lt");
  var chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: x,
      datasets: [{
        backgroundColor:'rgb(205,220,57)',
        data: y,
      }],
    },
    options: opts,
  });
}

function monthlyCost() {
  var opts = {
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'euro'
        }
      }],
    },
    maintainAspectRatio: false,
    responsive: false
  };
  var x = [],
    y = [],
    state = true,
    j = 0,
    k = 0;
  for (var i = 0; i < lenght(json.data); i++) {
    k = 0;
    state = true;
    while (state && k < lenght(json.data)) {
      if (x[k] == formatDateMonthYear(new Date(json.data[i].day)))
        state = false;
      k++;
    }
    if (state) {
      x[j] = formatDateMonthYear(new Date(json.data[i].day));
      j++;
    }
  }
  for (var i =0;i<lenght(x);i++){
    var sum =0;
    for (var j =0 ;j<lenght(json.data);j++){
      if(x[i]==formatDateMonthYear(new Date(json.data[j].day)))
      sum += json.data[j].euro*1;
    }
    y[i]=sum;
  }

  var ctx = $("#monthlycost");
  var chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: x,
      datasets: [{
        backgroundColor:'rgb(205,220,57)',
        data: y,
      }],
    },
    options: opts,
  });
}

function monthlyKm() {
  var opts = {
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'km'
        }
      }],
    },
    maintainAspectRatio: false,
    responsive: false
  };
  var x = [],
    y = [],
    state = true,
    j = 0,
    k = 0;
  for (var i = 0; i < lenght(json.data); i++) {
    k = 0;
    state = true;
    while (state && k < lenght(json.data)) {
      if (x[k] == formatDateMonthYear(new Date(json.data[i].day)))
        state = false;
      k++;
    }
    if (state) {
      x[j] = formatDateMonthYear(new Date(json.data[i].day));
      j++;
    }
  }
  for (var i =0;i<lenght(x);i++){
    var sum =0;
    for (var j =0 ;j<lenght(json.data);j++){
      if(x[i]==formatDateMonthYear(new Date(json.data[j].day)))
      sum += json.data[j].km*1;
    }
    y[i]=sum;
  }

  var ctx = $("#monthlykm");
  var chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: x,
      datasets: [{
        backgroundColor:'rgb(205,220,57)',
        data: y,
      }],
    },
    options: opts,
  });
}
