 


var input = (window.location.href.split('=')[1])
if (input){

if ((window.location.href.split('?')[1].split('=')[0]) == 's'){


    //document.getElementById("keysss").value = holo

    
    const table = document.querySelector('table');
    table.innerHTML = '';    
    
    var header = document.querySelector('h2');
    if (header){header.innerHTML = 'Búsquedas encontradas';}
    
    header = document.querySelector('h1');
    if (header){header.innerHTML = 'Búsquedas encontradas';}    
    
    

    

    
    const tbody = document.createElement('tbody');
    table.appendChild(tbody); 
    //var input = document.getElementById("keysss").value;
    var array = '';
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", "https://mustymovies.github.io/src/json/b2.json", true);
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    array = eval("(" + this.responseText + ")");
                    oko(input , array);} };
            xhttp.send();    

    function oko(input, array) {
     var tr = document.createElement('tr');
     tbody.appendChild(tr); 
      var cnt = 1;
      for (let x = 0; x < array.length; x++) {
        var n = array[x].t.toLowerCase().includes(input.toLowerCase());
        if (n) {
            if (cnt > 4) {
            tr = document.createElement('tr');
            tbody.appendChild(tr); 
            cnt = 1
            }
            cnt = cnt + 1;
            const mytd = document.createElement('td');
            const liTPostMv = document.createElement('li');
            const divTPost = document.createElement('div');
            const aPost = document.createElement('a');
            const divImage = document.createElement('div');
            const spanYear = document.createElement('span');
            const Title = document.createElement('div');
            Title.setAttribute("class", "Title");
            Title.textContent = array[x].t;
           const figure = document.createElement('figure');
            divImage.appendChild(figure);
            figure.setAttribute("class", "Objf TpMvPlay AAIco-play_arrow");
            
            const thumbnail = document.createElement('img');
            thumbnail.setAttribute("width", "80");
            thumbnail.setAttribute("height", "120");
            thumbnail.setAttribute("src", "https://mustymovies.github.io/img/loading.gif");
            thumbnail.setAttribute("data-src", array[x].i);
            thumbnail.setAttribute("class", "lazy attachment-thumbnail size-thumbnail wp-post-image ");
//             thumbnail.setAttribute("alt", "img");                        
            figure.appendChild(thumbnail);
            
            divTPost.setAttribute("class", "TPost A post-7544 post type-post status-publish format-standard has-post-thumbnail hentry");            
            liTPostMv.setAttribute("class", "xxx TPostMv");
            aPost.setAttribute("href", array[x].l);
            divImage.setAttribute("class", "Image");
            spanYear.setAttribute("class", "Year");
            spanYear.textContent = array[x].y;
            divImage.appendChild(spanYear);
            aPost.appendChild(divImage);
            aPost.appendChild(Title);
            divTPost.appendChild(aPost);
            liTPostMv.appendChild(divTPost);
            mytd.appendChild(liTPostMv);
            tr.appendChild(mytd);  
           }
      }
    }  
}
}
