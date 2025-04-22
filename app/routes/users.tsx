import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { deleteUser } from '../redux/actions/userActions';
import type { Route } from "./+types/users";
import logoDark from "/logo-dark.svg";
import logoLight from "/logo-light.svg";
import UserForm from '../components/UserForm';
import config from "./../config.json";

const UserList = () => {

    const dispatch = useDispatch();
    const users = useSelector((state: any) => state.users.users);
    const [expandedRows, setExpandedRows] = useState([] as number[]);
    const [showForm, setShowForm] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const toggleRow = (id: number) => {
        if (expandedRows.includes(id)) {
            setExpandedRows(expandedRows.filter(rowId => rowId !== id));
        } else {
            setExpandedRows([...expandedRows, id]);
        }
    };

    const handleEdit = (user: any) => {
        setCurrentUser(user);
        setShowForm(true);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(id));
        }
    };

    const handleAdd = () => {
        setCurrentUser(null);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setCurrentUser(null);
    };

    return (
        <React.Fragment>
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
                <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
                    <div className='flex items-center justify-center'>
                        <a href="/" className="text-blue-500 hover:underline p-5">
                            <img
                                src={logoLight}
                                alt="React Router"
                                className="block w-full dark:hidden"
                            />
                            <img
                                src={logoDark}
                                alt="React Router"
                                className="hidden w-full dark:block"
                            />
                        </a>
                    </div>
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        {showForm && (
                            <UserForm
                                user={currentUser}
                                onClose={handleCloseForm}
                                isEdit={!!currentUser}
                            />
                        )}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <h5>                        <span className="text-gray-500">Users</span>                    </h5>

                            <button type="button" className='flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer' onClick={handleAdd}>{!!currentUser ? 'Edit ' : 'Add '}User</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="p-4">Name</th>
                                        <th scope="col" className="p-4">Email</th>
                                        <th scope="col" className="p-4">LinkedIn URL</th>
                                        <th scope="col" className="p-4">Gender</th>
                                        <th scope="col" className="p-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length > 0 ? users.map((user: any, index: number) => (
                                        <React.Fragment key={index}>
                                            <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => toggleRow(user.id)} style={{ cursor: 'pointer' }}>
                                                <td scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</td>
                                                <td scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.email}</td>
                                                <td scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"><a href={user.linkedin} target='_blank'>{user.linkedin}</a></td>
                                                <td scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.gender}</td>
                                                <td>
                                                    {config.editable && (
                                                        <>
                                                            <button
                                                                type='button'
                                                                className="btn btn-sm btn-warning mr-2"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleEdit(user);
                                                                }}
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                type='button'
                                                                className="btn btn-sm btn-danger"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleDelete(user.id);
                                                                }}
                                                            >
                                                                Delete
                                                            </button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                            {expandedRows.includes(user.id) && (
                                                <tr>
                                                    <td colSpan={5}>
                                                        <div className="p-3">
                                                            <h6><strong>Address</strong></h6>
                                                            <p>{user.address.line1}, {user.address.line2}</p>
                                                            <p>{user.address.city}, {user.address.state} - {user.address.pin}</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    )) : <React.Fragment key={'no-user'}><tr><td colSpan={5} className='p-20 text-center'>No user found</td></tr></React.Fragment>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Users - Technospurs" },
        { name: "description", content: "Welcome to Users Router!" },
    ];
}
export default UserList;