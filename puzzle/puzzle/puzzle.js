var time=0;
var pause=true;
var set_timer;
var d=new Array(10);
var d_direct=new Array(
		[0],
		[2,4],
		[1,3,5],
		[2,6],
		[1,5,7],
		[2,4,6,8],
		[3,5,9],
		[4,8],
		[5,7,9],
		[6,8]
	);
var d_posXY=new Array(
		[0],
		[0,0],
		[150,0],
		[300,0],
		[0,150],
		[150,150],
		[300,150],
		[0,300],
		[150,300],
		[300,300]
	);
d[1]=1;d[2]=2;d[3]=3;d[4]=4;d[5]=5;d[6]=6;d[7]=7;d[8]=8;d[9]=0;
function move(id){
	var i=1;
	for(i=1; i<10; ++i){
		if( d[i] == id )
			break;
	}
	var target_d=0;
	target_d=whereCanTo(i);
	if( target_d != 0){
		d[i]=0;
		d[target_d]=id;
		document.getElementById("d"+id).style.left=d_posXY[target_d][0]+"px";
		document.getElementById("d"+id).style.top=d_posXY[target_d][1]+"px";
	}
	var finish_flag=true;
	for(var k=1; k<9; ++k){
		if( d[k] != k){
			finish_flag=false;
			break;
		}
	}
	if(finish_flag==true){
		if(!pause)
			start();
		alert("恭喜你，完成了游戏");
	}
}
function whereCanTo(cur_div){
	var j=0;
	var move_flag=false;
	for(j=0; j<d_direct[cur_div].length; ++j){
		if( d[ d_direct[cur_div][j] ] == 0 ){
			move_flag=true;
			break;
		}
	}
	if(move_flag == true){
		return d_direct[cur_div][j];
	}else{
		return 0;
	}
}
function timer(){
	time+=1;
	var min=parseInt(time/60);
	var sec=time%60;
	document.getElementById("timer").innerHTML=min+"分"+sec+"秒";
}
function start(){
	if(pause){
		document.getElementById("start").innerHTML="暂停";
		pause=false;
		set_timer=setInterval(timer,1000);
	}else{
		document.getElementById("start").innerHTML="开始";
		pause=true;
		clearInterval(set_timer);
	}
}
function reset(){
	time=0;
	random_d();
	if(pause)
		start();
}
function random_d(){
	for(var i=9; i>1; --i){
		var to=parseInt(Math.random()*(i-1)+1);
		if(d[i]!=0){
			document.getElementById("d"+d[i]).style.left=d_posXY[to][0]+"px";
			document.getElementById("d"+d[i]).style.top=d_posXY[to][1]+"px";
		}
		if(d[to]!=0){
			document.getElementById("d"+d[to]).style.left=d_posXY[i][0]+"px";
			document.getElementById("d"+d[to]).style.top=d_posXY[i][1]+"px";
		}
		var tem=d[to];
		d[to]=d[i];
		d[i]=tem;
	}
}
window.onload=function(){
	reset();
}