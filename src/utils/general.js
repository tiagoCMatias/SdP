export let baseURL = "http://localhost:8005/";

export function getIndexFamilia(obj, where) {
  for (let index = 0; index < obj.length; index++) {
    const element = obj[index];
    if (element.nome === where) {
      return element.id;
    }
  }
}
