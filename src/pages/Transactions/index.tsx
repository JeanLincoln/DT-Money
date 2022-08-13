import { useEffect } from "react";
import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";
import { PriceHighLight, TransactionsContainer, TransactionsTable } from "./styles";

async function loadTransactions(){
    const response = await fetch('http://localhost:3333/transactions')
    const data = await response.json()
    console.log(data)
}

export function Transactions(){
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
                    <tr>
                        <td width="50%">Desenvolvimento de site</td>
                        <td>
                            <PriceHighLight variant="income">R$ 12.000,00</PriceHighLight>
                        </td>
                        <td>Venda</td>
                        <td>13/04/2022</td>
                    </tr>
                    <tr>
                        <td width="50%">Hamburguer</td>
                        <td>
                            <PriceHighLight variant="outcome">- R$ 59,00</PriceHighLight>
                        </td>
                        <td>Alimentação</td>
                        <td>10/04/2022</td>
                    </tr>
                </tbody>
            </TransactionsTable>
        </TransactionsContainer>
        </>
    )
}