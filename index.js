const searchEl = document.getElementById('input')
const formEl = document.querySelector('.search-form')
const mainEl = document.querySelector('.main')
const loadingOverlay = document.getElementById('loading-overlay');
loadingOverlay.style.display = 'none'


async function getData(movieId) {
    const res = await fetch(`http://www.omdbapi.com/?apikey=5a7bd67e&i=${movieId}`)
    const data = await res.json()
    return data
}


formEl.onsubmit = async (e) => {
    e.preventDefault();
    let movie = searchEl.value;
    mainEl.innerHTML = `<div id="loading-overlay">
                            <div class="loading-spinner"></div>
                        </div>`

    // Show the loading overlay before fetching data
    loadingOverlay.style.display = 'flex';

    try {
        const res = await fetch(`http://www.omdbapi.com/?i=tt1630029&apikey=5a7bd67e&s=${movie}`);
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
                </div>
            </section>`;
        }
        mainEl.innerHTML = html;
        mainEl.classList.add("fade-in");


    } catch (error) {
        console.error(error);
    } finally {
        // Hide the loading overlay after fetching and rendering data
        loadingOverlay.style.display = 'none';
    }
};

