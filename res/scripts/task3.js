let profiles = [];

$(function () {
  loadProfiles().then(function (response) {
    for (let profile of response) {
      const authorName = profile.author.firstname + " " + profile.author.lastname;

      profiles.push(
        new Profile(
          authorName,
          profile.author.avatar,
        )
      );
    }
    displayProfiles(profiles);
  });
});

function displayProfiles(profiles) {
  for (let profile of profiles) {
    let profileDiv    = $("<div />").addClass("profile");
    //Post author information
    let authorDiv  = $("<div />").addClass("profile-author");
    let authorSpan = $("<span />").addClass("profile-author-info");

    authorSpan.append(`<img id="image" src=${profile.avatar}>`);
    authorSpan.append(`<small>${profile.author}</small>`);
    //Adding to the authorDiv in the right order.
    authorDiv.append(authorSpan);
    profileDiv.append(authorDiv);

    $("section.main-container").append(profileDiv);
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