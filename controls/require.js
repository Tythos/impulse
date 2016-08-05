window.addEventListener('load', function() {
	require = function(packName) {
		// Define rudimentary synchronous (A)JAX fetch routine
		var fetch = function(path) {
			var xhr = new XMLHttpRequest();
			var response = "";
			xhr.addEventListener("load", function() {
				response = this.responseText;
			});
			xhr.open("GET", path, false);
			xhr.send();
			return response;
		};

		// Check module cache to avoid reattaching scripts
		if (typeof(module) == 'undefined') {
			module = {};
		}
		if (Object.keys(module).indexOf(packName) >= 0) {
			return module[packName];
		}

		// Grab relevant script resource content, either from package
		// subreference (with path seperator) or from package definition.
		var path = '';
		if (packName.indexOf('/') < 0) {
			var packDef = fetch("controls/" + packName + "/package.json");
			path = 'controls/' + packName + '/' + JSON.parse(packDef).main;
		} else {
			path = 'controls/' + packName + '.js';
		}
		var mainContent = fetch(path);

		// Append new script tags
		var s = document.createElement('script');
		s.setAttribute('type', 'text/javascript');
		s.appendChild(document.createTextNode(mainContent));
		
		// Retrieve and return module.exports symbol
		document.body.appendChild(s);
		return module.exports;
	};
});
