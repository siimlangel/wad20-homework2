const posts = []

$(function () {
    loadPosts().then(function (response) {
        for(let post of response) {
            console.log(post.author.firstname);
        }
    })


});

function loadPosts() {
    return $.get(
        {
            url: 'https://private-anon-87bbb94209-wad20postit.apiary-mock.com/posts',
            success: function (response) {
                return response;
            },
            error: function () {
                alert('Error with reading posts.')
            }
        }
    );
}
