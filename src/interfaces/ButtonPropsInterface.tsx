
export default interface Props {
    name?: string,
    size?: number,
    readOnly?: boolean,
    disabled?: boolean,
    type: any,
    className?: string,
    icon?: string,
    style?: Object,
    displayName: string,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,

}