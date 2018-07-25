$(document).ready(function() {

    //Categories data  identifier: 
    //Animals = 1 
    //Arts, Culture, Humanities = 2 
    //Education = 3 
    //Environment = 4
    //Health = 5 
    //Human Services = 6
    //Human and Civil Rights = 8
    //Religion = 9
    //Research and Public Policy = 11
    
    
    //    var city = ;

    //    var state = ;

    //    var zip = ;
    
       var categoryIdentifier = $(".category").data("category-id");
    
    //    var queryURL = "https://api.data.charitynavigator.org/v2/Organizations?app_id=d555fab3&app_key=579ef660f0ef22b0d11f99db0ecd61a9&rated=TRUE&pageSize=8" + "&city=" + city + "&state=" + state + "&zip=" + zip + "&category=" + categoryIdentifier; 

       var queryURL = "https://api.data.charitynavigator.org/v2/Organizations?app_id=d555fab3&app_key=579ef660f0ef22b0d11f99db0ecd61a9&rated=TRUE&pageSize=8" + "&category=" + categoryIdentifier; 

    
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
            console.log(data[1].mailingAddress.streetAddress1 + "," + data[1].mailingAddress.city + "," +data[1].mailingAddress.stateOrProvince);


            //Loop Through Data Returned 

            for (var i = 0; i <data.length; i++) {
                //most-outer Div - added address class (chris)
                var $npDiv = $('<div class="col s6 m4 cardcol for-buttons address"></div>');
                //data-address 
                $npDiv.attr("data-address", data[i].mailingAddress.streetAddress1 + "," + data[i].mailingAddress.city + "," + data[i].mailingAddress.stateOrProvince);

                //Card Div
                var $mycard = $('<div class="card small sticky-action"></div>');

                var $cardContent = $('<div class="card-image waves-effect waves-block waves-light"><img class="activator" src='+ data[i].cause.image +'></div>');

                var $cardContentAction = $('<div class="card-action" style="height:40%;padding: 5px 18px;">');
                
                var $cardContentSpan=$('<p class="card-title activator grey-text text-darken-4"></span>');
                $cardContentSpan.text(data[i].charityName);

                var $icon = $("<i>");
                $icon.addClass("material-icons right");
                $icon.text("more_vert");

                $cardContentSpan.append($icon);

                var $cardContentP = $("<p>");
                var $cardContentLink = $('<a href="'+ data[i].websiteURL+'" target="blank" style="color:fuchsia">');
                $cardContentLink.text("Contribute");
                $cardContentP.append($cardContentLink);
                $cardContentAction.append($cardContentSpan).append($cardContentP);

                //Card Reveal Creation
                var $cardReveal = $("<div>");
                $cardReveal.addClass("card-reveal");

                var $cardRevealSpan = $("<p>");
                $cardRevealSpan.addClass("card-title grey-text text-darken-4");
                $cardContentSpan.css({"font-size":"20px","line-height":"1.4rem" });
                $cardRevealSpan.append(data[i].charityName);

                var $cardRevealIcon = $("<i>");
                $cardRevealIcon.addClass("material-icons right");
                $cardRevealIcon.css({"margin-left":"0","line-height":"1.25" });
                $cardRevealIcon.text("close");

                $cardRevealSpan.append($cardRevealIcon);

                var $cardRevealP = $("<p>");
                $cardRevealP.text("data[i].mission");

                $cardReveal.append($cardRevealSpan).append($cardRevealP);

                // Appending CardImg, CardContent, and Card Reveal to its div
                $mycard.append($cardContent);
                $mycard.append($cardContentAction);
                $mycard.append($cardReveal);
                $npDiv.append($mycard);

                console.log($npDiv);
                //Appending to id=display-nonprofit
                $("#resultsRow").append($npDiv);
            }

        }

        //click event handler to retrieve data-address value
        $(document.body).on("click", ".address",googleGoogle);

       

        function googleGoogle() {

            var address = $(this).data("address");

            var queryURL1 = "https://maps.googleapis.com/maps/api/geocode/json?address="+ address + "&key=AIzaSyADEsM8kqCZ5T34NXVlTo7WI4k6X2EzHRI";


            //GeoCoding API 

            $.ajax({
                url: queryURL1,
                method:"GET"
            }).then(geoCode);

            function geoCode(response) {

                var result = response.results;
                var latitude = result[0].geometry.location.lat;
                var longitude = result[0].geometry.location.lng;

                console.log(latitude);
                console.log(longitude);

            }
        
            
        
        
        }
});

    
