window.addEventListener('load',function()
{ 
    let gobutton=document.querySelector(".gobutton");
    let username=document.querySelector("input[name=username]");
    let reqvalue=document.querySelector("span");
 

    gobutton.addEventListener('click',function(event)
    {    if(username.value==="")
    {
        event.preventDefault();
        reqvalue.classList.remove("display");
    }
        else
        {
            reqvalue.classList.add("display");
            localStorage.setItem("name",username.value);
        window.location.href="http://127.0.0.1:5500/game.html";}
 
    })
})
