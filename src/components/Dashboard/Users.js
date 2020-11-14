/* eslint-disable */

import React, { useEffect, useRef, useState } from "react"
import User from "./snippets/User"
import Pagination from "./snippets/Pagination"
import Toolbox from "./snippets/Toolbox"
import PageTitle from "./snippets/PageTitle"
import EmptyUser from "./empty-states/User"
import { useDispatch, useSelector } from "react-redux"
import { userActions } from "actions"
import { useParams } from "react-router-dom"
import { push } from "connected-react-router"
import ModalContainer from "./modals/ModalContainer"
import EditUser from "./modals/EditUser"
import DeleteUser from "./modals/DeleteUser"

const Users = ({ user: localUser }) => {
    const [search, setSearch] = useState({});
    const [filter, setFilter] = useState(false);
    const [timer, setTimer] = useState();
    const [modal, setModal] = useState("");
    const [user, setUser] = useState({});
    const [toDelete, setToDelete] = useState({});

    const dispatch = useDispatch();
    const users = useSelector(state => state.user);
    const { pageId } = useParams();
    const page = useRef(null);

    useEffect(() => {
        if (filter !== false) {
            dispatch(userActions.search(search.search, filter));
        }
    }, [dispatch, filter]); // eslint-disable-line no-use-before-define

    useEffect(() => {
        if (users.editing === false) {
            setModal("");
            setUser({});
        }
        if (users.deleting === false) {
            setModal("");
            setToDelete({});
        }
    }, [users.editing, users.deleting]);

    const onChangeUser = event => {
        const { name, value } = event.target;

        setUser({
            ...user,
            [name]: value
        });
    }

    const onChange = event => {
        const { name, value } = event.target;

        setSearch({
            ...search,
            [name]: value
        });

        if (event.target.value !== "") {
            if (timer) {
                clearTimeout(timer);
            }

            setTimer(() => {
                return setTimeout(() => {
                    dispatch(userActions.search(value));
                }, 1000);
            });
        }
    }

    useEffect(() => {
        if (pageId) {
            page.current.scrollTo({ top: 0, behavior: 'smooth' });
            dispatch(userActions.fetchPage(pageId));
        } else {
            dispatch(userActions.fetchUsers());
        }
    }, [dispatch, pageId]);

    const viewPage = p => {
        if (p <= users.platformUsers.pagination.number_of_pages && p !== users.platformUsers.pagination.current) {
            dispatch(push(`/dashboard/users/${p}`));
        }
    }

    const editUser = e => {
        e.preventDefault();

        dispatch(userActions.edit(user));
    }

    const initiateDeleteUser = u => {
        setToDelete(u);
    }

    const deleteUser = () => {
        console.log(toDelete);
        dispatch(userActions.deleteUser(toDelete));
    }

    const updateRole = u => {
        dispatch(userActions.updateRole(u));
    }

    const exportDocument = (type) => {
        if (users.downloading !== true) {
            dispatch(userActions.exportDocument(type));
        }
    }

    const renderModals = () => {
        if (modal === "edit-user") {
            return <EditUser
                user={user}
                editing={users.editing}
                onChange={onChangeUser}
                onSubmit={editUser} />
        }

        if (modal === "delete-user") {
            return <DeleteUser
                deleting={users.deleting}
                onSubmit={deleteUser}
                closeModal={() => {
                    setModal("");
                    setToDelete({});
                }} />
        }

        return <div></div>;
    }

    const renderUsers = () => {
        if (users.platformUsers === undefined || (users.searching)) {
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

    return (
        <>
            {modal !== "" ?
                <ModalContainer closeModal={() => setModal("")}>
                    {renderModals()}
                </ModalContainer>
                : ""}
            <div ref={page} className="full-width full-height border-box left-padding-30 right-padding-30 custom-scrollbar overflow-auto-y">
                <PageTitle
                    title="Users"
                />
                <Toolbox
                    user={localUser}
                    search={search}
                    onChange={onChange}
                    exportButton={true}
                    filterList={["administrator", "user"]}
                    search={search}
                    filter={filter}
                    setFilter={setFilter}
                    exportDocument={exportDocument}
                    downloading={users.downloading}
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
                    {renderUsers()}
                </div>
            </div>
        </>
    )
}

export default Users;
