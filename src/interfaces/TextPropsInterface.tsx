export default interface Props {
    name: string,
    label: string,
    minLength: number,
    maxLength: number,
    value?: string,
    size: number,
    readOnly?: boolean,
    style?: Object,
    placeholder?: string,
    is_success?: string,
    warningMsg?: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onkeypress?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}