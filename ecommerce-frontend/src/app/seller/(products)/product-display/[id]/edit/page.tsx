'use client'

import Button from "@/components/button/button"
import Container from "@/components/container/content-wrapper.container"
import SectionContainer from "@/components/container/section-wrapper.container"
import FormCheckboxInput from "@/components/input/form/form-checkbox-input"
import FormTextInput from "@/components/input/form/form-text-input"
import Loading from "@/components/loading/loading"
import { useUpdateProductDisplay } from "@/hooks/product-display/product-display.mutation"
import { useGetProductDisplay, useGetProductDisplayById } from "@/hooks/product-display/product-display.query"
import { UpdateProductDisplayPayload } from "@/services/products/product-display.service"
import { watch } from "fs"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type Params = {
    id: string
}

type FormValues = {
    name: string
    description: string
    isInactive: boolean
}

const EditProductDisplayPage = () => {
    const params = useParams<Params>()
    const router = useRouter()

    const { data, isLoading } = useGetProductDisplayById(params.id)
    const { mutateAsync: update } = useUpdateProductDisplay(params.id)

    const initialValues = {
        name: data?.name ?? '',
        description: data?.description ?? '',
        isInactive: data?.isInactive ?? false
    }

    const { handleSubmit, reset, control, watch } = useForm({
        defaultValues: initialValues
    })

    const isInactive = watch('isInactive')

    const onSubmit = async (data: FormValues) => {
        try {
            const payload: UpdateProductDisplayPayload = {
                name: data.name,
                description: data.description,
                isInactive: data.isInactive
            }

            await update(payload)
            toast.success('Product display has been saved successfully.')
            router.back()
        } catch (error: any) {
            console.error(error)
            toast.error(error.toString())
        }
    }

    useEffect(() => {
        reset(initialValues)
    }, [data])

    return (
        <Container title="Edit Product Display">
            <SectionContainer canGoBack>
                {
                    isLoading ? <Loading /> :
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                            <FormTextInput isRequired label="Product Display Name" name="name" control={control} rules={{ required: { value: true, message: 'Field is required' } }} />
                            <FormTextInput label="Product Display Description" name="description" control={control} multiline />
                            <FormCheckboxInput label="Is Inactive?" name="isInactive" control={control} checked={isInactive} />
                            <div className="flex justify-end gap-5 mt-2">
                                <Button className={'w-40'} label="Reset" onClick={() => reset()} />
                                <Button className={'w-40'} label="Save" type="submit" onClick={handleSubmit(onSubmit)} />
                            </div>
                        </form>
                }
            </SectionContainer>
        </Container>
    )
}

export default EditProductDisplayPage