import Logo from '../../assets/Logo.svg'
import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'

export function Header(){
    return(
        <HeaderContainer>
            <HeaderContent>
                <img src={Logo} alt="" />
                <NewTransactionButton>
                    Make a transaction
                </ NewTransactionButton>
            </HeaderContent>
        </HeaderContainer>
    )
}