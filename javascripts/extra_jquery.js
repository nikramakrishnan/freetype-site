$('a').on('click', function(event){ 
    var el = document.createElement('a');
    el.href = $(this).attr("href");
    var o =  $( el.hash ).offset(); 
    if(el.href.indexOf(window.location.pathname) > -1) {
        event.preventDefault();
        var sT = o.top - $(".md-header").outerHeight(true); // get the fixedbar height
        // add this to the url string
        window.location.hash = el.hash;
        // compute the correct offset and scroll to it.
        window.scrollTo(0,sT);
    }
});