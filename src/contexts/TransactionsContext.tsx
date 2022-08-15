import { createContext, ReactNode, useEffect, useState } from "react";

type Transaction = {
    id:number;
    description:string;
    type:'income' | 'outcome';
    price:number;
    category:string;
    createdAt:string
}

type TransactionsContextType = {
    transactions: Transaction[];
    fetchTransactions: (query?:string)=> void
}

type CyclesContextProviderProps = {
    children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({children}:CyclesContextProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([])

    async function fetchTransactions(query?: string){
        const url = new URL('http://localhost:3333/transactions')

        if(query){
            url.searchParams.append('q', query)
        }


        const response = await fetch(url)
        const data = await response.json()
        setTransactions(data)
    }

    useEffect(() => {
        fetchTransactions()
    },[])
    
    return(
        <TransactionsContext.Provider value={{transactions, fetchTransactions}}>
            {children}
        </TransactionsContext.Provider>
    )
}