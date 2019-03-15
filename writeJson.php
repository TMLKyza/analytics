<?php
$str = $_GET['json'];
$filename="data/data.json";
$redirectLocation = $_SERVER['SERVER_NAME']."/try";
//echo $json.'<br>'.$redirectLocation."<br>";
if(is_writable($filename)){
  if($file = fopen($filename,"w+")){
    $json = (array)json_decode($str,true);
    for ($i=0; $i < count($json['data']) ; $i++) {
      for ($j=0; $j < count($json['data']); $j++) {
        if(strtotime($json['data'][$i]['day'])<strtotime($json['data'][$j]['day'])){
          $dataSwap=$json['data'][$i];
          $anaSwap=$json['analyzedData'][$i];
          $json['analyzedData'][$i]=$json['analyzedData'][$j];
          $json['data'][$i]=$json['data'][$j];
          $json['data'][$j]=$dataSwap;
          $json['analyzedData'][$j]=$anaSwap;
        }
      }
    }
    if(fwrite($file,json_encode($json))){
      echo "ez";
      header("Location:../index.php");
      fclose($file);
    }else{
      echo "ripwrite";
      fclose($file);
    }
    }else {
      echo "ripfile";
    }
}else{
  echo "not writable<br>";
}

?>
