import { useContext} from "react";
import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { PriceHighLight, TransactionsContainer, TransactionsTable } from "./styles";

export function Transactions(){
    const {transactions} = useContext(TransactionsContext);

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