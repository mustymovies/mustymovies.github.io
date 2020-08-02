function formValidation()
{

var uname = document.registration.s;


//alert(uname.value);
// return true;

   var tag = document.createElement("p");
   var text = document.createTextNode("Tutorix is the best e-learning platform");
   tag.appendChild(text);
   var element = document.getElementById("aa-wp");
   element.appendChild(tag);






}

/*

var doc = document.getElementById("aa-wp").childNodes[9];
alert(doc.className);

someNode = document.getElementById("aa-wp");
someNode.parentNode.removeChild(someNode.childNodes[9]);



var doc = document.getElementById("aa-wp");
var notes = null;
for (var i = 0; i < doc.childNodes.length; i++) {
//   alert(doc.childNodes[i].className);
// 
    if ((doc.childNodes[i].className) == "bd") {
      notes = doc.childNodes[i];
      alert(notes.className);
      alert(i);
      notes.remove();
      doc.parentNode.removeChild(notes);  
      doc.removeChild(notes);
      break;
    }        
}


*/

