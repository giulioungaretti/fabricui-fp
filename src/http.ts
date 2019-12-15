export interface IHttpResponse<T> extends Response {
    parsedBody?: T;
}

export const get = <T>(request: RequestInfo): Promise<T> => {
    return new Promise((resolve, reject) => {
        let response: IHttpResponse<T>;
        fetch(request)
            .then(res => {
                response = res;
                return res.json();
            })
            .then(body => {
                if (response.ok) {
                    resolve(body);
                } else {
                    reject(response);
                }
            })
            .catch(err => {
                reject(err);
            });
    });
};
interface IDictionary {
    [index: string]: number;
}
interface IRandom {
    rates: IDictionary;
}

export const fetchCounter = () => get<IRandom>("https://frankfurter.app/latest")