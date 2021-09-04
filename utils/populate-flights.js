const moment = require('moment');

const today = moment();
const flights = [
    {
        id: 1,
        departingTime: moment(today).add(1, 'day').hour(12).minute(20).toDate(),
        arrivalTime: moment(today).add(1, 'day').hour(14).minute(10).toDate(),
        departingAiportId: 1,
        arrivingAirportId: 3
    },
    {
        id: 2,
        departingTime: moment(today).add(1, 'day').hour(12).minute(20).toDate(),
        arrivalTime: moment(today).add(1, 'day').hour(14).minute(10).toDate(),
        departingAiportId: 2,
        arrivingAirportId: 5
    },
    {
        id: 3,
        departingTime: moment(today).add(1, 'day').hour(12).minute(20).toDate(),
        arrivalTime: moment(today).add(1, 'day').hour(14).minute(10).toDate(),
        departingAiportId: 3,
        arrivingAirportId: 2
    },
    {
        id: 4,
        departingTime: moment(today).add(1, 'day').hour(12).minute(20).toDate(),
        arrivalTime: moment(today).add(1, 'day').hour(14).minute(10).toDate(),
        departingAiportId: 4,
        arrivingAirportId: 1
    },
    {
        id: 5,
        departingTime: moment(today).add(1, 'day').hour(12).minute(20).toDate(),
        arrivalTime: moment(today).add(1, 'day').hour(14).minute(10).toDate(),
        departingAiportId: 1,
        arrivingAirportId: 3
    },
    {
        id: 6,
        departingTime: moment(today).add(2, 'day').hour(14).minute(0).toDate(),
        arrivalTime: moment(today).add(2, 'day').hour(15).minute(50).toDate(),
        departingAiportId: 2,
        arrivingAirportId: 5
    },
];
let currentMaxId = 6;

const airports = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 }
]

module.exports = async () => {
    // Get the latest flight's date
    try {
        const latestDate = moment(
            Math.max(
                ...(await Promise.resolve(flights.map(flight => flight.departingTime)))
            )
        );

        for (let i = 0; i < airports.length; i++) {
            for (let j = i+1; j < airports.length; j++) {
                // I think we should use what I do here as an example
                // for what we can do for when we seed the flight data
                // Create 3 going from airport_i to airport_j, then
                // create 3 going from airport_j to airport_i

                // Replace below with Flight.create
                currentMaxId++
                let departingTime = moment(latestDate)
                    .add(1, 'days')
                    .hours(Math.floor(Math.random() * 24))
                    .minutes(Math.floor(Math.random() * 60))
                    .toDate();

                flights.push({
                    id: currentMaxId,
                    departingTime,
                    arrivalTime: moment(departingTime)
                        .add(1, 'hours')
                        .add(30, 'minutes')
                        .toDate(),
                    departingAiportId: airports[i].id,
                    arrivingAirportId: airports[j].id
                });
                // Replace above with Flight.create

                // Replace below with Flight.create
                currentMaxId++
                departingTime = moment(departingTime)
                    .add(3, 'hours')
                    .toDate();

                flights.push({
                    id: currentMaxId,
                    departingTime,
                    arrivalTime: moment(departingTime)
                        .add(1, 'hours')
                        .add(30, 'minutes')
                        .toDate(),
                    departingAiportId: airports[i].id,
                    arrivingAirportId: airports[j].id
                });
                // Replace above with Flight.create

                // Replace below with Flight.create
                currentMaxId++
                departingTime = moment(departingTime)
                    .add(3, 'hours')
                    .toDate();

                flights.push({
                    id: currentMaxId,
                    departingTime,
                    arrivalTime: moment(departingTime)
                        .add(1, 'hours')
                        .add(30, 'minutes')
                        .toDate(),
                    departingAiportId: airports[i].id,
                    arrivingAirportId: airports[j].id
                });
                // Replace above with Flight.create

                // Replace below with Flight.create
                currentMaxId++;
                departingTime = moment(latestDate)
                    .add(1, 'days')
                    .hours(Math.floor(Math.random() * 24))
                    .minutes(Math.floor(Math.random() * 60))
                    .toDate();

                flights.push({
                    id: currentMaxId,
                    departingTime,
                    arrivalTime: moment(departingTime)
                        .add(1, 'hours')
                        .add(30, 'minutes')
                        .toDate(),
                    departingAiportId: airports[j].id,
                    arrivingAirportId: airports[i].id
                });
                // Replace above with Flight.create

                // Replace below with Flight.create
                currentMaxId++
                departingTime = moment(departingTime)
                    .add(3, 'hours')
                    .toDate();

                flights.push({
                    id: currentMaxId,
                    departingTime,
                    arrivalTime: moment(departingTime)
                        .add(1, 'hours')
                        .add(30, 'minutes')
                        .toDate(),
                    departingAiportId: airports[j].id,
                    arrivingAirportId: airports[i].id
                });
                // Replace above with Flight.create

                // Replace below with Flight.create
                currentMaxId++
                departingTime = moment(departingTime)
                    .add(3, 'hours')
                    .toDate();

                flights.push({
                    id: currentMaxId,
                    departingTime,
                    arrivalTime: moment(departingTime)
                        .add(1, 'hours')
                        .add(30, 'minutes')
                        .toDate(),
                    departingAiportId: airports[j].id,
                    arrivingAirportId: airports[i].id
                });
                // Replace above with Flight.create
            }
        }

        // Just for testing purposes while using dummy model. Delete this when
        // models are created.
        console.log(flights.slice(flights.length - 6));
    } catch (err) {
        console.error(err);
    }
}
