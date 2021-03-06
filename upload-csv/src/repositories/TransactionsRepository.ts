import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const incomeT = transactions
      .filter(c => c.type === 'income')
      .map(m => m.value);

    const outcomeT = transactions
      .filter(c => c.type === 'outcome')
      .map(m => m.value);

    const income = incomeT.reduce((prev, next) => prev + next, 0);

    const outcome = outcomeT.reduce((prev, next) => prev + next, 0);

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }
}

export default TransactionsRepository;
