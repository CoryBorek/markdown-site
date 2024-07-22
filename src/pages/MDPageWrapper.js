import React from 'react';
import { useParams } from 'react-router-dom';
import MDPage from './MDPage';

const MDPageWrapper = () => {

    let { id } = useParams();
    return (<div>
        <MDPage id={id} />
    </div>);
}

export default MDPageWrapper;