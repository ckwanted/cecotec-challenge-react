import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DashboardTitle } from "../../components";
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreator from "../../actions";
import UserModel, { getAvatarUrl } from "../../models/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

interface UserProps {};

const User: React.FC<UserProps> = (props: UserProps): JSX.Element => {

    const [t] = useTranslation();
    const userReducer = useSelector( (store: any) => store.userReducer );
    const dispath = useDispatch<any>();

    useEffect(() => {
        dispath( actionCreator.fetchUsers() );
    }, []);

    const _handleDelete = (user: UserModel) => {
        
        let isConfirm = window.confirm(t('confirm_delete_resource'));

        if(isConfirm) {
            dispath( actionCreator.deleteUser(user) );
        }

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
                <div className="col-2 text-right">
                    <FontAwesomeIcon 
                        icon={faEdit}
                        className="cursor-pointer"
                        onClick={(e) => {
                            
                        }}
                    />
                    <FontAwesomeIcon 
                        icon={faTrash}
                        className="cursor-pointer ml-2"
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
            <DashboardTitle title={t('Users')} />
            {_renderUsers()}
        </>
    );

};

export default React.memo(User);
