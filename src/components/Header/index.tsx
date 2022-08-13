import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'
import * as Dialog from '@radix-ui/react-dialog'
import Logo from '../../assets/Logo.svg'


export function Header(){
    return(
        <HeaderContainer>
            <HeaderContent>
                <img src={Logo} alt="" />
                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <NewTransactionButton>
                            Make a transaction
                        </ NewTransactionButton>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                        <Dialog.Overlay />
                        <Dialog.Content>
                            <Dialog.Title>Nova Transação</Dialog.Title>
                            <Dialog.Close />
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </HeaderContent>
        </HeaderContainer>
    )
}