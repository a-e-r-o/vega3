export function strLowNoAccents(str: string) {
	return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace('é', 'e')
}