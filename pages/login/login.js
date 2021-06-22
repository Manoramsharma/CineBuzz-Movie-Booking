let items = document.getElementById("error_ul");
let item1= document.getElementById("success_ul");
let item2 = document.getElementById("err_ul");

items.innerHTML='';
if(typeof errors!='undefined')
{
    errors.forEach(error=>{
        const t=document.createElement('li');
        t.innerText= error.message;
    });
    items.append(t);
}

item1.innerHTML='';
if(messages.success_msg)
{
    const t1=document.createElement('li');
    t1.innerText=messages.success_msg;
    item1.append(t1);
}

item2.innerHTML='';
if(messages.error)
{
    const t2=document.createElement('li');
    t2.innerText=messages.error;
    item2.append(t2);
}