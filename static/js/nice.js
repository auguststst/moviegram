$(function() {
          $('#full, #full1, #full2, #full3, #full4, #full5, #full6, #full7, #full8, #full9, #full10').hide();

          $('#movie-desc, #movie-desc1, #movie-desc2, #movie-desc3, #movie-desc4, #movie-desc5, #movie-desc6, #movie-desc7, #movie-desc8, #movie-desc9, #movie-desc10').on('mouseover', function(){
              $('#movie-desc, #movie-desc1, #movie-desc2, #movie-desc3, #movie-desc4, #movie-desc5, #movie-desc6, #movie-desc7, #movie-desc8, #movie-desc9, #movie-desc10').hide();
              $('#full, #full1, #full2, #full3, #full4, #full5, #full6, #full7, #full8, #full9, #full10').show(600);
          });

          $('#full, #full1, #full2, #full3, #full4, #full5, #full6, #full7, #full8, #full9, #full10').on('mouseout', function(){
            $('#movie-desc, #movie-desc1, #movie-desc2, #movie-desc3, #movie-desc4, #movie-desc5, #movie-desc6, #movie-desc7, #movie-desc8, #movie-desc9, #movie-desc10').show();
            $('#full, #full1, #full2, #full3, #full4, #full5, #full6, #full7, #full8, #full9, #full10').hide(300);
          });

	  $("#gt").on('click',function(){
              $(this).css("display","none");
              $("#gm").css("display","block");
          });

          $("#phonefilm").focus(function(){
              $(".jumbotron").hide(400);
              $(".navbar").hide(200);
              $("#phonebutton").hide();
              $("#dis").hide();
              $(this).css("width","100%");
              $(this).css("margin-top","-120px");

            });

            $("#phonefilm").blur(function(){
              $(".jumbotron").show(200);
              $(".navbar").show(400);
              $("#phonebutton").show(410);
              $("#dis").show();
              $(this).css("width","90%");
              $(this).css("margin-top","0");
            });

          $('#film').keyup(function(){

                console.log($(this).val());
                $("#part").remove();

                $.ajax({
                    type: "GET",
                    url: '/',
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


document.addEventListener("DOMContentLoaded", () => {
            let sentinel = document.getElementById("sentinel");
            let end = false;
            let observer = new IntersectionObserver((entries) => {
              entry = entries[0];
              if (entry.intersectionRatio > 0) {
                

                $(function() {
                      
                      var link = $("#lazyLoadLink");
                      var page = link.data('page');
                      var end = false;

                      $.ajax({
                        type: 'get',
                        url: url_switch(window.location.href),
                        data: {
                          'page': page,
                          'csrfmiddlewaretoken': window.CSRF_TOKEN
                        },
                        success: function(data) {

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
                break;
              default:
                console.log("shit happens with url");
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
