import React, { useState } from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import { activateUser } from '../Services/UserService';

export const ActivateAccount = () => {

    const navigate = useNavigate();
    //grab the token
    const [searchParms] = useSearchParams();
    const token = searchParms.get('token');

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [error, setError] = useState({});

    const handleActivate = async (e) =>{
        e.preventDefault();
        let newError = {};

        if(!token){
            toast.error("Invalid or missing activation token in URL.")
            return;
        }
        //field validation
        if(password.length < 6){
            newError.confirmPassword = "Password must be at least 6 characters.";

        }
        if(password !== confirmPassword){
            newError.confirmPassword = "Password do not match!";

        }
        //If there are any field errors, update state and stop the submission
        if(Object.keys(newError).length > 0){
            setError(newError);
            return;
        }
        setIsSubmitting(true);

        try{
            await activateUser({
                token:token,
                newPassword: password,
            });
            toast.success("Account activated successfully!");
            navigate("/welcome");
        }catch(error){
            //API error 
            toast.error(error.response?.data?.message || "Activation failed");
        }finally{
            setIsSubmitting(false);
        }
    };




  return (
    <div className='min-h-screen flex items-center justify-center bg-[#ebe8e8]'>
        <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
            <div className='text-center mb-6'>
                <div className='mx-auto w-12 h-12 bg-blue-600 rounded-md flex items-center justify-center mb-4'>
                    <span className='text-white font-bold text-xl'>TF</span>
                </div>
                <h2 className='text-2xl font-bold text-gray-800'>Set Up Your Account</h2>
                <p>Create a secure password</p>
            </div>
            <form onSubmit={handleActivate} className='space-y-4'>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>New Password</label>
                    <input type="password" className={`mt-1 w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 ${error.password ? "border-red-500 bg-red-50": "border-gray-300"}`}
                    placeholder='Enter Password' value={password} onChange={(e)=>{
                        setPassword(e.target.value);
                        if(error.password) setError({...error, password: null});
                    }} required />
                    {error.password && (<p className='text-red-500 text-sm mt-1'>{error.password}</p>)}
                </div>
                {/*Confirm Password */}
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Confirm Password</label>
                    <input type="password" className={`mt-1 w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 ${error.confirmPassword ? "border-red-500 bg-red-50" : "border-gray-300"}`}
                    placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>{
                        setConfirmPassword(e.target.value);
                        if(error.confirmPassword) setError({...error, confirmPassword: null});
                    }} required
                     />
                     {error.confirmPassword && (<p className='text-red-500 text-sm mt-1'>{error.confirmPassword}</p>)}
                </div>
                <button type='submit' disabled={isSubmitting} className='w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 tranisition mt-2'>
                    {isSubmitting ? "Activating..." : "Activate Account"}
                </button>
            </form>
        </div>
    </div>
  )
}
