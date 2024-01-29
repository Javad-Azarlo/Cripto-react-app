const API_URL = "https://api.coingecko.com/api/v3";
const API_KEY = "CG-26Xf7hDFh6X53q7n3FUfHF9S";

const GetCoinList = (page , currency) => {
    return `${API_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=${page}&sparkline=false&locale=en&x_cg_demo_api_key=${API_KEY}`
}

const GoSearch = text => `${API_URL}/search?query=${text}&x_cg_demo_api_key=${API_KEY}`

const GoChart = (id) => `${API_URL}/coins/${id}/market_chart?vs_currency=usd&days=7&x_cg_demo_api_key=${API_KEY}`

export {GetCoinList , GoSearch , GoChart} 