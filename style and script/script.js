
const imgUrl = 'https://image.tmdb.org/t/p/w500';

let currentPage = 1;

function getData(category,genre,page,query=""){

    const  searchQuery =  query !="" ? `&query=${query}` : ''

    document.querySelector('#app').innerHTML = '';
    fetch(`https://api.themoviedb.org/3/${category}/${genre}?api_key=9f687e7bb7b3e5f38849015a1e25d7bb&language=en-US&page=${page}${searchQuery}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const html = data.results
                .map(movies => {
                    return `
                        <div class= "movies">
                            <p><img src = "${imgUrl + movies.poster_path}" alt= "${movies.original_title}" /></p><br>
                            <div id= "name">
                            <div><h4><span>${movies.original_name || movies.original_title}</span></h4></div>
                            <div><p>${movies.vote_average + "/10"}</p></div>
                            </div><br>
                            <p>Overview: ${movies.overview}</p><br>
                            ${category != 'tv' ? `<p>Release Date: ${movies.release_date}</p>` :  ''}
                            <p>Release Language: ${movies.original_language}</p><br>
                        </div>
                    `;
                })
                .join("");
                    document.querySelector("#app").insertAdjacentHTML("afterbegin", html);
            
            })
}


switch(window.location.pathname){
    case '/index.html':
        currentPage = 1
        currentCategory = 'movie'
        currentGenre = 'popular'
        getData(currentCategory, currentGenre, 1)
        //getData('search', 'movie', 1,'avengers')
        break
    case '/upcoming.html':
        currentPage = 1
        currentCategory = 'movie'
        currentGenre = 'upcoming'
        getData(currentCategory, currentGenre, 1)
        break
    case '/tv.html':
        currentPage = 1
        currentCategory = 'tv'
        currentGenre = 'popular'
        getData(currentCategory, currentGenre, 1)
        break
    case '/search.html':
        currentPage = 1
        currentCategory = 'search'
        currentGenre = 'movie'
        getData(currentCategory, currentGenre, 1)
};

function getResult(){
    let value = document.querySelector('.search > input').value;
    getData('search', 'movie', 1, value)

};

function getNextPage(){
    currentPage += 1
    getData(currentCategory, currentGenre,currentPage)
};

function getPrevPage(){
    if(currentPage > 1){
        currentPage -= 1
        getData(currentCategory, currentGenre,currentPage)
    }
};


if(window.location.pathname != '/search.html'){
    const nextButton = document.querySelector('.btn > button:nth-child(2)')
    
    nextButton.addEventListener('click',getNextPage)
    
    const prevButton = document.querySelector('.btn > button:nth-child(1)')
    
    prevButton.addEventListener('click', getPrevPage)
}

const toggleButton = document.getElementsByClassName('toggle-button')[0]
const option = document.getElementsByClassName('option')[0]

toggleButton.addEventListener('click', ()=> {
    option.classList.toggle('active')
})