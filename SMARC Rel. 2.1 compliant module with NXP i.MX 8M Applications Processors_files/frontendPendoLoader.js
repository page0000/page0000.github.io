(function(apiKey){
	(function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=[];
		v=['initialize','identify','updateOptions','pageLoad'];for(w=0,x=v.length;w<x;++w)(function(m){
			o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);
		y=e.createElement(n);y.async=!0;y.src='https://cdn.pendo.io/agent/static/'+apiKey+'/pendo.js';
		z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');


	var loaderListener = function (args) {
		if (args) {
			document.removeEventListener("DOMContentLoaded", loaderListener);
		}

		try {

			var xhr = new XMLHttpRequest();
			xhr.open('POST', '/frontend/webMethods/Console.asmx/GetPendoSettings', true);
			xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
			xhr.send(null);

			xhr.onreadystatechange = function () {
				var DONE = 4; // readyState 4 means the request is done.
				var OK = 200; // status 200 is a successful return.
				if (xhr.readyState === DONE) {
					if (xhr.status === OK) {
						var res = JSON.parse(JSON.parse(xhr.responseText).d);

						var bodyNode = document.getElementsByTagName("body")[0];

						//js
						var script = document.createElement("script");

						var scriptContent = "try {" +
							" pendo.initialize({ " +
                            "   visitor: " + JSON.stringify(res.visitor) + 
                            ",  account: " + JSON.stringify(res.account) + " });" +
							" } catch (err) { console.log('Pendo initialize() failure: ' + err); }";
							//console.log('Pendo scriptContent', scriptContent);
							script.innerHTML = scriptContent;
							bodyNode.insertBefore(script, bodyNode.firstChild);

					} else {
						console.log('Pendo loader error');
					}
				}
			};
		}
		catch (err) {
			console.log('Pendo loader error');
		}
	}

	if (document.readyState === "complete" || document.readyState === "interactive") {
		loaderListener();
	}
	else {
		document.addEventListener("DOMContentLoaded", loaderListener);
	}

	
})('da1c8b4e-431b-48c0-5e7e-69e9d34ca1b2');

