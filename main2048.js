/**
 * Created by liuyubobobo on 14-4-11.
 * my site: http://www.liuyubobobo.com
 */

var board = new Array();
var score = 0;
$(document).ready(function(){
						   newgame();
						   });
function newgame(){
	//初始化棋盘
		init();
	//在随机两个格子生成数字;
	generateOneNumber();
		generateOneNumber();
	}
	
	
	
	function init(){
for(var i=0;i<4;i++){
for(var j=0;j<4;j++){
	var gridCell=$("#grid-cell-"+i+"-"+j);
	gridCell.css('top',getPosTop(i,j));
		gridCell.css('left',getPosLeft(i,j));

}
}
for(var i=0;i<4;i++){
 board[i]=new Array();
for(var j=0;j<4;j++){
board[i][j]=0;
}
}
updateBoardView();
//当初始化棋盘时候，保证分数刷新;
score=0;
} 

	
	
	
	function 	generateOneNumber(){
	if(nospace(board)){
	return false;
	}
	
	
else{
		//生成一个随机位置，随机生成0到3之间的随机数；
		var randx=parseInt(Math.floor(Math.random()*4));
		var randy=parseInt(Math.floor(Math.random()*4));
		//运用死循环进行判断
		while(true){
			if(board[randx][randy]==0){
			break;}
			else{
			randx=parseInt(Math.floor((Math.random()*4)));
	        randy=parseInt(Math.floor((Math.random()*4)));
			}
		}
			//生成一个随机数,只能生成2或者4
			var randNumber=Math.random()<0.5?2:4;
			board[randx][randy]=randNumber;
			showNumberWithAnimation(randx,randy,randNumber)
		return true;
}
	
	}
	
	
	
	$(document).keydown(function(ev){
								 //兼容性处理;
				                var e=ev||window.event;
								 switch(e.keyCode){
									 //左键
								 case 37:
								 if(moveleft()){
						 setTimeout("generateOneNumber()",210);
								 setTimeout("isgameover()",300);
								 }
								 break;
								 //上键
								 	 case 38:
									  if(moveup()){
								 setTimeout("generateOneNumber()",210);
								 setTimeout("isgameover()",300);
								 }
								 break;
								 //右键
								 	 case 39:
									  if(moveright()){
							 setTimeout("generateOneNumber()",210);
								 setTimeout("isgameover()",300);;
								 }
								 break;
								 //下键
								 	 case 40:
									  if(movedown()){
								 setTimeout("generateOneNumber()",210);
								 setTimeout("isgameover()",300);
								 }
								 break;
								 	 default:
								 break;
								 }
								 });
	
	
	function isgameover(){
		
	if(nospace(board)&&nomove(board)){
	gameover();
	}
	}
	
	
	function gameover(){
	alert("gameover!");
	}
	
	
	
	//向左
	function moveleft(){
		if(!canMoveLeft(board)){
		return false;
		}
		
		else{
			//moveleft
			for(var i=0;i<4;i++){
			for(var j=1;j<4;j++){
			if(board[i][j]!=0){
			for(var k=0;k<j;k++){
			if(board[i][k]==0&&noBlockHorital(i,k,j,board)){
				//move表示从ij移动到ik；
				showMoveAnimation(i,j,i,k);
				board[i][k]=board[i][j];
				board[i][j]=0;
				
			continue;
			}
			else if(board[i][k]==board[i][j]&&noBlockHorital(i,k,j,board)){
			//move
			//add
				showMoveAnimation(i,j,i,k);
				board[i][k]+=board[i][j];
				score+=board[i][k];
				showScore(score);
				board[i][j]=0;
			continue;
			}
			}
			}
			}
			}
		 setTimeout("updateBoardView()",200);
		return true;
		}
		
		
		}
	
	
	
	
	//向上
	function moveup(){
	if(!canMoveUp(board)){
		return false;
		}
		else{
			
		for(var i=1;i<4;i++){
			for(var j=0;j<4;j++){
		if(board[i][j]!=0){
		for(var k=0;k<i;k++){
			
			
		if(board[k][j]==0&&noBlock(j,k,i,board))	{
			//move
				showMoveAnimation(i,j,k,j);
board[k][j]=board[i][j];
board[i][j]=0;
				
			continue;
		}
		
		
		else if(board[k][j]==board[i][j]&&noBlock(j,k,i,board)){
		showMoveAnimation(i,j,k,j);
		board[k][j]+=board[i][j];
		score+=board[k][j];
		showScore(score);
board[i][j]=0;
	continue;			
		}
		}
		}
		}
		}
			 setTimeout("updateBoardView()",200);
		return true;
		}
	}
	
	
	
//向右移动;

function moveright(){
		if(!canMoveRight(board)){
		return false;
		}
		
		else{
		
				for(var i=0;i<4;i++){
					for(var j=0;j<2;j++){
						if(board[i][j]!=0){
							for(var k=j+1;k<4;k++){
				
			if(board[i][k]==0&&noBlockHorital(i,j,k,board)){
				//move
				showMoveAnimation(i,j,i,k);
				board[i][k]=board[i][j];
				board[i][j]=0;
				
			continue;
			}
			else if(board[i][k]==board[i][j]&&noBlockHorital(i,j,k,board)){
			//move
			//add
				showMoveAnimation(i,j,i,k);
				board[i][k]+=board[i][j];
				score+=board[i][k];
				showScore(score);
				board[i][j]=0;
			continue;
			}
			}
			}
			}
			}
		 setTimeout("updateBoardView()",200);
		return true;
		}
		
		
		}
	

	
	
	//向下移动;
	
	function movedown(){
	if(!canMoveDown(board)){
		return false;
		}
		else{
			for(var i=0;i<3;i++){
				for(var j=0;j<4;j++){
					if(board[i][j]!=0){
						for(var k=i+1;k<4;k++){
			
		if(board[k][j]==0&&noBlock(j,i,k,board))	{
			//move
				showMoveAnimation(i,j,k,j);
board[k][j]=board[i][j];
board[i][j]=0;
				
			continue;
		}
		
		
		else if(board[k][j]==board[i][j]&&noBlock(j,i,k,board)){
		showMoveAnimation(i,j,k,j);
		board[k][j]+=board[i][j];
		score+=board[k][j];
		showScore(score);
board[i][j]=0;
	continue;			
		}
		}
		}
		}
		}
			 setTimeout("updateBoardView()",200);
		return true;
		}
	}
	
	
	
	



 function updateBoardView(){
 $(".number-cell").remove();
 for(var i=0;i<4;i++){
 for(var j=0;j<4;j++){
 $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
 var theNumberCell=$('#number-cell-'+i+'-'+j);
 if(board[i][j]==0){
	 theNumberCell.css('height','0px');
	 theNumberCell.css('width','0px');
	 	 theNumberCell.css('top',getPosTop(i,j)+50);
	 theNumberCell.css('left',getPosLeft(i,j)+50);
	 
 }
 else{
 	 theNumberCell.css('height','100px');
	 theNumberCell.css('width','100px');
	 	 theNumberCell.css('top',getPosTop(i,j));
	 theNumberCell.css('left',getPosLeft(i,j));
	 	 theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
		  	 theNumberCell.css('color',getNumberColor(board[i][j]));
			 theNumberCell.text(board[i][j]);
 }
 }
 }
 }


