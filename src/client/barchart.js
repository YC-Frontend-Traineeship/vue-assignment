Vue.component('barchart-speed', {
    props: ['speed'],
    template: '<canvas id="myChart"></canvas>'
})


var app = new Vue({
    el: '#app',
    data: {
        speed: 'speed data'
    },
    method: {
        
    }
})

console.log(app.speed)

// ....
function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

// beforeMount: 