import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signUp } from '../services/user';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        profile: null
    });

    const [preview, setPreview] = useState(null); 
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const files = e.target.files;

        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));

        
        if (files) {
            setPreview(URL.createObjectURL(files[0]));
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(formData);

        const newFormData = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (value instanceof File) {
                newFormData.append(key, value);
            } else {
                newFormData.append(key, value);
            }
        });

        try {
            const response = await signUp(newFormData);

            if (response.success) {
                navigate("/login");
            }
        } catch (error) {
            console.error("error on submitting form: ", error.message);
        }

       
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[40%] p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="profile" className="block text-sm font-medium text-gray-700">Profile Image</label>
                        <input
                            type="file"
                            name="profile"
                            accept="image/*"
                            onChange={handleChange}
                            required
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none"
                        />
                    </div>

                    {preview && (
                        <div className="flex justify-center mt-4">
                            <img
                                src={preview}
                                alt="Profile preview"
                                className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
                            />
                        </div>
                    )}

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                <div className="flex justify-center mt-4">
                    <p className="text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-500 hover:text-blue-700">Log In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
