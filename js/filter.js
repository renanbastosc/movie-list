(function () {
    document.querySelectorAll('.filter').forEach(function (filter, i) {
        filter.addEventListener('click', function () {
            listMovies();
        });
    });

    var timeout;
    document.querySelector('.filter-search').addEventListener('keypress', function (press) {
        if (press.key === 'Enter') {
            listMovies();
        }
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            listMovies();
        }, 300);
    });
})();