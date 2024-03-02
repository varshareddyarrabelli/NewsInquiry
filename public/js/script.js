const apiKey = 'ece6d03b5f0c44eabae3ffd4afd170b6';
document.addEventListener('DOMContentLoaded', getData("everything"));
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", searchQuery);
function searchQuery() {
    var searchValue = document.getElementById("search-box").value;
    if (searchValue) {
        var query = searchValue;
        getData(query);
    }
}

async function getData(query) {

    try {
        const response = await fetch(`http://localhost:3000/news?search=${query}`);
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

function truncateTitle(text, maxLength) {
    if (text && text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    } else {
        return text;
    }
}

function displayData(data) {
    const appDiv = document.getElementById("news-cards");
    appDiv.innerHTML = "";
    if (Array.isArray(data.articles)) {
        data.articles.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add("card");
            var img = document.createElement('img');
            var title = document.createElement('h3');
            var description = document.createElement('p');
            if (post.urlToImage) {
                img.src = post.urlToImage;
                title.innerHTML = truncateTitle(post.title, 50);
                description.innerHTML = truncateTitle(post.description, 140);

            }
            else {
                title.innerHTML = truncateTitle(post.title, 70);
                description.innerHTML = truncateTitle(post.description, 250);
            }
            postElement.appendChild(img);
            postElement.appendChild(title);
            postElement.appendChild(description);
            postElement.addEventListener("click", function () {
                console.log(post.url);
                window.open(post.url, '_blank');
            });
            appDiv.appendChild(postElement);
        });
    }
    else {
        console.log('Invalid data structure:', data);
    }
}
