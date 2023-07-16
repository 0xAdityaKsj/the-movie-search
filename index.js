const searchEl = document.getElementById('input')
const formEl = document.querySelector('.search-form')
const mainEl = document.querySelector('.main')

async function getData() {
    const res = await fetch("http://www.omdbapi.com/?i=tt1630029&apikey=5a7bd67e&s=joker")
    const data = await res.json()

    console.log(data.Search)
}


funciton








formEl.onsubmit = async (e) => {
    e.preventDefault()
    let movie = searchEl.value
    const res = await fetch(`http://www.omdbapi.com/?i=tt1630029&apikey=5a7bd67e&s=${movie}`)
    const data = await res.json()
    console.log(data.Search)
    let html = ''
    for (item in data.Search) {

        html += `<section>
                    <div class="sec1">
                        <img src="${data.Search[item].Poster}" alt="">

                    </div>
                    <div class="sec2">
                        <h1>${data.Search[item].Title}</h1>
                        <p>117min Action,drama scifi </p>
                        <p>
                            desc heres
                        </p>
                    </div>
                </section>`

    }

    mainEl.innerHTML = html
}