// connection with functions.js
import { isMobile } from './functions.js'
// connection with active module
import { removeClasses } from './functions.js'

//===============================================================================================================================
// actions click ???
window.onload = function () {
	document.addEventListener('click', documentActions)
	function documentActions(e) {
		const targetElement = e.target
		if (window.innerWidth > 768 && isMobile.any()) {
			if (targetElement.classList.contains('menu__arrow')) {
				targetElement.closest('.menu__item').classList.toggle('_hover')
			}
			if (
				!targetElement.closest('.menu__item') &&
				document.querySelectorAll('.menu__item._hover').length > 0
			) {
				removeClasses(document.querySelectorAll('.menu__item._hover'), '_hover')
			}
		}
		if (targetElement.classList.contains('search-form__icon')) {
			document.querySelector('.search-form').classList.toggle('_active')
		} else if (
			!targetElement.closest('.search-form') &&
			document.querySelector('.search-form._active')
		) {
			document.querySelector('.search-form').classList.remove('_active')
		}
	}
	// ==================== Header Scroll
	const headerElement = document.querySelector('.header')
	const callback = function (entries, observer) {
		if (entries[0].isIntersecting) {
			headerElement.classList.remove('_scroll')
		} else {
			headerElement.classList.add('_scroll')
		}
	}
	const headerObserver = new IntersectionObserver(callback)
	headerObserver.observe(headerElement)

	//===============================================================================================================================
	// GET DATA FROM JSON AND BUILD HTML TEMPLATE
	// block check products__items
	const productItems = document.querySelector('.products__items')
	let counter = 2
	if (productItems) {
		loadProductItems()
	}
	// get data from JSON file
	async function loadProductItems() {
		const response = await fetch('files/products.json', {
			method: 'GET',
		})
		if (response.ok) {
			const responceResult = await response.json()
			initProductItem(responceResult, counter)
		} else {
			alert('Error')
		}
	}
	// output 3 data from JSON file
	function initProductItem(data, counter) {
		for (let index = 0; index < counter; index++) {
			const product = data.products[index]
			buildProductItem(product)
		}
	}
	// building product items from HTML template
	function buildProductItem(product) {
		let productItemTemplate = ``
		productItemTemplate += `<article data-pid="${product.id}" class="products__item item-product">`

		if (product.labels) {
			productItemTemplate += `<div class="item-product__labels">`

			for (const label in product.labels) {
				productItemTemplate += `<div class="item-product__label item-product__label_${product.labels[label]}">
			${label}`
				productItemTemplate += `</div>`
			}
			productItemTemplate += `</div>`
		}
		product.image
			? (productItemTemplate += `
		<a href="" class="item-product__image -ibg">
		<img src="${product.image}" alt="${product.title}" />
		</a>`)
			: null
		productItemTemplate += `<div class="item-product__body">`
		productItemTemplate += `
		<div class="item-product__content">
			<h5 class="item-product__title">${product.title}</h5>
			<div class="item-product__text">${product.text}</div>
		</div>`
		productItemTemplate += `
		<div class="item-product__prices">
			<div class="item-product__price">$ ${product.price}</div>
			<div class="item-product__price item-product__price_old">
			</div>
		</div>
	`
		productItemTemplate += `
		<div class="item-product__actions actions-product">
			<div class="actions-product__body">
				<a
				href=""
				class="actions-product__button button button_white"
				>Add to cart</a
				>
				<a href="" class="actions-product__link _icon-share"
				>Share</a
				>
				<a href="" class="actions-product__link _icon-favorite"
				>Like</a
				>
			</div>
		</div>
	`
		productItemTemplate += `</div>`
		productItemTemplate += `</article>`
		productItems.insertAdjacentHTML('beforeend', productItemTemplate)
	}

	//===============================================================================================================================
	// BUTTON SHOW MORE
	document.addEventListener('click', documentActions)

	function documentActions(e) {
		const targetElement = e.target

		if (targetElement.closest('.products__more')) {
			console.log('123')
			e.preventDefault()
		}
	}

	//===============================================================================================================================
	// MOVIE GALLERY
	const furniture = document.querySelector('.furniture__body')
	if (furniture && !isMobile.any()) {
		const furnitureItems = document.querySelector('.furniture__items')
		const furnitureColumn = document.querySelectorAll('.furniture__column')

		// Скорость анимации
		const speed = furniture.dataset.speed

		// Объявление переменных
		let positionX = 0
		let coordXprocent = 0

		function setMouseGalleryStyle() {
			let furnitureItemsWidth = 0
			furnitureColumn.forEach(element => {
				furnitureItemsWidth += element.offsetWidth
			})

			const furnitureDifferent = furnitureItemsWidth - furniture.offsetWidth
			const distX = Math.floor(coordXprocent - positionX)

			positionX = positionX + distX * speed
			let position = (furnitureDifferent / 200) * positionX

			furnitureItems.style.cssText = `transform: translate3d(${-position}px,0,0);`

			if (Math.abs(distX) > 0) {
				requestAnimationFrame(setMouseGalleryStyle)
			} else {
				furniture.classList.remove('_init')
			}
		}
		furniture.addEventListener('mousemove', function (e) {
			// Получение ширины
			const furnitureWidth = furniture.offsetWidth

			// Ноль по середине
			const coordX = e.pageX - furnitureWidth / 2

			// Получаем проценты
			coordXprocent = (coordX / furnitureWidth) * 50

			if (!furniture.classList.contains('_init')) {
				requestAnimationFrame(setMouseGalleryStyle)
				furniture.classList.add('_init')
			}
		})
	}
}

//===============================================================================================================================
// SPOLLERS FOOTER MENU
;('use strict')
const spollersArray = document.querySelectorAll('[data-spollers]')
if (spollersArray.length > 0) {
	// Получение обычных слойлеров
	const spollersRegular = Array.from(spollersArray).filter(
		function (item, index, self) {
			return !item.dataset.spollers.split(',')[0]
		}
	)
	// Инициализация обычных слойлеров
	if (spollersRegular.length > 0) {
		initSpollers(spollersRegular)
	}

	// Получение слойлеров с медиа запросами
	const spollersMedia = Array.from(spollersArray).filter(
		function (item, index, self) {
			return item.dataset.spollers.split(',')[0]
		}
	)

	// Инициализация слойлеров с медиа запросами
	if (spollersMedia.length > 0) {
		const breakpointsArray = []
		spollersMedia.forEach(item => {
			const params = item.dataset.spollers
			const breakpoint = {}
			const paramsArray = params.split(',')
			breakpoint.value = paramsArray[0]
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max'
			breakpoint.item = item
			breakpointsArray.push(breakpoint)
		})

		// Получаем уникальные брейкпоинты
		let mediaQueries = breakpointsArray.map(function (item) {
			return (
				'(' +
				item.type +
				'-width: ' +
				item.value +
				'px),' +
				item.value +
				',' +
				item.type
			)
		})
		mediaQueries = mediaQueries.filter(function (item, index, self) {
			return self.indexOf(item) === index
		})

		// Работаем с каждым брейкпоинтом
		mediaQueries.forEach(breakpoint => {
			const paramsArray = breakpoint.split(',')
			const mediaBreakpoint = paramsArray[1]
			const mediaType = paramsArray[2]
			const matchMedia = window.matchMedia(paramsArray[0])

			// Объекты с нужными условиями
			const spollersArray = breakpointsArray.filter(function (item) {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true
				}
			})
			// Событие
			matchMedia.addListener(function () {
				initSpollers(spollersArray, matchMedia)
			})
			initSpollers(spollersArray, matchMedia)
		})
	}
	// Инициализация
	function initSpollers(spollersArray, matchMedia = false) {
		spollersArray.forEach(spollersBlock => {
			spollersBlock = matchMedia ? spollersBlock.item : spollersBlock
			if (matchMedia.matches || !matchMedia) {
				spollersBlock.classList.add('_init')
				initSpollerBody(spollersBlock)
				spollersBlock.addEventListener('click', setSpollerAction)
			} else {
				spollersBlock.classList.remove('_init')
				initSpollerBody(spollersBlock, false)
				spollersBlock.removeEventListener('click', setSpollerAction)
			}
		})
	}
	// Работа с контентом
	function initSpollerBody(spollersBlock, hideSpollerBody = true) {
		const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]')
		if (spollerTitles.length > 0) {
			spollerTitles.forEach(spollerTitle => {
				if (hideSpollerBody) {
					spollerTitle.removeAttribute('tabindex')
					if (!spollerTitle.classList.contains('_active')) {
						spollerTitle.nextElementSibling.hidden = true
					}
				} else {
					spollerTitle.setAttribute('tabindex', '-1')
					spollerTitle.nextElementSibling.hidden = false
				}
			})
		}
	}
	function setSpollerAction(e) {
		const el = e.target
		if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
			const spollerTitle = el.hasAttribute('data-spoller')
				? el
				: el.closest('[data-spoller]')
			const spollersBlock = spollerTitle.closest('[data-spollers]')
			const oneSpoller = spollersBlock.hasAttribute('data-one-spoller')
				? true
				: false
			if (!spollersBlock.querySelectorAll('._slide').length) {
				if (oneSpoller && !spollerTitle.classList.contains('_active')) {
					hideSpollersBody(spollersBlock)
				}
				spollerTitle.classList.toggle('_active')
				_slideToggle(spollerTitle.nextElementSibling, 500)
			}
			e.preventDefault()
		}
	}
	function hideSpollersBody(spollersBlock) {
		const spollerActiveTitle = spollersBlock.querySelector(
			'[data-spoller]._active'
		)
		if (spollerActiveTitle) {
			spollerActiveTitle.classList.remove('_active')
			_slideUp(spollerActiveTitle.nextElementSibling, 500)
		}
	}
}
// ====================  SlideToggle
let _slideUp = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide')
		target.style.transitionProperty = 'height, margin, padding'
		target.style.transitionDuration = duration + 'ms'
		target.style.height = target.offsetHeight + 'px'
		target.offsetHeight
		target.style.overflow = 'hidden'
		target.style.height = 0
		target.style.paddingTop = 0
		target.style.paddingBottom = 0
		target.style.marginTop = 0
		target.style.marginBottom = 0
		window.setTimeout(() => {
			target.hidden = true
			target.style.removeProperty('height')
			target.style.removeProperty('padding-top')
			target.style.removeProperty('padding-bottom')
			target.style.removeProperty('margin-top')
			target.style.removeProperty('margin-bottom')
			target.style.removeProperty('overflow')
			target.style.removeProperty('transition-duration')
			target.style.removeProperty('transition-property')
			target.classList.remove('_slide')
		}, duration)
	}
}
let _slideDown = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide')
		if (target.hidden) {
			target.hidden = false
		}
		let height = target.offsetHeight
		target.style.overflow = 'hidden'
		target.style.height = 0
		target.style.paddingTop = 0
		target.style.paddingBottom = 0
		target.style.marginTop = 0
		target.style.marginBottom = 0
		target.offsetHeight
		target.style.transitionProperty = 'height, margin, padding'
		target.style.transitionDuration = duration + 'ms'
		target.style.height = height + 'px'
		target.style.removeProperty('padding-top')
		target.style.removeProperty('padding-bottom')
		target.style.removeProperty('margin-top')
		target.style.removeProperty('margin-bottom')
		window.setTimeout(() => {
			target.style.removeProperty('height')
			target.style.removeProperty('overflow')
			target.style.removeProperty('transition-duration')
			target.style.removeProperty('transition-property')
			target.classList.remove('_slide')
		}, duration)
	}
}
let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration)
	} else {
		return _slideUp(target, duration)
	}
}
//===============================================================================================================================
/*
Для родителя слойлеров пишем атрибут data-spollers
Для заголовков слойлеров пишем атрибут data-spoller
Если нужно включать\выключать работу спойлеров на разных размерах экранов
пишем параметры ширины и типа брейкпоинта.
Например:
data-spollers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
data-spollers="768,min" - спойлеры будут работать только на экранах больше или равно 768px

Если нужно что бы в блоке открывался болько один слойлер добавляем атрибут data-one-spoller
*/
