import { AxiosRequestConfig } from 'axios'

export default interface AxiosRequestConfigs extends AxiosRequestConfig {
    'Content-Type': string,
}