    // Initial array of pets
    var pets = ["Dog", "Cat", "Canary", "Hampster", "Gerbil", "Salamander", "Guinea Pig", "Chameleon", "Boa Constrictor", "Rats", "Mice", "Bearded Dragon", "Beta Fish"];


    function renderButtons() {
        for (var i = 0; i < pets.length; i++) {
            var a = $("<button>");
            a.addClass("pet-select");
            a.addClass("btn btn-primary")
            a.attr("data-name", pets[i]);
            a.text(pets[i]);
            $("#pet-buttons").append(a);
        }
    }


    $("#add-pet").on("click", function() {
        event.preventDefault();
        var newPet = $("#pet-input").val().trim()
        pets.push(newPet)
        var a = $("<button>");
        a.addClass("pet-select");
        a.addClass("btn btn-primary")
        a.attr("data-name", newPet);
        a.text(newPet);
        $("#pet-buttons").append(a);
        $("#pet-input").val("")

    });

    $(document).on("click", ".pet-select", function() {
        $("#pet-images").empty();
        var petSelected = $(this).attr("data-name").replace(" ", "+").toLowerCase()
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + petSelected + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(petSelected)
        console.log(queryURL)
        var promise = $.ajax({
            url: queryURL,
            method: "GET"
        });


        promise.done(function(response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                    var imageStillUrl = results[i].images.fixed_height_still.url;
                    var imageUrl = results[i].images.fixed_height.url;
                    var imageRating = results[i].rating

                    var p = $("<p>").text("Rating: " + imageRating);

                    var petImage = $("<img>");
                    petImage.attr("src", imageStillUrl);
                    petImage.attr("alt", "pet image");
                    petImage.attr("data-still", imageStillUrl);
                    petImage.attr("data-animate", imageUrl);
                    petImage.attr("data-state", "still");
                    petImage.attr("class", "gif");

                    $("#pet-images").append(p);
                    $("#pet-images").append(petImage);
                };
            }
        });
    });

    $(document).on("click", ".gif", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).data('animate'))
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
    renderButtons();