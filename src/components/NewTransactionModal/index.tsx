import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CloseButton, 
        Content, 
        Overlay, 
        TransactionType, 
        TransactionTypeButton 
    } from "./styles";
import { useForm } from "react-hook-form";

const newTransactionFormSchema = z.object({
    description: z.string(),
    price:z.number(),
    category: z.string(),
    // type: z.enum(["income", "outcome"]),
})

type NewTransactionsFormInputs = z.infer<typeof newTransactionFormSchema>

    export function NewTransactionModal(){
        const {
            register, 
            handleSubmit,
            formState:{ isSubmitting }
        } = useForm<NewTransactionsFormInputs>({
        resolver:zodResolver(newTransactionFormSchema)
    })
    
    async function handleCreateNewTransaction(data:NewTransactionsFormInputs){
        await new Promise(resolve => setTimeout(resolve,2000))
        console.log(data)
    }

    return (
        <Dialog.Portal>
            <Overlay />
            <Content>
                <Dialog.Title>Nova Transação</Dialog.Title>
                <CloseButton >
                    <X size={24} />   
                </CloseButton>           
                <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input 
                        type="text" 
                        {...register('description')}
                        placeholder="Descrição" 
                        required
                    />
                    <input 
                        type="number" 
                        {...register('price', {valueAsNumber: true})}
                        placeholder="Valor" 
                        required
                    />
                    <input 
                        type="text" 
                        {...register('category')}
                        placeholder="Categoria" 
                        required
                    />

                    <TransactionType>
                        <TransactionTypeButton variant="income" value="income">
                            <ArrowCircleUp size={24} />
                            Entrada
                        </TransactionTypeButton>
                        <TransactionTypeButton variant="outcome" value="outcome">
                            <ArrowCircleDown size={24} />
                            Saída
                        </TransactionTypeButton>
                    </TransactionType>

                    <button type="submit" disabled={isSubmitting}>
                        Cadastrar
                    </button>
                </form>
            </Content>
        </Dialog.Portal>
    )
}