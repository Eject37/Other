// ==UserScript==
// @name         imdb series extractor
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Eject
// @match        *://www.imdb.com/title/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=imdb.com
// @grant        none
// ==/UserScript==

var seriesName = ''
document.querySelectorAll('.list_item.odd, .list_item.even').forEach(x => {seriesName += x.querySelector('.info > strong > a').textContent + ' - ' + x.querySelector('.wtw-option-standalone').dataset.tconst + '\n'})

function writeFile(name, value) {
var val = value;
if (value === undefined) {
val = "";
}
var download = document.createElement("a");
download.href = "data:text/plain;content-disposition=attachment;filename=file," + val;
download.download = name;
download.textContent = ' Скачать информацию'
document.querySelector("div.subpage_title_block h1").appendChild(download)
download.style.cursor = 'pointer'
download.id = "download";
}

writeFile(document.querySelector(".subpage_title_block h3 > a").textContent + ' - ' + document.querySelector('#episode_top').textContent, seriesName);