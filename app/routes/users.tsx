import React from 'react';

const UserList = () => {

    return (
        <React.Fragment>
            <h1>User List</h1>
            <button>Add User</button>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>LinkedIn URL</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    <React.Fragment key={1}>
                        <tr>
                            <td>Simbu</td>
                            <td>simbu@gmail.com</td>
                            <td><a href="linkedin.com/in/simbu2dev">simbu2dev</a></td>
                            <td>Male</td>
                            <td>45N, Rose street, Coimbatore</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    </React.Fragment>
                </tbody>
            </table>
        </React.Fragment>
    );
};

export default UserList;