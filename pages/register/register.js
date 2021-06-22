let items = document.getElementById("error_reg");

items.innerHTML='';
if(typeof errors!='undefined')
{
    errors.forEach(error=>{
        const t=document.createElement('li');
        t.innerText= error.message;
    });
    items.append(t);
}
