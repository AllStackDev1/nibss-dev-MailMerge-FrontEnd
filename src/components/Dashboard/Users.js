import React, { useEffect, useRef } from "react"
import User from "./snippets/User"
import Pagination from "./snippets/Pagination"
import Toolbox from "./snippets/Toolbox"
import PageTitle from "./snippets/PageTitle"
import EmptyUser from "./empty-states/User"
import { useDispatch, useSelector } from "react-redux"
import { userActions } from "actions"
import { useParams } from "react-router-dom"
import { push } from "connected-react-router"

const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.user);
    let { pageId } = useParams();
    const page = useRef(null);

    useEffect(() => {
        if (pageId) {
            page.current.scrollTo({ top: 0, behavior: 'smooth' });
            dispatch(userActions.fetchPage(pageId));
        } else {
            dispatch(userActions.fetch());
        }
    }, [dispatch, pageId]);

    const viewPage = page => {
        if (page <= users.platformUsers.pagination.number_of_pages && page !== users.platformUsers.pagination.current) {
            dispatch(push(`/dashboard/users/${page}`));
        }
    }

    return (
        <div ref={page} className="full-width full-height border-box left-padding-30 right-padding-30 custom-scrollbar overflow-auto-y">
            <PageTitle
                title="Users"
            />
            <Toolbox
                exportButton={true}
                addButtonText="Add New User"
                addButtonUrl="/dashboard/add-user" />
            <div className="white border-radius-10 left-padding-10 right-padding-10 top-margin-30 bottom-margin-50">
                <div className="full-width display-flex space-between top-padding-30">
                    <div className="width-40 height-40 right-margin-20 left-margin-10"></div>
                    <div className="no-shrink width-25-percent size-one-rem bold gray-color opacity-0-5">
                        #
                    </div>
                    <div className="no-shrink width-20-percent size-one-rem bold gray-color opacity-0-5">
                        Email address
                    </div>
                    <div className="no-shrink width-20-percent size-one-rem bold gray-color opacity-0-5">
                        Role
                    </div>
                    <div className="bold no-shrink height-25 width-100 right-margin-50 border-box opacity-0-5">
                        Status
                    </div>
                    <div className="no-shrink width-50 size-pointnine-rem right-margin-30"></div>
                </div>
                {users.platformUsers === undefined ?
                    <EmptyUser />
                    :
                    <>
                        {users.platformUsers.data.map((user, index) =>
                            <User
                                key={index}
                                user={user} />
                        )}
                        <Pagination
                            data={users.platformUsers}
                            viewPage={viewPage}
                        />
                    </>
                }
            </div>
        </div>
    )
}

export default Users;