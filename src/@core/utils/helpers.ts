const capitalizeWords = (str: string) => {
  return str.replace(/\b\w/g, letter => letter.toUpperCase())
}

function generateRandomString(num = 5) {
	let result = "";
	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
	for (let i = 0; i < num; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
}



export {capitalizeWords, generateRandomString}