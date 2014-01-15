// Define an extended mixed-mode that understands vbscript and
// leaves mustache/handlebars embedded templates in html mode
var mixedMode = {
	name: "htmlmixed",
	scriptTypes: [{matches: /\/x-handlebars-template|\/x-mustache/i,
								 mode: null},
								{matches: /(text|application)\/(x-)?vb(a|script)/i,
								 mode: "vbscript"}]
};
var editor = CodeMirror.fromTextArea(document.getElementById("mixedMode1"), {
	mode: mixedMode,
	lineNumbers: true,
	tabMode: "indent"});
	
var editor = CodeMirror.fromTextArea(document.getElementById("mixedMode2"), {
	mode: mixedMode,
	lineNumbers: true,
	tabMode: "indent"});

var editor = CodeMirror.fromTextArea(document.getElementById("mixedMode3"), {
	mode: mixedMode,
	lineNumbers: true,
	tabMode: "indent"});