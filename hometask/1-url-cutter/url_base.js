'use strict';
class URL_Cutter {
  constructor() {
	//JSON
  	this.db = {	
		'ya':'http://yandex.ru/',
		'goo':'http://google.com/'
	};
  }
  
  getFullUrl(url_shortcut) {
	  console.log("Checking for shortcut " + url_shortcut)
	  if (this.db[url_shortcut]) 
		  return this.db[url_shortcut];
	  else 
	  	  return false;
  }
}

module.exports = new URL_Cutter();
