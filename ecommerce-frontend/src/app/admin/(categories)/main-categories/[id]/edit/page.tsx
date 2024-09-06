'use client'

import Button from "@/components/button/button"
import Container from "@/components/container/content-wrapper.container"
import SectionContainer from "@/components/container/section-wrapper.container"
import FormCheckboxInput from "@/components/input/form/form-checkbox-input"
import FormImageUpload from "@/components/input/form/form-image-upload"
import FormTextInput from "@/components/input/form/form-text-input"
import Loading from "@/components/loading/loading"
import { useUpdateMainCategory } from "@/hooks/category/main-category.mutation"
import { useGetMainCategory } from "@/hooks/category/main-category.query"
import { MainCategoryUpdatePayload } from "@/services/categories/main-category.service"
import uploadService from "@/services/uploads/upload.service"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type PageParams = { id: string }

type FormValues = {
    categoryName: string
    categoryDescription: string
    categoryImage: File | string
    isInactive: boolean
}

const EditMainCategory = () => {
    const params = useParams<PageParams>()
    const { data, isLoading } = useGetMainCategory(params.id)
    const { mutateAsync: updateMainCategory } = useUpdateMainCategory(params.id)

    const router = useRouter()

    const initialValues = {
        categoryName: data?.name ?? '',
        categoryDescription: data?.description ?? '',
        categoryImage: data?.imagePath,
        isInactive: data?.isInactive
    }

    const { handleSubmit, control, reset } = useForm<FormValues>({
        defaultValues: initialValues,
        mode: "all",
    })

    useEffect(() => {
        console.log('render')
        reset(initialValues)
    }, [data])

    const onSubmit = async (data: FormValues) => {
        try {
            const uploadedFilePath = await uploadService.uploadSingleFile(data.categoryImage as File)

            const mainCategoryPayload: MainCategoryUpdatePayload = {
                name: data.categoryName,
                description: data.categoryDescription,
                imagePath: uploadedFilePath ?? '',
                isInactive: data.isInactive
            }

            await updateMainCategory(mainCategoryPayload)
            toast.success('Main category updated successfully')
            router.back()
        } catch (error: any) {
            console.error(error)
            toast.error(error.toString())
        }
    }

    return (
        <Container title="Edit Main Category">
            <SectionContainer canGoBack>
                {
                    isLoading ? <Loading /> :
                        <form className="flex flex-col gap-5">
                            <FormImageUpload name="categoryImage" control={control} preview={(data?.imagePath as File) ?? undefined} />
                            <FormTextInput isRequired label="Category Name" name="categoryName" control={control} rules={{ required: { value: true, message: 'Field is required' } }} />
                            <FormTextInput label="Category Description" name="categoryDescription" control={control} multiline />
                            <FormCheckboxInput label="Is Inactive" name="isInactive" control={control} />
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

export default EditMainCategory