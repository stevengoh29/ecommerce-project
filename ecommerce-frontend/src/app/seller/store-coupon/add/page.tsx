'use client'

import FlexBox from "@/components/box/flex-box"
import Button from "@/components/button/button"
import Container from "@/components/container/content-wrapper.container"
import SectionContainer from "@/components/container/section-wrapper.container"
import FormCheckboxInput from "@/components/input/form/form-checkbox-input"
import FormDateTimePicker from "@/components/input/form/form-datetime-picker"
import FormDropdownInput from "@/components/input/form/form-dropdown-input"
import FormMultiselectInput from "@/components/input/form/form-multiselect-input"
import FormTextInput from "@/components/input/form/form-text-input"
import { useGetSubcategoriesOptionByStore } from "@/hooks/category/sub-category.query"
import { useAppSelector } from "@/hooks/common/use-redux.hook"
import { StoreCouponPayload } from "@/services/coupons/store-coupon.service"
import { useForm } from "react-hook-form"

export type FormValues = Omit<StoreCouponPayload, 'storeUuid'>

const AddStoreCouponPage = () => {
    const { handleSubmit, control, reset } = useForm<FormValues>({
        defaultValues: {
            name: '',
            description: '',
            validFrom: null,
            validTo: null,
            quotaLimit: 0,
            isValidToAll: false,
            minimumPurchase: 0,
            maximumDiscountAmount: 0,
            canStack: false,
            discountType: 'percentage',
            subcategoryUuids: []
        }
    })

    const onSubmit = (data: any) => {
        console.log(data)
    }

    const { storeId } = useAppSelector(root => root.users)
    const { data: subcategoryOptions } = useGetSubcategoriesOptionByStore(storeId ?? '')

    return (
        <Container title="Add Store Coupon">
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                <SectionContainer canGoBack className="py-5">
                    <FlexBox>
                        <FormTextInput
                            name="name"
                            control={control}
                            label="Coupon Name"
                        />
                        <FormTextInput
                            name="description"
                            control={control}
                            label="Coupon Description"
                            multiline
                        />

                        <FlexBox className="flex lg:flex-row">
                            <FormDateTimePicker
                                label="Valid From"
                                name="validFrom"
                                control={control}
                            />
                            <FormDateTimePicker
                                label="Valid To"
                                name="validTo"
                                control={control}
                            />
                        </FlexBox>
                    </FlexBox>
                </SectionContainer>
                <SectionContainer className="py-5">
                    <FlexBox>
                        <FormDropdownInput
                            control={control}
                            name="type"
                            label="Coupon Type"
                            options={[{ label: 'PERCENTAGE', value: 'PERCENTAGE' }, { label: 'FIXED', value: 'FIXED' }]}
                        />

                        <FlexBox className="lg:flex-row">
                            <FormTextInput
                                type="number"
                                control={control}
                                name="quotaLimit"
                                label="Quota Limit"
                            />
                            <FormTextInput
                                type="number"
                                control={control}
                                name="minimumPurchase"
                                label="Min. Purchase"
                            />
                            <FormTextInput
                                type="number"
                                control={control}
                                name="maximumDiscountAmount"
                                label="Max. Discount Amout"
                            />
                        </FlexBox>
                        <FormCheckboxInput label="Can stack with other coupons?" control={control} name="canStack" />
                    </FlexBox>
                </SectionContainer>
                <SectionContainer className="py-5">
                    <FlexBox>
                        <FormCheckboxInput label="Is Valid to all products?" control={control} name="isValidToAll" />
                        <FormMultiselectInput
                            label="Subcategories"
                            name="subcategoryUuids"
                            options={subcategoryOptions ?? []}
                            control={control}
                        />
                    </FlexBox>
                </SectionContainer>
                <Button label="submit" onClick={handleSubmit(onSubmit)} />
            </form>
        </Container>
    )
}

export default AddStoreCouponPage