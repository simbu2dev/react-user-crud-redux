import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import type { Route } from "./+types/users";
import logoDark from "/logo-dark.svg";
import logoLight from "/logo-light.svg";
import UserForm from '../components/UserForm';
import { addUser, updateUser } from "../redux/userSlice";

const UserList = () => {

    const dispatch = useDispatch();
    const users = useSelector((state: any) => state.users.users);
    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);

    const handleAdd = (data: any) => {
        dispatch(addUser(data));
    };

    const handleEdit = (index: number, data: any) => {
        dispatch(updateUser({ index, data }));
        setIsEditing(false);
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
                        {isEditing && (
                            <UserForm
                                initialData={editingIndex !== null ? users[editingIndex] : null}
                                onSubmit={editingIndex !== null ? (data: any) => handleEdit(editingIndex, data) : handleAdd}
                            />

                        )}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <h5>                        <span className="text-gray-500">Users</span>                    </h5>

                            <button type="button" className='flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer' onClick={() => setIsEditing(true)}>Add User</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="p-4">Name</th>
                                        <th scope="col" className="p-4">Email</th>
                                        <th scope="col" className="p-4">LinkedIn URL</th>
                                        <th scope="col" className="p-4">Gender</th>
                                        <th scope="col" className="p-4">Address</th>
                                        <th scope="col" className="p-4">Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user: any, index: number) => (

                                        <React.Fragment key={index}>
                                            <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <td scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</td>
                                                <td scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.email}</td>
                                                <td scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"><a href="linkedin.com/in/simbu2dev">simbu2dev</a></td>
                                                <td scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.gender}</td>
                                                <td scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.address_line1 + ', ' + user.address_line2}</td>
                                                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                                                </td>
                                            </tr>

                                        </React.Fragment>
                                    ))}
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