import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
	const startIndex = (pageNumber - 1) * pageSize;
	return _(items).slice(startIndex).take(pageSize).value();
}
// export function paginate(items, pageNumber, pageSize) {
// 	const start = (pageNumber - 1) * pageSize;
//    const end = pageNumber * pageSize;

//    return items.slice(start, end)
// }
