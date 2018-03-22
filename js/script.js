const parsedUrl = new URL(window.location.href);
const postId = parsedUrl.searchParams.get("postId");
const userId = parsedUrl.searchParams.get("userId");

const getData = function (url, callback) {
    const baseUrl = 'https://jsonplaceholder.typicode.com/';
    fetch(baseUrl.concat(url))
        .then(response => response.json())
        .then(json => callback(json));
};

const renderer = function(data, type) {
    let root = document.getElementById('root');
    switch (type) {
        case 'note':
            let note = document.createElement('div');
            note.className ='note';
            note.innerHTML = `
                        <b>Title</b>:${data.title}<br/>
                        <b>Note</b>:${data.body}<br/>
                        <b>Autor</b>:<a href=\"?userId=${data.userId}\">Link</a><br/>
                    `;
            root.appendChild(note);
            break;

        case 'comment':
            let comment = document.createElement('div');
            comment.className = 'comment';
            comment.innerHTML = `
                        <b>Message</b>:<br/>
                        ${data.body}<br/>
                        <b>Author:</b> ${data.name} (${data.email})<br/>
                    `;
            root.appendChild(comment);
            break;

        case 'user':
            let user = document.createElement('div');
            user.className = 'user';
            user.innerHTML = `
                        <b>Name</b>: ${data.name}<br/>
                        <b>Username</b>: ${data.username}<br/>
                        <b>Email</b>: ${data.email}<br/>
                        <b>Phone</b>: ${data.phone}<br/>
                        <b>Email</b>: ${data.email}<br/>
                        <b>Website</b>: ${data.website}<br/>
                        <b>Company</b>: ${data.company.name}<br/>
                        <b>Address</b>:<br/>
                        <b>street</b>: ${data.address.street}<br/>
                        <b>suite</b>: ${data.address.suite}<br/>
                        <b>city</b>: ${data.address.city}<br/>
                        <b>zipcode</b>: ${data.address.zipcode}<br/>
                        <b>geo</b>:<br/>
                        <b>lat</b>: ${data.address.geo.lat}<br/>
                        <b>lng</b>: ${data.address.geo.lng}<br/>
                    `;
            root.appendChild(user);
            break;
    }
};

const showNote = function(note) {
    renderer(note, 'note');
    let showComments = function(comments) {
        if (comments.length > 0) {
            const commentsTitle = document.createElement('span');
            commentsTitle.innerHTML = 'Comments:';
            commentsTitle.className = 'commentTitle';
            document.getElementById('root').appendChild(commentsTitle);

            comments.forEach(function (comment) {
                renderer(comment, 'comment');
            });
        }
    };
    getData('comments?postId=' + note.id, showComments);
};

const showList = function (list) {
    list.forEach(function (note) {
        renderer(note, 'note');
        const showCommentsLink = document.createElement('span');
        showCommentsLink.innerHTML = `<a href="?postId=${note.id}">Show details</a>`;
        document.getElementById('root').appendChild(showCommentsLink);
    });
};

const showUser = function(user) {
    renderer(user, 'user');
};

if (postId !== null) {
    getData('posts/' + postId, showNote);
} else if (userId !== null) {
    getData('users/' + userId, showUser);
} else {
    getData('posts/', showList);
}