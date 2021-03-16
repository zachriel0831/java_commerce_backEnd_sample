import React from 'react';

const ClinicCards: React.FC<any> = (props) => {

    const cardClick = (e: React.MouseEvent<HTMLDivElement>) => {
        props.onClick(e);
    }

    return (
        <div className={`card`} style={{ cursor: 'pointer' }} onClick={(e: React.MouseEvent<HTMLDivElement>) => cardClick(e)}>
            {/* <div className="card-image">
                <img src="" className="img-responsive" />
          </div> */}
            <div className="card-header">
                <div className="card-title h5">{props.title}
                </div>
                <div className="card-subtitle text-gray">
                </div>
            </div>
            <div className="card-body">
                <span className='card-list'> agencyCode:</span>{props.agencyCode}
                <p />
                <span className='card-list'>agencyName:</span>{props.agencyName}
                <p />
                <span className='card-list'> address:</span>{props.address}
                <p />
                <span className='card-list'> tel:</span>{props.phone}
                <p />
                <span className='card-list'>type:</span>{props.ownership}
                <p />
                <span className='card-list'> license:</span>{props.dentist}
            </div>
            {/* <div className="card-footer">
                <button className="btn btn-primary">看詳細</button>
            </div> */}
        </div>

    )
}

export default ClinicCards;