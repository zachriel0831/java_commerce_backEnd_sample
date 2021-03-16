
import Options from './OptionsInterface';

export default interface Props {
    label?: string,
    name: string,
    readOnly?: boolean,
    options: any,
    value: string,
    style?: Object,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    // ref?:React.RefObject<HTMLSelectElement>
}