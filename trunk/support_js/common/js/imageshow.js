// JavaScript Document
$(document).ready(function() {
setInterval('imageRotator()', 2000);
});

function imageRotator() {
var curImg = $('#imageShow li.current');
var nextImg = curImg.next();

if (nextImg.length == 0) {
nextImg = $('#imageShow li:first');
};

curImg.removeClass('current').addClass('previous');
nextImg.css({opacity:0}).addClass('current').animate({opacity:1}, 1000, function() {
curImg.removeClass('previous');
});

};