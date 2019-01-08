//  VUE COMPONENTS
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


var websocketData = function () {
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
        
        updateBarchartSpeed(barchartSpeed, dataObj.speed)        
        updateBarchartSOC(barchartSOC, dataObj.soc)
        addDataSpeed(linechartSpeed, dataObj.speed)        
        addDataSOC(linechartSOC, dataObj.soc)
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
    beforeMount: websocketData(),
});


// BARCHART SPEED
var ctx1 = document.getElementById("barchart-speed");
var barchartSpeed = new Chart(ctx1, {
    type: 'horizontalBar',
    data: {
        labels: [""],
        datasets: [{
            label: 'Current Speed',
            data: [],
            backgroundColor: [
                '#7ca363'
            ]
        }],
    }, 
    options: {
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true,
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

function updateBarchartSpeed(barchartSpeed, data) {
    barchartSpeed.data.datasets[0].data.shift()
    barchartSpeed.data.datasets[0].data.push(data)
    barchartSpeed.update();
}


// BARCHART STATE OF CHARGE
var ctx2 = document.getElementById("barchart-soc");
var barchartSOC = new Chart(ctx2, {
    type: 'horizontalBar',
    data: {
        labels: [""],
        datasets: [{
            label: 'State of Charge',
            data: [],
            backgroundColor: [
                '#7ca363'
            ]
        }],
    }, 
    options: {
        scales: {
            xAxes: [{
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

function updateBarchartSOC(barchartSOC, data) {
    barchartSOC.data.datasets[0].data.shift()
    barchartSOC.data.datasets[0].data.push(data)
    barchartSOC.update();
}


// LINECHART SPEED
var ctx3 = document.getElementById("linechart-speed");
var linechartSpeed = new Chart(ctx3, {
    type: 'line',
    data: {
        labels: [""],
        datasets: [{
            label: 'Speed',
            data: [],
            borderColor: [
                '#7ca363'
            ]
        },
        {
            label: 'Time',
            data: [],
            borderColor: [
                '#000'
            ]
        }],
    }, 
    options: {
        scales: {
            yAxes: [{
                stacked: true
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

function addDataSpeed(linechartSpeed, data) {
    linechartSpeed.data.datasets[0].data.unshift(data)
    linechartSpeed.update();
}

// LINECHART STATE OF CHARGE
var ctx4 = document.getElementById("linechart-soc");
var linechartSOC = new Chart(ctx4, {
    type: 'line',
    data: {
        labels: [""],
        datasets: [{
            label: 'State of Charge',
            data: [],
            borderColor: [
                '#7ca363'
            ]
        },
        {
            label: 'Time',
            data: [],
            borderColor: [
                '#000'
            ]
        }],
    }, 
    options: {
        scales: {
            yAxes: [{
                stacked: true
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

function addDataSOC(linechartSOC, data) {
    linechartSOC.data.datasets[0].data.unshift(data)
    linechartSOC.update();
}