import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";
import { PriceHighLight, TransactionsContainer, TransactionsTable } from "./styles";

type Transaction = {
    id:number;
    description:string;
    type:'income' | 'outcome';
    price:number;
    category:string;
    createdAt:string
}

export function Transactions(){
    const [transactions, setTransactions] = useState<Transaction[]>([])

    async function loadTransactions(){
        const response = await fetch('http://localhost:3333/transactions')
        const data = await response.json()
        setTransactions(data)
    }

    useEffect(() => {
        loadTransactions()
    },[])


    return(
        <>
        <Header />
        <Summary/>
        
        <TransactionsContainer>
            <SearchForm/>
            <TransactionsTable>
                <tbody>
                    {transactions.map(({id,description,type,price,category,createdAt})=>{
                        return (
                            <tr key={id}>
                                <td width="50%">{description}</td>
                                <td>
                                    <PriceHighLight variant={type}>{price}</PriceHighLight>
                                </td>
                                <td>{category}</td>
                                <td>{createdAt}</td>
                            </tr>
                        )})}
                </tbody>
            </TransactionsTable>
        </TransactionsContainer>
        </>
    )
}