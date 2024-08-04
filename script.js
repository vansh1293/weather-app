let btn=document.querySelector(".search");
let input=document.querySelector(".btn");
const apikey="fe70635ddbea5ce989802e65c653ff5c";
async function height(c,h)
{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            c.style.height=h;
            resolve();
        }, 800);
    })
}
const gettemp=(async(city)=>{
    let res=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`);
    if(!res.ok)
    {
        alert("City not found");
        throw new Error("City not found");
    }
    else{
        let data=await res.json();
        return data;
    }
});
async function main()
{
    btn.addEventListener("click",(async ()=>{
        if(document.querySelector(".xyz"))
        {
            document.querySelector(".xyz").remove();
        }
    try{
        let c=document.querySelector(".container");
        await height(c,"500px");
        let t= await gettemp(input.value.trim());
        let val=Math.floor(t.main.temp);
        let icon=`http://openweathermap.org/img/wn/${t.weather[0].icon}.png`;
        let temp=`<div class="xyz">
            <div class="text">Temperature </div>
            <div class="temp"> ${val}°C</div>
            <div class="text">HUMIDITY</div>
            <div class="temp"> ${t.main.humidity}%</div>
            <div class="temp"> ${t.weather[0].description}</div>
            <img src="${icon}" alt="">
        </div>`;
        c.insertAdjacentHTML("beforeend",temp);
    }catch(error){
        console.log(error);
    }
    }));
}
main();