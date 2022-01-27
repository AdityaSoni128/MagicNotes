console.log("Welcome to the Magic Notes");

showData();
let addNote = document.getElementsByClassName("addbtn");
addNote[0].addEventListener("click", (e) => {
    let text = document.getElementById("note");
    let Title=document.getElementById("title");
    let prenote = localStorage.getItem("notes");

    if (prenote == null) {
        collNotes = [];
    } else {
        collNotes = JSON.parse(prenote);
    }
    let obj={
        mytitle:Title.value,
        mytext:text.value
    }

    if(Title.value!=""&& text.value!=""){
        collNotes.push(obj);
        localStorage.setItem("notes", JSON.stringify(collNotes))
    }
    text.value = "";
    title.value = "";
    showData();
})
function showData() {
    let prenote = localStorage.getItem("notes");
    if (prenote == null) {
        collNotes = [];
    } else {
        collNotes = JSON.parse(prenote);
    }
    let html = "";
    collNotes.forEach(function (element, index) {
        html += `
       
        <div class="allNotes">
        <span>${index + 1}. ${element.mytitle}</span>
        <p class="para">${element.mytext}</p>
        <button id="${index}" class="dltBtn btn" onClick="deleteNode(this.id)" >Delete</button>
        </div> 
         `
    });
    if (html != "") {
        let divColl = document.getElementById("addNote");
        divColl.innerHTML = html;
    }
    else{
        let divColl = document.getElementById("addNote");
        divColl.innerHTML = "<b>List is empty. Add Notes!</b>";
    }
}
 function deleteNode(index){
    let prenote =  localStorage.getItem("notes");
    if (prenote == null) {
        collNotes = [];
    } else {
        collNotes = JSON.parse(prenote);
    }
    collNotes.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(collNotes));
    location.reload();
    showData(); 
}
let search=document.getElementById("search");
search.addEventListener("input",function(e){
    let text=search.value.toLowerCase();
    console.log(text)
    let items=document.getElementsByClassName("allNotes");
    Array.from(items).forEach(function(element){
        let para=element.getElementsByTagName("p")[0].innerText.toLowerCase();
        let title=element.getElementsByTagName("span")[0].innerText.toLowerCase();
        if(para.includes(text)|| title.includes(text)){
            element.style.display="block";
        }else{
            element.style.display="none";
        }
    })
})