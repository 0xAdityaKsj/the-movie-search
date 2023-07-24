const searchEl = document.getElementById('input')
const formEl = document.querySelector('.search-form')
const btnEl = document.querySelector('.button')
const mainEl = document.querySelector('.main')
const aboutEl = document.querySelector('.about')
const loadingOverlay = document.getElementById('loading-overlay');
loadingOverlay.style.display = 'none'




async function getData(movieId) {
    const res = await fetch(`https://www.omdbapi.com/?apikey=5a7bd67e&i=${movieId}`)
    const data = await res.json()
    return data
}

function renderAbout() {
    const storedMovieData = localStorage.getItem('movieData');
    const retrievedMovieData = JSON.parse(storedMovieData);

    const { poster, title, runtime, genre, plot } = retrievedMovieData



    let html = ''


    html += `<section>
    <div class="sec1">
        <img src="${poster}" alt="">
    </div>
    <div class="sec2">
        <h1>${title}</h1>
        <p>${runtime},${genre}</p>
        <p>
            ${plot}
        </p>
        <div class="add-to-list">
            add to watch-list
        </div>
    </div>
</section>`

    aboutEl.innerHTML = html

}



btnEl.addEventListener("click", async function (e) {
    e.preventDefault();
    let movie = searchEl.value;
    mainEl.innerHTML = `<div id="loading-overlay">
                            <div class="loading-spinner"></div>
                        </div>`

    // Show the loading overlay before fetching data
    loadingOverlay.style.display = 'flex';

    try {
        const res = await fetch(`https://www.omdbapi.com/?i=tt1630029&apikey=5a7bd67e&s=${movie}`);
        const data = await res.json();
        console.log(data.Search);
        let html = '';
        for (item in data.Search) {
            const details = await getData(data.Search[item].imdbID);
            const { Runtime, Genre, Plot } = details;
            html += `<section>
                <div class="sec1">
                    <img src="${data.Search[item].Poster}" alt="">
                </div>
                <div class="sec2">
                    <h1>${data.Search[item].Title}</h1>
                    <p>${Runtime},${Genre}</p>
                    <p>
                        ${Plot}
                    </p>
                    <div class="add-to-list" data-title="${data.Search[item].Title}">
                        add to watch-list
                    </div>
                </div>
            </section>`
        }
        mainEl.innerHTML = html;
        mainEl.classList.add("fade-in");


    } catch (error) {
        console.error(error);
    } finally {
        // Hide the loading overlay after fetching and rendering data
        loadingOverlay.style.display = 'none';
    }
})





mainEl.addEventListener("click", function (event) {
    // Traverse up the DOM tree from the clicked element to find the "add-to-list" button or any of its ancestors.
    const addToWatchListButton = event.target.closest(".add-to-list");

    // Check if the "add-to-list" button or any of its ancestors was clicked.
    if (addToWatchListButton) {
        mainEl.addEventListener("click", async function (event) {
            // Traverse up the DOM tree from the clicked element to find the "add-to-list" button or any of its ancestors.
            const addToWatchListButton = event.target.closest(".add-to-list");
            console.log(event.target)

            // Check if the "add-to-list" button or any of its ancestors was clicked.
            if (addToWatchListButton) {

                try {
                    console.log('clicked')
                    let movie = searchEl.value;
                    console.log('movie is ' + movie)
                    const res = await fetch(`https://www.omdbapi.com/?i=tt1630029&apikey=5a7bd67e&s=${movie}`);
                    const data = await res.json();
                    let html = '';
                    for (item in data.Search) {
                        if (event.target.getAttribute('data-title') === data.Search[item].Title) {

                            const details = await getData(data.Search[item].imdbID);
                            console.log(details)
                            const { Runtime, Genre, Plot } = details;
                            const movieData = {
                                poster: data.Search[item].Poster,
                                title: data.Search[item].Title,
                                runtime: Runtime,
                                genre: Genre,
                                plot: Plot
                            };

                            localStorage.setItem('movieData', JSON.stringify(movieData));
                            renderAbout()
                            break


                        }
                        else {
                            console.log("no title found")
                        }

                    }




                } catch (error) {
                    console.error(error);
                }
            }
        });

    }
});

