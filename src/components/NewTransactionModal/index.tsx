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
import { Controller, useForm } from "react-hook-form";
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionsContext";

const newTransactionFormSchema = z.object({
    description: z.string(),
    price:z.number(),
    category: z.string(),
    type: z.enum(["income", "outcome"]),
})

type NewTransactionsFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal(){
        const {
            control,
            register, 
            handleSubmit,
            formState:{ isSubmitting },
            reset
        } = useForm<NewTransactionsFormInputs>({
        resolver:zodResolver(newTransactionFormSchema)
    })

    const { createTransaction } = useContext(TransactionsContext)
    
    async function handleCreateNewTransaction(data:NewTransactionsFormInputs){
        const {description,category,type,price} = data
        createTransaction({description,category,type,price})
        reset()
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

                    <Controller 
                        control={ control }
                        name="type"
                        render={({ field })=>{
                            return(
                                <TransactionType onValueChange={field.onChange} value={field.value}>
                                    <TransactionTypeButton variant="income" value="income">
                                        <ArrowCircleUp size={24} />
                                         Entrada
                                    </TransactionTypeButton>
                                    <TransactionTypeButton variant="outcome" value="outcome">
                                        <ArrowCircleDown size={24} />
                                            Saída
                                     </TransactionTypeButton>
                                </TransactionType>
                            )
                        }}
                    />

                    

                    <button type="submit" disabled={isSubmitting}>
                        Cadastrar
                    </button>
                </form>
            </Content>
        </Dialog.Portal>
    )
}