// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from './functions.js'
// Підключення списку активних модулів
import { removeClasses } from './functions.js'

window.onload = function () {
	document.addEventListener('click', documentActions)
	// Actions (делегування подій click)
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
		// =========================================  Відловити клік на кнопку Show more по класу products__more
		// if (targetElement.classList.contains('products__more')) {
		// 	// коли натиснули на кнопку
		// 	getProducts(targetElement) // Відправити її в нову функцію getProducts
		// 	e.preventDefault() // Щоб не перегружалася сторінка
		// }
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

	// ==================== Button Show More in section Products
	// ==================== get data from json file
	const products = document.querySelector('.products')
	if (products) {
		loadProducts()
	}

	async function loadProducts() {
		const response = await fetch('files/products.json', {
			method: 'GET',
		})
		if (response.ok) {
			const responceResult = await response.json()
			initProducts(responceResult)
		} else {
			alert('Error')
		}
	}

	function initProducts(data) {
		data.products.forEach(product => {
			console.log(product.id)
		})
	}

	// =============================================== Load More Products = 2 function getProducts and loadProducts
	// async function getProducts(button) {
	// 	if (!button.classList.contains('_hold')) {
	// 		// якщо немає класу hold
	// 		button.classList.add('_hold') // додаємо клас hold
	// 		// це для позначення кнопки, щоб було ясно що її натиснули
	// 		const file = 'files/products.json' // отримуємо шлях, тут має бути адреса до сервера з бази
	// 		let response = await fetch(file, {
	// 			// GET запрос за допомогою fetch в response
	// 			method: 'GET',
	// 		})
	// 		if (response.ok) {
	// 			// чи знайшли файл
	// 			let result = await response.json() // в змінну result підгружаємо json
	// 			loadProducts(result) // Відправляємо результата в майбутню функцію loadProducts
	// 			button.classList.remove('_hold') // прибираємо клас hold
	// 			button.remove() // видаляємо кнопку, тільки тут, бо це локально
	// 			// бо при повторному натисненні будуть підгрузатися ті самі файли
	// 		} else {
	// 			alert('Error') // інакше, коли немає файлу, то помилку показати
	// 		}
	// 	}
	// }

	// =====================================================================================  loadProducts
	// function loadProducts(data) {
	// 	const productsItems = document.querySelector('.products__items') // обєкт, де отримуємо
	// 	data.products.forEach(item => {
	// 		// метод перебору forEach, кожен елемент масиву item
	// 		const productId = item.id // присвоюємо значення товару
	// 		const productUrl = item.url
	// 		const productImage = item.image
	// 		const productTitle = item.title
	// 		const productText = item.text
	// 		const productPrice = item.price
	// 		const productOldPrice = item.priceOld
	// 		const productShareUrl = item.shareUrl
	// 		const productLikeUrl = item.LikeUrl
	// 		const productLabels = item.labels
	// 		// тепер ці дані треба інтегрувати в HTML карточки товару
	// 		// HTML код картки товару, розібраний на частини JS
	// 		// Кожна частина присвоюється у змінну

	// 		// Відкриваючий і закриваючий тег article зі своїм id
	// 		let productTemplateStart = `<article data-pid="${productId}" class="products__item item-product">`
	// 		let productTemplateEnd = `</article>`

	// 		let productTempleteLabels = ''
	// 		if (productLabels) {
	// 			let productTempleteLabelsStart = `<div class="item-product__labels">`
	// 			let productTempleteLabelsEnd = `</div>`
	// 			let productTempleteLabelsContent = ''
	// 			productLabels.forEach(labelItem => {
	// 				productTempleteLabelsContent += `<div class="item-product__label item-product__label_${labelItem.type}">${labelItem.value}</div>`
	// 			})
	// 			productTempleteLabels += productTempleteLabelsStart
	// 			productTempleteLabels += productTempleteLabelsContent
	// 			productTempleteLabels += productTempleteLabelsEnd
	// 		}

	// 		let productTempleteImage = `
	// 	<a href="${productId}" class="item-product__image -ibg">
	// 		<img src="@img/products/${productImage}" alt="${productTitle}">
	// 	</a>
	// 	`
	// 		let productTempleteBodyStart = `<div class="item-product__body">`
	// 		let productTempleteBodyEnd = `</div>`

	// 		let productTempleteContent = `
	// 	<div class="item-product__content">
	// 		<h5 class="item-product__title">${productTitle}</h5>
	// 		<div class="item-product__text">${productText}</div>
	// 	</div>
	// 	`
	// 		let productTempletePrices = ''
	// 		let productTempletePricesStart = `<div class="item-product__prices">`
	// 		let productTempletePricesCurrent = `<div class="item-product__price">Rp ${productPrice}</div>`
	// 		let productTempletePricesOld = `<div class="item-product__price item-product__price_old">Rp ${productOldPrice}</div>`
	// 		let productTempletePricesEnd = `</div>`

	// 		productTempletePrices = productTempletePricesStart
	// 		productTempletePrices += productTempletePricesCurrent
	// 		// Якщо є стара ціна, то додаємо перевірку, інакше пропускаємо
	// 		if (productOldPrice) {
	// 			productTempletePrices += productTempletePricesOld
	// 		}
	// 		productTempletePrices += productTempletePricesEnd

	// 		let productTempleteActions = `
	// 	<div class="item-product__actions actions-product">
	// 		<div class="actions-product__body">
	// 			<a href="" class="actions-product__button button button_white">Add to cart</a>
	// 			<a href="${productShareUrl}" class="actions-product__link _icon-share">Share</a>
	// 			<a href="${productLikeUrl}" class="actions-product__link _icon-favorite">Like</a>
	// 		</div>
	// 	</div>
	// 	`

	// 		// Збірка всіх підблоків карточки у Body
	// 		let productTempleteBody = ''
	// 		productTempleteBody += productTempleteBodyStart
	// 		productTempleteBody += productTempleteContent
	// 		productTempleteBody += productTempletePrices
	// 		productTempleteBody += productTempleteActions
	// 		productTempleteBody += productTempleteBodyEnd

	// 		// Збірка всієї карточки товару
	// 		let productTemplate = ''
	// 		productTemplate += productTemplateStart
	// 		productTemplate += productTempleteLabels
	// 		productTemplate += productTempleteImage
	// 		productTemplate += productTempleteBody
	// 		productTemplate += productTemplateEnd

	// 		// Виводимо нашу змінну в HTML
	// 		// beforeend - означає додати вкінець
	// 		productsItems.insertAdjacentElement('beforeend', productTemplate)
	// 	})
	// }

	// ==================== Furniture gallery movie
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

// ==================== SPOLLERS
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
//========================================================================================================================================================
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
