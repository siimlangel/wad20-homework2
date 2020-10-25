let posts = [];

$(function () {
  loadPosts().then(function (response) {
    for (let post of response) {
      const authorName = post.author.firstname + " " + post.author.lastname;

      posts.push(
        new Post(
          authorName,
          post.author.avatar,
          post.createTime,
          //Checking post.text value
          post.text ? post.text : "",
          //Checking media.type not null.
          post.media ? (post.media.type ? post.media.type : "") : "",
          //Checking post.media.url that it's not null.
          post.media ? (post.media.url ? post.media.url : "") : "",
          post.likes
        )
      );
    }
    displayPosts(posts);
  });
});

function displayPosts(posts) {
  for (let post of posts) {
    let postDiv = $("<div />").addClass("post");

    //Post author information
    let authorDiv = $("<div />").addClass("post-author");
    let authorSpan = $("<span />").addClass("post-author-info");

    authorSpan.append(`<img id="image" src=${post.avatar}>`);
    authorSpan.append(`<small>${post.author}</small>`);
    //Adding to the authorDiv in the right order.
    authorDiv.append(authorSpan);
    authorDiv.append(`<small>${post.createTime}</small>`);

    //Post image information
    let postImageDiv = $("<div />").addClass("post-image");

    if (post.mediaType === "image") {
      postImageDiv.append(`<img alt="Post Author" src=${post.mediaURL}>`);
    } else if (post.mediaType === "video") {
      var video = $("<video />", {
        id: "video",
        src: post.mediaURL,
        type: "video/mp4",
        controls: true,
      });
      postImageDiv.append(video);
    }

    //Post text information
    let postTextDiv = $("<div />").addClass("post-title");
    postTextDiv.append(`<h3>${post.text}</h3>`);

    //Post likes information
    let postActionsDiv = $("<div />").addClass("post-actions");
    postActionsDiv.append(
      `<button type="button" name="like" class="like-button">${post.likes}</button>`
    );

    //Adding all the created divs to the main postDiv.
    postDiv.append(authorDiv);
    postDiv.append(postImageDiv);
    postDiv.append(postTextDiv);
    postDiv.append(postActionsDiv);

    $("section.main-container").append(postDiv);
  }
}

function loadPosts() {
  return $.get({
    url: "https://private-anon-87bbb94209-wad20postit.apiary-mock.com/posts",
    success: function (response) {
      return response;
    },
    error: function () {
      alert("Error with reading posts.");
    },
  });
}
