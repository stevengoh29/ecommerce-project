import classNames from "classnames"
import { ComponentProps } from "react"

type Props = ComponentProps<'div'> & {

}

const FlexBox = (props: Props) => {
    const { className, ...rest } = props

    return (
        <div className={classNames(`w-full flex flex-col gap-3`, className)} {...rest}>
            {props.children}
        </div>
    )
}

export default FlexBox