(function(){

function scrollIn_scrollOut(el, func, callInit){

	var oldParents = z(el).parents().get(), parents = [];
	if(/HTMLBody/.test(String(el))){
		return;
	}
	for(var op in oldParents){
		parents.push(oldParents[op]);
		if(/HTMLBody/.test(String(oldParents[op]))){	break;	}
	}
	var oldParents = parents;
	var scrollableParent, isDoc = false;
	for(var p in oldParents){
		var parent = oldParents[p];
		var clWidth = parent.clientWidth, clHeight = parent.clientHeight, scrHeight = parent.scrollHeight, scrWidth = parent.scrollWidth;
		if(scrHeight > clHeight || scrWidth > clWidth){
			if(/HTMLBody/.test(String(parent))){
				scrollableParent = document;
				isDoc = true;
			}else{
				scrollableParent = parent;
			}
			break;
		}
	}
	
	var checks = (scrHeight > clHeight)? [clHeight, "scrollTop", "offsetTop", (scrollableParent.offsetTop + scrollableParent.clientTop)] : [clWidth, "scrollLeft", "offsetLeft", (scrollableParent.offsetLeft + scrollableParent.clientLeft)] ;
	checks[3] = isNaN(checks[3])? 0 : checks[3];
	if(isDoc){
		checks[1] = (checks[1] == "scrollTop")? "pageYOffset" : "pageXOffset" ;
	}
	var called = false;
	var callInit = (callInit == true);
	var isInit = ((checks[0] + ((isDoc)? window[checks[1]] : scrollableParent[checks[1]])) >= (el[checks[2]]-checks[3]));

	if(typeof func == "function"){
		var funcIn = func;
	}else if(String(func.constructor).indexOf("bject") > -1){
		var funcIn = func.in;
		var funcOut = func.out;
	}

	var funcWrapper = function(event){
		if((checks[0] + ((isDoc)? window[checks[1]] : this[checks[1]])) > (el[checks[2]]-checks[3])){
			if(isInit && !callInit){
				isInit = false;
				called = true;
				return;
			}
			if(!called){
				var callback = funcIn.call(el, event);
				if(callback == false){
					this.removeEventListener("scroll", funcWrapper);
				}
				called = true;
				return callback;
			}
		}else if(called){
			called = false;
			if(funcOut){
				var callback = funcOut.call(el, event);
				return callback;
			}
		}
	}
	
	scrollableParent.addEventListener("scroll", funcWrapper);
}

z().extend({
	"detectScroll" : scrollIn_scrollOut
});

})();