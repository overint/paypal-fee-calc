import axios from "axios"

export default {
    rates: (from, to) => {
        if (from === to) {
            return new Promise((resolve) => {
                resolve(1);
            });
        }
        return axios.get(`https://api.exchangeratesapi.io/latest?base=${from}&symbols=${to}`).then((result => {
            return (result.data.rates[to]);
        }));
    }
}
