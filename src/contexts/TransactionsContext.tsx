import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

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
        const response = await api.get('transactions',{
            params:{
                q:query
            }
        })
        setTransactions(response.data)
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