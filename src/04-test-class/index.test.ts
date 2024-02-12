// Uncomment the code below and write your tests
import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initBalance = 228;
    const account = getBankAccount(initBalance);
    expect(account.getBalance()).toEqual(initBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initBalance = 228;
    const account = getBankAccount(initBalance);
    expect(account.withdraw.bind(account, 300)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const initBalance = 228;
    const account = getBankAccount(initBalance);
    const toAccount = getBankAccount(100);
    expect(account.transfer.bind(account, 300, toAccount)).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    const amount = 100;
    const account = getBankAccount(amount);
    expect(account.transfer.bind(account, amount, account)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const amount = 100;
    const account = getBankAccount(0);
    account.deposit(amount);
    expect(account.getBalance()).toBe(amount);
  });

  test('should withdraw money', () => {
    const amount = 100;
    const account = getBankAccount(amount);
    account.withdraw(amount);
    expect(account.getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    const fromAccount = getBankAccount(100);
    const toAccount = getBankAccount(0);
    fromAccount.transfer(50, toAccount);
    expect(toAccount.getBalance()).toEqual(fromAccount.getBalance());
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(lodash, 'random').mockReturnValue(1);
    const account = getBankAccount(0);
    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(lodash, 'random').mockReturnValue(1);
    const mockBalance = 500;
    const fetchBalanceMock = jest.fn().mockResolvedValue(mockBalance);
    const account = getBankAccount(0);
    account.fetchBalance = fetchBalanceMock;
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(mockBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(lodash, 'random').mockReturnValue(0);
    const account = getBankAccount(0);
    expect(account.synchronizeBalance.bind(account)).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
