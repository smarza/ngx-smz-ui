import { Paginator } from '../models/smz-easy-table-data';

export function paginator(items: any[], currentPage: number, itemsPerPage: number, maxVisiblePages: number): Paginator {
	const page = currentPage || 1,
		perPage = itemsPerPage || 10,
		offset = (page - 1) * perPage,

		paginatedItems = items.slice(offset).slice(0, itemsPerPage),
		totalPages = Math.ceil(items.length / perPage);

	console.log('------------------------');

	const gap = (maxVisiblePages / 2);

	let min = page - gap;
	if (min < 1) min = 1;
	if (totalPages - min < maxVisiblePages) {
		// console.log('changing min');
		min = maxVisiblePages - (totalPages - page - 1)
	};

	let max = page + gap - 1;
	if ((max - min) < maxVisiblePages)  {
		// console.log('changing max');
		max = min + maxVisiblePages - 1;
	}

	if (max > totalPages) {
		// console.log('changing both');
		max = totalPages;
		min = totalPages - maxVisiblePages + 1;
	}

	let count = max - min + 1;
	// console.log(`min: ${min} | max: ${max} | count: ${count}`);

	return {
		page: page,
		perPage: perPage,
		prePage: page - 1 ? page - 1 : null,
		nextPage: (totalPages > page) ? page + 1 : null,
		total: items.length,
		totalPages: totalPages,
		maxVisiblePages: maxVisiblePages,
		showing: (page * perPage) - perPage + 1,
		to: page * itemsPerPage,
		pages: Array(totalPages)
			.fill({})
			.map((x, i) => {
				const currentNumber = i + 1;
				const isCurrent = i + 1 === page;


				const isVisible = (currentNumber >= min && currentNumber <= max);
				// const isVisible = page < (maxVisiblePages / 2) ? true : (i <= (page - (maxVisiblePages / 2)) || i >= (page + (maxVisiblePages / 2)));

				return {
					number: currentNumber,
					isCurrent,
					isVisible,
					showEllipsis: false, // !isVisible && currentNumber === (maxVisiblePages + 1)
				}
			}),
		data: paginatedItems
	};
}