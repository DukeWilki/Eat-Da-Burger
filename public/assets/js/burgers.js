// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".change-eat").on("click", function(event) {
    event.preventDefault();
    var id = $(this).data("id");
    var newEat = $(this).attr("data-eat");

    var newEatState = {
      eaten: newEat === 'true' 
    };
    console.log({newEatState});

    // Send the PUT request.
    $.ajax({
      url: "/api/burgers/" + id, 
      // url: "/api/burgers/update/" + id, 
      type: "PUT",
      // type: "POST",
      data: newEatState,
      dataType: 'json',
      complete: function(response){
        console.log("changed sleep to", newEat);
        // Reload the page to get the updated list
        location.reload();
      }
    });
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      name: $("#ca").val().trim(),
      eaten: $("[name=eaten]:checked").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".delete-burger").on("click", function(event) {
    event.preventDefault();
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/burgers/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted burger", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
