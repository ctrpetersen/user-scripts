// ==UserScript==
// @name         Letterboxd Link on IMDb
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.imdb.com/title/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=imdb.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    (new MutationObserver(check)).observe(document, { childList: true, subtree: true });

    function check(changes, observer) {
        if (document.querySelector('.sc-80d4314-2')) {
            observer.disconnect();
            const listEl = document.getElementsByClassName('sc-80d4314-2 iJtmbR')[0].childNodes[0];
            let movieTitle = '';

            if (document.getElementsByClassName('sc-b73cd867-0 fbOhB')[0]) {
                movieTitle = document.getElementsByClassName('sc-b73cd867-0 fbOhB')[0].innerHTML.toLowerCase()
            }
            else if (document.getElementsByClassName('sc-b73cd867-0 eKrKux')[0]) {
                movieTitle = document.getElementsByClassName('sc-b73cd867-0 eKrKux')[0].innerHTML.toLowerCase()
            }

            const movieReleaseYear = listEl.children[0].children[0].innerHTML;

            const letterboxdLink = document.createElement('li');
            letterboxdLink.className = 'ipc-inline-list__item';
            letterboxdLink.innerHTML = `<a href="https://letterboxd.com/film/${movieTitle.replaceAll(': ', '-').replaceAll(' ', '-')}/" class="ipc-link ipc-link--baseAlt ipc-link--inherit-color sc-8c396aa2-1 WIUyh">Letterboxd link</a>`

            const letterboxdSearchLink = document.createElement('li');
            letterboxdSearchLink.className = 'ipc-inline-list__item';
            letterboxdSearchLink.innerHTML = `<a href="${encodeURI(`https://letterboxd.com/search/${movieTitle} ${movieReleaseYear}`)}" class="ipc-link ipc-link--baseAlt ipc-link--inherit-color sc-8c396aa2-1 WIUyh">Letterboxd search</a>`

            listEl.appendChild(letterboxdLink);
            listEl.appendChild(letterboxdSearchLink);
        }
    }
})();