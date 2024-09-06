import { IoEye, IoPencil, IoTrash } from "react-icons/io5"

type Props = {
    type: 'VIEW' | 'EDIT' | 'DELETE',
}

const TableActionButton = (props: Props) => {
    const { type = 'VIEW' } = props

    if (type == 'VIEW') return <IoEye size={28} className='p-1 bg-blue-500 hover:bg-blue-700 active:bg-blue-900 cursor-pointer duration-300 text-white rounded-lg' />
    if (type == 'EDIT') return <IoPencil size={28} className='p-1 bg-blue-500 hover:bg-blue-700 active:bg-blue-900 cursor-pointer duration-300 text-white rounded-lg' />
    if (type == 'DELETE') return <IoTrash size={28} className='p-1 bg-blue-500 hover:bg-blue-700 active:bg-blue-900 cursor-pointer duration-300 text-white rounded-lg' />
}

export default TableActionButton