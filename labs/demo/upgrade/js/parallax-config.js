$(window).bind('scroll',function(e){
    parallaxScroll();
});

function parallaxScroll(){
/* * * * * *
1 - ct
2 - raven
3 - udyr
4 - tek
* * * * * */
    
    const md = window.matchMedia( "(min-width: 768px)" );
    const lg = window.matchMedia( "(min-width: 992px)" );
    
    if (lg.matches) {
        var pbg1 = -10, p1 = 'bottom',
            pbg2 = 100, p2 = 'top',
            pbg3 = -265, p3 = 'bottom',
            pbg4 = 500, p4 = 'top';
    } else {
        if (md.matches) {
            var pbg1 = -400, p1 = 'bottom',
                pbg2 = 100, p2 = 'top',
                pbg3 = -390, p3 = 'bottom',
                pbg4 = 5000, p4 = 'top';
        } else {
            var pbg1 = 100, p1 = 'top',
                pbg2 = 200, p2 = 'top',
                pbg3 = -530, p3 = 'bottom',
                pbg4 = 5000, p4 = 'bottom';
        }
    }
    
    var scrolled = $(window).scrollTop();
    $('#parallax-bg1').css(p1,(pbg1+(scrolled*.32))+'px');
    $('#parallax-bg2').css(p2,(pbg2-(scrolled*.15))+'px');
    $('#parallax-bg3').css(p3,(pbg3+(scrolled*.15))+'px');
    $('#parallax-bg4').css(p4,(pbg4-(scrolled*.33))+'px');
}