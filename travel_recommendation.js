document.addEventListener("DOMContentLoaded",function() {

    let sub = document.getElementById("sub");
    let clr = document.getElementById("clr");

    sub.addEventListener('click',function(event) {
        event.preventDefault();
        const elem = document.getElementById("search_bar");
        let inputvalue = elem.value;
        getdata(inputvalue);
    })

    clr.addEventListener('click',function(event) {
        event.preventDefault();
        clrdata();
    })
})

async function getdata(inputvalue) {
    let a = await fetch("travel_recommendation_api.json");        
    let b = await a.json();
    inputvalue = inputvalue.toLowerCase().trim();

    const arr = ["beach","beaches","beache","temples","temple","countries","country"];
    let j;
    for(let i = 0;i < arr.length;i++) {
        if(arr[i] === inputvalue)
        {
            if(i == 0 || i == 1 || i == 2)
            {
                j = 1;
                target(j,arr,b);
                break;
            }
            if(i == 3 || i == 4)
            {
                j = 3;
                target(j,arr,b);
                break;
            } 
            if(i == 5 || i == 6)
            {
                let h = Math.random()*3;
                Math.floor(h);
                target2(b,h);
            }
        }    
    }

    for(let i = 0;i < 3;i++)
    {
        if(b["countries"][i].name.toLowerCase() === inputvalue)
        {
            target2(b,i);
        }
    }
}

function add(image,desc,name) {
    let html = `<div class="container" style="background-color: white; width:34vw; height: 450px; margin: 50px 60px 16px 10px; border-radius: 16px; box-shadow:  inset 5px 5px 61px #e1dcdc,inset -5px -5px 61px #ffffff;">
    <div class="image" style="border-radius: 16px 16px 0 0 ; width: 34vw; background-image: url(${image}); height: 300px; background-size: cover;">
    </div>
    <div>
        <h3 style="padding: 24px 5px 10px 16px;line-height: 0px; color:black;">${name}</h3>
        <p style="padding: 0px 4px 0px 16px; color:black; width : 30vw">${desc}</p>
        <a href="book.html" target="_blank"><button style="padding: 6px 12px; background-color: rgba(67, 67, 212, 0.658); border: none; font-size: 1em; margin: 10px 0px 15px 5px; border-radius: 5px; cursor: pointer">Visit</button></a>
    </div>
</div>`

    document.getElementById("extra").innerHTML += html;
}

function clrdata() {
    let div = document.getElementById("extra");
    div.innerHTML = "";
}

function target(j,arr,b) {
    let x = b[arr[j]];
    x.forEach(item => {
        let image = item.imageUrl;
        let desc = item.description;
        let name = item.name;
        add(image,desc,name);
    });
}

function target2(b,i) {
    i = parseInt(i,10);
    let y = b["countries"][i];
    y.cities.forEach(item => {
        let image = item.imageUrl;
        let desc = item.description;
        let name = item.name;
        add(image,desc,name);
    });
}