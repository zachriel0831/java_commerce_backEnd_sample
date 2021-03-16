import React from 'react';

interface SystemMessageModalInterface {
    title?: string,
    content?: React.ReactNode,
    hideClose?: boolean,
    backGroundClose?: boolean,
    toogleActive?: string,
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void,
    height?: string,
    width?: string,
}

const FormModal: React.FC<SystemMessageModalInterface> = (props) => {
    let hideCloseBtn = props.hideClose;
    let content: Array<React.ReactNode> = [];
    if (hideCloseBtn) {

        content.push(
            <div className={`modal ${props.toogleActive}`} id="modal-id">
                {(props.backGroundClose) ? <a href="javascript:void(0)" className="modal-overlay" aria-label="Close" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => props.onClick(e)}></a> :
                    <a href="javascript:void(0)" className="modal-overlay" aria-label="Close"></a>
                }                <div className="modal-container">
                    <div className="modal-header">
                        <div className="modal-title h5">
                            {props.title}
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="content">
                            {props.content}
                        </div>
                    </div>
                    <div className="modal-footer">

                    </div>
                </div>
            </div>
        );

    } else {
        content.push(
            <div className={`modal ${props.toogleActive} modal-sm`} id="modal-id" >
                {(props.backGroundClose) ? <a href="javascript:void(0)" className="modal-overlay" aria-label="Close" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => props.onClick(e)}></a> :
                    <a href="javascript:void(0)" className="modal-overlay"></a>
                }
                <div className="modal-container" style={{ width: props.width, maxWidth: props.height }}>
                    <div className="modal-header">
                        <a href="javascript:void(0)" className="btn btn-clear float-right" aria-label="Close" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => props.onClick(e)}></a>
                        <div className="modal-title h5">
                            {props.title}
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="content">
                            {props.content}
                        </div>
                    </div>
                    <div className="modal-footer">
                    </div>
                </div>
            </div>
        )
    }
    return <>
        {content}
    </>
}

FormModal.defaultProps = {
    toogleActive: '',
    content: 'loading...',
    title: '表單輸入',
    hideClose: false,
    backGroundClose: true,
    width: '500px',
    height: '500px',

}

export default FormModal;