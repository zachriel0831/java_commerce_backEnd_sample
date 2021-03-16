
export default interface Props {
    name: string,
    decimal: boolean,
    label: string,
    minLength: number,
    maxLength: number,
    decimalLength?: number,
    value?: string,
    size: number,
    readOnly?: boolean,
    style?: Object,
    placeholder?: string,
    is_success?: string,
    warningMsg?: string,
    disabled?: boolean,
    componentType?: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onkeypress?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLInputElement>, param: any) => void
}