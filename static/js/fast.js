var all=[];function url_switch(e){switch(e){case"https://www.themoviegram.com/categorymovies/movies/":return"/categorymovies/movies/";case"https://www.themoviegram.com/categorymovies/series/":return"/categorymovies/series/";case"https://www.themoviegram.com/categorymovies/multiki/":return"/categorymovies/multiki/";case"https://www.themoviegram.com/de/categorymovies/movies/":return"/de/categorymovies/movies/";case"https://www.themoviegram.com/de/categorymovies/series/":return"/de/categorymovies/series/";case"https://www.themoviegram.com/de/categorymovies/multiki/":return"/de/categorymovies/multiki/";default:console.log("shit happens with url")}}function url_search(e){return 0<=e.indexOf("/en")?"/en":0<=e.indexOf("/de")?"/de":0<=e.indexOf("/fr")?"/fr":0<=e.indexOf("/ar")&&1!=e.includes("search")?"/ar":"/"}function wallet(e){var l=document.createElement("textarea");document.body.appendChild(l),l.value=e,l.select(),document.execCommand("copy"),alert("Copied the wallet "+l.value),document.body.removeChild(l)}$(function(){$("#full, #full1, #full2, #full3, #full4, #full5, #full6, #full7, #full8, #full9, #full10").hide(),$("#movie-desc, #movie-desc1, #movie-desc2, #movie-desc3, #movie-desc4, #movie-desc5, #movie-desc6, #movie-desc7, #movie-desc8, #movie-desc9, #movie-desc10").on("mouseover",function(){$("#movie-desc, #movie-desc1, #movie-desc2, #movie-desc3, #movie-desc4, #movie-desc5, #movie-desc6, #movie-desc7, #movie-desc8, #movie-desc9, #movie-desc10").hide(),$("#full, #full1, #full2, #full3, #full4, #full5, #full6, #full7, #full8, #full9, #full10").show(600)}),$("#full, #full1, #full2, #full3, #full4, #full5, #full6, #full7, #full8, #full9, #full10").on("mouseout",function(){$("#movie-desc, #movie-desc1, #movie-desc2, #movie-desc3, #movie-desc4, #movie-desc5, #movie-desc6, #movie-desc7, #movie-desc8, #movie-desc9, #movie-desc10").show(),$("#full, #full1, #full2, #full3, #full4, #full5, #full6, #full7, #full8, #full9, #full10").hide(300)});$(".switch input").on("change",function(){$(this).is(":checked")?($(this).is(":checked"),document.cookie="dark="+$(this).val()+"; path=/",$("body").addClass("black-body")):($(this).is(":checked"),document.cookie="dark=None; path=/",$("body").removeClass("black-body")),document.activeElement.blur()}),$("#gt").on("click",function(){$(this).css("display","none"),$("#gm").css("display","block")});var e=window.location.href,l=/^https:\/\/www.themoviegram.com\/[0-9]*\/$/.test(e),e=/^https:\/\/www.themoviegram.com\/[a-z]*\/[0-9]*\/$/.test(e);(l||e)&&($(".navbar-toggle").addClass("change_button"),$("#direction").removeClass("hidden-xs")),$(".mb-search").click(function(){$(this).fadeOut(100),$(".navbar-brand").fadeOut(200),$(".in-search").addClass("visible-xs"),$(".in-search input").focus(),$(".navbar-toggle").addClass("change_button"),$("#direction2").removeClass("hidden-xs"),$("#direction").remove()});document.querySelector(".inside");var o,e=localStorage.getItem("myArray");e&&(o=(e=e.replace(/^\[(.+)\]$/,"$1")).split(","),function(){for(var e=0;e<o.length;e++)$(":checkbox[value="+o[e]+"]").prop("checked","true"),all.push(o[e].slice(1,-1)),$.ajax({type:"post",url:url_switch(window.location.href),data:{filter:all,csrfmiddlewaretoken:window.CSRF_TOKEN},success:function(e){$("#lazyload").html(e.posts_html)}}),$.ajax({type:"post",url:window.location.href,data:{filter:all,csrfmiddlewaretoken:window.CSRF_TOKEN},success:function(e){$("#lazyload").html(e.posts_html)}})}()),document.querySelectorAll(".filter-element").forEach(function(t){t.addEventListener("change",function(e){var l,o;t.checked?(document.activeElement.blur(),all.push($(this).val()),0!==localStorage.length&&(l=JSON.parse(localStorage.getItem("myArray")),function(){for(var e=0;e<l.length;e++)-1===all.indexOf(l[e])&&all.push(l[e])}()),localStorage.setItem("myArray",JSON.stringify(all)),$.ajax({type:"post",url:url_switch(window.location.href),data:{filter:all,csrfmiddlewaretoken:window.CSRF_TOKEN},success:function(e){$("#lazyload").html(e.posts_html)}}),$.ajax({type:"post",url:window.location.href,data:{filter:all,csrfmiddlewaretoken:window.CSRF_TOKEN},success:function(e){$("#lazyload").html(e.posts_html)}})):(document.activeElement.blur(),0!==localStorage.length&&((o=JSON.parse(localStorage.getItem("myArray"))).splice(all.indexOf($("input:checkbox:not(:checked)")),1),all.splice(all.indexOf($("input:checkbox:not(:checked)")),1),(all=o).reverse(),1<=all.length?localStorage.setItem("myArray",JSON.stringify(all)):localStorage.removeItem("myArray")),$.ajax({type:"post",url:url_switch(window.location.href),data:{filter:all,csrfmiddlewaretoken:window.CSRF_TOKEN},success:function(e){$("#lazyload").html(e.posts_html)}}),$.ajax({type:"post",url:window.location.href,data:{filter:all,csrfmiddlewaretoken:window.CSRF_TOKEN},success:function(e){$("#lazyload").html(e.posts_html)}}))})}),$("#filmm").keyup(function(){console.log($(this).val()),$("#part").remove(),$.ajax({type:"GET",url:url_search(window.location.href),data:{search_text:$("#filmm").val(),csrfmiddlewaretoken:window.CSRF_TOKEN},success:function(e){$("#ajax").html(e.seconds)}})}),$("#film").keyup(function(){console.log($(this).val()),$("#part").remove(),$.ajax({type:"GET",url:url_search(window.location.href),data:{search_text:$("#film").val(),csrfmiddlewaretoken:window.CSRF_TOKEN},success:function(e){$("#ajax").html(e.seconds)}})})}),document.addEventListener("DOMContentLoaded",function(){var e=document.getElementById("sentinel");new IntersectionObserver(function(e){entry=e[0],0<entry.intersectionRatio&&$(function(){var l=$("#lazyLoadLink"),o=l.data("page");$.ajax({type:"GET",url:url_switch(window.location.href),data:{page:o,filter:all,csrfmiddlewaretoken:window.CSRF_TOKEN},success:function(e){e.has_next?(l.data("page",o+1),$("#lazyload").append(e.posts_html)):l.hide()},error:function(e,l,o){alert("shit happen")}})})}).observe(e)}),$(function(){$(".scrollup").click(function(){$("html, body").animate({scrollTop:0},1e3)})}),$(window).scroll(function(){200<$(this).scrollTop()?$(".scrollup").fadeIn():$(".scrollup").fadeOut()});
