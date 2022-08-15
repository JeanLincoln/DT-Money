import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../contexts/TransactionsContext'

export function useSummary() {
  const transactions = useContextSelector(
    TransactionsContext,
    (context) => context.transactions,
  )
  const summary = transactions.reduce(
    (acc, { type, price }) => {
      const credit = type === 'income'
      const debit = type === 'outcome'
      if (credit) {
        acc.income += price
        acc.total += price
      }
      if (debit) {
        acc.outcome += price
        acc.total -= price
      }
      return acc
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    },
  )
  return summary
}
