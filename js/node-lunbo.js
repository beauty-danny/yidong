//函数封装
$(function(){			//开始记得写函数头部
function nodelunbo(){
var lunbo=$('.lunbo')[0];
var left=$('.lunbo-left')[0];
var right=$('.lunbo-right')[0];
var box=$('.img-box')[0];
var imgLit=$('.img-lit')[0];			//类记得加下标
var n=1;
var width=parseInt(getStyle(imgLit,'width'));
var t=setInterval(move,1500);
function move(){
	animate(box,{left:-width},600,function(){
		for(var i=1;i<=n;i++){
		var imgFirst=getFirst(box);
		box.appendChild(imgFirst);
		box.style.left=0+'px';}
	});
}
lunbo.onmouseover=function(){
	clearInterval(t);
}
lunbo.onmouseout=function(){
	t=setInterval(move,2000);
}
right.onclick=function(){
	move();
}
left.onclick=function(){
	for(var i=1;i<=n;i++){
	var imgFirst=getFirst(box);
	var imgLast=getLast(box);
	box.insertBefore(imgLast,imgFirst);
	box.style.left=-width+'px';
	animate(box,{left:0},600);}
}
}
nodelunbo();
//节点轮播


	var imgs=$('.banner-img');
	var lits=$('.circle');
	var left=$('.leftbutton')[0];
	var banner=$('.roll')[0];
	var right=$('.rightbutton')[0];//以类定义的要定义下标
	var width=parseInt(getStyle(banner,'width'));
	var n=0;
	var next=0;
  var flag=true;
	var t=setInterval(move,2000);
	function move(){                    //时间函数
		if(!flag){
      return;
    }
    flag=false;
    next=n+1;
		if(next>=imgs.length){
			next=0;
		}
		imgs[next].style.left=width+'px';  //强制转化下一张在右侧等待
		animate(imgs[n],{left:-width},600);
		animate(imgs[next],{left:0},600,function(){flag=true;});
    lits[n].style.background='#ccc';
    lits[next].style.background='red';
		n=next;
	}
  banner.onmouseover=function(){      //鼠标进入图片静止
    clearInterval(t);
  }
  banner.onmouseout=function(){       //鼠标移出图片轮播
    t=setInterval(move,2000);
  }
  right.onclick=function(){           //右击按钮，图片左移
    move();
  }
  left.onclick=function(){            //左击按钮，图片右移
    if(!flag){
      return;
    }
    flag=true;
    next=n-1;
    if(next<0){
      next=imgs.length-1;
    }
    imgs[next].style.left=-width+'px';  //强制转化下一张在左侧等待
    animate(imgs[n],{left:width},600);
    animate(imgs[next],{left:0},600,function(){flag=true;});
    lits[n].style.background='#ccc';
    lits[next].style.background='red';
    n=next;
  }
  //点击事件
  for(i=0;i<lits.length;i++){           //完成点击哪一张，那一张显示
    lits[i].index=i;
    lits[i].onclick=function(){
      if(this.index>n){                 //点击右侧，左移
        if(!flag){
          return;
        }
        flag=true;
        imgs[this.index].style.left=width+'px';
        animate(imgs[n],{left:-width},600);
        animate(imgs[this.index],{left:0},600,function(){flag=true;});
        lits[n].style.background='#ccc';
        lits[this.index].style.background='red';
        n=this.index;
      }else if(this.index<n){             //点击左侧，右移
        if(!flag){
          return;
        }
        flag=true;
        imgs[this.index].style.left=-width+'px';
        animate(imgs[n],{left:width},600);
        animate(imgs[this.index],{left:0},600,function(){flag=true;});
        lits[n].style.background='#ccc';
        lits[this.index].style.background='red';
        n=this.index;
      }
    }
  }

  
//标题下拉框
  var biaoti_li=$('.biaoti_li');
  for(var i=0;i<biaoti_li.length;i++){
    if(i==0){
        continue;
      }
    hover(biaoti_li[i],function(){
      var height=this.offsetHeight;
      var moveshop_down=$('.moveshop_down',this)[0];
      this.style.background='ccc';
      moveshop_down.style.display='block'
    },function(){
      var that=this;
      var moveshop_down=$('.moveshop_down',this)[0];
      moveshop_down.style.display='none'
      that.style.background='#E4E4E4';
    })
  }
//第一栏下拉框
var down=$('.down')[0];
// console.log(down);
hover(down,function(){
  var down_la=$('.down_la',this)[0];
  console.log(down_la);
  animate(down_la,{height:120});
  },function(){
    var that=this;
    var down_la=$('.down_la',this)[0];
    animate(down_la,{height:0});
    that.style.background='#f6f6f6';
  }
)
//tu_下拉框
var code_two=$('.code_two')[0];
// console.log(down);
hover(code_two,function(){
  var code_down=$('.code_down',this)[0];
  // console.log(down_la);
  animate(code_down,{height:110});
  },function(){
    var that=this;
    var code_down=$('.code_down',this)[0];
    animate(code_down,{height:0});
    that.style.background='#f6f6f6';
  }
)
//多选框
  var city=$('.city')[0];
  var city_jt=$('.city-jt')[0];
  var body=$('body')[0]
  body.onclick=function(e){
    var ev=e||window.event;
    var obj=ev.target||ev.srcElement;
    if(obj.className=="city-ty"||obj.className=="city-jt"||obj.className=="city-c"||obj.className=="city-l"){
      city_jt.style.display='block';
      return;
    }
    city_jt.style.display='none';
    
  }
//文字轮播
  var ggg=$('.dis_gg')[0];
  var ggf=$(".gg-f");
  console.log(ggf.length)
  var leftg=$('.disp6')[0];
  console.log(leftg)
  var rightg=$('.disp7')[0];
  console.log(rightg)
  var ng=0;
  ggf[0].style.display='block';
  leftg.onclick=function(){
    ng--
    if(ng<0){
      ng=ggf.length-1
    }
    for(var i=0;i<ggf.length;i++){
       ggf[i].style.display='none';
       console.log(ggf[i])
    }
     ggf[ng].style.display='block';
  }
  rightg.onclick=function(){
    ng++
    
    if(ng>ggf.length-1){
      ng=0
    }

    for(var i=0;i<ggf.length;i++){
       ggf[i].style.display='none';
    }
     ggf[ng].style.display='block';
  }
  



})




