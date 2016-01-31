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
// this function cleans up and simplifies creating element attributes.
function createEl(type,reveal,att){
    var newObj = document.createElementNS(svgElement, type);
    for (var i=0; i<att.length; i++){
      newObj.setAttributeNS(null, att[i][0],att[i][1]);
    }
    if (reveal) {document.getElementById("mainSVG").appendChild(newObj);}
  }
//Time Control
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
//Random generating functions...
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);}
function shuffle(o){
    for(var j,x,i = o.length; i; j=Math.floor(Math.random()*i), x=o[--i], o[i] = o[j], o[j] = x);
    return o;}

////////////////////
// IN GAME ACTION //
////////////////////

function newGame(){
  clearAllUnits()
  var group5 = [[350, 68]];
  var groupSize = 5;
  cnt = 0;
  for (var i=0; i<36; i++) {
    var unit = document.getElementById("unit"+i).getAttribute("fill")
    if (unit === "url(#grad2)" && cnt < groupSize){
      gapa[i] = cnt*10;
      updateEl("unitS"+i,[["display","normal"],["cy",out+hgt]
        ,["transform","rotate("+gapa[i]+",250,220)"]]);
      updateEl("unit"+i,[["display","normal"],["cy",out]
        ,["transform","rotate("+gapa[i]+",250,220)"]]);
      console.log(document.getElementById("unit"+i).getAttribute("transform"));
      cnt+=1;
    }
  }
  if (pause === false) {
    pause = true; gap=1;
  } else { pause = false;}
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
