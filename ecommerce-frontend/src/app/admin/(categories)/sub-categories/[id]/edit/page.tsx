'use client'

import Button from "@/components/button/button"
import Container from "@/components/container/content-wrapper.container"
import SectionContainer from "@/components/container/section-wrapper.container"
import FormCheckboxInput from "@/components/input/form/form-checkbox-input"
import FormDropdownInput from "@/components/input/form/form-dropdown-input"
import FormImageUpload from "@/components/input/form/form-image-upload"
import FormTextInput from "@/components/input/form/form-text-input"
import Loading from "@/components/loading/loading"
import { useGetMainCategoryOptions } from "@/hooks/category/main-category.query"
import { useUpdateSubCategory } from "@/hooks/category/sub-category.mutation"
import { useGetSubcategory } from "@/hooks/category/sub-category.query"
import { MainCategoryData } from "@/services/categories/main-category.service"
import { SubcategoryData, SubCategorySavePayload } from "@/services/categories/sub-category.service"
import uploadService from "@/services/uploads/upload.service"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type PageParams = { id: string }

type FormValues = {
    categoryName: string
    categoryDescription: string
    categoryImage: string | File
    mainCategoryUuid: string
    isInactive: boolean
}

const EditSubCategoryPage = () => {
    const params = useParams<PageParams>()
    const { data, isLoading } = useGetSubcategory(params.id)

    const { data: mainCategoryOptions } = useGetMainCategoryOptions({ page: 1, size: 100 })
    const { mutateAsync: updateSubCategory } = useUpdateSubCategory(params.id)

    const router = useRouter()

    const initialValues = {
        categoryName: data?.name ?? '',
        categoryDescription: data?.description ?? '',
        categoryImage: data?.imagePath,
        mainCategoryUuid: (data?.mainCategory as MainCategoryData)?.uuid ?? '',
        isInactive: data?.isInactive ?? false
    }

    const { handleSubmit, control, reset } = useForm<FormValues>({
        defaultValues: initialValues,
        mode: "all",
    })

    useEffect(() => {
        reset(initialValues)
    }, [data])

    const onSubmit = async (data: FormValues) => {
        try {
            const uploadedFilePath = await uploadService.uploadSingleFile(data.categoryImage as File)

            const subCategoryPayload: SubCategorySavePayload = {
                name: data.categoryName,
                description: data.categoryDescription,
                imagePath: uploadedFilePath ?? '',
                mainCategoryId: data.mainCategoryUuid,
                isInactive: data.isInactive
            }

            await updateSubCategory(subCategoryPayload)
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
                            <FormImageUpload name="categoryImage" preview={data?.imagePath as File} control={control} />
                            <FormTextInput label="Category Name" name="categoryName" control={control} />
                            <FormTextInput label="Category Description" name="categoryDescription" control={control} multiline />
                            {mainCategoryOptions && <FormDropdownInput control={control} label="Main Category" name="mainCategoryUuid" options={mainCategoryOptions} />}
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

export default EditSubCategoryPage