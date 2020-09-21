import { EntityRepository, Repository, getCustomRepository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactionRepository = getCustomRepository(TransactionsRepository);

    const transactions = await transactionRepository.find();

    const totalIncome = transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((total, transaction) => total + transaction.value, 0);

    const totalOutcome = transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((total, transaction) => total + transaction.value, 0);

    const total = totalIncome - totalOutcome;

    return {
      income: totalIncome,
      outcome: totalOutcome,
      total,
    };
  }
}

export default TransactionsRepository;
