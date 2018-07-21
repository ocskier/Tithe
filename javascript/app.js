$(document).ready(function() {

   var city = "&city=Durham";
   var rated = "&rated=TRUE";


   var queryURL = "https://api.data.charitynavigator.org/v2/Organizations?app_id=8a6cb061&app_key=2314291975d64eb1828a504d597b3b47&rated=TRUE&state=NC" + city; 

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(getData);

    function getData(data) {
        console.log(data);
        console.log(data[0].charityName);
        console.log(data[0].mission);
        console.log("Rating: " + data[0].currentRating.rating);
        console.log(data[0].websiteURL);
        console.log(data[0].irsClassification.subsection);

    }








});