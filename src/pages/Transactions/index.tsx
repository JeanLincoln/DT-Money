import { useContext } from 'react'
import { Header } from '../../components/Header'
import { SearchForm } from '../../components/SearchForm'
import { Summary } from '../../components/Summary'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/Formatter'
import {
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'

export function Transactions() {
  const { transactions } = useContext(TransactionsContext)

  return (
    <>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map(
              ({ id, description, type, price, category, createdAt }) => {
                return (
                  <tr key={id}>
                    <td width="50%">{description}</td>
                    <td>
                      <PriceHighLight variant={type}>
                        {type === 'outcome' && '- '}
                        {priceFormatter.format(price)}
                      </PriceHighLight>
                    </td>
                    <td>{category}</td>
                    <td>{dateFormatter.format(new Date(createdAt))}</td>
                  </tr>
                )
              },
            )}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </>
  )
}
