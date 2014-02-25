$(function() {
            $('a img').each(function() {
                $(this).hover(
                    function() {
                         $(this).stop().animate({ opacity: 0.6 }, 400);
                    },
                   function() {
                       $(this).stop().animate({ opacity: 1 }, 400);
                   }
																			)
                });
						$('.header_logo a img').each(function() {
                $(this).hover(
                    function() {
                         $(this).stop().animate({ opacity: 1 }, 400);
                    },
                   function() {
                       $(this).stop().animate({ opacity: 1 }, 400);
                   }
																			)
                });
						$('.totop a img').each(function() {
                $(this).hover(
                    function() {
                         $(this).stop().animate({ opacity: 1 }, 400);
                    },
                   function() {
                       $(this).stop().animate({ opacity: 1 }, 400);
                   }
																			)
                });
        });
