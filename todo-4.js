let inp1 = document.getElementById("hey");
let todoC = document.getElementById("todoc1");

 function adder(){
    if(inp1.value === "")
    {
        alert("add proper value");
        return;
    }
    else{
         let wrapper = document.createElement("div");
        wrapper.classList.add("todo-cont", "d-flex", "flex-row", "align-items-center", "p-2");

        let checkbox = document.createElement("input")
    checkbox.type = "checkbox";
  checkbox.setAttribute('id', 'hey1');
    wrapper.appendChild(checkbox);
    let myDiv = document.createElement("div");
    myDiv.classList.add("text", "d-flex", "flex-row", "justify-content-center", "align-items-center");
    wrapper.appendChild(myDiv);
     let li = document.createElement("li");
     li.classList.add("lis");
    
     li.innerHTML = inp1.value;
     myDiv.appendChild(li);
     let icon = document.createElement("i");
     icon.classList.add("far", "fa-trash-alt", "delete-icon");
     myDiv.appendChild(icon);
     todoC.appendChild(wrapper)
      checkbox.addEventListener('change',function(){
    
        li.classList.toggle("checked",checkbox.checked);
        saveData();
        
        
        
       
       
   

}
 );
 icon.addEventListener('click',function(){
 wrapper.remove();
 saveData();
 
   
 } );
 
 

    }
    inp1.value="";
    saveData();
   
  

  
 }
   function saveData(){
  localStorage.setItem("keys",todoC.innerHTML);
 }
 function showdata() {
    todoC.innerHTML = localStorage.getItem("keys");

  
    let checkboxes = todoC.querySelectorAll("input[type='checkbox']");
    let items = todoC.querySelectorAll("li");

    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener("change", function () {
            items[index].classList.toggle("checked", checkbox.checked);
            saveData();
        });
    });


    let deleteIcons = todoC.querySelectorAll(".delete-icon");
    deleteIcons.forEach((icon) => {
        icon.addEventListener("click", function () {
            icon.closest(".todo-cont").remove();
            saveData();
        });
    });
}

showdata();

 