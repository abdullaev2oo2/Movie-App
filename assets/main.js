window.addEventListener('DOMContentLoaded', () => {
    //  Loader
    const loader = document.querySelector('.loader')

    setTimeout(() => {
        loader.style.opacity = '0'
        setTimeout(() => {
            loader.style.display = 'none'
        }, 500);
    }, 1500);

    // Fetch to API
    const APImain =
        'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';

    const APIcartoons =
        'https://api.themoviedb.org/3/discover/movie?with_genres=16&api_key=04c35731a5ee918f014970082a0088b1';

    const APImovies =
        'https://api.themoviedb.org/3/discover/movie?with_genres=878&api_key=04c35731a5ee918f014970082a0088b1';

    const APIpopular =
        'https://api.themoviedb.org/3/discover/movie?with_genres=28,18&sort_by=revenue.desc&api_key=04c35731a5ee918f014970082a0088b1';

    const APIsearch =
        'https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&query=';

    const IMGPATH =
        'https://image.tmdb.org/t/p/w1280'

    const cartoons = document.querySelector('#cartoons');
    const movies = document.querySelector('#movies');
    const popular = document.querySelector('#popular');
    const main = document.querySelector('#main');
    const form = document.querySelector('#form');
    const search = document.querySelector('.search');
    const footer = document.querySelectorAll('footer');


    // Adding elements to page
    if (main) {
        main.classList.add('padding');
        getMovies(APImain, main);
    }
    if (cartoons) {
        cartoons.classList.add('padding');
        getMovies(APIcartoons, cartoons);
    }
    if (movies) {
        movies.classList.add('padding');
        getMovies(APImovies, movies);
    }
    if (popular) {
        popular.classList.add('padding');
        getMovies(APIpopular, popular);
    }

    async function getMovies(url, body) {
        const resp = await fetch(url);
        const respData = await resp.json();
        // console.log(respData);
        body.innerHTML = '';

        respData.results.forEach((movie) => {
            const {
                poster_path,
                title,
                vote_average
            } = movie;
            const movieEl = document.createElement('div');
            movieEl.classList.add('movie');
            movieEl.innerHTML = `
                <img class="movie-img" src="${IMGPATH + poster_path}" alt="${title}">
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${getClassByRate(vote_average)}">${voteAverage(vote_average)}</span>
                </div>
                <div class="learn-more">
                    <a href="#" class="learn-more-btn">Learn more</a>
                </div>
                `;
            if (poster_path != null) {
                body.appendChild(movieEl);
            };

            function voteAverage(result) {
                switch (result) {
                    default:
                        result;
                        break;
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                        result += '.0'
                        break;
                }
                return result;
            }
        });

        function voteAverage(result) {
            switch (result) {
                default:
                    result;
                    break;
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                    result += '.0'
                    break;
            }
            return result;
        }

        const footer = document.querySelector('footer');
        const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
        learnMoreBtns.forEach((learnMoreBtn, index, arr) => {
            learnMoreBtn.addEventListener('click', () => {
                for (i = 0; i < respData.results.length; i++) {
                    if (index == i && body == main) {
                        console.log(`Hello World = ${i}`);
                        moviePageElements(i, main);
                    }
                    if (index == i && body == cartoons) {
                        console.log(`Hello World = ${i}`);
                        moviePageElements(i, cartoons);
                    }
                    if (index == i && body == movies) {
                        console.log(`Hello World = ${i}`);
                        moviePageElements(i, movies);
                    }
                    if (index == i && body == popular) {
                        console.log(`Hello World = ${i}`);
                        moviePageElements(i, popular);
                    }
                }
            })
        })

        function moviePageElements(a, body) {
            body.classList.add('movie-page-main');
            footer.classList.add('hidden');
            body.innerHTML = `
                <div class="wrapper" style="background: url(${IMGPATH + respData.results[a].backdrop_path})">
                    <div class="movie-page">
                        <div class="movie-page-header">
                            <h1 class="name">${respData.results[a].title}</h1>
                            <h1 class="score ${getClassByRate(respData.results[a].vote_average)}">${voteAverage(respData.results[a].vote_average)}</h1>
                        </div>
                        <div class="movie-page-body">
                            <div class="movie-page-body__overview">
                                <h1>Overview</h1>
                                <p>
                                ${respData.results[a].overview}
                                </p>
                                <h1>Details</h1>
                                <ul class="movie-page-body__overview-ul">
                                        <li class="movie-page-body__overview-li">Original language :   ${respData.results[a].original_language}</li>
                                        <li class="movie-page-body__overview-li">Release date <span>: ${respData.results[a].release_date}</span></li>
                                </ul>
                            </div>
                            <div class="movie-page-body__image">
                                <img src="${IMGPATH + respData.results[a].poster_path}" alt="${respData.results[a].title}">
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    function getClassByRate(vote) {
        if (vote >= 8) {
            return 'green'
        } else if (vote >= 5) {
            return "orange"
        } else {
            return 'red'
        }
    }
    const searchBtnForm = document.querySelector('#search-btn-submit');
    const searchBtn = document.querySelector('#search-btn');
    const searchForm = document.querySelector('#form');
    const logo = document.querySelector('#logo');
    const navBtn = document.querySelector('#nav-btn');
    const closeBtn = document.querySelector('#nav-btn-close');
    const mobileNav = document.querySelector('.mobile-nav');
    const header = document.querySelector('header');

    function removingClassesofMoviePage() {
        if (main) main.classList.remove('movie-page-main');
        if (cartoons) cartoons.classList.remove('movie-page-main');
        if (movies) movies.classList.remove('movie-page-main');
        if (popular) popular.classList.remove('movie-page-main');
        if (footer) footer.forEach(footerEl => {
            footerEl.classList.remove('hidden');
        });
    }
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        searchMovie();
        removingClassesofMoviePage();
    });

    searchBtnForm.addEventListener('click', (e) => {
        e.preventDefault();
        searchMovie();
        removingClassesofMoviePage();
    });

    // Function for searching
    function searchMovie() {
        const searchTerm = search.value;

        if (searchTerm, main) {

            getMovies(APIsearch + searchTerm, main);

            search.value = '';
        }
        if (searchTerm, cartoons) {

            getMovies(APIsearch + searchTerm, cartoons);

            search.value = '';
        }
        if (searchTerm, movies) {

            getMovies(APIsearch + searchTerm, movies);

            search.value = '';
        }
        if (searchTerm, popular) {

            getMovies(APIsearch + searchTerm, popular);

            search.value = '';
        }
    }

    searchBtn.addEventListener('click', () => {
        if (searchBtn.classList.contains('hidden')) {
            searchForm.classList.remove('opened');
        } else {
            searchForm.classList.add('opened');
            searchBtn.classList.add('hidden');
            navBtn.classList.add('hidden');
            logo.classList.add('hidden');
            closeBtn.classList.remove('hidden');

            if (logo.classList.contains('hidden')) {
                header.style.justifyContent = 'end';
            } else {
                header.style.justifyContent = 'center';
            }

            if (mobileNav.classList.contains('opened')) {
                mobileNav.classList.remove('opened');
            }
        }
    });
    navBtn.addEventListener('click', () => {
        if (navBtn.classList.contains('hidden')) {

        } else {
            navBtn.classList.add('hidden');
            closeBtn.classList.remove('hidden');
            mobileNav.classList.add('opened')
            disableScroll()
        }
    })
    closeBtn.addEventListener('click', () => {
        if (closeBtn.classList.contains('hdden')) {
            navBtn.classList.remove('hidden');
        } else {
            closeBtn.classList.add('hidden');
            navBtn.classList.remove('hidden')
            mobileNav.classList.remove('opened')
            enableScroll()
            if (searchForm.classList.contains('opened')) {
                searchForm.classList.remove('opened');
                searchBtn.classList.remove('hidden');
                navBtn.classList.remove('hidden');
                logo.classList.remove('hidden');
            }
            if (logo.classList.contains('hidden')) {
                header.style.justifyContent = 'end';
            } else {
                header.style.justifyContent = 'center';
            }
        }
    })

    // Enabling and disabling the scroll for mobile navigation    
    function disableScroll() {
        scrollTop = document.documentElement.scrollTop;
        scrollLeft = document.documentElement.scrollLeft;

        window.onscroll = function () {
            window.scrollTo(scrollLeft, scrollTop)
        };
    }

    function enableScroll() {
        window.onscroll = function () {}
    }
})