// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBQIZDEkpWa57A-pb_NpL3SUYRqI0kpX1A",
    autdDomain: "james-597c5.firebaseapp.com",
    databaseURL: "https://james-597c5.firebaseio.com",
    projectId: "james-597c5",
    storageBucket: "james-597c5.appspot.com",
    messagingSenderId: "66828958538"
  };
  firebase.initializeApp(config);


var database = firebase.database();


$('#addInfo').on("click", function(event){
  event.preventDefault();
  
  var trainName = $('#trainInput').val().trim();
  // console.log(trainName);
  var destination = $('#destinationInput').val().trim();
  // console.log(destination);
  var trainTime = $('#trainTimeInput').val().trim();
  // console.log(trainTime);
  var frequency = $('#frequencyInput').val().trim();
  // console.log(frequency)

  
  database.ref().push({
      name: trainName,
      dest: destination,
      first: trainTime,
      freq: frequency 

  });

  
  $('#trainInput').val("");
  $('#destinationInput').val("");
  $('#trainTimeInput').val("");
  $('#frequencyInput').val("");

  
});


database.ref().on("child_added", function(childSnapshot){
  console.log(childSnapshot.val());

  
  var trainName = childSnapshot.val().name;
  // console.log(trainName);
  var destination = childSnapshot.val().dest;
  // console.log(destination);
  var trainTime = childSnapshot.val().first;
  // console.log(trainTime);
  var frequency = childSnapshot.val().freq;
  // console.log(frequency);

  

  //First time
  var firstTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current time
  var currentTime = moment();
  console.log("CURRENT TIME:" + moment(currentTime).format("HH:mm"));

  // Difference between times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

  // Mins until train
  var tMinutesTillTrain = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


  $(".tbody").append("<tr><td>" + trainName + "</td><td>" 
                                + destination  + "</td><td>" 
                                + frequency + "</td><td>" 
                                + nextTrain + "</td><td>" 
                                + tMinutesTillTrain + "</td></tr>");


   // $(".tbody").append("<tr><td>" + trainName + "</td><td>" +
   //  destination + "</td><td>" + trainTime +
   //  "</td><td>" + frequency + "</td><td>"); 
   //   + tMinutesTillTrain + "</td></tr>")
});





