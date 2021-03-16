import React, { useRef, useState, useEffect } from 'react';
import _ from 'lodash';
import utils from '../utils/utils';
import Button from '../components/Button';

interface EditTableProps {
    headerSpec: any
}

const PureCheckBox: any = React.memo((props: any) => {
    const [state, setState] = useState(props.checked);
    /*eslint-disabled */
    const clickValue = (e: any) => {
        let cells = e.currentTarget.parentElement.parentElement.cells;
        let tdValues: Array<any> = [];
        let checkedTarget: Array<any> = [];
        _.each(cells, (v, k) => {
            let checkBoxFlag;
            if (v.children[0]) {
                checkBoxFlag = v.children[0].type === 'checkbox' ? true : false;
            }
            if (!checkBoxFlag) {
                checkedTarget.push(v.textContent);
            }
        });


        if (!state) {
            _.each(cells, (v, k) => {

                let checkBoxFlag;
                if (v.children[0]) {
                    checkBoxFlag = v.children[0].type === 'checkbox' ? true : false;
                }
                if (!checkBoxFlag) {
                    tdValues.push(v.textContent);
                }

            });
        }
        let newState = !state;
        setState(newState);

        if (_.isFunction(props.onClick)) {
            props.onClick(e, tdValues, !state, checkedTarget);
        }
    }

    PureCheckBox.defaultProps = {
        disabled: false,
    }
    return (
        <>
            <input
                type="checkbox"
                checked={state}
                name={props.name}
                value={props.value}
                onClick={(e) => clickValue(e)} />
        </>

    )
});


const propsEquality = (preProps: any, nextProps: any) => {
    //TODO make it more specific , zack

    //selectAll變了通行
    if (preProps.selectAll !== nextProps.selectAll) {
        return false;
    } else if (preProps.queriesData === nextProps.queriesData) {

        return true;
    }

    return false;
}

const EditTable: React.FC<any> = React.memo((props) => {
    const [state, setState] = useState(props.queriesData);
    const [showContent, setShowContent] = useState(true);
    const [sortingType, setSortingType] = useState('');
    const [checkBoxSelectAllState, setCheckBoxSelectAllState] = useState(false);

    const tableRef = useRef();

    const method = props.rowSpec.method;
    const queryUrl = props.rowSpec.queryUrl;
    const requestDataKey = props.rowSpec.requestDataKey;
    const selectedValue = props.rowSpec.selectedValue;

    let ths: Array<any> = [];
    let trs: Array<any> = [];

    const checkBoxClick = (e: any, val: any, checked: any, checkedTarget: any) => {
        props.headerSpec.onCheckBoxClick(e, val, checked, checkedTarget);
    }

    const Header = (props: any) => {
        let headerStyle = { ...props.style };
        let orderByAmount = props.orderByAmount;
        let amountHeaderName = props.amountHeaderName;
        let id = props.id;
        _.assign(headerStyle, { cursor: 'pointer' });
        return (

            <th ref={(node) => {
                if (node) {
                    _.each(headerStyle, (v, k) => {
                        node.style.setProperty(k, v, "important");
                    })

                }
            }} onClick={(e: any) => {

                setShowContent(!showContent);
                setSortingType(e.currentTarget.textContent)

                props.onClick(e, !showContent, id, orderByAmount, amountHeaderName);
            }}>{props.children}
                <i className={props.showContent ? (props.angleDirection) : ''}></i>

            </th>

        )
    }

    const TRdata = (props: any) => {
        const setStyleOnDoubleClick = (e: any) => {
            if (selectedValue) {
                //非同步下無法取得currentTarget
                let getAllRow = e.currentTarget.parentElement.children;

                //重置所有row style
                _.each(getAllRow, (v, k) => {
                    v.style.backgroundColor = 'white';
                })

                //反白選取的row
                e.currentTarget.style.backgroundColor = '#cce2ff';
            }

            props.onDoubleClick(e)
        }

        // if (!selectedValue) {
        //     return (
        //         <LargeTableExtendModal
        //             {...props}
        //             trElements={props.trElements}
        //             rowKey={props.rowKey ? props.rowKey : utils.generateUID()}
        //             queryMethod={method}
        //             queryURL={queryUrl}
        //             style={{ cursor: 'pointer' }}
        //             onDoubleClick={setStyleOnDoubleClick}
        //         >
        //             {props.children}
        //         </LargeTableExtendModal>
        //     )
        // } else {
        return (
            <tr id={props.rowKey ? props.rowKey : utils.generateUID()}
                style={{ cursor: 'pointer' }}
                onDoubleClick={setStyleOnDoubleClick}
            >
                {props.children}
            </tr>
        )
        // }
    }

    const TDdata = (props: any) => {

        return (
            <td ref={(node) => {
                if (node) {
                    _.each(props.style, (v, k) => {
                        node.style.setProperty(k, v, "important");
                    })

                }

            }} style={props.style}>{props.children}</td>
        )
        // }
    }
    TDdata.defaultProps = {
        modal: false,
        large_modal: false,
    }
    //排序
    const sortingQuery = (value: any, sortingType: any, order: any, orderByAmount: any, amountHeaderName: any) => {
        let valuetoArray = _.toArray(value);

        if (orderByAmount) {
            let amountOrder = valuetoArray.sort(function (param1, param2) {
                return (order === 'desc') ? (param2[amountHeaderName].replace(/,/g, '') - param1[amountHeaderName].replace(/,/g, '')) : (param1[amountHeaderName].replace(/,/g, '') - param2[amountHeaderName].replace(/,/g, ''));
            }
            );

            return { ...amountOrder };
        } else {
            let result = _.orderBy(valuetoArray, [sortingType], [order]);

            return { ...result };

        }

    }

    const headerGenerator = (value: any) => {
        const headerEvent = (e: any, contentFlag: any, contenText: any, orderByAmount: any, amountHeaderName: any) => {
            let sortingResult = sortingQuery(state, contenText, contentFlag ? 'asc' : 'desc', orderByAmount, amountHeaderName);

            setState(sortingResult);
        }

        let header = value ? value.header : {};
        let amountSortingHeaderKey = value ? value.amountSortingHeaderKey : '';

        try {
            _.each(header, (h) => {

                let headerStyle = {};
                let orderByAmount = false;
                let amountHeaderName = '';
                if (h.style !== undefined) {
                    headerStyle = h.style;
                }

                _.each(amountSortingHeaderKey, (amount) => {
                    if (h.id === amount) {
                        amountHeaderName = h.id;
                        orderByAmount = true;
                        return false;
                    }
                });

                ths.push(
                    <Header
                        key={utils.generateUID()}
                        showContent={(sortingType === h.headerName) ? true : false}
                        angleDirection={showContent ? `icon angle down` : `icon angle up`}
                        id={h.id}
                        onClick={headerEvent}
                        style={headerStyle}
                        amountHeaderName={amountHeaderName}
                        orderByAmount={orderByAmount}
                    >
                        {h.headerName}
                    </Header>
                );
            });

            if (props.headerSpec.selectable) {
                ths.unshift(
                    <Header
                        key={utils.generateUID()}
                        showContent={(sortingType === props.headerSpec.selectableDisplayName.headerName) ? true : false}
                        angleDirection={showContent ? `icon angle down` : `icon angle up`}
                        id={props.headerSpec.selectableDisplayName.id}
                        onClick={headerEvent}>{props.headerSpec.selectableDisplayName.headerName}
                    </Header>
                );
            }
        } catch (e) {
            console.log('query data errr ', JSON.stringify(e));
        }

        return ths;
    }

    let tds: Array<any> = [];
    const trGenerator = (value: any) => {

        const trClick = (e: any) => {
            //取得欄位值
            let cells = e.currentTarget.cells;
            let trValues: any = [];
            _.each(cells, (v, k) => {

                if (v.firstElementChild) {
                    if (v.firstElementChild.type === 'checkbox') {

                        return;
                    }
                }

                trValues.push(v.textContent);

            });

            if (typeof props.rowSpec.customOnRowDoubleClick === 'function') {
                props.rowSpec.customOnRowDoubleClick(e, trValues);

            }
        }

        let headerSpec = props.headerSpec ? props.headerSpec : {};
        let columnSpec = props.columnSpec;
        // let lastRowKey = '';
        let rowKey = '';
        let tdValueBox: any = [];


        _.each(value, (item, r) => {
            // 取得RowKey 參數
            _.each(item, (v, k) => {
                if (k === requestDataKey) {
                    rowKey = v;
                }
            });

            // 依據Header 順序取得相對應的資料
            _.each(headerSpec.header, (h) => {
                let tdValue: any = '';
                let tdKey = '';
                let sendAjax = false;
                let queryURL = '';
                let queryMethod = '';
                let queryHeader: any = [];
                let tableDetails = {};
                let content: any = '';
                let style = {};
                let modal = true;

                // 套用HeaderSpec Style
                if (h.style !== undefined) {
                    style = h.style;
                }
                _.each(item, (v: any, k: any) => {
                    tdValue = v;
                    tdKey = k;
                    
                    if (tdKey === 'amount') {
                        tdValue = utils.transferToAmountFormat(tdValue);
                    }else if(tdKey === 'date'){

                        // tdValue = moment(tdValue)
                    }

                    // header key值與data key值做比對
                    if (h.id === tdKey) {
                        // 此欄位是否有定義ColumnSpec
                        _.each(columnSpec, (col) => {
                            if (col.header === tdKey) {
                                tdValueBox = [];

                                sendAjax = col.sendAjax ? col.sendAjax : false;
                                queryURL = col.url ? col.url : '';
                                queryMethod = col.method ? col.method : '';
                                queryHeader = col.headerSpec ? col.headerSpec : [];
                                tableDetails = col.tableDetails ? col.tableDetails : {};
                                style = col.style ? col.style : style;

                                switch (col.type) {
                                    case 'Button':
                                        _.each(col.displayValue, (c) => {
                                            if (tdValue.code === c) {
                                                content = <Button type='button' displayName={tdValue.label} />
                                                return false;
                                            }
                                        })

                                        break;
                                    case 'RadioBtn':

                                        break;
                                    case 'CheckBox':

                                        break;
                                    case 'Multiple':
                                        if (tdValue.code !== "") {
                                            _.each(col.displayValue, (val) => {
                                                if (tdValue.code === val.code) {
                                                    switch (val.type) {
                                                        case 'Button':
                                                            content = <Button type='button' displayName={tdValue.label} className='ui button btn-primary btn-search' />
                                                            break;
                                                        case 'Label':
                                                            content = tdValue.label;
                                                            modal = false;
                                                            break;
                                                        default:
                                                            break;
                                                    }

                                                    return false;
                                                }
                                            });
                                        }
                                        else {
                                            content = '';
                                            modal = false;
                                        }

                                        break;
                                    case 'Custom':
                                        content = tdValue;
                                        modal = false;

                                        break;
                                    default:
                                        content = tdValue;
                                        break;
                                }

                                return false;
                            }
                            else {
                                content = tdValue;
                            }
                        });

                        if (sendAjax) {
                            tds.push(
                                <TDdata
                                    tableDetails={tableDetails}
                                    queryMethod={queryMethod}
                                    queryURL={queryURL}
                                    queryHeader={queryHeader}
                                    modal={modal}
                                    style={style}
                                    rowKey={rowKey}
                                    key={utils.generateUID()}
                                >{content}

                                </TDdata>);

                        } else {
                            tds.push(<TDdata style={style} rowKey={rowKey} key={utils.generateUID()}>{content}</TDdata>);
                        }
                        tdValueBox.push(tdValue);

                        return false;
                    }
                });
            });

            if (tds.length !== 0) {
                // 是否需要Checkbox選項
                if (props.headerSpec.selectable) {
                    //塞到第一組
                    tds.unshift(
                        <td key={utils.generateUID()}><PureCheckBox key={utils.generateUID()} checked={checkBoxSelectAllState} onClick={checkBoxClick} /></td>);
                }
                let trElements = tdValueBox;

                trs.push(<TRdata key={utils.generateUID()} {...props} trElements={trElements} rowKey={rowKey} onDoubleClick={trClick}>{tds}</TRdata>);
                tds = [];
            }
        });


        return trs;
    }

    useEffect(() => {
        setState(props.queriesData);
        setSortingType('');
        return () => {
        };
    }, [props.queriesData])

    //select all and cancel all
    useEffect(() => {

        if (props.headerSpec.selectable) {
            let refs: any = tableRef;

            if (refs.current) {
                let cells = refs.current.rows;
                let resultBox: any = [];
                _.each(cells, (v, k) => {
                    let tdBox: any = [];
                    if (v.firstChild) {
                        if (v.firstChild.nodeName !== 'TH') {
                            _.each(v.cells, (v, k) => {
                                let nodeText = v.innerText;
                                if (nodeText) {
                                    tdBox.push(nodeText);
                                }
                            });
                            resultBox.push(tdBox);
                        }
                    }
                });

                if (props.selectAll) {
                    setCheckBoxSelectAllState(true);
                    props.headerSpec.getAllCheckBoxVal(resultBox);
                } else {
                    setCheckBoxSelectAllState(false);
                    props.headerSpec.getAllCheckBoxVal([]);
                }
            }
        }
        return () => {
        }
    }, [props.selectAll]);

    return (
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    {headerGenerator(props.headerSpec)}
                </tr>
            </thead>
            <tbody>
                {trGenerator(state)}
            </tbody>
        </table>

    )
}, propsEquality);

//props 預設值
EditTable.defaultProps = {
    //TODO default table, count, time 
    rowSpec: {
        selectedValue: false,
    },
    headerSpec: {
        selectable: false,
    },
    columnSpec: {
        tableDetails: {
            expandDetails: false,
        }
    },
    selectAll: false,
    displaySummaryBlockFlag: false,
    largeModalType: 'accounting'

}

export default EditTable;