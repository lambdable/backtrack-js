/*
* Backtrack.js by Zaim Ramlan
* 
* backtrack.js functions to temporarily store the browser history
* and allows a 'back' button to be displayed with the correct link
* to go back to.
*
* something simple which SHOULD BE AVAILABLE by browser, but IT ISN'T!
* a simple `window.history.pop()` couldn't be done and hence, 
* this plugin was born!
*/
var Backtrack = function() {
	this.push_page = function() {
		pages_from_storage = sessionStorage.getItem('backtracks');
		if(pages_from_storage == null) {
			pages = new Array();
		} else {
			pages = pages_from_storage.split(',');
		}
		// only store pages if it is not a page reload
		if(pages[pages.length-1] != location.href) pages.push(location.href);
		sessionStorage.setItem('backtracks', pages.toString());
	}

	this.pop_page = function() {
		pages_from_storage = sessionStorage.getItem('backtracks');
		pages = pages_from_storage.split(',');
		pages.pop();
		sessionStorage.setItem('backtracks', pages.toString());		
	}

	this.back_link = function() {
		pages_from_storage = sessionStorage.getItem('backtracks');
		pages = pages_from_storage.split(',');
		back_link = pages[pages.length - 2];
		return back_link;
	}

	this.set_back_link = function(back_link_id) {
		back_button = document.getElementById(back_link_id);
		if (back_button != null) back_button.href = this.back_link(); 
	}

	this.reset = function() {
		sessionStorage.removeItem('backtracks');
	}		
}