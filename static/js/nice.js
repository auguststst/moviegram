var all = [];
$(function() {
	  
	  var text = window.location.href;
          var term = "categorymovies";
          var gen = "genremovies";

          if(text.indexOf( term ) != -1 || text.indexOf( gen ) != -1 && $(window).width() <= 576){
              $('.lightbox img').attr('id', 'fz');
          }else{
              $('.lightbox img').attr('id', 'sz');
          }

          $('#full, #full1, #full2, #full3, #full4, #full5, #full6, #full7, #full8, #full9, #full10').hide();

          $('#movie-desc, #movie-desc1, #movie-desc2, #movie-desc3, #movie-desc4, #movie-desc5, #movie-desc6, #movie-desc7, #movie-desc8, #movie-desc9, #movie-desc10').on('mouseover', function(){
              $('#movie-desc, #movie-desc1, #movie-desc2, #movie-desc3, #movie-desc4, #movie-desc5, #movie-desc6, #movie-desc7, #movie-desc8, #movie-desc9, #movie-desc10').hide();
              $('#full, #full1, #full2, #full3, #full4, #full5, #full6, #full7, #full8, #full9, #full10').show(600);
          });

          $('#full, #full1, #full2, #full3, #full4, #full5, #full6, #full7, #full8, #full9, #full10').on('mouseout', function(){
            $('#movie-desc, #movie-desc1, #movie-desc2, #movie-desc3, #movie-desc4, #movie-desc5, #movie-desc6, #movie-desc7, #movie-desc8, #movie-desc9, #movie-desc10').show();
            $('#full, #full1, #full2, #full3, #full4, #full5, #full6, #full7, #full8, #full9, #full10').hide(300);
          });

	  var switchStatus = false;
          
          
          $(".switch input").on('change', function() {
              if ($(this).is(':checked')) {
                  switchStatus = $(this).is(':checked');
                  document.cookie = 'dark='+ $(this).val() + "; path=/";
                  $("body").addClass("black-body");
                  document.activeElement.blur();
              }
              else {
                 switchStatus = $(this).is(':checked');
                 document.cookie = 'dark='+ "None" + "; path=/";
                 $("body").removeClass("black-body");
                 document.activeElement.blur();
              }
          });

	  $("#gt").on('click',function(){
              $(this).css("display","none");
              $("#gm").css("display","block");
          });

	  var url = window.location.href;
          var sablon = /^https:\/\/www.themoviegram.com\/[0-9]*\/$/;
          var exist = sablon.test(url);

          var sablon2 = /^https:\/\/www.themoviegram.com\/[a-z]*\/[0-9]*\/$/;
          var exist2 = sablon2.test(url);

          
          if(exist || exist2){
            $(".navbar-toggle").addClass('change_button');
            $("#direction").removeClass('hidden-xs');
          }

	   $('.mb-search').click(function(){
              $(this).fadeOut(100);
              $(".navbar-brand").fadeOut(200);
              $(".in-search").addClass("visible-xs");
              $(".in-search input").focus();
              $(".navbar-toggle").addClass('change_button');
              $("#direction2").removeClass('hidden-xs');
              $("#direction").remove();
          });

	 var movvv = document.querySelector('.inside');


         //localStorage.clear();




          var retrievedData = localStorage.getItem("myArray");
          if(retrievedData){
            retrievedData = retrievedData.replace(/^\[(.+)\]$/,'$1');
            var elements = retrievedData.split(',');

            loopfilter();
            //console.log(all);
          }

          function loopfilter(){
            for(var x = 0; x < elements.length; x++){
              //console.log(elements[x].slice(1, -1));
              $(':checkbox[value='+elements[x]+']').prop("checked","true");
              all.push(elements[x].slice(1, -1));

              $.ajax({
                              type: "post",
                              url: url_switch(window.location.href),
                              data: {
                                  'filter' : all,
                                  'csrfmiddlewaretoken': window.CSRF_TOKEN
                              },
                              success: function(response){
                                  $('#lazyload').html(response.posts_html);
                              }
                        });

              $.ajax({
                                type: "post",
                                url: window.location.href,
                                data: {
                                    'filter' : all,
                                    'csrfmiddlewaretoken': window.CSRF_TOKEN
                                },
                                success: function(response){
                                    $('#lazyload').html(response.posts_html);
                                }
                          });

              }
          }


         
          document.querySelectorAll('.filter-element').forEach(function(item){

                                

                item.addEventListener('change', function(e) {
                  

                    if(item.checked){
                         document.activeElement.blur();
                         all.push($(this).val());
                         
                         if (localStorage.length !== 0){
                           var existingEntries = JSON.parse(localStorage.getItem("myArray"));
                           appendFilter();
                         }

                         function appendFilter(){
                           for(var x = 0; x < existingEntries.length; x++){
              

                            if(all.indexOf(existingEntries[x]) === -1) {
                                all.push(existingEntries[x]);
                            }
                           }
                         }


                         localStorage.setItem('myArray', JSON.stringify(all));
                         

                         $.ajax({
                                type: "post",
                                url: url_switch(window.location.href),
                                data: {
                                    'filter' : all,
                                    'csrfmiddlewaretoken': window.CSRF_TOKEN
                                },
                                success: function(response){
                                    $('#lazyload').html(response.posts_html);
                                }
                          });

                          $.ajax({
                                type: "post",
                                url: window.location.href,
                                data: {
                                    'filter' : all,
                                    'csrfmiddlewaretoken': window.CSRF_TOKEN
                                },
                                success: function(response){
                                    $('#lazyload').html(response.posts_html);
                                }
                          });

                        
                       }else{ 
                         document.activeElement.blur();
                         if (localStorage.length !== 0){
                           var items = JSON.parse(localStorage.getItem("myArray"));
                           items.splice(all.indexOf($("input:checkbox:not(:checked)")), 1);
                           all.splice(all.indexOf($("input:checkbox:not(:checked)")), 1);
                           all = items;
                           all.reverse(); 
                           //console.log(all); 
                           
                           if(all.length >= 1){                      
                              localStorage.setItem('myArray', JSON.stringify(all));
                           }else{
                              localStorage.removeItem('myArray');
                           }

                      }

              
                         $.ajax({
                                type: "post",
                                url: url_switch(window.location.href),
                                data: {
                                    'filter' : all,
                                    'csrfmiddlewaretoken': window.CSRF_TOKEN
                                },
                                success: function(response){
                                    $('#lazyload').html(response.posts_html)
                                }
                          });

                         $.ajax({
                                type: "post",
                                url: window.location.href,
                                data: {
                                    'filter' : all,
                                    'csrfmiddlewaretoken': window.CSRF_TOKEN
                                },
                                success: function(response){
                                    $('#lazyload').html(response.posts_html);
                                }
                          });


                        
                      
                      }

                      
                  });
          });





	 $('#filmm').keyup(function(){

                console.log($(this).val());
                $("#part").remove();

                $.ajax({
                    type: "GET",
                    url: url_search(window.location.href),
                    data: {
                        'search_text' : $('#filmm').val(),
      'csrfmiddlewaretoken': window.CSRF_TOKEN
                    },
                    success: function(response){
                        $('#ajax').html(response.seconds)
                    }
                });

            });


          $('#film').keyup(function(){

                console.log($(this).val());
                $("#part").remove();

                $.ajax({
                    type: "GET",
                    url: url_search(window.location.href),
                    data: {
                        'search_text' : $('#film').val(),
			'csrfmiddlewaretoken': window.CSRF_TOKEN
                    },
                    success: function(response){
                        $('#ajax').html(response.seconds)
                    }
                });

            });

});


document.addEventListener("DOMContentLoaded", function(){
            var sentinel = document.getElementById("sentinel");
            var end = false;
            var observer = new IntersectionObserver(function(entries){
              entry = entries[0];
              if (entry.intersectionRatio > 0) {
                

                $(function() {
                      
                      var link = $("#lazyLoadLink");
                      var page = link.data('page');
                      var end = false;

                      $.ajax({
                        type: 'GET',
                        url: url_switch(window.location.href),
                        data: {
                          'page': page, 'filter': all,
                          'csrfmiddlewaretoken': window.CSRF_TOKEN
                        },
                        success: function(data) {
			$('.lightbox img').attr('id', 'fz');
                         if (data.has_next) {
                              link.data('page', page+1);
                              $('#lazyload').append(data.posts_html);
                          } else {
                              link.hide();
                              end = true;
                          }
                        },
                        error: function(xhr, status, error) {
                          alert('shit happen');
                        }
                      });

                });
              }

            })
            observer.observe(sentinel);
          });

function url_switch(url){
            switch(url){
              case "https://www.themoviegram.com/categorymovies/movies/":
                return "/categorymovies/movies/";
                break;
              case "https://www.themoviegram.com/categorymovies/series/":
                return "/categorymovies/series/"
                break;
              case "https://www.themoviegram.com/categorymovies/multiki/":
                return "/categorymovies/multiki/"
		break;
	      case "https://www.themoviegram.com/de/categorymovies/movies/":
                return "/de/categorymovies/movies/";
                break;
	      case "https://www.themoviegram.com/de/categorymovies/series/":
                return "/de/categorymovies/series/";
                break;
	      case "https://www.themoviegram.com/de/categorymovies/multiki/":
                return "/de/categorymovies/multiki/";
                break;

              default:
                console.log("shit happens with url");
            }
          }

function url_search(url){ 
           if (url.indexOf("/en") >= 0){
              return "/en";
           }else if (url.indexOf("/de") >= 0){
              return "/de";
           }else if (url.indexOf("/fr") >= 0){
              return "/fr";
           }else if (url.indexOf("/ar") >= 0 && url.includes("search") != true){
              return "/ar";
           }else{
              return "/";
           }
          }


function wallet(text) {
            
            var dummy = document.createElement("textarea");
            
            document.body.appendChild(dummy);
            
            dummy.value = text;
            
            dummy.select();
            
            document.execCommand("copy");
            
            alert("Copied the wallet" + " " + dummy.value);

            document.body.removeChild(dummy);
            
        }

$(function() {
    
        $('.scrollup').add('.upp').click(function() {
          $("html, body").animate({
            scrollTop:0
          },1000);
        })
      })
      
      $(window).scroll(function() {

        if ($(this).scrollTop()>200) {

          $('.scrollup').add('.upp').fadeIn();
        }
        
        else {
          $('.scrollup').add('.upp').fadeOut();
        }
      });

