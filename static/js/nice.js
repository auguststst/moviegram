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

});
