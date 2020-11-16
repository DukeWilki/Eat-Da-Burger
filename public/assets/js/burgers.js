$(function () {
  $(".change-eat").on("click", function (event) {
    event.preventDefault();
    var id = $(this).data("id");
    var newEat = $(this).attr("data-eat");

    var newEatState = {
      eaten: newEat === "true",
    };
    console.log({ newEatState });

    // PUT request.
    $.ajax({
      url: "/api/burgers/" + id,
      type: "PUT",
      data: newEatState,
      dataType: "json",
      complete: function (response) {
        location.reload(); // reload to udate 'favourites' list
      },
    });
  });

  $(".create-form").on("submit", function (event) {
    event.preventDefault();

    var newBurger = {
      name: $("#ca").val().trim(),
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger,
    }).then(function () {
      location.reload(); // reload to udate 'bucket' list
    });
  });

  $(".rate").on("click", function (event) {
    event.preventDefault();
    var id = $(this).data("id");
    var rating = $(this).data("rate");

    $.ajax("/api/burgers/rate/" + id, {
      type: "PUT",
      data: { rating },
    }).then(function () {
      console.log("rated burger");
      // Reload the page to get the updated list
      location.reload(); // reload to reorder 'favourites' list in by rating
    });
  });
});
