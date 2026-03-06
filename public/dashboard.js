let allowed = 0;
let blocked = 0;

const ctx = document.getElementById("requestChart");

const chart = new Chart(ctx,{
    type:"doughnut",
    data:{
        labels:["Allowed","Blocked"],
        datasets:[{
            data:[0,0],
            backgroundColor:[
                "#22c55e",
                "#ef4444"
            ]
        }]
    },
    options:{
        responsive:true,
        maintainAspectRatio:false
    }
});

function updateUI(){

    document.getElementById("allowed").innerText = allowed;
    document.getElementById("blocked").innerText = blocked;

    chart.data.datasets[0].data=[allowed,blocked];
    chart.update();
}

async function sendRequest(){

    const algo=document.getElementById("algorithm").value;

    try{

        const res=await fetch(`/api/test?algo=${algo}`);

        if(res.status===429){
            blocked++;
        }
        else{
            allowed++;
        }

    }catch(e){
        console.log(e);
    }

    updateUI();
}

function startLoad(){

    let count=0;

    const interval=setInterval(()=>{

        sendRequest();

        count++;

        if(count>50){
            clearInterval(interval);
        }

    },100);
}

function resetStats(){

    allowed=0;
    blocked=0;

    updateUI();
}