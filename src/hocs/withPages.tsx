import React, { Suspense, useState, useEffect } from 'react';
import _ from 'lodash';
import moment from 'moment';
import axios from 'axios';
import AxiosRequestConfigs from '../interfaces/AxiosRequestConfig';
import config from '../configs/config';
import { useHistory } from 'react-router-dom';

export type Method = | 'get' | 'GET'
    | 'delete' | 'DELETE'
    | 'head' | 'HEAD'
    | 'options' | 'OPTIONS'
    | 'post' | 'POST'
    | 'put' | 'PUT'
    | 'patch' | 'PATCH'
    | 'link' | 'LINK'
    | 'unlink' | 'UNLINK'

interface CustomCallBack {
    (response: any): void;
}


const withPages = (WrappedComponent: any) => {

    const Result: React.FC = () => {
        const [resetKeyState, setResetKeyState] = useState(Math.random());
        const [initState, setInitState] = useState({});
        let history = useHistory();

        useEffect(() => {
            let path = history.location.pathname as never;
            let skipInit = config.skipInit.includes(path);
            if (!skipInit) {
                const axioConfig: AxiosRequestConfigs = {
                    baseURL: config.backEndUrl, //TODO
                    method: 'GET',
                    url: '/selectAllProducts',
                    'Content-Type': 'application/json;charset=UTF-8',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
                        'Content-Type': 'application/json;charset=UTF-8',
                        withCredentials: true,
                    },
                }

                axios(axioConfig).then(function (response) {

                    setInitState(response);
                }).catch(function (error) {
                    // handle error
                    console.log(error);
                    // alert('request failed!')
                }).finally(function () {
                    console.log('request finished');
                });
            } else {
                setInitState('skipInit');
            }

        }, [])

        let baseFuncs: Object = {
            resetKey: () => {
                setResetKeyState(Math.random());
            },
            submitToServer: async (method: Method, url: string, data: any, nextPage: string, callback: CustomCallBack, errorCallBack: CustomCallBack) => {

                const axioConfig: AxiosRequestConfigs = {
                    baseURL: config.mode === 0 ? config.backEndUrl : config.backEndUrl, //TODO
                    data: data,
                    method: method,
                    url: url,
                    'Content-Type': 'application/json;charset=UTF-8',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
                        'Content-Type': 'application/json;charset=UTF-8',
                        withCredentials: true,
                    },
                }

                await axios(axioConfig).then(function (response) {

                    let msg = response.data.msg;
                    let token = response.data.jwtToken;
                    let status = response.data.status;

                    if (_.isNull(token)) {


                        alert('密碼或使用者錯誤!');
                        return;
                    }
                    //TODO set errorCode when this spec is done;
                    if (url === '/login') {
                        if (msg !== 'fail') {
                            localStorage.setItem('token', token);
                        }
                    }
                    callback(response);
                }).catch(function (error) {
                    // handle error
                    console.log(error);
                    errorCallBack(error);
                    // alert('request failed!')
                }).finally(function () {
                    console.log('request finished');
                });
            }
        }


        if (!_.isEmpty(initState)) {
            return <Suspense fallback={<>loading...</>}><WrappedComponent key={resetKeyState} {...baseFuncs} initDatas={initState} /></Suspense>

        } else {

            return <>loading....</>

        }

    }

    return Result;
}

export default withPages;