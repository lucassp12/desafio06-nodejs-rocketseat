import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionsRepository);

    const transactionExistis = await transactionRepository.findOne({
      where: {
        id,
      },
    });

    if (!transactionExistis) {
      throw new AppError('Transaction do not existis');
    }

    await transactionRepository.remove(transactionExistis);
  }
}

export default DeleteTransactionService;
