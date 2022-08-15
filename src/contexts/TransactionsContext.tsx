import { ReactNode, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

type Transaction = {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

type CreateTransactionInputs = {
  description: string
  category: string
  type: 'income' | 'outcome'
  price: number
}

type TransactionsContextType = {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => void
  createTransaction: (data: CreateTransactionInputs) => void
}

type CyclesContextProviderProps = {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: CyclesContextProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function fetchTransactions(query?: string) {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })
    setTransactions(response.data)
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  async function createTransaction(data: CreateTransactionInputs) {
    const { description, category, type, price } = data

    const response = await api.post('transactions', {
      description,
      category,
      type,
      price,
      createdAt: new Date(),
    })

    setTransactions((state) => [response.data, ...state])
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
