import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DashboardTitle, Modal } from "../../components";
import UserForm, { UserFormInputs } from "../../components/User/UserForm";
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreator from "../../actions";
import UserModel, { getAvatarUrl } from "../../models/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from 'react-confirm-alert';

interface UserProps {};

const User: React.FC<UserProps> = (props: UserProps): JSX.Element => {

    const [t] = useTranslation();
    const [isOpenCreateUser, setIsOpenCreateUser] = useState<boolean>(false);
    const [selectUser, setSelectUser] = useState<UserModel | null>(null);
    const userReducer = useSelector( (store: any) => store.userReducer );
    const dispath = useDispatch<any>();

    useEffect(() => {
        dispath( actionCreator.fetchUsers() );
    }, []);

    const _handleDelete = (user: UserModel) => {

        confirmAlert({
            title: '',
            message: t('confirm_delete_resource'),
            buttons: [
                {
                    label: t('Cancel'),
                    onClick: () => {}
                },
                {
                    label: t('Remove'),
                    onClick: () => {
                        dispath( actionCreator.deleteUser(user) );
                    }
                }
            ]
        });

    }

    const _renderUsers = () => {

        const users: UserModel[] = userReducer.users.map((user: UserModel) => (
            <div key={user.id} className="row mt-3">
                
                <div className="col-10">
                    <div className="d-flex align-items-center">
                        <span className="avatar avatar-sm rounded-circle">
                            <img className="h-100 avatar" src={getAvatarUrl(user)} alt={user.name} />
                        </span>
                        <div className="ml-3 align-items-center">
                            <p className="m-0"><small className="d-block">{user.name}</small></p>
                            <p className="m-0"><small className="d-block">{user.email}</small></p>
                        </div>
                    </div>
                </div>
                <div className="col-2 pl-0 text-right">
                    <FontAwesomeIcon 
                        icon={faEdit}
                        className="cursor-pointer"
                        onClick={(e) => {
                            setSelectUser(user);
                        }}
                    />
                    <FontAwesomeIcon 
                        icon={faTrash}
                        className="cursor-pointer ml-1 text-danger"
                        onClick={(e) => _handleDelete(user)}
                    />
                </div>

            </div>
        ));

        return(
            <div className="mt-3">
                {users}
            </div>
        );

    }

    return(
        <>
            <DashboardTitle 
                title={t('Users')}
                handleAddResource={() => {
                    setIsOpenCreateUser(true);
                }}
            />
            {_renderUsers()}

            <Modal 
                show={isOpenCreateUser}
                title={t('Create User')}
                removeVerticalSpacing={false}
                onClose={() => setIsOpenCreateUser(false)}
                width="50vw"
            >
                <UserForm
                    user={null}
                    onSubmit={(data: UserFormInputs) => {
                        let newUser: UserModel = {
                            ...data,
                            password: "password",
                            avatar: "http://placeimg.com/640/480"
                        }
                        dispath( actionCreator.createUser(newUser) );
                        setSelectUser(null);
                    }}
                />
            </Modal>

            <Modal 
                show={selectUser != null}
                title={t('Edit User')}
                removeVerticalSpacing={false}
                onClose={() => setSelectUser(null)}
                width="50vw"
            >
                <UserForm
                    user={selectUser}
                    onSubmit={(data: UserFormInputs) => {
                        let updateUser: UserModel = {
                            ...selectUser!,
                            ...data,
                        }
                        dispath( actionCreator.updateUser(updateUser) );
                        setSelectUser(null);
                    }}
                />
            </Modal>

        </>
    );

};

export default React.memo(User);
