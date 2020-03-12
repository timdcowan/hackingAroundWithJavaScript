var rowNumbers = 4;
var colNumbers = 8;
var total = 1;

function addRow(){
  var table = document.getElementById("myTable");
  var row = table.insertRow(rowNumbers++);
  for(let i=0; i<colNumbers; i++){
	  var cell = row.insertCell(i);
	  cell.innerHTML = "-";
	  if(i == colNumbers -1){
		cell.contentEditable = false;
	  }
  }
}

function addCol(){
  var table = document.getElementById("myTable");
  for(let i=0; i<table.rows.length; i++){
	  var row = table.rows[i];
	  var cell = row.insertCell(colNumbers-1);
	  if(i == 0){ 
		cell.innerHTML = `Assignment ${colNumbers-2}`; 
		cell.style.fontWeight = "bold" ;
	  }
	  else {
		cell.innerHTML = "-";
	  }
  }
  colNumbers++;
}

function displayPercentages(){
	
	var table = document.getElementById("myTable");

	for(let i=1; i<rowNumbers; i++){
		var count = 0;
		let j;
		for(j=2; j<colNumbers-1; j++){
			var value = table.rows[i].cells[j].innerHTML;
			var num = parseInt(value);
			if(!isNaN(num)){
				count = count + num;
			}
			if(isNaN(num) || num<0 || num>100){
				if(value != "-" ){
					table.rows[i].cells[j].innerHTML = "-";
				}
			}
			if(value == "-"){
				table.rows[i].cells[j].style.backgroundColor = "yellow";
			}
			
			
			 
		}
		if(total==1){
			table.rows[0].cells[colNumbers-1].innerHTML = "Percentage Grade";
			table.rows[i].cells[j].innerHTML = `${Math.round(count/(colNumbers-3))}%`;
		} else if(total==2){
			table.rows[i].cells[j].innerHTML = `${Math.round(count/(colNumbers-3))}%`;
			displayGrade();
		} else{
			table.rows[i].cells[j].innerHTML = `${Math.round(count/(colNumbers-3))}%`;
			displayScale();
		}
		
	}
		
}

function toggleAverage(){
	total++;
	total = total > 3 ? 1 : total;
	if(total == 1){
		displayPercentages();
	} else if(total == 2){
		displayGrade();
	} else {
		displayScale();
	}
}

function displayGrade(){
	
	var table = document.getElementById("myTable");
	table.rows[0].cells[colNumbers-1].innerHTML = "Letter Grade";
	for(let i=1; i<rowNumbers; i++){
		var value = parseInt(table.rows[i].cells[colNumbers-1].innerHTML);
		if(value >= 93) table.rows[i].cells[colNumbers-1].innerHTML = "A";
		else if(value >= 90) table.rows[i].cells[colNumbers-1].innerHTML = "A-";
		else if(value >= 87) table.rows[i].cells[colNumbers-1].innerHTML = "B+";
		else if(value >= 83) table.rows[i].cells[colNumbers-1].innerHTML = "B";
		else if(value >= 80) table.rows[i].cells[colNumbers-1].innerHTML = "B-";
		else if(value >= 77) table.rows[i].cells[colNumbers-1].innerHTML = "C+";
		else if(value >= 73) table.rows[i].cells[colNumbers-1].innerHTML = "C";
		else if(value >= 70) table.rows[i].cells[colNumbers-1].innerHTML = "C-";
		else if(value >= 67) table.rows[i].cells[colNumbers-1].innerHTML = "D+";
		else if(value >= 63) table.rows[i].cells[colNumbers-1].innerHTML = "D";
		else if(value >= 60) table.rows[i].cells[colNumbers-1].innerHTML = "D-";
		else table.rows[i].cells[colNumbers-1].innerHTML = "F";
	}
}

function displayScale(){
	
	var table = document.getElementById("myTable");
	table.rows[0].cells[colNumbers-1].innerHTML = "4.0 Scale";
	for(let i=1; i<rowNumbers; i++){
		var value = parseInt(table.rows[i].cells[colNumbers-1].innerHTML);
		if(value >= 93) table.rows[i].cells[colNumbers-1].innerHTML = "4.0";
		else if(value >= 90) table.rows[i].cells[colNumbers-1].innerHTML = "3.7";
		else if(value >= 87) table.rows[i].cells[colNumbers-1].innerHTML = "3.3";
		else if(value >= 83) table.rows[i].cells[colNumbers-1].innerHTML = "3.0";
		else if(value >= 80) table.rows[i].cells[colNumbers-1].innerHTML = "2.7";
		else if(value >= 77) table.rows[i].cells[colNumbers-1].innerHTML = "2.3";
		else if(value >= 73) table.rows[i].cells[colNumbers-1].innerHTML = "2.0";
		else if(value >= 70) table.rows[i].cells[colNumbers-1].innerHTML = "1.7";
		else if(value >= 67) table.rows[i].cells[colNumbers-1].innerHTML = "1.3";
		else if(value >= 63) table.rows[i].cells[colNumbers-1].innerHTML = "1.0";
		else if(value >= 60) table.rows[i].cells[colNumbers-1].innerHTML = "0.7";
		else table.rows[i].cells[colNumbers-1].innerHTML = "0.0";
	}
}





	
