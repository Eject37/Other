// ==UserScript==
// @name         imdb tool
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  try to take over the world!
// @author       Eject
// @match        *://www.imdb.com/title/*
// @match        *://www.imdb.com/search/*
// @match        *://www.imdb.com/search/*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=www.imdb.com
// @grant        none
// ==/UserScript==

if (window.location.href.includes('www.imdb.com/title/')) {
    const download = document.createElement("a");
    download.textContent = ' - Скачать информацию'
    download.style.cursor = 'pointer'
    document.querySelector("div.subpage_title_block h1").appendChild(download)

    download.onclick = () => {
        var seriesName = ''
        document.querySelectorAll('.list_item.odd, .list_item.even').forEach(x => {seriesName += x.querySelector('.info > strong > a').textContent + ' - ' + x.querySelector('.wtw-option-standalone').dataset.tconst + '\n'})
        download.href = "data:text/plain;content-disposition=attachment;filename=file," + seriesName;
        download.download = document.querySelector(".subpage_title_block h3 > a").textContent + ' - ' + document.querySelector('#episode_top').textContent;
        download.id = "download";
    }
}
else if (window.location.href.includes('www.imdb.com/search/name')) {
    const download = document.createElement("a");
    download.textContent = 'Скачать информацию с '
    download.style.color = 'black'
    document.querySelector('.desc').appendChild(download)

    const input = document.createElement("input");
    input.type = 'number'
    input.style.width = '75px'
    input.value = 1
   document.querySelector('.desc').appendChild(input)

    const button = document.createElement("button");
    button.textContent = 'Скачать'
    button.style.marginLeft = '5px'
    document.querySelector('.desc').appendChild(button)

    button.onclick = () => {
        var actors = ''

        if (input.value > 1) {
            document.querySelectorAll('.lister-item.mode-detail').forEach(x => {actors += x.querySelector('h3 > a').textContent.trim() + ' - ' + x.querySelector('h3 > a').href.replace('https://www.imdb.com/name/', '') + '\n'})

            sessionStorage.setItem('flag', 'true')
            sessionStorage.setItem('pages', input.value)
            sessionStorage.setItem('txt', actors)
            sessionStorage.setItem('currentPosition', document.querySelector("div:nth-child(3) > span:nth-child(1)").textContent.split(' of')[0].split('-')[0].replace(',', ''))

            document.querySelector(".lister-page-next.next-page").click()
        }
        else {
            document.querySelectorAll('.lister-item.mode-detail').forEach(x => {actors += x.querySelector('h3 > a').textContent.trim() + ' - ' + x.querySelector('h3 > a').href.replace('https://www.imdb.com/name/', '') + '\n'})
            download.href = "data:text/plain;content-disposition=attachment;filename=file," + actors;
            download.download = document.querySelector("div:nth-child(3) > span:nth-child(1)").textContent.replace('.', '');
            download.id = "download";
            download.click()
        }
    }


    if (sessionStorage.getItem('flag') == 'true') {
        if (sessionStorage.getItem('pages') * 50 + (sessionStorage.getItem('currentPosition') - 1) >= document.querySelector("div:nth-child(3) > span:nth-child(1)").textContent.split(' of')[0].split('-')[1].replace(',', '')) {
            var save = sessionStorage.getItem('txt')
            document.querySelectorAll('.lister-item.mode-detail').forEach(x => {save += x.querySelector('h3 > a').textContent.trim() + ' - ' + x.querySelector('h3 > a').href.replace('https://www.imdb.com/name/', '') + '\n'})
            sessionStorage.setItem('txt', save)
            try { document.querySelector(".lister-page-next.next-page").click() } catch {
                download.href = "data:text/plain;content-disposition=attachment;filename=file," + sessionStorage.getItem('txt');
                download.download = document.querySelector("div:nth-child(3) > span:nth-child(1)").textContent.replace('.', '');
                download.id = "download";
                download.click()

                sessionStorage.removeItem('flag')
                sessionStorage.removeItem('pages')
                sessionStorage.removeItem('txt')
                sessionStorage.removeItem('currentPosition')
            }
        }
        else {
            download.href = "data:text/plain;content-disposition=attachment;filename=file," + sessionStorage.getItem('txt');
            download.download = document.querySelector("div:nth-child(3) > span:nth-child(1)").textContent.replace('.', '');
            download.id = "download";
            download.click()

            sessionStorage.removeItem('flag')
            sessionStorage.removeItem('pages')
            sessionStorage.removeItem('txt')
            sessionStorage.removeItem('currentPosition')
        }
    }
}
else if (window.location.href.includes('www.imdb.com/search/title/')) {
    const download = document.createElement("a");
    download.textContent = 'Скачать информацию с '
    download.style.color = 'black'
    document.querySelector('.desc').appendChild(download)

    const input = document.createElement("input");
    input.type = 'number'
    input.style.width = '75px'
    input.value = 1
   document.querySelector('.desc').appendChild(input)

    const button = document.createElement("button");
    button.textContent = 'Скачать'
    button.style.marginLeft = '5px'
    document.querySelector('.desc').appendChild(button)


    button.onclick = () => {
        var films = ''

        if (input.value > 1) {
            document.querySelectorAll('.lister-item.mode-advanced').forEach(x => {films += x.querySelector('h3 > a').textContent.trim() + ' - ' + x.querySelector('h3 > a').href.replace('https://www.imdb.com/title/', '').replace('/?ref_=adv_li_tt', '') + '\n'})

            sessionStorage.setItem('flag', 'true')
            sessionStorage.setItem('pages', input.value)
            sessionStorage.setItem('txt', films)
            sessionStorage.setItem('currentPosition', document.querySelector("div:nth-child(3) > span:nth-child(1)").textContent.split(' of')[0].split('-')[0].replace(',', ''))

            document.querySelector(".lister-page-next.next-page").click()
        }
        else {
            document.querySelectorAll('.lister-item.mode-advanced').forEach(x => {films += x.querySelector('h3 > a').textContent.trim() + ' - ' + x.querySelector('h3 > a').href.replace('https://www.imdb.com/title/', '').replace('/?ref_=adv_li_tt', '') + '\n'})
            download.href = "data:text/plain;content-disposition=attachment;filename=file," + films;
            download.download = document.querySelector("div:nth-child(3) > span:nth-child(1)").textContent.replace('.', '');
            download.id = "download";
            download.click()
        }
    }


    if (sessionStorage.getItem('flag') == 'true') {
        if (sessionStorage.getItem('pages') * 50 + (sessionStorage.getItem('currentPosition') - 1) >= document.querySelector("div:nth-child(3) > span:nth-child(1)").textContent.split(' of')[0].split('-')[1].replace(',', '')) {
            var savetxt = sessionStorage.getItem('txt')
            document.querySelectorAll('.lister-item.mode-advanced').forEach(x => {savetxt += x.querySelector('h3 > a').textContent.trim() + ' - ' + x.querySelector('h3 > a').href.replace('https://www.imdb.com/title/', '').replace('/?ref_=adv_li_tt', '') + '\n'})
            sessionStorage.setItem('txt', savetxt)
            try { document.querySelector(".lister-page-next.next-page").click() } catch {
                download.href = "data:text/plain;content-disposition=attachment;filename=file," + sessionStorage.getItem('txt');
                download.download = document.querySelector("div:nth-child(3) > span:nth-child(1)").textContent.replace('.', '');
                download.id = "download";
                download.click()

                sessionStorage.removeItem('flag')
                sessionStorage.removeItem('pages')
                sessionStorage.removeItem('txt')
                sessionStorage.removeItem('currentPosition')
            }
        }
        else {
            download.href = "data:text/plain;content-disposition=attachment;filename=file," + sessionStorage.getItem('txt');
            download.download = document.querySelector("div:nth-child(3) > span:nth-child(1)").textContent.replace('.', '');
            download.id = "download";
            download.click()

            sessionStorage.removeItem('flag')
            sessionStorage.removeItem('pages')
            sessionStorage.removeItem('txt')
            sessionStorage.removeItem('currentPosition')
        }
    }
}