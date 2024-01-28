const form = document.querySelector('form');
const input = document.querySelector('input');
const main = document.querySelector('main');
const footer = document.querySelector('footer');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    getVideo(input.value)
})

function getVideo(text) {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyB5nX8yZf5VQi0g7V7FWwpJ6YSrOTK8b10&q=${text}&type=video`)
        .then((response) => response.json())
        .then((data) => {
            let videoid = data.items[0].id.videoId
            console.log(videoid)
            console.log(data)
            createPlayer(videoid)
            data.items.forEach(item => createPreview(item.snippet.thumbnails.default.url))
            const pics = document.querySelectorAll('img');
            pics.forEach(item => {
                item.addEventListener('click', (event) => {
                    console.log(event.target)
                    let url = event.target.getAttribute('src')
                    console.log(url)
                    const urlArray = url.split('/');
                    //url = url[-1]
                    console.log(urlArray[urlArray.length - 2])
                    createPlayer(urlArray[urlArray.length - 2])
                })
            })
        });
}

function createPlayer(id) {
    const iframe = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`
    main.innerHTML = iframe

}

function createPreview(url) {
    const img = `<img src='${url}'>`
    footer.innerHTML += img
}