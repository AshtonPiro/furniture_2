(function (document) {
	function importScripts(e){if(0!==e.length){var t,n,r,c=0;r=function(){t.parentNode.removeChild(t),++c<e.length&&n()},(n=function(){t=document.createElement("script");var n=e[c];n.src&&n.src.length>0?(t.src=n.src,t.onerror=r,t.onload=r,document.head.appendChild(t)):(t.text=n.text,document.head.appendChild(t),r())})()}}

	var scripts = [{"src":null,"text":" (function(){ var s = document.createElement(\"script\"); s.async = true; s.src = (document.location.protocol == \"https:\" ? \"https:\" : \"http:\") + \"\/\/www.elementwidget.com\/get.js\"; var a = document.getElementsByTagName(\"script\")[0]; a.parentNode.insertBefore(s, a); })(); "},{"src":"https:\/\/universaltag.co\/rect\/jwt\/universal.js","text":""}]
	importScripts(scripts)
}(document))
