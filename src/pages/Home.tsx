import React, { useState, useContext, useEffect } from 'react';
import Text from '../components/Text';
import Select from '../components/Select';
import useForm from '../custom-hooks/useForm';
// import Options from '../interfaces/OptionsInterface';
import Button from '../components/Button';
import Form from '../components/Form';
import _ from 'lodash';
// import { useTranslation } from "react-i18next";
import { useHistory } from 'react-router-dom';
import utils from '../utils/utils';
import config from '../configs/config';
import axios, { AxiosRequestConfig } from 'axios';
import FormModal from '../components/FormModal';
import SystemMessageModal from '../components/SystemMessageModal';
import Password from '../components/Password';
import Numbers from '../components/Numbers';
import Amount from '../components/Amount';
import EditTable from '../components/EditTable';
import AxiosRequestConfigs from '../interfaces/AxiosRequestConfig';
import moment from 'moment';

const Home: React.FC<any> = (props) => {
    const initState: Object = {};
    const { values, handleChange, handleSelectChange, handleSubmit, handleReset, formKeyPress } = useForm(resetForm, submit, initState);
    // const { t } = useTranslation();
    const [selectAllState, setSelectAllState] = useState(false);

    const [queriesState, setQueriesState] = useState<any>({});
    const [checkBoxListState, setCheckBoxListState] = useState<Array<any>>([]);
    const [pureCheckBoxState, setPureCheckBoxState] = useState<any>();
    const [activeModalState, setActiveModalState] = useState<string>('');

    useEffect(() => {
        let queryDatas: any = {};
        queryDatas.queries = props.initDatas.data;
        setQueriesState(queryDatas);
    }, []);

    useEffect(() => {
        if (pureCheckBoxState) {
            let checked = pureCheckBoxState.checked;
            let val = pureCheckBoxState.val;
            let checkedTarget = pureCheckBoxState.checkedTarget;

            let newArray;
            if (checked) {

                newArray = [...checkBoxListState, val[0]];
            } else {
                newArray = checkBoxListState.filter(function (item, index, array) {
                    console.log(item[0]);

                    return checkedTarget[0] !== item;
                });
            }
            setCheckBoxListState(newArray);
        }

    }, [pureCheckBoxState]);

    const selectedCheckBoxClick = (e: any, val: any, checked: any, checkedTarget: any) => {


        setPureCheckBoxState({ 'val': val, 'checked': checked, 'checkedTarget': checkedTarget });

    }

    const activeModal = (e: React.MouseEvent<HTMLButtonElement>, type: string) => {
        setActiveModalState(type);
    }

    const closeModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
        setActiveModalState('');
        //TODO clear all modal form data
        props.resetKey();

    }


    const getAllCheckBoxVal = (val: any) => {
        if (_.isEmpty(val)) {
            checkBoxListState.splice(0, checkBoxListState.length)

            setCheckBoxListState(checkBoxListState);
            return;
        }
        checkBoxListState.push(...val);
        setCheckBoxListState(checkBoxListState);

        console.log('getAllcheckBoxVal ', val);
    }

    const updateProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
        //TODO
        let updateProduct: any = productFactory(values,'update');
        const axioConfig: AxiosRequestConfig = {
            baseURL: config.backEndUrl, //TODO
            data: updateProduct,
            method: 'POST',
            url: 'updateProduct',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json;charset=UTF-8',
                withCredentials: false,
            },
        }

        axios(axioConfig).then(function (response) {
            let queryDatas: any = {};
            alert('更新成功!');

            queryDatas.queries = response.data;
            setQueriesState(queryDatas);
        }).catch(function (error) {
            // handle error
            console.log(error);
            // alert('request failed!')
        }).finally(function () {
            console.log('request finished');
        });

    }

    const deleteItems = async (e: React.MouseEvent<HTMLButtonElement>) => {

        // await _.each(checkBoxListState, async (v, k) => {
        // let id = v[0];

        const axioConfig: AxiosRequestConfigs = {
            baseURL: config.backEndUrl, //TODO
            data: checkBoxListState,
            method: 'POST',
            url: 'deleteProducts',
            'Content-Type': 'application/json;charset=UTF-8',
            headers: {
                withCredentials: false,
            },
        }

        await axios(axioConfig).then(function (response) {
            let queryDatas: any = {};
            alert('刪除成功!');

            queryDatas.queries = response.data;
            setQueriesState(queryDatas);

        }).catch(function (error) {
            // handle error
            console.log(error);
            alert('request failed!')
        }).finally(function () {
            console.log('request finished');

        });
        // });

        // props.resetKey();
    }


    function resetForm(e: React.FormEvent<HTMLInputElement>, formRef: React.RefObject<HTMLFormElement>) {
        // props.resetKey();
    }

    const productFactory = (values: any, type: string) => {
        let data: any = {}; //make typescript product model
        let date = moment().toDate();
        // let month = moment().format('MM');
        // let day = moment().format('DD');
        // let year = moment().format('YYYY');;

        // data.productId = `${moment().unix()}_${values.categoryId}_${moment().format('YYYY/MM/DD')}_${values.productName}`;
        switch (type) {
            case 'update':
                data.productId = values.updateProductId;
                data.productName = values.updateProductName;
                data.categoryId = parseInt(values.updateCategoryId);
                data.productPrice = values.updateProductPrice;
                data.productStock = values.updateProductStock;
                data.description = values.updateDescription;
                data.imageDir = values.updateImageDir;
                break;

            case 'add':
                data.productName = values.productName;
                data.categoryId = parseInt(values.categoryId);
                data.productPrice = values.productPrice;
                data.productStock = values.productStock;
                data.description = values.description;
                // data.createTime = date.getMilliseconds.toString();
                // data.updateTime = date.getMilliseconds.toString();
                // data.previousUpdateTime = date.getMilliseconds.toString();
                data.imageDir = values.imageDir;

                break;

            default:
                break;
        }

        return data;
    }

    function submit(e: React.FormEvent<HTMLInputElement>, formRef: React.RefObject<HTMLFormElement>) {
        let product: any = productFactory(values,'add');


        const axioConfig: AxiosRequestConfig = {
            baseURL: config.backEndUrl, //TODO
            data: product,
            method: 'POST',
            url: 'addNewProduct',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json;charset=UTF-8',
                withCredentials: false,
            },
        }

        axios(axioConfig).then(function (response) {
            let queryDatas: any = {};

            queryDatas.queries = response.data;
            setQueriesState(queryDatas);

            alert('新增成功!');
        }).catch(function (error) {
            // handle error
            console.log(error);
            // alert('request failed!')
        }).finally(function () {
            console.log('request finished');
        });
    }

    let headerSpec = {
        header: [
            { id: 'productId', headerName: 'productId', style: { display: 'none' } },
            { id: 'productName', headerName: '商品名稱' },
            { id: 'categoryId', headerName: 'categoryId' },
            { id: 'productPrice', headerName: '商品價格' },
            { id: 'productStock', headerName: '上架數量' },
            { id: 'imageDir', headerName: '圖片名稱' },
            { id: 'description', headerName: '描述' },
            { id: 'createTime', headerName: '上架日期' },
            { id: 'updateTime', headerName: '更新日期' },

        ],
        selectable: true, //開啟checkbox
        selectableDisplayName: { id: 'select', headerName: '勾選' },
        onCheckBoxClick: selectedCheckBoxClick,
        getAllCheckBoxVal: (val: any) => getAllCheckBoxVal(val),
        amountSortingHeaderKey: ["amount"],
        // requestDataHeaderKey: [ "num", "msg_num" ]
    }

    const doubleClick = (e: any, trValues: any) => {
        console.log('click row data: ', trValues);
        // (8) ["37", "wrqq", "0", "q241", "1241", "qrq", "Mar 14, 2021 11:52:16 PM", "Mar 14, 2021 11:52:16 PM"]0: "37"1: "wrqq"2: "0"3: "q241"4: "1241"5: "qrq"6: "Mar 14, 2021 11:52:16 PM"7: "Mar 14, 2021 11:52:16 PM"length: 8__proto__: Array(0)
        values.updateProductId = trValues[0];
        values.updateProductName = trValues[1];
        values.updateCategoryId = trValues[2];
        values.updateProductPrice = trValues[3];
        values.updateProductStock = trValues[4];
        values.updateImageDir = trValues[5];
        values.updateDescription = trValues[6];

        activeModal(e, 'update');

    }

    let rowSpec = {
        selectedValue: true,
        // selectedValue: false,
        queryUrl: '/',
        method: 'POST',
        requestDataKey: 'id',
        customOnRowDoubleClick: doubleClick,
    }

    let columnSpec = [
        {
            header: 'id',
            style: { display: 'none' },
        }
    ];

    return <><h3 className="s-title" >Home</h3>
        <Form formKeyPress={(e: React.KeyboardEvent<HTMLFormElement>) => formKeyPress(e)}
            onReset={(e: React.FormEvent<HTMLInputElement>, formRef: React.RefObject<HTMLFormElement>) => handleReset(e, formRef)}
            onSubmit={(e: React.FormEvent<HTMLInputElement>, formRef: React.RefObject<HTMLFormElement>) => handleSubmit(e, formRef)}>
            <Text
                value={values.productName}
                name='productName'
                label='商品名稱'
                maxLength={15}
                minLength={1}
                size={10}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />

            <Amount
                value={values.productPrice}
                decimal={false}
                name='productPrice'
                label='商品價格'
                maxLength={15}
                minLength={1}
                size={10}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />

            <Select
                label='商品種類'
                value={values.categoryId}
                name='categoryId'
                options={
                    [{ label: '手機/平板', value: '0' }]
                }
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSelectChange(e)} />

            <Numbers
                value={values.productStock}
                name='productStock'
                label='上架數量'
                maxLength={30}
                minLength={1}
                size={10}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />

            <Text
                value={values.imageDir}
                name='imageDir'
                label='圖片名稱'
                maxLength={30}
                minLength={1}
                size={10}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />

            <Text
                value={values.description}
                name='description'
                label='商品描述'
                maxLength={50}
                minLength={1}
                size={10}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />


            <Button className='btn btn-primary' icon='' name='button' type='submit' displayName='送出' />

            <Button
                className='btn'
                type='button'
                displayName='刪除商品'
                icon=''
                onClick={(e) => deleteItems(e)}

            />

            <EditTable
                {...props}
                largeModalType='accounting'
                headerSpec={headerSpec}
                queriesData={queriesState.queries}
                selectAll={selectAllState}
                columnSpec={columnSpec}
                rowSpec={rowSpec}

            />


            <FormModal title='' width='800px' height='1600px' content={
                <>
                    <div className='docs-demo columns'>
                        <Text
                            value={values.updateProductName}
                            name='updateProductName'
                            label='商品名稱'
                            maxLength={15}
                            minLength={1}
                            size={10}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />

                        <Amount
                            value={values.updateProductPrice}
                            decimal={false}
                            name='updateProductPrice'
                            label='商品價格'
                            maxLength={15}
                            minLength={1}
                            size={10}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />

                        <Select
                            label='商品種類'
                            value={values.updateCategoryId}
                            name='updateCategoryId'
                            options={
                                [{ label: '手機/平板', value: '0' }]
                            }
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSelectChange(e)} />

                        <Numbers
                            value={values.updateProductStock}
                            name='updateProductStock'
                            label='上架數量'
                            maxLength={30}
                            minLength={1}
                            size={10}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />

                        <Text
                            value={values.updateImageDir}
                            name='updateImageDir'
                            label='圖片名稱'
                            maxLength={30}
                            minLength={1}
                            size={10}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />

                        <Text
                            value={values.updateDescription}
                            name='updateDescription'
                            label='商品描述'
                            maxLength={50}
                            minLength={1}
                            size={10}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />


                    </div>
                    <Button className='' icon='' name='button' type='button' displayName='送出變更' onClick={(e: React.MouseEvent<HTMLButtonElement>) => updateProduct(e)} />
                </>}
                toogleActive={(activeModalState === 'update') ? 'active' : ''}
                hideClose={false}
                backGroundClose={false}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => closeModal(e)} />
        </Form>


    </>
}

export default Home;