import classNames from "classnames"
import React from "react"

type Props = React.ComponentProps<'td'> & {

}

const TableCell = (props: Props) => {
    const { className, children, ...rest } = props
    return <td {...rest} className={classNames(`px-4 py-2 border-b border-gray-200 text-sm text-gray-700 truncate`, className)}>{props.children}</td>
}

export default TableCell