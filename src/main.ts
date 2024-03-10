
const API_KEY = '1fb14fa2bc8ee031f4d4971e';

interface Data {
  conversion_rates: Record<string, number>;
}

class FetchWrapper {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  get(endpoint: string): Promise<Data> {
    return fetch(this.baseURL + endpoint).then((response) => response.json());
  }

  put(endpoint: string, body: any): Promise<any> {
    return this._send('put', endpoint, body);
  }

  post(endpoint: string, body: any): Promise<any> {
    return this._send('post', endpoint, body);
  }

  delete(endpoint: string, body: any): Promise<any> {
    return this._send('delete', endpoint, body);
  }

  _send(method: string, endpoint: string, body: any): Promise<any> {
    return fetch(this.baseURL + endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }
}

const baseCurrency = document.getElementById('base-currency')! as HTMLInputElement;
const targetCurrency = document.getElementById('target-currency')! as HTMLInputElement;
const conversionResult = document.getElementById('conversion-result')!;

const baseUrl = `https://v6.exchangerate-api.com/v6/${API_KEY}/`;
const fetcher = new FetchWrapper(baseUrl);
let conversionRates: [string, number][] = [];

fetcher.get('latest/USD')
  .then(data => Object.entries(data.conversion_rates).forEach(rate => conversionRates.push(rate)));

const getConversionRates = async () => {
  conversionRates = [];
  await fetcher.get(`latest/${baseCurrency.value}`)
    .then(data => Object.entries(data.conversion_rates).forEach(rate => conversionRates.push(rate)));
  for (const rate of conversionRates) {
    if (targetCurrency.value == rate[0]) {
      conversionResult.textContent = rate[1].toString();
    }
  };
};
baseCurrency.addEventListener('change', getConversionRates);

targetCurrency.addEventListener('change', getConversionRates);
