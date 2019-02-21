import React from 'react';
import { Link } from 'react-router-dom';
export default function NotFound(props) {
    return (
        <React.Fragment>
            <h2>404 page not found</h2>
            <Link to={'/users'}> Go Back</Link>
        </React.Fragment>
    );
}