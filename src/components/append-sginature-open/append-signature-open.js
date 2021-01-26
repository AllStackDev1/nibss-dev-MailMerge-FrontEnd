import React, { useEffect } from 'react'
import EmptySidebar from 'components/Dashboard/snippets/EmptySidebar'
import AppendSignature from 'components/Dashboard/AppendSignature'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

const AppendSignatureOpen = () => {
    const { documentId, userToken } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!documentId) {
            dispatch(push('/dashboard/documents'))
        }
    }, [dispatch, documentId]);

    return (
        <div className="full-height-vh full-width display-flex light-brown" data-testid="append-signature">
            <EmptySidebar />
            <AppendSignature
                documentId={documentId}
                userToken={userToken} />
        </div>
    )
}

export default AppendSignatureOpen;
