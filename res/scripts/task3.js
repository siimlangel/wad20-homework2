let profiles = [];

$(document).ready(function (){
  loadProfiles().then(function (response) {
    for (let profile of response) {
      const authorName = profile.firstname + " " + profile.lastname;

      profiles.push(
        new Profile(
          authorName,
          profile.avatar,
        )
      );
    }
    displayProfiles(profiles);

  $(".subscribe-button").click(function () {
    $(this).toggleClass("subscribed");
    $(this).text(function(i, text){
          return text === "Follow" ? "Followed" : "Follow";
  });
});
});
});

function displayProfiles(profiles) {
  for (let profile of profiles) {
    let profileDiv    = $("<div />").addClass("profile");
    //Post author information
    let authorDiv  = $("<div />").addClass("profile-author");
    let authorDiv2 = $("<div />").addClass("profile-author-info");

    authorDiv2.append(`<img id="image" src=${profile.avatar}>`);
    authorDiv2.append(`<p id="nimi">${profile.author}</p>`);

     let postActionsDiv = $("<div />").addClass("subscribe-actions");
    postActionsDiv.append(
     `<button id="subscribe" type="subscribe-button" name="subscribe" class="subscribe-button">${"Follow"}</button>`
    );

    //Adding to the authorDiv in the right order.
    authorDiv.append(authorDiv2);
    profileDiv.append(authorDiv);
    profileDiv.append(postActionsDiv);

    $("section.main-container2").append(profileDiv);
  }
}




function loadProfiles() {
  return $.get({
    url: "https://private-anon-185ccc6f96-wad20postit.apiary-mock.com/profiles",
    success: function (response) {
      return response;
    },
    error: function () {
      alert("Error with reading posts.");
    },
  });
}