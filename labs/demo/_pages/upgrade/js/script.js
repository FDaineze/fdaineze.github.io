$.extend($.easing,
{
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
    }
});
$(".interno").click(function(e){
   e.preventDefault();
   
   const md = window.matchMedia( "(min-width: 768px)" );
   var anc = this.hash;
    
   if (md.matches) {
      var adjust = 62;
   } else {
      var adjust = 0;
   }
   
   $("html, body").animate({
       scrollTop: $(anc).offset().top-adjust
   }, { duration: 1000, easing: 'easeOutCirc'});
});
