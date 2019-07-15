function listMovies() {
    var city_id = document.querySelector('.filter-city').value;
    var search = document.querySelector('.filter-search').value;
    var types = [];
    document.querySelectorAll('.filter-type:checked').forEach(function (item) {
        types.push(item.value);
    });

    var xrh = new XMLHttpRequest;
    xrh.open('GET', 'https://api-content.ingresso.com/v0/templates/highlights/' + city_id + '/partnership/home');

    xrh.onreadystatechange = function () {
        if (xrh.readyState === 4) {
            var container = document.querySelector('#movies');
            container.innerHTML = "";
            var request = JSON.parse(xrh.responseText);
            
            if (search) {
                request = request.filter(function (item) {
                    return item.event.title.toLowerCase().indexOf(search.toLowerCase()) >= 0 || item.event.originalTitle.toLowerCase().indexOf(search.toLowerCase()) >= 0;
                });
            }

            if (types.length > 0) {
                request = request.filter(function (item) {
                    var sessions = item.showtimes
                        .flatMap(function (showtimes) {
                            return showtimes.rooms;
                        }).flatMap(function (rooms) {
                            return rooms.sessions;
                        }).flatMap(function (sessions) {
                            return sessions.type
                        });
                    for (var i = 0; i < types.length; i++) {
                        if (sessions.includes(types[i])) {
                            return true;
                        }
                    }
                    return false;
                });
            }

            for (r in request) {
                var event = request[r].event;
                var link = event.trailers ? event.trailers[0].url : event.siteURL;
                var tags = event.tags.map(function (tag) {
                    return `<label class="movie__tag">${tag}</label>`;
                }).join('');

                var movie = `<div class="movie">
                                <a href="${link}" target="_blank" title="${event.synopsis}">
                                    <img class="movie__poster" src="${event.images[0].url}">
                                    <!--  <div class="tags"> ${tags}</div> 
                                        // comentei, pois não consegui fazer as tags ficarem por cima da imagem
                                    -->
                                </a>
                                <h3 class="movie__title">${event.title}</h3>
                            </div>`;
                container.innerHTML += movie;
            }
        }
    }
    xrh.send();
}