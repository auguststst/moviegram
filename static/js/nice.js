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


function wallet(text) {
            
            var dummy = document.createElement("textarea");
            
            document.body.appendChild(dummy);
            
            dummy.value = text;
            
            dummy.select();
            
            document.execCommand("copy");
            
            alert("Copied the wallet" + " " + dummy.value);

            document.body.removeChild(dummy);
            
        }
