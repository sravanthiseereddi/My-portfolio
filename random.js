
let p1=document.getElementById("p1");
let main = document.getElementById("main")
function display(){
    let randomNumber = Math.floor(Math.random() * 10) + 1;
let i1 = document.getElementById("i1").value;


if (i1 === "" || i1.length > 2)
{
    p1.textContent = 'invalid or enter a proper number';
    p1.style.padding ="10px"
    p1.style.backgroundColor = ""
    return;
}
i1 = Number(i1);


    if(i1 === randomNumber)
    {
        
        p1.textContent = 'yeah!!! you got it';
        p1.style.padding ="10px"
        p1.style.backgroundColor = "green"
        p1.style.color ="white"
          main.style.boxShadow = "0 0 10px green"

    }
    else
    {
        p1.textContent = 'Sorry! try again';
         p1.style.padding ="10px"
        p1.style.backgroundColor = "red"
         p1.style.color ="white"
         main.style.boxShadow = "0 0 10px red"
         
    }
    
    
}
function load() {
    location.reload();
}
