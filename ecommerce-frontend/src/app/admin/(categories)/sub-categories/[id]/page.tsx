'use client'

import Button from "@/components/button/button"
import Container from "@/components/container/content-wrapper.container"
import SectionContainer from "@/components/container/section-wrapper.container"
import FormCheckboxInput from "@/components/input/form/form-checkbox-input"
import FormDropdownInput from "@/components/input/form/form-dropdown-input"
import FormImageUpload from "@/components/input/form/form-image-upload"
import FormTextInput from "@/components/input/form/form-text-input"
import Loading from "@/components/loading/loading"
import { useGetSubcategory } from "@/hooks/category/sub-category.query"
import { MainCategoryData } from "@/services/categories/main-category.service"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { IoImage } from "react-icons/io5"

type PageParams = { id: string }

type FormValues = {
    categoryName: string
    categoryDescription: string
    categoryImage: string | File
    mainCategory: string
    isInactive: boolean
}

const ViewSubCategoryPage = () => {
    const params = useParams<PageParams>()
    const { data, isLoading } = useGetSubcategory(params.id)
    const router = useRouter()

    const initialValues = {
        categoryName: data?.name ?? '',
        categoryDescription: data?.description ?? '',
        categoryImage: data?.imagePath,
        mainCategory: (data?.mainCategory as MainCategoryData)?.name ?? '',
        isInactive: data?.isInactive ?? false
    }

    const { handleSubmit, control, reset } = useForm<FormValues>({
        defaultValues: initialValues,
        mode: "all",
    })

    useEffect(() => {
        reset(initialValues)
    }, [data])

    return (
        <Container title="Subcategory View">
            <SectionContainer canGoBack className="py-5">
                {
                    isLoading ? <Loading /> :
                        <form className="flex flex-col gap-5">
                            {data?.imagePath ? <FormImageUpload name="categoryImage" control={control} preview={(data?.imagePath as File) ?? undefined} disabled /> : <IoImage className="w-20 h-20 text-slate-400" />}
                            <FormTextInput label="Category Name" name="categoryName" control={control} disabled />
                            <FormTextInput label="Category Description" name="categoryDescription" control={control} multiline disabled />
                            <FormTextInput label="Main Category" name="mainCategory" control={control} disabled />
                            <FormCheckboxInput label="Is Inactive" name="isInactive" control={control} disabled />
                        </form>
                }
            </SectionContainer>
        </Container>
    )
}

export default ViewSubCategoryPage