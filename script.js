//================================= declaration ==========================
var INT_MAX = 2147483647;
var nodes = new Array();
var nb_nodes = 6 ;
var matrix = [
  [0,10,11,12,13,14],
  [10,0,15,16,17,18],
  [11,15,0,19,20,21],
  [12,16,19,0,22,23],
  [13,17,20,22,0,24],
  [14,18,21,23,24,0],

  ];
//==================================   initialisation   =================
var rootNode;
var reached = new Array();
var unreached = new Array();
var tree = new Array(nb_nodes);

for(var i = 0 ; i<nb_nodes ; i++){
    nodes[i]=i;
}
for(var i = 0 ; i<nb_nodes ; i++){
    tree[i]=new Array();
}

for(var i = 0 ; i<nb_nodes ; i++){
    unreached[i]=i;
}
//==================================   VAR result   =================

var path = new Array();
var cost = 0;


//======================================== SOLUTION ======================
function prim(){
     var max ;
     var record ;
     var parent ;
     var indexparent ;
     var newnode;
     var indexnewnode;
     rootNode = unreached[0];
     reached.push(unreached[0]);
     unreached.splice(0,1);

     while(unreached.length >0){
         max = INT_MAX;
        for(var i=0 ; i<reached.length ; i++){
            for(var j=0 ; j<unreached.length ; j++){
                record = matrix[reached[i]][unreached[j]];
                if(record < max ){max = record;indexparent=i;indexnewnode=j;parent=reached[i];newnode=unreached[j]; }
            }
        }
     reached.push(unreached[indexnewnode]);
     unreached.splice(indexnewnode,1);
     tree[parent].push(newnode);
     }
}

function preodre(index){
  path.push(index);

  for(var i=0 ; i<(tree[index]).length ; i++){
      preodre(tree[index][i]);
  }

}

function sol(){
    var src ;
    var dest ;
    prim();
    preodre(rootNode);
    path.push(rootNode); // to create the  cycle
    for(var i =0 ; i<path.length-1;i++){
        src = path[i];
        dest = path[i+1];
      cost = cost + matrix[src][dest];
    }

}


//================================= Test ==========================
sol();


console.log(path);
console.log(cost);
