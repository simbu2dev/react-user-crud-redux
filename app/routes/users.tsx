import React, { useState } from 'react';
import type { Route } from "./+types/users";

import logoDark from "/logo-dark.svg";
import logoLight from "/logo-light.svg";
import UserForm from '../components/userForm';

const UserList = () => {

    const [isEditing, setIsEditing] = useState(false);

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
                            <UserForm />
                        )}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <h5>                        <span className="text-gray-500">Users</span>                    </h5>

                            <button type="button" className='flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ' onClick={() => setIsEditing(true)}>Add User</button>
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
                                    <React.Fragment key={1}>
                                        <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <td scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Simbu</td>
                                            <td scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">simbu@gmail.com</td>
                                            <td scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"><a href="linkedin.com/in/simbu2dev">simbu2dev</a></td>
                                            <td scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Male</td>
                                            <td scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">45N, Rose street, Coimbatore</td>
                                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>

                                            </td>
                                        </tr>
                                        <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <td scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Dev</td>
                                            <td scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">dev@gmail.com</td>
                                            <td scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"><a href="linkedin.com/in/simbu2dev">dev2s</a></td>
                                            <td scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Male</td>
                                            <td scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">2A, Raja street, Chennai</td>
                                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>

                                            </td>
                                        </tr>
                                    </React.Fragment>
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