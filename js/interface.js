$("document").ready(function() {

  $('.tabs').tabs();
  $("canvas").attr("width", $("body").width() - 20);
  $("canvas").attr("height", $("body").height()-$("body").height()*.2);

  $(".menuTrigger").click(function() {
    openMenu()
  });
  $(".closeMenuTrigger").click(function() {
    closeMenu()
  });
  $(".optionTrigger").click(function(){
    menuEntryOpen("#optionRow");
  });
  $(".closeOptionsTrigger").click(function(){
    menuEntryClose("#optionRow");
  });
  $(".dataTrigger").click(function(){
    menuEntryOpen("#dataRow");
  });
  $(".closeDataTrigger").click(function(){
    menuEntryClose("#dataRow");
  });
  $(".tableTrigger").click(function(){
    menuEntryOpen("#tableRow");
  });
  $(".closeTableTrigger").click(function(){
    menuEntryClose("#tableRow");
  });

  $('#sendData').click(function() {
    var timestamp = Date.parse($("#date").val());

    if (isNaN(timestamp) == false) {
      var d = new Date(timestamp);
      callWriteJson(JSON.stringify(dataAnalyzer(json, d, $("#textbox3").val(), $("#textbox1").val(), $("#textbox2").val())));
    } else {
      var now = new Date();
      callWriteJson(JSON.stringify(dataAnalyzer(json, now, $("#textbox3").val(), $("#textbox1").val(), $("#textbox2").val())));
    }
  });
  $('#resetData').click(function() {
    json.dayone = new Date($("#dayone").val());
    for (var i = 0; i < lenght(json.data); i++) {
      if (json.data[i].day < json.dayone)
        json.data.splice(i, 1);
    }
    callWriteJson(JSON.stringify(json));
  });
  $('#deleteLastRecord').click(function() {
    var n = lenght(json.data) - 1;
    json.data.splice(n, 1);
    json.analyzedData.splice(n, 1);
    callWriteJson(JSON.stringify(dataAnalyzer(json)));
  });
  $('#reAnalyze').click(function() {
    json = dataAnalyzer(json);
    callWriteJson(JSON.stringify(json));
  });
  $('.remover').click(function () {
    json.data.splice($(this).attr("id"), 1);
    json.analyzedData.splice($(this).attr("id"), 1);
    callWriteJson(JSON.stringify(dataAnalyzer(json)));
  });


  monthlyKm();
  monthlyCost();
  usageGraph();
  fuelDistrib();
  histokm_lt();
});

function openMenu() {
  var bodyWidth = $("body").width();
  $(".menu").css({
    "display": "block"
  });
  $(".menu").animate({
    width: bodyWidth
  });
}

function closeMenu() {
  var bodyWidth = 0;
  $(".menu").animate({
    width: bodyWidth,
  },function () {$(".menu").hide()});

}

function menuEntryOpen(str){
  var hgt=$(".menu").height();
  var hgtRow=$("#menuRow").height();
  var selectors=["#dataRow","#optionRow","#tableRow","#menuRow"];
  var closerSelectors=[".closeDataTrigger",".closeOptionsTrigger",".closeTableTrigger",""];
  for(var i =0;i<lenght(selectors);i++){
    if(selectors[i]!=str)
    $(selectors[i]).hide();
  }
  $(str).children("div").height(hgtRow);
  $(".menuContent").css({"display":"block"});
  $(str).animate({
    height:hgt,
  });
  var i =0;
  while(i<lenght(selectors)&&selectors[i]!=str)
    i++;
  $(closerSelectors[i]).show();
}

function menuEntryClose(str){
  var hgtRow=$("#menuRow").height();
  var selectors=["#dataRow","#optionRow","#tableRow","#menuRow"];
  var closerSelectors=[".closeDataTrigger",".closeOptionsTrigger",".closeTableTrigger",""];
  for(var i =0;i<lenght(selectors);i++){
    if(selectors[i]!=str)
    $(selectors[i]).show();
  }
  $(str).children("div").height(hgtRow);
  $(".menuContent").css({"display":"none"});
  $(str).animate({

    height:hgtRow,
  });
  var i =0;
  while(i<lenght(selectors)&&selectors[i]!=str)
    i++;
  $(closerSelectors[i]).hide();
}
