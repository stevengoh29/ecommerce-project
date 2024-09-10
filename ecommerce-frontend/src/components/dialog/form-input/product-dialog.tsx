import Button from "@/components/button/button"
import Table, { TableColumnType } from "@/components/table/table"
import { useAppSelector } from "@/hooks/common/use-redux.hook"
import { useGetProducts } from "@/hooks/products/product.query"
import { ProductData } from "@/services/products/product.service"
import { useState } from "react"

const PROD_COLUMN = [
    { key: 'uuid', label: '# Id', width: 'w-32', type: 'LINK' as TableColumnType },
    { key: 'imageUrl', label: 'Image', width: 'w-9', type: 'IMAGES' as TableColumnType },
    { key: 'name', label: 'Product Name', width: 'w-48' },
    { key: 'subCategory.name', label: 'Subcategory Name', width: 'w-48' },
    { key: 'isInactive', label: 'Is Inactive?', width: 'w-32', type: 'BOOL' as TableColumnType },
]

type Props = {
    onProductSelected: (products: ProductData[]) => void
    defaultData?: ProductData[]
    onCompletedAction: () => void
}

const ProductDialog = (props: Props) => {
    const { storeId } = useAppSelector((root) => root.users)
    const { data } = useGetProducts({ storeUuid: storeId ?? '' })
    const [selectedProducts, setSelectedProducts] = useState<ProductData[]>(props.defaultData ?? [])

    const onSelectedProduct = () => {
        props.onProductSelected(selectedProducts)
        props.onCompletedAction()
    }

    return (
        <div className="flex flex-col gap-5 mt-5">
            <Table
                columns={PROD_COLUMN}
                data={data?.data ?? []}
                canSelectMultiple
                defaultSelectedRows={selectedProducts}
                onRowsSelected={(data: ProductData[]) => setSelectedProducts(data)}
            />
            <div className="flex items-center justify-between">
                <p className="text-sm">{selectedProducts.length} product(s) selected</p>
                <Button label="Select" onClick={onSelectedProduct} />
            </div>
        </div>
    )
}

export default ProductDialog