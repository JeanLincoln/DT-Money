
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react"
import { useContext } from "react"
import { TransactionsContext } from "../../contexts/TransactionsContext"
import { SummaryCard, SummaryContainer } from "./styles"

export function Summary(){
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

    return(
        <SummaryContainer>
            <SummaryCard>
                <header>
                    <span>Entradas</span>
                    <ArrowCircleUp size={32} color="#00b37e" />
                </header>
                
                <strong>{summary.income}</strong>
            </SummaryCard>
            <SummaryCard>
                <header>
                    <span>Saidas</span>
                    <ArrowCircleDown size={32} color="#F75a68" />
                </header>
                
                <strong>{summary.outcome}</strong>
            </SummaryCard>
            <SummaryCard variant="green">
                <header>
                    <span>Total</span>
                    <CurrencyDollar size={32} color="#fff" />
                </header>
                
                <strong>{summary.total}</strong>
            </SummaryCard>
        </ SummaryContainer> 
        
    )
}