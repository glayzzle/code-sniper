<?php

// it's OK
function foo($a) {
  if($a < 1) {
    return true;
  }
  if($a < 2) {
    return true;
  }
  if($a < 3) {
    return true;
  }
  if($a < 4) {
    return true;
  }
  if($a < 5) {
    return true;
  }
}

// it's bad
function bar($a) {
  switch($a) {
    case 1: break;
    case 2: break;
    case 3: break;
    case 4: break;
    default: break;
  }
  try {
    $a = 1;
  } catch(bar $ex6) { }
  } catch(bar $ex7) { }
  } catch(bar $ex8) { }
  if($a < 9) {
    return false;
  } elseif($a < 10) {
    return false;
  } else {
    return false;
  }
}
