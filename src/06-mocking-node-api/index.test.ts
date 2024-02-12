import path, { join } from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = () => null;
    const delay = 1000;
    doStuffByTimeout(callback, delay);
    expect(setTimeout).toHaveBeenCalledWith(callback, delay);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = () => null;
    const delay = 1000;
    doStuffByTimeout(callback, delay);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    const delay = 1000;
    doStuffByInterval(callback, delay);
    expect(setInterval).toHaveBeenLastCalledWith(callback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    const delay = 1000;
    doStuffByInterval(callback, delay);
    jest.advanceTimersByTime(5000);
    expect(callback).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join');
    const pathToFile = './file.txt';
    await readFileAsynchronously(pathToFile);
    expect(join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const nonexistent = './readme.md';
    expect(await readFileAsynchronously(nonexistent)).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'file contents';
    const path = 'file.txt';

    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(fileContent);
    const res = await readFileAsynchronously(path);
    expect(res).toEqual(fileContent);
  });
});
