// 1.获得同类名兼容函数
function getClass(classname,obj){
	// 是否输入obj,如果输入obj=输入的值，否则为document
	var obj=obj||document;
	// 判断是否支持getElementsByClassName
	if(obj.getElementsByClassName){
		// 支持则返回函数的返回值
		return obj.getElementsByClassName(classname);
	}else{
		// 定义一个空数组
		var arr=[];
		// 通过标签名获取所有对象，赋值给doms
		var doms=obj.getElementsByTagName('*');
		// 遍历doms
		for(var i=0;i<doms.length;i++){
			// 如果数组中有多个类名，运行下面函数，为真把值添加到空数组中
			if(moreClass(classname,doms[i])){
				arr.push(doms[i]);
			}
		}
		return arr;
	}
}
// 判断一个对象的多个类名中是否有传入的classname
function moreClass(classname,obj){
	// 定义字符串classstr，并把对象的类名赋值给classstr
	var classStr=obj.className;
	// 定义数组classArr，并把classstr用空格分割成数组
	var classArr=classStr.split(' ');
	// 遍历数组
	for(var i=0;i<classStr.length;i++){
		// 如果数组中有一个值=传入的classname,返回true
		if(classArr[i]==classname){
			return true;
		}
	}
	// 否则返回false
	return false;
}

// 2.设置和获取对象开始标签和结束标签的文本兼容函数
function getText(obj,val){
	// 判断val是否设置，没有设置执行if设置
	if(val!=undefined){
		if(obj.innerText){
			obj.innerText=val;
		}else{
			obj.textContent=val;
		}
	}else{
		// 设置了执行else获取
		if(obj.innerText){
			// 目前都支持，防止低版本不支持
			return obj.innerText;
		}else{
			// IE低版本不支持
			return obj.textContent;
		}
	}
		
}


// 3.样式
function getStyle(obj,style){
	// ie支持
	if(obj.currentStyle){
		return obj.currentStyle[style];
	// FF支持
	}else if(getComputedStyle(obj,null)){
		return getComputedStyle(obj,null)[style]
	}
}

// 4.通过函数，类名，标签名，ID名获取元素
function $(val,obj){
 	if(typeof val=='string'){
			// 初始化val
		var obj=obj||document;
		// 用''替换所有的'  '
		val=val.replace(/^\s*|\s*$/g,'')
		// 获取第0个字符判断是ID，类还是标签
		if(val.charAt(0)=='#'){
			// 是ID，返回除#以外的字符
			return document.getElementById(val.slice(1))
		}else if(val.charAt(0)=='.'){
			// 是类名，调用getClass函数，返回除.以外的字符
			return getClass(val.slice(1),obj)
			// 第一个字符可能为a-z，A-Z，第二个字符可能为a-z，A-Z，0-9，循环11次
		}else if(/^[a-zA-Z][a-zA-Z0-9]{0,10}$/.test(val)){//检测是不是标签
			// 返回标签名
			return document.getElementsByTagName(val)
		}
		else if(/^<[a-zA-Z][a-zA-Z0-9]{0,10}>$/.test(val)){//检测是不是标签
			// 返回标签名
			return document.createElement(val,slice(1,-1))
		}
	}else if(typeof val=='function'){
		window.onload=function(){
			val();
		}	
	}
}

function getChilds(obj,type){
	var type=type||"no";//初始化type；no指元素节点
	var kids=obj.childNodes;//获取对象的子节点
	var arr=[];
	for(var i=0;i<kids.length;i++){
		//如果子节点里面没有空文本的情况下
		if(type=="no"){
			//如果kids[i]的类型值为1时
			if(kids[i].nodeType=="1"){
				arr.push(kids[i]);
			}
		//如果子节点里面有空字符时
		}else if(type=="yes"){
			//如果kids[i]的类型值为1或者为三并且它的文本内容的空格用空字符代替
			if(kids[i].nodeType=="1"||kids[i].nodeType==3&&kids[i].nodeValue.replace(/^\s*|\s*$/g,'')){
				arr.push(kids[i]);
			}
		}
	}
	return arr;
}


function getFirst(obj,type){
	var type=type||"no";
		return getChilds(obj,type)[0];	//获取第一个子节点
}

function getLast(obj,type){					
	var type=type||"no";
	var childs=getChilds(obj,type);
	return childs[childs.length-1];	
}										//获取最后一个子节点
function getN(obj,n,type){
	var type=type||'no';
	var childs=getChilds(obj,type);
	if(n>childs.length||n<1){
		return false;
	}
	return childs[n-1];
}											//获取第n个子节点



function getNext(obj,type){				//取下一个节点
	var type=type||'no';
	var next=obj.nextSibling;
	if(next==null){
		return false;
	}
	if (type=='no'){
		while(next.nodeType=='3'||next.nodeType=='8'){
			next=next.nextSibling;
			if(next==null){
				return false;
			}
		}return next;
	}else if(type=='yes'){
		while(next.nodeType=='3'&&!next.nodeType.replace(/^\s*|\s*$/g,'')){
			next=next.nextSibling;
			if(next==null){
				return false;
			}
		}return next;
}
}
//获取上一个兄弟节点
function getPrevious(){
	var type=type||'no';
	var previous=obj.previousSibling;
	if(previous==null){
		return false;
	}
	if (type=='no'){
		while(previous.nodeType=='3'||previous.nodeType==8){
			previous=previous.nextSibling;
			if(previous==null){
				return false;
			}
		}return previous;
	}else if(type=='yes'){
		while(previous.nodeType=='3'&&!previous.nodeValue.replace(/^\s*|\s*$/)){
			previous=previous.nextSibling;
			if(previous==null){
				return false;
			}
		}return previous;
}
}
//在前面插入对象
function insertBefore(obj,beforeObj){
	var parent=beforeObj.parentNode;
	parent.insertBefore(obj,beforeObj);
}
//在后面插入对象
function insertAfter(obj,afterObj){
	var next=getNext(afterObj,'yes');//要文本
	var parent=afterObj.parentNode;
	if(!next){
		parent.appendChild(obj);
	}else{
		parent.insertBefore(obj,next);
	}
	
}
//点击按钮，出现登陆框
//15.hover
//判断某个元素是否包含有另外一个元素
function contains (parent,child) {
	if(parent.contains){
		return parent.contains(child) && parent!=child;
	}else{
		return (parent.compareDocumentPosition(child)===20);
	}
}

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
function checkHover (e,target) {
	if(getEvent(e).type=="mouseover"){
		return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
			!((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
	}else{
		return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
			!((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
	}
}
//鼠标移入移出事件
/*
 obj   要操作的对象
 overfun   鼠标移入需要处理的函数
 outfun     鼠标移除需要处理的函数
 */
function hover (obj,overfun,outfun) {
	if(overfun){
		obj.onmouseover=function  (e) {
			if(checkHover(e,obj)){
				overfun.call(obj,[e]);
			}
		}
	}
	if(outfun){
		obj.onmouseout=function  (e) {
			if(checkHover(e,obj)){
				outfun.call(obj,[e]);
			}
		}
	}
}
function getEvent (e) {
	return e||window.event;
}

