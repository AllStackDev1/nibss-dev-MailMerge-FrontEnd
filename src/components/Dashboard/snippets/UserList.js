import React from 'react'
import EmptyUser from '../empty-states/EmptyUser'
import Pagination from './Pagination'
import User from './User'

const UserList = ({ users, search, filter, setModal, setUser, initiateDeleteUser, updateRole, viewPage }) => {
    const renderUsers = () => {
        if (users?.platformUsers === undefined || (users.searching)) {
            return <EmptyUser />;
        }

        const toLoop = (search.search !== "" || filter !== false) && users.searchResults ?
            users.searchResults :
            users.platformUsers;

        return <>
            {(toLoop).data.map((u, index) =>
                <User
                    key={index}
                    setModal={setModal}
                    setUser={setUser}
                    deleteUser={initiateDeleteUser}
                    updateRole={updateRole}
                    userBeingUpdated={users.deleting || users.updatingRole}
                    user={u} />
            )}
            <Pagination
                data={toLoop}
                viewPage={viewPage}
            />
        </>
    }

    return renderUsers()
}

export default UserList;
