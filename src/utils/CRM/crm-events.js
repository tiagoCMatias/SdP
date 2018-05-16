
let baseURL = "http://localhost:8000/";

export function getObras() {
	return new Promise(function (resolve, reject) {

		let requestUrl = baseURL + "api/crm/obra/";

		let requestOptions = {
			uri: requestUrl,
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				'pragma': 'no-cache',
				'cache-control': 'no-cache'
			},
			//body: JSON.stringify({ "largura": largura, "comprimento": comprimento })
		}

		fetch(requestUrl, requestOptions).then(function (response) {
			if (response.status === 200) {
				return resolve(response.json());
			} else {
				return reject(Error("An error has occurred! Please try again."));
			}
		}, function (error) {
			return reject(error);
		});
	});
}

export function getClientes() {
	return new Promise(function (resolve, reject) {

		let requestUrl = baseURL + "api/crm/clientes/";

		let requestOptions = {
			uri: requestUrl,
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				'pragma': 'no-cache',
				'cache-control': 'no-cache'
			},
			//body: JSON.stringify({ "largura": largura, "comprimento": comprimento })
		}

		fetch(requestUrl, requestOptions).then(function (response) {
			if (response.status === 200) {
				return resolve(response.json());
			} else {
				return reject(Error("An error has occurred! Please try again."));
			}
		}, function (error) {
			return reject(error);
		});
	});
}

export function novaObra(local, cliente, data) {
	return new Promise(function (resolve, reject) {

		let requestUrl = baseURL + "api/crm/obra/";

		let requestOptions = {
			uri: requestUrl,
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'pragma': 'no-cache',
				'cache-control': 'no-cache'
			},
			body: JSON.stringify({ "local": local, "cliente": cliente, "data":data })
		}

		fetch(requestUrl, requestOptions).then(function (response) {
			if (response.status === 200) {
				return resolve(response.json());
			} else {
				return reject(Error("An error has occurred! Please try again."));
			}
		}, function (error) {
			return reject(error);
		});
	});
}