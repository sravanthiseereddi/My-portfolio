

function palin() {
    let hey = document.getElementById("hey")

    let inp1 = parseInt(document.getElementById("inp1").value);
    let temp = inp1;
    let rev=0;

    
    while(inp1 !== 0)
    {
        let rem= inp1 % 10;
        rev= rev*10+rem;
        inp1 =Math.floor(inp1/10) ;
        

    }
    if(rev === temp)
    {
        document.getElementById("inp3").value = rev;
        document.getElementById("inp2").value = "So " + temp + " is a palindrome ";
        
        hey.style.boxShadow="0 0 20px rgb(51, 222, 51)";
        inp2.style.color = "rgb(51, 222, 51)"
         inp3.style.color = "rgb(51, 222, 51)"
        
        
        
    }
    else{
        
        document.getElementById("inp3").value = rev;

        document.getElementById("inp2").value = "So " + temp + " is not a palindrome ";
      hey.style.boxShadow="0 0 20px red";
       
        inp2.style.color = "red"
         inp3.style.color = "red"
         

        
    }
    

}
function load(){
    location.reload();
}
