window.onload = function () {
    window.jQuery
        ? $(document).ready(function () {
              $(".sidebarNavigation .navbar-collapse").hide().clone().appendTo("body").removeAttr("class").addClass("sideMenu").show(),
                  $("body").append("<div class='overlay'></div>"),

                  $.fn.follow = function (event, callback) {
                    $(document).on(event, $(this).selector, callback);  
                  }
                  
                  $(".navbar-toggle").follow("click", function () {
               

                      $(".sideMenu").addClass($(".sidebarNavigation").attr("data-sidebarClass")),
                          $(".sideMenu, .overlay").toggleClass("open"),
                          

                          $(window).swipe( {
                   swipeLeft:function(event, direction, distance, duration, fingerCount, fingerData) {
                    $(".overlay").removeClass("open"), $(".sideMenu").removeClass("open"); 
                  },
                   threshold:75,
               fingers:'all'
                });

                         
              $("html").click(function(e) {   
                   if(!$(e.target).hasClass('open'))
                 {
                   $(".overlay").removeClass("open"), $(".sideMenu").removeClass("open");
                 }
              });

	      $("#switch-wrapper .switch input").on('change', function() {
                  if ($(this).is(':checked')) {
                      document.cookie = 'dark='+ $(this).val() + "; path=/";
                      $("body").addClass("black-body");
                  }
                  else {
                     document.cookie = 'dark='+ "None" + "; path=/";
                     $("body").removeClass("black-body");
                     document.activeElement.blur();
                  }
              });

              



                  }),



                  $(window).resize(function () {
                      $(".navbar-toggle").is(":hidden") ? $(".sideMenu, .overlay").hide() : $(".sideMenu, .overlay").show();
                  });

          })
        : console.log("sidebarNavigation Requires jQuery");
};


