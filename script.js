const apiKey = 'ece6d03b5f0c44eabae3ffd4afd170b6';

document.addEventListener('DOMContentLoaded', getData);
function getData() {
    fetch('https://newsapi.org/v2/everything?q=everything&apiKey=ece6d03b5f0c44eabae3ffd4afd170b6&PageSize=10')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayData(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayData(data) {
    const appDiv = document.getElementById("news-cards");
    if (Array.isArray(data.articles)) {
        data.articles.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add("card");
            var img = document.createElement('img');
            var title = document.createElement('h3');
            var description = document.createElement('p');
            img.src = post.urlToImage;
            title.innerHTML = post.title;
            description.innerHTML = post.description;
            postElement.appendChild(img);
            postElement.appendChild(title);
            postElement.appendChild(description);
            appDiv.appendChild(postElement);
        });
    }
    else {
        console.log('Invalid data structure:', data);
    }

}
