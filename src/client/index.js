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
    beforeMount: function () {
        // CREATE A NEW WEBSOCKETS CONNECTION
        const url = 'ws://localhost:3000'
        const connection = new WebSocket(url)

        connection.onmessage = e => {
            var dataObj = JSON.parse(e.data)
            console.log(dataObj)

            this.gps = dataObj.gps
            this.speed = dataObj.speed
            this.soc = dataObj.soc
            this.energy = dataObj.energy
            this.odo = dataObj.odo

        }
        
        connection.onerror = error => {
        console.log(`Websocket error: ${error}`)
        }
    }
});

