var grid={
"A":{"A":"X","B":"R","C":"F","D":"F","E":"E","I":"F","J":"A","M":"E","P":"F","V":"F","L":"A","R":"C","S":"A","T":"F","W":"A","Z":"S"},
"B":{"A":"R","B":"X","C":"F","D":"F","E":"E","I":"F","J":"A","M":"E","P":"F","V":"A","L":"A","R":"F","S":"A","T":"F","W":"A","Z":"S"},
"C":{"A":"F","B":"F","C":"X","D":"F","E":"A","I":"A","J":"C","M":"E","P":"A","V":"A","L":"F","R":"F","S":"A","T":"F","W":"F","Z":"F"},
"D":{"A":"F","B":"F","C":"F","D":"X","E":"A","I":"A","J":"F","M":"C","P":"S","V":"S","L":"A","R":"F","S":"F","T":"F","W":"A","Z":"S"},
"E":{"A":"E","B":"C","C":"A","D":"A","E":"X","I":"R","J":"E","M":"F","P":"A","V":"S","L":"E","R":"C","S":"A","T":"F","W":"E","Z":"A"},
"I":{"A":"F","B":"F","C":"A","D":"A","E":"R","I":"X","J":"F","M":"E","P":"A","V":"A","L":"F","R":"F","S":"S","T":"F","W":"A","Z":"S"},
"J":{"A":"A","B":"A","C":"A","D":"F","E":"E","I":"F","J":"X","M":"E","P":"F","V":"F","L":"R","R":"F","S":"E","T":"C","W":"F","Z":"S"},
"M":{"A":"E","B":"E","C":"E","D":"S","E":"F","I":"E","J":"E","M":"X","P":"S","V":"S","L":"E","R":"C","S":"F","T":"C","W":"A","Z":"S"},
"P":{"A":"F","B":"F","C":"A","D":"S","E":"A","I":"A","J":"F","M":"S","P":"X","V":"C","L":"F","R":"F","S":"A","T":"F","W":"F","Z":"S"},
"V":{"A":"F","B":"A","C":"A","D":"S","E":"S","I":"A","J":"F","M":"S","P":"C","V":"X","L":"F","R":"F","S":"A","T":"F","W":"F","Z":"S"},
"L":{"A":"A","B":"A","C":"F","D":"A","E":"E","I":"F","J":"R","M":"E","P":"F","V":"F","L":"X","R":"F","S":"A","T":"F","W":"F","Z":"S"},
"R":{"A":"F","B":"F","C":"F","D":"F","E":"F","I":"F","J":"F","M":"F","P":"F","V":"F","L":"F","R":"X","S":"F","T":"F","W":"F","Z":"A"},
"S":{"A":"A","B":"A","C":"A","D":"F","E":"A","I":"S","J":"E","M":"F","P":"A","V":"A","L":"A","R":"F","S":"X","T":"F","W":"F","Z":"R"},
"T":{"A":"F","B":"F","C":"F","D":"F","E":"F","I":"F","J":"F","M":"F","P":"F","V":"F","L":"F","R":"F","S":"F","T":"X","W":"F","Z":"A"},
"W":{"A":"C","B":"A","C":"F","D":"A","E":"E","I":"A","J":"F","M":"A","P":"F","V":"F","L":"F","R":"F","S":"F","T":"F","W":"X","Z":"S"},
"Z":{"A":"S","B":"S","C":"F","D":"S","E":"A","I":"S","J":"S","M":"S","P":"S","V":"S","L":"S","R":"A","S":"R","T":"A","W":"S","Z":"X"}
};
var rel =[
["A","B"],
["E","I"],
["J","L"],
["Z","S"]
];
var cru =[
["A","R"],
["C","J"],
["D","M"],
["E","B"],
["E","R"],
["J","T"],
["M","R"],
["M","T"],
["P","V"],
["V","P"],
["W","A"]
];

function matchPair(a, b) {
	var a2b = grid[a][b];
	var b2a = grid[b][a];
	if(a2b===b2a) {
			 if (a2b === "F") return 2;
		else if (a2b === "A") return 1;
		else if (a2b === "E") return -4;
		else if (a2b === "C") return 4;
		else if (a2b === "R") return 3;
	} else if (a2b === "C" || b2a === "C") return 1;
	
	return 0;
}

function mod_relationship(unit) {
	var mod = 0
	
	for(var v=0; v<4; v++) {
		var perA = rel[v][0];
		var perB = rel[v][1];
		var posA = unit.indexOf(perA);
		var posB = unit.indexOf(perB);
		var dist = Math.abs(posB-posA);
		var dir = (posB-posA)/dist;
		if (dist>1) {
			var isCrush = false;
			for(var u=posA+dir; u!=posB && !isCrush; u+=dir) {
				var perN = unit.charAt(u);
				var n2a = grid[perN][perA];
				var n2b = grid[perN][perB];
				if(n2a == "C" || n2b== "C") isCrush = true;
			}
			if(isCrush) mod -= 3;
			else		mod -= 2;
		}
	}
	return mod;
}

function mod_crush(unit) {
	var mod = 0;
	
	for(var t=0; t<11; t++) {
		var perA = cru[t][0];
		var perB = cru[t][1];
		var posA = unit.indexOf(perA);
		var posB = unit.indexOf(perB);
		var dist = Math.abs(posB-posA);
		if (dist>1) {
			var posR = -1;
			for(var s=0; s<4; s++) {
				if(rel[s][0]==perB)
					posR = unit.indexOf(rel[s][1]);
				else if(rel[s][1]==perB)
					posR = unit.indexOf(rel[s][0]);
			}
			if(posR>-1){
					 if(posA>posR && posR<posB) mod -= 2;
				else if(posA<posR && posR<posB) mod -= 2;
			}	
		}
	}
	
	return mod;
}

function unknown(unit) {
	var mod = 0;
	var len = unit.length;
	
	if(grid[unit[0]][unit[1]]=="S")
		mod -= 1;
	if(grid[unit[len-2]][unit[len-1]]=="S")
		mod -= 1;
	for (var w=1; w<len-1; w++){
		if(grid[unit[w]][unit[w-1]]=="S" && grid[unit[w]][unit[w+1]] =="S")
			mod -= 1;
	}
	
	return mod;
}

function strength(unit) {
	var score = 0;
	var unit_array = unit.split("");
	var unit_length = unit.length;
	for(var i=0; i<unit_length-1; i++) {
		score += matchPair(unit_array[i], unit_array[i+1]);
	}
	
	score += mod_relationship(unit);
	score += mod_crush(unit);
	score += unknown(unit_array);
	
	return score;
}

function breed(a,b) {
	var a = a.split("");
	var a_length = a.length;
	var b = b.split("");
	var split = 8;
	var newA = a.slice(0,split).join("");
	var newB = b.slice(0,split).join("");
	
	for(var i=0; i<a_length; i++) {
		if(newA.indexOf(b[i])<0) newA += b[i];
		if(newB.indexOf(a[i])<0) newB += a[i];
	}
	
	return [newA, newB];
}

var result_set = {};
//var strands = [];

function sequence(strands) {
	for(var i=0; i<strands.length;i++) {
		result_set[strands[i]] = strength(strands[i]);
	}
	
	for(var i=0; i<strands.length;i++) {
		for(var j=strands.length-1; j>i;j--) {
			var new_strands = breed(strands[i], strands[j]);
			result_set[new_strands[0]] = strength(new_strands[0]);
			result_set[new_strands[1]] = strength(new_strands[1]);
		}
	}
}

function start() {
	console.log("starting");
	new Request.JSON({
		url: "/get",
		onComplete: function(strands){
			result_set = {};
			var start = new Date().getTime();
			sequence(strands);
			var end = new Date().getTime();
			$('time').innerHTML = (end - start);
			//$('results').innerHTML = result_set.toSource();
		}}).get();
}

function type_count() {
	var str = "ABCDEIJMPVLRSTWZ";
	var arr = str.split("");
	var q = {};
	for(var i=0; i<16; i++) {
		for(var j=0; j<16; j++) {
			if(arr[i] != arr[j]) {
				var v = grid[arr[i]][arr[j]];
				if(!q[v]) q[v] = 0;
				q[v] += 1;
			}
		}
	}
	console.log(q.toSource());
}