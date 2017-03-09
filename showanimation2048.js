function showNumberWithAnimation(i,j,randNumber){
 var numberCell=$('#number-cell-'+i+'-'+j);
 numberCell.css("background-color",getNumberBackgroundColor(randNumber));
 numberCell.css("color",getNumberColor(randNumber));
 numberCell.text(randNumber);
 //做自定义动画显示
 numberCell.animate({
					height:"100px",
                    width:"100px",
					top:getPosTop(i,j),
					left:getPosLeft(i,j)
},50);
}



function showMoveAnimation(fromx,fromy,tox,toy){
 var numberCell=$('#number-cell-'+fromx+'-'+fromy);
 numberCell.animate({
					top:getPosTop(tox,toy),
					left:getPosLeft(tox,toy)
					},200);
}

  
function showScore(score){
	if(score==2048){
	alert("you are win!");
	}
	else{
$("#score").text(score);
	}
}

