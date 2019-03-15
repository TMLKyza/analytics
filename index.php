<HTML>
<head>
<!--Import Google Icon Font-->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<!--Import materialize.css-->
<link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>
<!--Let browser know website is optimized for mobile-->
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<link rel="stylesheet" type="text/css" href="css/style.css">
<!-- file reading -->
<?php
$filePath = "data/data.json";
$file = fopen($filePath,"r");
$json = json_decode(fread($file,filesize($filePath)));
 ?>
<!--var passing & functions-->
<script type="text/javascript">
var json=<?php echo json_encode($json);?>;
function callWriteJson(json){
  var url = "writeJson.php?json="+json;
  self.location=url;
}
</script>
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/analytics.js"></script>
<script type="text/javascript" src="js/Chart.bundle.js"></script>
<script type="text/javascript" src="js/graph.js"></script>
<script type="text/javascript" src="js/interface.js"></script>
</head>
<body class="grey darken-4">

<nav class="grey darken-3">
  <div class="nav-wrapper">
    <a class="logo left">
      <?php echo date("d-m-Y",strtotime($json->analyzedData[count($json->analyzedData)-1]->estTime))."±".round($json->analyzedData[count($json->analyzedData)-1]->sEstTime,1); ?> </a>
    <ul id="nav-mobile" class="right">
      <li><a href="#" class="menuTrigger" style="display:block; margin:0"><i class="material-icons">menu</i></a></li>
    </ul>
  </div>
</nav>


<div class="menu">
  <div id="menuRow" class="rowMenu">
    <div class="logo  menuFont valign-wrapper">Menu </div>
    <div class="right valign-wrapper"> <a href="#" class=" closeMenuTrigger "><i class="material-icons  menuFont">arrow_forward</i></a> </div>
  </div>

  <div id="dataRow" class="rowMenu">
    <div class="valign-wrapper"><a class="menuFont dataTrigger" href="#">New Entry</a>
      <a href="#" class="rightMenu closeDataTrigger " style="display:none"><i class="material-icons  menuFont">arrow_upward</i></a> </div>
    <div class="menuContent">
      <div class="center-align extraMargin">
      <input class="lesserMargin" type="text" id="textbox3" placeholder="eur"><br>
      <input class="lesserMargin" type="text" id="textbox1" placeholder="eur/lt"><br>
      <input class="lesserMargin" type="text" id="textbox2" placeholder="km"><br>
      <input class="lesserMargin" type="date" id="date" placeholder="km"><br>
      <a class="waves-effect waves-light btn lesserMargin" id="sendData" href="#">send </a><br>
    </div>
    </div>
  </div>
  <div id="tableRow" class="rowMenu">
    <div class="valign-wrapper"><a class="menuFont tableTrigger" href="#">Data Table</a>
      <a href="#" class="rightMenu closeTableTrigger " style="display:none"><i class="material-icons  menuFont">arrow_upward</i></a> </div>
    <div class="menuContent">
      <div class="divTable">
        <?php
        echo "<table><thead><tr><th>Km/day</th><th>Km/lt</th><th>Dayone</th></tr><tbody><tr><td>". round($json->timeDataAnalysis->B,2)."</td><td>". round($json->distDataAnalysis->B,2)."</td><td>".date("d-m-Y",strtotime($json->dayone))."</td></tr></tbody></table>";
        echo "<br><table><thead>";
        echo "<tr><th>lt</th><th>km</th><th>estKm</th><th>sEstKm</th><th>estTime</th><th>sEstTime</th></tr></thead><tbody>";
        for ($i=0 ;$i<count($json->data);$i++){
          if(isset($json->data[$i]->lts)){
          echo "<tr><td>".round($json->data[$i]->lts,2)."</td><td>".$json->data[$i]->km."</td><td>".round($json->analyzedData[$i]->estKm,2)."</td><td>".round($json->analyzedData[$i]->sEstKm,2)."</td><td>".date("d-m-Y",strtotime($json->analyzedData[$i]->estTime))."</td><td>".round($json->analyzedData[$i]->sEstTime,1)."</td><td> <a href='#' id='".$i."' class='remover'><i class='material-icons  menuFont'>delete</i></a></td></tr>";
          }
        }
        echo "</tbody></table>";
        ?>
      </div>
    </div>
  </div>
  <div id="optionRow" class="rowMenu">
    <div class="valign-wrapper"><a class="menuFont optionTrigger" href="#">Options</a>
      <a href="#" class="rightMenu closeOptionsTrigger " style="display:none"><i class="material-icons  menuFont">arrow_upward</i></a>
      <br></div>
    <div class="menuContent valign-wrapper  divMenuElements">
      <div class="center-align extraMargin">
        <input type="date" id="dayone" placeholder="dayone" style="width:40%"><br>

        <a class="waves-effect waves-light btn" id="resetData" href="#"> set dayone </a><br><br>
        <div class="center-align">
          <a class="waves-effect waves-light btn extraMargin" id="deleteLastRecord" href="#"> delete last record</a><br><br>
          <a class="waves-effect waves-light btn " id="reAnalyze" href="#"> re analyze data</a>
        </div>
      </div>

    </div>
  </div>
</div>

<div class="row">
  <div>
    <ul class="tabs grey darken-3">
      <li class="tab col s2"><a class="active" href="#usageTab">refuel history</a></li>
      <li class="tab col s2"><a href="#fuelDistribTab">km/lt scattering</a></li>
      <li class="tab col s2"><a href="#histokm_ltTab">km/lt history</a></li>
      <li class="tab col s2"><a href="#monthlycostTab">monthly cost</a></li>
      <li class="tab col s2"><a href="#monthlykmTab">monthly km</a></li>
    </ul>
  </div>
  <div id="usageTab" class="col s12"><canvas id="usage" width="" height="400"></canvas></div>
  <div id="fuelDistribTab" class="col s12"><canvas id="fuelDistrib" width="" height="400"></canvas></div>
  <div id="histokm_ltTab" class="col s12"><canvas id="histokm_lt" width="" height="400"></canvas></div>
  <div id="monthlycostTab" class="col s12"><canvas id="monthlycost" width="" height="400"></canvas></div>
  <div id="monthlykmTab" class="col s12"><canvas id="monthlykm" width="" height="400"></canvas></div>
</div>


<script type="text/javascript" src="js/materialize.min.js"></script>
</body>

</HTML>
