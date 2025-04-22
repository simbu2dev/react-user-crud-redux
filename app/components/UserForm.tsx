import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { addUser, updateUser } from '../redux/actions/userActions';
import config from "./../config.json";
import masterData from "./../masterData.json";

const UserForm = ({ user, onClose, isEdit }: any) => {
    const dispatch = useDispatch();
    const [cities, setCities] = useState([] as string[]);
    const [formData, setFormData] = useState(
        {
            id: '',
            name: "",
            email: "",
            linkedin: "",
            gender: "",
            address: {
                line1: "",
                line2: "",
                state: "",
                city: "",
                pin: ""
            }
        }
    );
    const [formErrors, setFormErrors] = useState({
        name: "",
        email: "",
        linkedin: "",
        gender: "",
        pin: ""
    });

    useEffect(() => {
        if (user) {
            setFormData(user);
        }
        if (formData.address.state) {
            const selectedState = masterData.states.find(s => s.name === formData.address.state);
            setCities(selectedState ? selectedState.cities : []);
        } else {
            setCities([]);
        }
    }, [user, formData.address.state]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        if (name.includes("address.")) {
            const addressField = name.split(".")[1];
            setFormData((prev: any) => ({
                ...prev,
                address: {
                    ...prev.address,
                    [addressField]: value
                }
            }));
            if (name === "address.state") {
                //   dispatch(fetchCities(masterData.cities[value] || []));
            }
        } else {
            setFormData((prev: any) => ({ ...prev, [name]: value }));
        }

    };
    const validateForm = () => {
        const errors: any = {};
        if (!formData.name || formData.name.length < config.name.minLength || formData.name.length > config.name.maxLength) {
            errors.name = `Name must be between ${config.name.minLength}-${config.name.maxLength} characters.`;
        }
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "Invalid email address.";
        }
        if (!formData.linkedin || !/^https?:\/\/.+/.test(formData.linkedin)) {
            errors.linkedin = "Invalid URL.";
        }
        if (!formData.gender) {
            errors.gender = "Gender is required.";
        }
        if (!formData.address.pin || !/^\d{6}$/.test(formData.address.pin)) {
            errors.pin = "PIN must be a 6-digit number.";
        }
        return errors;
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const errors = validateForm();
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            if (isEdit) {
                dispatch(updateUser(formData.id, formData));
            } else {
                const newUser = { ...formData, id: Date.now().toString() };
                dispatch(addUser(newUser));
            }
            onClose();
        }
    };

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit} className="grid grid-cols-5 gap-1 ">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                    {formErrors.name && <span className="text-red-500">{formErrors.name}</span>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                    {formErrors.email && <span className="text-red-500">{formErrors.email}</span>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="linkedin">LinkedIn URL</label>
                    <input
                        type="url"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                    {formErrors.linkedin && <span className="text-red-500">{formErrors.linkedin}</span>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    {formErrors.gender && <span className="text-red-500">{formErrors.gender}</span>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address.line1">Address Line1</label>
                    <input
                        name="address.line1"
                        value={formData.address.line1}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address.line2">Address Line2</label>
                    <input
                        name="address.line2"
                        value={formData.address.line2}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">State</label>
                    <select
                        name="address.state"
                        value={formData.address.state}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">Select State</option>
                        {masterData.states.map(state => (
                            <option key={state.name} value={state.name}>{state.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
                    <select
                        name="address.city"
                        value={formData.address.city}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">Select City</option>
                        {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address.pin">PIN</label>
                    <input
                        type="text"
                        name="address.pin"
                        value={formData.address.pin}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                    {formErrors.pin && <span className="text-red-500">{formErrors.pin}</span>}
                </div>
                <div className="mb-4 pt-10">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                    >
                        {isEdit ? 'Update':'Submit'}
                    </button>
                </div>
            </form>
        </React.Fragment>
    );
};

export default UserForm;