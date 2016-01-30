var svgElement = "http://www.w3.org/2000/svg";
var out = 58; //30-to-86(inside), middle = 58. Location inside/outside of track.
var hgt = 5; //represneds the 3D height of object.
var units = 36;
var gap = (365/units);
var out = [];

for (var i=0; i<units; i++){
  out[i] = random(30,86);
  createEl(true, [["id","unitS"+i],["cx",250+hgt],["cy",out[i]+hgt],["r",8],["opacity",0.5]
    ,["filter","url(#blur1)"],["transform","rotate("+(i*gap)+","+(250+hgt)+","+(220+hgt)+")"]]);
}
for (var i=0; i<units; i++){
  createEl(true, [["id","unit"+i],["cx",250],["cy",out[i]],["r",8]
    ,["fill","url(#grad1)"],["transform","rotate("+(i*gap)+",250,220)"]]);
}
// this function cleans up and simplifies creating element attributes.
function createEl(reveal,att){
    var newObj = document.createElementNS(svgElement, "circle");
    for (var i=0; i<att.length; i++){
      newObj.setAttributeNS(null, att[i][0],att[i][1]);
    }
    if (reveal) {document.getElementById("mainSVG").appendChild(newObj);}
  }

//Time Control
var deg=0;
(function draw() {
  locUpdate("unitS",hgt,deg); locUpdate("unit",0,deg);
  deg+=1;
  if(true){ setTimeout(draw, 40); }})(); // Redraw

//Updates all Unit Locations ???change this to attribute change???
function locUpdate(Id,hgt,deg) {
  for (var i=0; i<units; i++){
    document.getElementById(Id+i).setAttributeNS(null,"transform"
      ,"rotate("+(deg+(i*gap))+","+(250+hgt)+","+(220+hgt)+")");
  }
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

////////////////////
// IN GAME ACTION //
////////////////////

function newGame(){
  clearAllUnits()
  updateEl("unit"+0,[["display","normal"]]);
  updateEl("unitS"+0,[["display","normal"]]);
}

function updateEl(Id, att) {
  var obj = document.getElementById(Id);
  for (var i=0; i<att.length; i++){
    obj.setAttributeNS(null, att[i][0],att[i][1]);
  }
}

function clearAllUnits(){
  for (var i=0; i<units; i++) {
    updateEl("unit"+i,[["display","none"]]); updateEl("unitS"+i,[["display","none"]]);
  }
}
