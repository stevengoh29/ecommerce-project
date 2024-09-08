'use client'

import Button from "@/components/button/button"
import Container from "@/components/container/content-wrapper.container"
import SectionContainer from "@/components/container/section-wrapper.container"
import FormCheckboxInput from "@/components/input/form/form-checkbox-input"
import FormImageUpload from "@/components/input/form/form-image-upload"
import FormTextInput from "@/components/input/form/form-text-input"
import Loading from "@/components/loading/loading"
import Table, { TableColumnType } from "@/components/table/table"
import { useGetMainCategory } from "@/hooks/category/main-category.query"
import { useGetSubCategories } from "@/hooks/category/sub-category.query"
import { SubcategoryData } from "@/services/categories/sub-category.service"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import { IoImage } from "react-icons/io5"

type PageParams = { id: string }

type FormValues = {
    categoryName: string
    categoryDescription: string
    categoryImage: File | string
    isInactive: boolean
}

const ViewMainCategoryPage = () => {
    const params = useParams<PageParams>()

    const { data, isLoading } = useGetMainCategory(params.id)
    const { data: subcategories, isLoading: isLoadingSubcategories } = useGetSubCategories({ page: '1', mainCategoryUuid: params.id })

    const router = useRouter()

    const SUB_CAT_COLUMN = useMemo(() => [
        { key: 'uuid', label: 'Category Id', width: 'w-32', type: 'LINK' as TableColumnType, onCellClicked: (data: SubcategoryData) => router.push(`/admin/sub-categories/${data.uuid}`) },
        { key: 'imagePath', label: 'Image', width: 'w-9', type: 'IMAGE' as TableColumnType },
        { key: 'name', label: 'Category Name', width: 'w-64' },
        { key: 'mainCategory.name', label: 'Main Category', width: 'w-64' },
        { key: 'isInactive', label: 'Is Inactive?', width: 'w-32', type: 'BOOL' as TableColumnType },
    ], [router])

    const initialValues = {
        categoryName: data?.name ?? '',
        categoryDescription: data?.description ?? '',
        categoryImage: data?.imagePath,
        isInactive: data?.isInactive
    }

    const { control, reset } = useForm<FormValues>({
        defaultValues: initialValues,
        mode: "all",
    })

    useEffect(() => {
        reset(initialValues)
    }, [data])

    return (
        <Container title="Main Category View">
            <SectionContainer canGoBack title="Main Category Data">
                {
                    isLoading ? <Loading /> :
                        <form className="flex flex-col gap-5">
                            {data?.imagePath ? <FormImageUpload name="categoryImage" control={control} preview={(data?.imagePath as File) ?? undefined} disabled /> : <IoImage className="w-20 h-20 text-slate-400" />}
                            <FormTextInput isRequired label="Category Name" name="categoryName" control={control} rules={{ required: { value: true, message: 'Field is required' } }} disabled />
                            <FormTextInput label="Category Description" name="categoryDescription" control={control} multiline disabled />
                            <FormCheckboxInput label="Is Inactive" name="isInactive" control={control} disabled />
                        </form>
                }
            </SectionContainer>
            <SectionContainer title={data?.name ? `${data.name}'s Subcategory Listing` : ''}>
                {isLoadingSubcategories ? <Loading /> :
                    <Table
                        data={subcategories.data}
                        columns={SUB_CAT_COLUMN}
                    />
                }
                {/* <>{JSON.stringify(subcategories)}</> */}
            </SectionContainer>
        </Container>
    )
}

export default ViewMainCategoryPage