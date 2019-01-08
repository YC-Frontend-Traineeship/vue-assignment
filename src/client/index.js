Vue.component('barchart-speed', {
    props: ['speed'],
    template: '<canvas id="barchart-speed"></canvas>'
})
Vue.component('barchart-soc', {
    props: ['soc'],
    template: '<canvas id="barchart-soc"></canvas>'
})
Vue.component('linechart-speed', {
    props: ['speed'],
    template: '<canvas id="linechart-speed"></canvas>'
})
Vue.component('linechart-soc', {
    props: ['soc'],
    template: '<canvas id="linechart-soc"></canvas>'
})

var dataTest = function () {
    // CREATE A NEW WEBSOCKETS CONNECTION
    const url = 'ws://localhost:3000'
    const connection = new WebSocket(url)
    

    connection.onmessage = e => {
        dataObj = JSON.parse(e.data) 
        // console.log(dataObj) // All data from websocket

        app.gps = dataObj.gps
        app.speed = dataObj.speed
        app.soc = dataObj.soc
        app.energy = dataObj.energy
        app.odo = dataObj.odo
        newDataset = dataObj.speed
        
        addData(chartSpeed, dataObj.speed)
        // setTimeout(removeData(chartSpeed), 3000)
        
        addDataSOC(chartSOC, dataObj.soc)
    }

    connection.onerror = error => {
    console.log(`Websocket error: ${error}`)
    }
}


var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello',
        gps: 'gps data',
        speed: 'speed data',
        soc: 'soc data',
        energy: 'energy data',
        odo: 'odo data'
    },
    mounted() {
    },
    beforeMount: dataTest(),
});

// console.log(app.speed)
console.log(app.speed)


var ctx = document.getElementById("barchart-speed");
var chartSpeed = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: [""],
        datasets: [{
            label: 'Current Speed',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)'
            ],
            borderWidth: 1
        }],
    }, 
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    // display: true,
                    // padding: -4,
                    // fontColor: "#000",
                    // mirror: true
                    }
            }]
        },
        legend: {
            display: false
        },
        title: {
            display: false
        }
    }
});

var ctx = document.getElementById("barchart-soc");
var chartSOC = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: [""],
        datasets: [{
            label: 'Speed 1',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)'
            ],
            borderWidth: 1
        }],
    }, 
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        legend: {
            display: false
        },
        title: {
            display: false
        }
    }
});

function addData(chartSpeed, data) {
    chartSpeed.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
        // console.log(data + " updated")
    });
    chartSpeed.update();
}
    
// function removeData(chartSpeed) {
//     // chartSpeed.data.datasets.forEach((dataset) => {
//         // console.log(dataset)
//         // addData(chartSpeed,dataObj.speed)
//         chartSpeed.datasets.destroy();
//         // console.log(data +" removed")
//     // });
//     chartSpeed.update();
    
// }

// Barchart - soc
function addDataSOC(chartSpeed, data) {
    chartSpeed.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
        // console.log(data + " updated")
    });
    chartSpeed.update();
}
