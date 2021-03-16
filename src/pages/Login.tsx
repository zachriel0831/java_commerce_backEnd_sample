import React, { useContext, lazy } from 'react';
import Text from '../components/Text';
// import Select from '../components/Select';
import useForm from '../custom-hooks/useForm';
// import Options from '../interfaces/OptionsInterface';
import Button from '../components/Button';
import Form from '../components/Form';
import { IndexContext } from '../contexts/IndexContext'
import _ from 'lodash';
// import { useTranslation } from "react-i18next";
import { useHistory, Route } from 'react-router-dom';
import withPages from '../hocs/withPages';
import config from '../configs/config';
import Password from '../components/Password';
import utils from '../utils/utils';

const Login: React.FC<any> = (props) => {

    const initState: Object = {};
    const { values, handleChange, handleSelectChange, handleSubmit, handleReset, formKeyPress } = useForm(resetForm, submit, initState);
    // const { t } = useTranslation();
    const { setContextState } = useContext(IndexContext);
    let history = useHistory();

    function resetForm(e: React.FormEvent<HTMLInputElement>, formRef: React.RefObject<HTMLFormElement>) {
        // props.resetKey();
    }

    function submit(e: React.FormEvent<HTMLInputElement>, formRef: React.RefObject<HTMLFormElement>) {
        props.submitToServer('POST', '/login', values, '/home',
            (resp: any) => {

                let result = resp.data.msg;
                if (result === 'fail') {
                    alert('密碼或使用者錯誤!');
                    return;
                }

                let systemConfig: any = {};
                let route: Array<any> = [];
                let routes = config.routersData;

                _.each(routes, (v, k) => {
                    const txnComponent: any = withPages(lazy(() => import(`../pages${v}`)));
                    // console.log('path ', v);        
                    route.push(<Route exact sensitive={true} path={v} key={v} component={txnComponent} />);
                })
                systemConfig.auth = true;
                systemConfig.route = route;
                systemConfig.theme = 'default';

                if (utils.getCookie('matchingDatas')) {
                    systemConfig.matchingDatas = JSON.parse(utils.getCookie('matchingDatas'))
                } else {
                    if (!_.isEmpty(resp.data.locations)) {
                        let saveUserDatas = JSON.stringify(resp.data);
                        utils.setCookie('matchingDatas', saveUserDatas);
                        systemConfig.matchingDatas = resp.data;
                    }
                }
                setContextState(systemConfig);

                history.push('/Home');

            },
            (error: any) => {

                alert(error);
                return;
            }
        );
        props.resetKey();
    }

    return <>
        <h3 className="s-title" >Login</h3>
        <Form formKeyPress={(e: React.KeyboardEvent<HTMLFormElement>) => formKeyPress(e)}
            onReset={(e: React.FormEvent<HTMLInputElement>, formRef: React.RefObject<HTMLFormElement>) => handleReset(e, formRef)}
            onSubmit={(e: React.FormEvent<HTMLInputElement>, formRef: React.RefObject<HTMLFormElement>) => handleSubmit(e, formRef)}>
            <Text
                value={values.userId}
                name='userId'
                label='userId'
                maxLength={15}
                minLength={1}
                size={10}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />

            <Password
                name='password'
                label='password'
                maxLength={30}
                minLength={1}
                size={10}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />

            <Button className='btn btn-primary' icon='' name='button' type='submit' displayName='submit' />
            <span className="label mr-1"><a href='#/RecoveryCenter'>forgot password?</a></span>
            <span className="label mr-1"><a href='#/Register'>go to registry page</a></span>

        </Form>
    </>
}

export default Login;