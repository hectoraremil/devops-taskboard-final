const client = require("prom-client");

client.collectDefaultMetrics();

const httpRequestsTotal = new client.Counter({

    name: "http_requests_total",

    help: "Cantidad total de peticiones HTTP",

    labelNames: [
        "method",
        "status_code"
    ]

});


module.exports = {
    client,
    httpRequestsTotal
};