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
  deg+=0.5;
  if(true){ setTimeout(draw, 50); }})(); // Redraw

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

var team = [];
function newGame(){
  if (pause === false) {
    goalNumber();
    var gcnt = 0; var cnt = 0; // pause = true;
    var reg = shuffle([0,72,144,216,288]);
    clearAllUnits()
    for (var j=0; j<5; j++){
      team[j] = random(1,6);
      var g = getGroup(team[j],reg,j);
      for (var i=0; i<team[j]; i++) {
        gapa[i+gcnt] = g[cnt][0];
        updateEl("unitS"+(i+gcnt),[["cy",g[cnt][1]+hgt],["display","normal"]
          ,["transform","rotate("+(g[cnt][0]+deg)+","+(250+hgt)+","+(220+hgt)+")"]]);
        updateEl("unit"+(i+gcnt),[["fill","url(#grad"+(team[j])+")"],["display","normal"]
          ,["cy",g[cnt][1]],["transform","rotate("+(g[cnt][0]+deg)+",250,220)"]]);
        cnt+=1;
      }
    gcnt += cnt; cnt = 0;
    }
  } else { pause = false; }//DO WE NEED DEG=0?
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

function goalNumber(){
  createEl("circle",true,[["id","goal"+0],["cx",235],["cy",210],["r",10]
    ,["fill","url(#grad"+7+")"]]);
  createEl("circle",true,[["id","goal"+0],["cx",265],["cy",210],["r",10]
    ,["fill","url(#grad"+7+")"]]);
  createEl("circle",true,[["id","goal"+0],["cx",250],["cy",235],["r",10]
    ,["fill","url(#grad"+7+")"]]);


}
