

export const get = (request: RequestInfo): Promise<string> => {
    return new Promise((resolve, reject) => {
        let response: Response;
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
// interface IDictionary {
// // [index: string]: number;
// }
// interface IRandom {
// // rates: IDictionary;
// }
// 
// interface Decodable<T> {
// // decode: (i: string) => Either<t.Errors, T>;
// }

// type User = t.TypeOf<typeof Payload>
// function loggingIdentity<G, T extends Decodable<G>>(t: T): Either<t.Errors, G> {
// // const asd = t.decode("{ammount:'10'}");
// // console.log(asd)
// // return asd
// }
// 
// loggingIdentity<User, t.TypeC>(Payload);
export const fetchCounter = () => get("https://frankfurter.app/latest")