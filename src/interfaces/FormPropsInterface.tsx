import { ReactNode } from "react";

export default interface Props {
    children: ReactNode,
    onSubmit: (e: React.FormEvent<HTMLInputElement>,formRef:React.RefObject<HTMLFormElement>) => void,
    onReset: (e: React.FormEvent<HTMLInputElement>,formRef:React.RefObject<HTMLFormElement>) => void,
    formKeyPress :(e: React.KeyboardEvent<HTMLFormElement>) => void,
}