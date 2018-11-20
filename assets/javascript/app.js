

    //all the firebase crap


  // Initialize Firebase
var config = {
    apiKey: "AIzaSyAid1VP5Kupt--SQdFX4Cd2vJGOERfOfj0",
    authDomain: "train-scheduler-ffa1e.firebaseapp.com",
    databaseURL: "https://train-scheduler-ffa1e.firebaseio.com",
    projectId: "train-scheduler-ffa1e",
    storageBucket: "train-scheduler-ffa1e.appspot.com",
    messagingSenderId: "353688394519"
};
firebase.initializeApp(config);



var database = firebase.database();

$("#submitBtn").click(function() {
    event.preventDefault();

    var name = $("#nameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var time = $("#timeInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();

    database.ref("/trains").push({
        name: name,
        time: time,
        frequency: frequency,
    })
})

database.ref("/trains").on("child_added", function(snapshot) {
    event.preventDefault();

    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().frequency);
    console.log(snapshot.val().time);

    let timeDiff = moment().diff(moment(snapshot.val().time, "minutes"));
    let remainder = timeDiff % (snapshot.val().frequency);

    minutes = (snapshot.val().frequency) - remainder;
    arrival = moment().add(minutes, "m").format("hh:mm A");

    console.log(moment());

    var newRow = $("<tr>");
    var newName = $("<td>");
    var newDestination = $("<td>");
    var newFrequency = $("<td>");
    var newArrival = $("<td>");
    var newMinutesAway = $("<td>");

    newName.text(snapshot.val().name);
    newDestination.text(snapshot.val().destination);
    newFrequency.text(snapshot.val().frequency);
    newArrival.text(arrival);
    newMinutesAway.text(minutes);

    newRow.append(newName, newDestination, newFrequency, newArrival, newMinutesAway);
    $("#tBody").append(newRow);

    console.log("timeDiff: " + timeDiff);
    console.log("remainder: " + remainder);
    console.log("minutes: " + minutes);
    console.log("arrival: " + arrival);

    console.log("Errors handled: " + errorObject.code);

});

