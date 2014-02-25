if (navigator.userAgent.indexOf('iPhone') != -1) {
	document.write('iphone');
} else if (navigator.userAgent.indexOf('Android') != -1) {
	document.write('<link rel="stylesheet" href="../css/android.css" media="screen">');
} else {
	document.write('<link rel="stylesheet" href="../css/android.css" media="screen">');
}
