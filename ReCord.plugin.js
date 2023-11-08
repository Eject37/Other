/**
* @name ReCord
* @author Eject
* @description Улучшение дискорда
* @version 1.0
*/
module.exports = class ReCord {
	load() { }
	start() {
		const defaultSettings = {
			RTHeadTop: "100px",
			RTHeadLeft: "100px",
			checkbox1Fixes: false,
			checkbox2RemoveDownloadWarning: false,
			checkbox3EnablePremium: false,
			firstLaunch: false,
			version: "1.0"
		}
		const settings = Object.assign({}, defaultSettings, BdApi.Data.load("ReCord", "settings"))
		document.addEventListener('keyup', function (e) {
			if (e.key == 'F2') {
				const recordMenuStyle = document.querySelector('#record-menu-style')
				if (recordMenuStyle) {
					document.querySelector('#record-menu')?.toggleAttribute('hidden')
					return
				}

				//#region Стили
				pushCSS(`#record-menu {animation: 0.3s show ease; background-color: rgb(37 37 45 / 36%); position: fixed; z-index: 999999; backdrop-filter: blur(10px); filter: drop-shadow(0 0 3px rgba(100,110,115,0.6)); border-radius: 7px} @keyframes show { from { opacity: 0; } to { opacity: 1; } }` +
					'.record-label {font-size: 18px; color: rgb(201 208 211); font-family: "Verdana"; padding-right: 4px; -webkit-user-select: none;} .record-label:not(.info):hover {background: rgba(120 125 130 / 15%); border-radius: 6px}' +
					'.record-additionalDiv:not(.color) {margin-left: 18px}' +
					'input[type="color"] {background: transparent; border: none; width: 25px; height: 25px}' +
					'[record-tooltip] {position: relative} [record-tooltip]::after {content: attr(record-tooltip); position: absolute; white-space: pre; left: 0; top: 0; background: rgb(58, 67, 77); color: #fff; font-weight: 500; font-family: "Verdana"; font-size: 18px; padding: 0.5em; box-shadow: 0 0 10px rgba(0, 0, 0 / 50%); pointer-events: none; opacity: 0; transition: 0.4s; border-radius: 13px; z-index: 999} [record-tooltip]:hover::after {transition-delay: 0.8s; opacity: 1; top: 1.7em}' +
					'.record-button {background: rgb(96 100 110 / 37%); color: rgb(201 208 211); border-radius: 5px; border-color: rgb(72 75 91); border-style: solid; margin: auto; display: flex; font-family: "Verdana"; font-size: 16px; cursor: pointer} .record-button:hover {background: rgb(96 100 110 / 60%)} .record-button:not(.record-button-reset) {margin-bottom: 5px}' +
					'.record-button-reset {display: inline; width: 32px; height: 23px; margin-left: 5px}' +
					'.record-button-hardReset {background: rgb(139 88 107 / 37%); border-color: rgb(91 69 85)} .record-button-hardReset:hover {background: rgb(180 114 139 / 37%)}' +
					'.record-label-additional {padding-left: 8px}' +
					'#rt-tabs {margin-bottom: 3px}' +
					'.rt-button-tab {background: transparent; border: none; border-radius: 10px; margin: 0px 2px; transition: background 0.3s ease, width 0.3s ease; width: 74px} .rt-button-tab.active {background: #8f9fb61f; width: 100px !important} .rt-button-tab:not(.active):hover {background: #96989b12} .rt-button-tab:focus {outline: none} .rt-button-settings-tab.active { width: 85px !important }' +
					'.rt-label-tabs {display: flex; flex-direction: column; font-size: 18px; color: rgb(201 208 211); font-family: "Verdana";}' +
					'.rt-label-settings-tabs {display: flex; flex-direction: column; font-size: 15px; color: rgb(201 208 211); font-family: "Verdana";}' +
					'.img-tab-icon {width: 30px; pointer-events: none}' +
					'.fade-in {opacity: 1; transition: opacity 0.3s ease} .fade-out {opacity: 0; max-height: 0; pointer-events: none}' +
					'.rt-title {margin-left: 4px; font-size: 22px; font-weight: bold}' +
					'.rt-select {border-color: rgb(72 75 91); border-radius: 10px; color: rgb(201 208 211); background: rgb(96 100 110 / 37%); height: 27px; margin-left: 3px;} .rt-select:focus {outline: none}' +
					'option {border-color: rgb(72 75 91); border-radius: 10px; background: rgb(96 100 110)}' +
					'.rt-label-head {font-weight: bold; margin-left: 6px; font-size: 20px; pointer-events: none} #rt-head {background: linear-gradient(rgb(67 77 105 / 37%), transparent); border-radius: 20px; display: flex; justify-content: space-between}' +
					'#rt-close-head {margin-left: auto}'
					, 'record-menu-style')
				//#endregion

				//#region Основа меню
				document.querySelector('body').insertAdjacentHTML('beforeend', '<div id="record-menu"></div>')
				document.querySelector('#record-menu').insertAdjacentHTML('beforeend', '<div id="rt-head"><span class="record-label rt-label-head">ReCord</span><span id="rt-close-head"><img src="https://i.imgur.com/ibUUDqp.png" style="width: 21px; margin-right: 4px" id="rt-closeImg-head" /></span></div>')
				document.querySelector('#record-menu').insertAdjacentHTML('beforeend', '<div id="rt-tabs"><button class="rt-button-tab" data-tab="1"><img src="https://i.imgur.com/UW7uxaH.png" class="img-tab-icon" style="width: 27px; height: 27px;" /><span class="rt-label-tabs">Main</span></button><button class="rt-button-tab" data-tab="2"><img src="https://i.imgur.com/fKkwgP1.png" class="img-tab-icon" /><span class="rt-label-tabs">Info</span></button></div>')
				document.querySelector('#record-menu').insertAdjacentHTML('beforeend', '<div id="record-tab1"></div>')
				document.querySelector('#record-menu').insertAdjacentHTML('beforeend', '<div id="record-tab2"></div>')
				//#endregion

				//#region Таб Главная
				document.querySelector('#record-tab1').insertAdjacentHTML('beforeend', '<div><label class="record-label"><input type="checkbox" id="rt-checkboxFixes"></input>Разные фиксы и улучшения</label></div>')
				document.querySelector('#record-tab1').insertAdjacentHTML('beforeend', '<div><label class="record-label"><input type="checkbox" id="rt-checkboxRemoveDownloadWarning"></input>Убрать предупреждение при скачивании файлов</label></div>')
				document.querySelector('#record-tab1').insertAdjacentHTML('beforeend', '<div><label class="record-label"><input type="checkbox" id="rt-checkboxEnablePremium"></input>Активировать Nitro (не рекомендуется)</label></div>')
				document.querySelector('#record-tab1').insertAdjacentHTML('beforeend', '<br/><button class="record-button record-button-save">Сохранить</button>')
				//#endregion

				//#region Таб Инфо
				document.querySelector('#record-tab2').insertAdjacentHTML('beforeend', `<br/><div class="record-label info" style="text-align: center; font-size: 24px; font-weight: bold">ReCord v${settings.version}</div>`)
				document.querySelector('#record-tab2').insertAdjacentHTML('beforeend', '<div class="record-label info" style="text-align: center;">Разработчик скрипта: Сергей (Eject)</div>')
				document.querySelector('#record-tab2').insertAdjacentHTML('beforeend', '<div><br/><button class="record-button record-button-discord" onclick="window.open(`https://discord.gg/NG6ZxXCXeU`)">Мой Discord сервер</button></div>')
				document.querySelector('#record-tab2').insertAdjacentHTML('beforeend', '<div><br/><button class="record-button record-button-hardReset">Сбросить ВСЕ настройки ReCord</button></div>')
				//#endregion

				//#region Переключение табов
				document.querySelectorAll('button[data-tab]').forEach(button => {
					button.addEventListener('click', function () {
						const tabId = button.getAttribute('data-tab');
						document.querySelectorAll('div[id^="record-tab"]').forEach(el => {
							el.classList.remove('fade-in')
							el.classList.add('fade-out')
						})
						document.querySelector(`#record-tab${tabId}`).classList.remove('fade-out')
						document.querySelector(`#record-tab${tabId}`).classList.add('fade-in')
						document.querySelectorAll('button[data-tab]').forEach(x => x.classList.remove('active'))
						button.classList.add('active')
					})
				})

				document.querySelector('button[data-tab="1"]').dispatchEvent(new Event('click', { bubbles: true }))
				//#endregion

				//#region Настройки и сохранение
				document.querySelector('#record-menu').style.top = settings.RTHeadTop
				document.querySelector('#record-menu').style.left = settings.RTHeadLeft

				const checkboxFixes = document.querySelector('#rt-checkboxFixes')
				const checkboxRemoveDownloadWarning = document.querySelector('#rt-checkboxRemoveDownloadWarning')
				const checkboxEnablePremium = document.querySelector('#rt-checkboxEnablePremium')
				checkboxFixes.checked = settings.checkbox1Fixes
				checkboxRemoveDownloadWarning.checked = settings.checkbox2RemoveDownloadWarning
				checkboxEnablePremium.checked = settings.checkbox3EnablePremium

				document.querySelectorAll('.record-button-save').forEach(x => x.addEventListener('click', function () {
					settings.RTHeadTop = document.querySelector('#record-menu').style.top
					settings.RTHeadLeft = document.querySelector('#record-menu').style.left
					settings.firstLaunch = true

					settings.checkbox1Fixes = checkboxFixes.checked
					settings.checkbox2RemoveDownloadWarning = checkboxRemoveDownloadWarning.checked
					settings.checkbox3EnablePremium = checkboxEnablePremium.checked

					BdApi.Data.save("ReCord", "settings", settings);

					x.textContent = 'Успешно сохранено'
					setTimeout(() => x.textContent = 'Сохранить', 1000)
				}))
				//#endregion

				//#region Функциональность всех кнопок|панелей|колорпикеров
				checkboxFixes.addEventListener('change', e => Fixes(e.target.checked))
				checkboxRemoveDownloadWarning.addEventListener('change', e => { if (e.target.checked) RemoveDownloadWarning() })
				checkboxEnablePremium.addEventListener('change', e => EnablePremium(e.target.checked))

				document.querySelectorAll('.record-label').forEach(label => {
					const tooltipText = label.getAttribute('record-tooltip')
					if (tooltipText?.includes('http')) {
						const randomNumber = getRandomInt()
						label.classList.add('RT' + randomNumber)

						const tooltipStyle = document.createElement('style')
						tooltipStyle.innerHTML = `.record-label.RT${randomNumber}::after {content: "" !important; background-image: url("${tooltipText}"); background-size: cover; width: 400px; height: 225px}`
						document.head.appendChild(tooltipStyle)
					}
					else if (tooltipText?.includes('||')) {
						const randomNumber = getRandomInt()
						label.classList.add('RT' + randomNumber)

						const tooltipStyle = document.createElement('style')
						tooltipStyle.innerHTML = `.record-label.RT${randomNumber}::after {content: "${tooltipText.replaceAll('||', '\\a')}" !important; white-space: pre}`
						document.head.appendChild(tooltipStyle)
					}

					function getRandomInt() {
						return Math.floor(Math.random() * 100000);
					}
				})
				const dragHeader = (() => {
					let isDragging = false
					let offsetX, offsetY

					const draggableWindow = document.querySelector('#record-menu')
					const windowPadding = 10
					const snapDistance = 20

					const setPosition = (x, y) => {
						draggableWindow.style.left = x + 'px'
						draggableWindow.style.top = y + 'px'
					}

					return (e) => {
						switch (e.type) {
							case 'mousedown':
								e.preventDefault()
								isDragging = true
								const { offsetLeft, offsetTop } = draggableWindow
								offsetX = e.clientX - offsetLeft
								offsetY = e.clientY - offsetTop
								break
							case 'mousemove':
								if (!isDragging) return
								const { clientX, clientY } = e
								const x = clientX - offsetX
								const y = clientY - offsetY

								const snapXLeft = x <= snapDistance ? windowPadding : null
								const snapXRight = x >= window.innerWidth - draggableWindow.offsetWidth - (snapDistance + 10) ? window.innerWidth - draggableWindow.offsetWidth - (windowPadding + 10) : null
								const snapYTop = y <= snapDistance ? windowPadding : null
								const snapYBottom = y >= window.innerHeight - draggableWindow.offsetHeight - snapDistance ? window.innerHeight - draggableWindow.offsetHeight - windowPadding : null

								setPosition(snapXLeft !== null ? snapXLeft : snapXRight !== null ? snapXRight : x, snapYTop !== null ? snapYTop : snapYBottom !== null ? snapYBottom : y)
								break
							case 'mouseup':
								isDragging = false
								break
						}
					}
				})()
				document.querySelector('#rt-head').addEventListener('mousedown', dragHeader)
				document.addEventListener('mousemove', dragHeader)
				document.addEventListener('mouseup', dragHeader)
				document.querySelector('#rt-closeImg-head').addEventListener('click', () => document.querySelector('#record-menu')?.toggleAttribute('hidden'))
				//#endregion
			}
		})

		if (document.readyState !== 'loading') ReCord(); else document.addEventListener('DOMContentLoaded', ReCord)
		function ReCord() {
			if (!settings.firstLaunch) {
				BdApi.alert('ReCord', "Что-бы открыть меню настроек, нажмите F2.")
			}

			if (settings.checkbox1Fixes) Fixes(true)
			if (settings.checkbox2RemoveDownloadWarning) RemoveDownloadWarning()
			if (settings.checkbox3EnablePremium) EnablePremium(true)
		}

		//#region Функции
		function Fixes(enable) {
			// waitSelector('.header_f72511 > div').then(selector => {
			// 	selector.textContent = `Настройки${enable ? '' : ' пользователя'}`
			// })
		}
		function RemoveDownloadWarning() {
			fix()
			function fix() {
				waitSelector('[role=button][rel="noreferrer noopener"][href*="https://cdn.discordapp"]').then(selector => {
					selector.addEventListener('click', e => {
						e.preventDefault()
						e.stopPropagation()
						e.stopImmediatePropagation()
						window.open(selector.href)
					})
					selector.rel += ' removed'
					fix()
				})
			}
		}
		function EnablePremium(enable) {
			window.webpackChunkdiscord_app.push([[Math.random()], {}, (req) => { for (const m of Object.keys(req.c).map((x) => req.c[x].exports).filter((x) => x)) { if (m.default && m.default.getCurrentUser !== undefined) { return m.default.getCurrentUser().premiumType = enable ? 2 : null; } } }]);
		}
		//#endregion
		//#region Доп функции
		function pushCSS(value, id) {
			const style = document.head.appendChild(document.createElement('style'))
			style.textContent = value
			if (id) style.id = id
		}
		function waitSelector(selector, limit_data) {
			return new Promise(resolve => {
				let element
				let parentEl
				if (element = (document.body || document).querySelector(selector)) {
					return resolve(element);
				}
				const observer1 = new MutationObserver((mutationRecordsArray, observer) => {
					for (const record of mutationRecordsArray) {
						for (const node of record.addedNodes) {
							if (![1, 3, 8].includes(node.nodeType) || !(node instanceof HTMLElement)) continue;
							if (node.matches && node.matches(selector)) {
								observer.disconnect();
								return resolve(node);
							}
							else if (
								(parentEl = node.parentElement || node)
								&& (parentEl instanceof HTMLElement)
								&& (element = parentEl.querySelector(selector))
							) {
								observer.disconnect();
								return resolve(element);
							}
						}
					}
					if (document?.readyState != 'loading'
						&& (element = (document?.body || document).querySelector(selector))
					) {
						observer.disconnect();
						return resolve(element);
					}
				})
				observer1
					.observe(document.body || document.documentElement || document, {
						childList: true,
						subtree: true,
						attributes: true,
					});
			});
		}
		//#endregion
	}
	stop() {
		document.querySelector('#record-menu')?.remove()
		document.querySelector('#record-menu-style')?.remove()
		Fixes(false)
		EnablePremium(false)
	}
}