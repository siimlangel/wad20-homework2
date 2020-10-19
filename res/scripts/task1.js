// Task 1
$(document).ready(function () {
    // Fetch user data
    $.get(
        "https://private-anon-4d39d81a4c-wad20postit.apiary-mock.com/users/1",
        // Callback
        function (res) {
            // Set user image
            $(".avatar").attr("src", res.avatar);
            // Set user's full name
            $("#user-username").html(`${res.firstname} ${res.lastname}`);
            // Set users email
            $("#user-email").html(res.email);
        }
    );
    $("nav div.avatar-container").on("click", function () {
        // Toggle dropdown open close
        $("nav div.avatar-container > div.dropdown-container").toggleClass(
            "open"
        );
    });
});
