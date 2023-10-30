// ==UserScript==
// @name        Hide Left Menu
// @namespace   Violentmonkey Scripts
// @icon          https://github.com/Eject37/ReTube/raw/main/yt-favicon2.ico
// @match       *://*.youtube.com/*
// @grant       none
// @version     1.0
// @author      Eject
// @description 30.10.2023, 22:57:31
// ==/UserScript==

waitSelector('#guide-button').then(selector => {
  selector.click()
})

function waitSelector(selector, limit_data) {
		return new Promise(resolve => {
			if (element = (limit_data?.container || document.body || document).querySelector(selector)) {
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
					&& (element = (limit_data?.container || document?.body || document).querySelector(selector))
				) {
					observer.disconnect();
					return resolve(element);
				}
			})
			observer1
				.observe(limit_data?.container || document.body || document.documentElement || document, {
					childList: true,
					subtree: true,
					attributes: true,
				});
		});
	}