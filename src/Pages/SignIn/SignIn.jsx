import { NavLink, useNavigate } from "react-router-dom";
import './Signin.css'
import { useForm } from "react-hook-form";
import { useState } from "react";

const SignIn = () => {
    const [loginError, setLoginError] = useState('')
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    

    const { register, handleSubmit, formState: { errors } } = useForm();
    const handelSignIn = (data) => {
       const newData={
        email:data.email,
        password:data.password
       }
        fetch(`http://localhost:5000/getUserByEmail?email=${data.email}&&password=${data.password}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data == false) {
                    setLoginError('User email or password is not mached')
                    setLoading(false);
                } else {
                    localStorage.setItem('loginId', data._id),
                        navigate('/');
                    setLoading(false);
                
                }
            })

            

    }
    if (loading) {
        return <p>loading ...</p>
    }
    return (
        <div>
            <section className="bg-white dark:bg-gray-900">
                
                <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
                  
                    <form onSubmit={handleSubmit(handelSignIn)} className="w-full max-w-md">
                        <div className="flex justify-center mx-auto">
                            <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt />
                        </div>
                        <div className="flex items-center justify-center mt-6">
                            <NavLink to='/signin' className="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300">
                                sign in
                            </NavLink>
                            <NavLink to="/signup" className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize dark:border-blue-400 dark:text-white">
                                sign up
                            </NavLink>
                        </div>
                        <p className="text-red-500 text-center my-2">{loginError && loginError}</p>
                        {/* email */}
                        {/* email */}
                        <div className="relative flex items-center mt-6">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </span>
                            <input {...register("email", { required: "email is required" })} type="email" name="email" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" />
                        </div>
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                        {/* password  */}
                        <div className="relative flex items-center mt-4">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </span>
                            <input type="password" {...register("password", { required: "password is required", minLength: { value: 6, message: 'Password must be 6 charecter or longer' } })} className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" />
                        </div>
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}

                        <div className="mt-6">
                            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                Sign In
                            </button>
                            <div className="mt-6 text-center ">
                                <a href="#" className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                                    Donot have an account?
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </section>

        </div>
    );
};

export default SignIn;