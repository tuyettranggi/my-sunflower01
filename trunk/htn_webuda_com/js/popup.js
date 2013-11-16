function popup(url) {
	var width = 1000;
	var height = 660;
	var name = 'popup';
	var popupWindow = window.open(url, name, 'width=' + width + ',height=' + height + ',status=no,location=no,toolbar=no,scrollbars=yes,menubar=no,resizable=no');
	popupWindow.focus();
	
	return false;
}
