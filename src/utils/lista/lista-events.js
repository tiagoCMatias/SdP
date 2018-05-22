import {baseURL} from "../general";

export function getFamilia() {
	return new Promise(function (resolve, reject) {

		let requestUrl = baseURL + "api/componentes/familia/";

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


export function createNovoComponente(nome, tag, descricao, quantidade, familia) {
	return new Promise(function (resolve, reject) {

		let requestUrl = baseURL + "api/componentes/familia/";

		let requestOptions = {
			uri: requestUrl,
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'pragma': 'no-cache',
				'cache-control': 'no-cache'
			},
            body: JSON.stringify({ 
                "nome": nome, 
                "tag": tag,
                "descricao": descricao,
                "quantidade": quantidade,
                "familia": familia
             })
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