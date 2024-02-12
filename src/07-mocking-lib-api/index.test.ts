import axios from 'axios';
import { throttledGetDataFromApi } from './index';

// jest.mock('axios');
describe('throttledGetDataFromApi', () => {
  beforeAll(() => jest.useFakeTimers());
  afterAll(() => jest.useRealTimers());
  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllTimers();
  });

  test('should create instance with provided base url', async () => {
    jest.spyOn(axios, 'create');

    await throttledGetDataFromApi('/');
    jest.runAllTimers();
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    jest.spyOn(axios, 'create');
    const get = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValue({ data: 'hello world' });

    await throttledGetDataFromApi('/');
    jest.runAllTimers();

    expect(get).toHaveBeenCalledWith('/');
  });

  test('should return response data', async () => {
    const data = { data: 'hello world' };
    jest.spyOn(axios.Axios.prototype, 'get').mockResolvedValue(data);
    expect(await throttledGetDataFromApi('/')).toBe(data.data);
    jest.runAllTimers();
  });
});
