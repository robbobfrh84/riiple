var svgElement = "http://www.w3.org/2000/svg";
var outa=[]; var out = 58; //30-to-86(inside), middle = 58. Location inside/outside of track.
var hgt = 5; //represneds the 3D height of object.
var units = 36;
var gapa=[]; var gap = (365/units);
var clr=shuffle([1,2,3,4,5,6,1,2,3,4,5,6,1,2,3,4,5,6,1,2,3,4,5,6,1,2,3,4,5,6,1,2,3,4,5,6]);

for (var i=0; i<units; i++){
  outa[i] = random(30,86);
  gapa[i] = i*gap;
  createEl("circle",true,[["id","unitS"+i],["cx",250+hgt],["cy",outa[i]+hgt],["r",8],["opacity",0.5]
    ,["filter","url(#blur1)"],["transform","rotate("+gapa[i]+","+(250+hgt)+","+(220+hgt)+")"]]);
}
for (var i=0; i<units; i++){
  createEl("circle",true,[["id","unit"+i],["cx",250],["cy",outa[i]],["r",8]
    ,["fill","url(#grad"+(clr[i])+")"],["transform","rotate("+gapa[i]+",250,220)"]]);
}
// this function cleans up and simplifies creating element attributes./////////
function createEl(type,reveal,att){
    var newObj = document.createElementNS(svgElement, type);
    for (var i=0; i<att.length; i++){
      newObj.setAttributeNS(null, att[i][0],att[i][1]);
    }
    if (reveal) {document.getElementById("mainSVG").appendChild(newObj);}
  }
//Time Control/////////////////////////////////////////////////////////////////
var deg=0;
var pause = false;
(function draw() {
  if (!pause){
    locUpdate("unitS",hgt,deg); locUpdate("unit",0,deg);
  }
  deg+=1;
  if(true){ setTimeout(draw, 40); }})(); // Redraw

//Updates all Unit Locations
function locUpdate(Id,hgt,deg) {
  for (var i=0; i<units; i++){
    document.getElementById(Id+i).setAttributeNS(null,"transform"
      ,"rotate("+(deg+gapa[i])+","+(250+hgt)+","+(220+hgt)+")");
  }
}
//Random generating functions...///////////////////////////////////////////////
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);}
function shuffle(o){
    for(var j,x,i = o.length; i; j=Math.floor(Math.random()*i), x=o[--i], o[i] = o[j], o[j] = x);
    return o;}

///////////////////////////////////////////////////////////////////////////////
// IN GAME ACTION /////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

var reg = [0,72,144,216,288];
function newGame(){
  if (pause === false) {
    pause = true;
    clearAllUnits()
    var reg = shuffle([0,72,144,216,288]);
    // var reg = [0,288,144,216,72];

    //make this 5 loops. calls function that rand1-6
    //CHNG groupSize to j.
    for (var j = 0;j<5;j++){
      var g = getGroup(j+1,reg,j);
      // var groupSize = j+3;
      cnt = 0;
      for (var i=0; i<36; i++) {
        var unit = document.getElementById("unit"+i).getAttribute("fill")
        if (unit === "url(#grad"+(j+1)+")" && cnt < j+1){
          gapa[i] = g[cnt][0];
          updateEl("unitS"+i,[["display","normal"],["cy",g[cnt][1]+hgt]
            ,["transform","rotate("+gapa[i]+","+(250+hgt)+","+(220+hgt)+")"]]);
          updateEl("unit"+i,[["display","normal"],["cy",g[cnt][1]]
            ,["transform","rotate("+gapa[i]+",250,220)"]]);
          cnt+=1;
    } } }
  } else { pause = false; deg=0;}
}

var g = [];
function getGroup(groupSize,reg,x){
  g[1] = [[0+reg[x],58]];
  g[2] = [[355.5+reg[x],58],[4.5+reg[x],58]];
  g[3] = [[0+reg[x],47],[355+reg[x],68],[5+reg[x],68]];
  g[4] = [[353+reg[x],46],[2+reg[x],47],[357.5+reg[x],68],[7.5+reg[x],68]];
  g[5] = [[355.5+reg[x],47],[4.5+reg[x],47],[350+reg[x],68],[0+reg[x],68],[10+reg[x],68]];
  g[6] = [[353+reg[x],47],[2+reg[x],47],[10.5+reg[x],46],[347.5+reg[x],68],[357.5+reg[x],68],[7.5+reg[x],68]];
  return g[groupSize];
}

function updateEl(Id, att) {
  for (var i=0; i<att.length; i++){
    document.getElementById(Id).setAttributeNS(null, att[i][0],att[i][1]);
  }
}

function clearAllUnits(){
  for (var i=0; i<units; i++) {
    updateEl("unit"+i,[["display","none"]]); updateEl("unitS"+i,[["display","none"]]);
  }
}