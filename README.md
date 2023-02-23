# MiniQuery

### **MiniQuery** is a front-end library specifically designed to be a *lightweight, compact version of JQuery*. 

**MiniQuery** comes with all the important _JQuery_ methods you know and love. This includes the following: 
```
.val()
.html()
.text()
.first()
.last()
.eq()
.each()
.hasClass()
.toggleClass()
.addClass()
.removeClass()
.find()
.get()
.filter()
.attr()
.parent()
.parents()
.children()
.siblings()
.css()
.append()
.prepend()
.remove()
.on()
.one()
.off()
.data()
.removeData()
.end()
```
> A full list of its methods can be found in the [miniQuery.html](miniQuery.html) file.

Usage Example:
```javascript
var grandpa = z(".grandparent") // MiniQuery is accessible through the globally exposed function: z();
	z(grandpa)
		.find(".input")
		.parent()
		.data("note","Thanks for testing MiniQuery")
		.children()
		.val(function(){
			return (z(this).parent().data("note"));
		})
	.end()
		.find(".baby")
		.css({background : "lightgreen"})
	.end()
		.find(".dad > div")
		.on("click", function(){
			var count = (Number(z(this).data("count"))+1 || 1);
			z(this).data("count", count);
			z(".input").val(count);
		})
	.end();
	/*
		The above example
		- Changes the value of the ".input" element
		- Edits the css of the ".baby" element
		- Increments a counter saved as data on a ".dad > div" element, whenever it is clicked
	*/
 ```


**MiniQuery** comes with the important functionality of _JQuery_ but none of the bloatware. It is written entirely in ES5,and provides intuitive, easy to use methods for accessing, and navigating the DOM and its elements. 

**MiniQuery** allows you to easily create plugins and include them in your project.
An example of such a plugin is available in the [scroll file](PlugIns/detectScroll.js)


*This is an ongoing, maintained project, and any suggestions are welcome.*
