import React from 'react';

interface SystemMessageModalInterface {
    title?: string,
    content?: string,
    hideClose?: boolean,
    toogleActive?: string,
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void,
}

const SystemMessageModal: React.FC<SystemMessageModalInterface> = (props) => {
    let hideCloseBtn = props.hideClose;
    let content: Array<React.ReactNode> = [];
    if (hideCloseBtn) {

        content.push(
            <div className={`modal ${props.toogleActive}`} id="modal-id">
                <a href="javascript:void(0)" className="modal-overlay" aria-label="Close"></a>
                <div className="modal-container">
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
            <div className={`modal ${props.toogleActive}`} id="modal-id">
                <a href="javascript:void(0)" className="modal-overlay" aria-label="Close" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => props.onClick(e)}></a>
                <div className="modal-container">
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

SystemMessageModal.defaultProps = {
    toogleActive: '',
    content: 'loading...',
    title: '系統資訊',
    hideClose: false,

}

export default SystemMessageModal;