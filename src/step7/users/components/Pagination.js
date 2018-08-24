import React from 'react'
import PropTypes from 'prop-types';

export default function Pagination(props) {
    const onPrev = () => {
        let startIndex = props.startIndex - props.inPage;
        if (startIndex >= 0) {
            props.nextPage({ startIndex });
        }
    }
    const onNext = () => {
        let startIndex = props.startIndex + props.inPage;
        if (startIndex < props.children.length) {
            props.nextPage({ startIndex });
        }
    }
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-sm-6">
                    <button onClick={onPrev} type="button" className="list-group-item list-group-item-action">Prev</button>
                </div>
                <div className="col-sm-6">
                    <button onClick={onNext} type="button" className="list-group-item list-group-item-action">Next</button>
                </div>
            </div>
            {Array(...props.children).slice(props.startIndex, props.startIndex + props.inPage)}
        </React.Fragment>
    )
}
Pagination.propTypes = {
    startIndex: PropTypes.number.isRequired,
    inPage: PropTypes.number.isRequired,
    nextPage: PropTypes.func.isRequired,
}