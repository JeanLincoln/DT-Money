import { useContext } from "react"
import { TransactionsContext } from "../contexts/TransactionsContext"


export function useSummary(){
    const {transactions} = useContext(TransactionsContext)
    
    const summary = transactions.reduce((acc, {type, price})=>{
        const credit = type === 'income'
        const debit = type === 'outcome'
        if(credit){
            acc.income += price
            acc.total += price
        }
        if(debit){
            acc.outcome += price
            acc.total -= price
        }
        return acc
    },
        { 
            income:0,
            outcome:0,
            total:0

        }
    )
    return summary
}