function intDiv(a,b) {
  var result = a/b;
  if(result>=0)
  return Math.floor(result);
  else
  return Math.ceil(result);
}


function gcd(a,b){
  var t;
  while (b != 0){
    [ a , b ] = [ b , a % b ]
  }
  return a;
}

function xgcd(a, b){
    var r, s, t, old_r, old_s, old_t, quotient;
    [old_r, r] = [a, b];
    [old_s, s] = [1, 0];
    [old_t, t] = [0, 1];

    while (r != 0) {
        quotient = intDiv(old_r,r);
        [old_r, r] = [r, old_r - quotient * r];
        [old_s, s] = [s, old_s - quotient * s];
        [old_t, t] = [t, old_t - quotient * t];
      }
    return [old_r,old_s,old_t] //gcd,x,y such that ax+by=gcd
}

function xgcd3(a,b,c){
  s1 = xgcd(b,c)
  s2 = xgcd(a,s1[0])
  return [s2[0],s2[1],s2[2]*s1[1],s2[2]*s1[2]] // gcd,m,n,o such that am + bn + co = gcd

}
