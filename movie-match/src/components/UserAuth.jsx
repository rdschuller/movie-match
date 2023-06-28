import { auth, googleProvider } from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut  } from 'firebase/auth'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import GoogleLogo from '../assets/google.svg'


export default function UserAuth() {

    
    
    const form = useForm({
        defaultValues: {
          email: "" ,
          password: "",
          confirmPassword: ""
        },
      });
    
    const { register, control, handleSubmit, formState, watch, onBlur } = form
    const { errors, isDirty, isValid, touchedFields } = formState;

    const emailSignIn = async (data) => {
        try {
            await createUserWithEmailAndPassword(auth, data.email, data.password);            
        } catch (error) {
            console.log(error);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);            
        } catch (error) {
            console.log(error);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);            
        } catch (error) {
            console.log(error);
        }
    };


    const password = watch("password");
    const confirmPassword = watch("confirmPassword");
    
    return (
    <div className='font-lato border-2 rounded-xl bg-slate-400 border-solid border-black p-12'>
        <form className='flex flex-col justify-center' onSubmit={handleSubmit(emailSignIn)} noValidate>
        
        
        <div className='mb-4'>
            <input 
            type="email" 
            id='email' 
            placeholder='Email'
            {...register("email", {
                pattern: {
                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'Invalid email entered'
                },
                required: 'An email is required',
                //can also return multiple validate objects if, say you wanted to also look for some other invalid e-mail type
                validate: (fieldValue) => {
                return fieldValue !== "admin@example.com" 
                || "Enter a different email address"
                }
            })}
            className='w-80 border-2 border-solid focus:border-red-400 transition ease-in delay-200 focus:outline-none rounded-md border-white bg-transparent py-1 px-1 drop-shadow-md text-slate-700 placeholder-gray'
            />
            <p className='text-red-700'>{errors.email?.message}</p>
        </div>
        

        <div className='mb-4'>
            <input 
            type="password" 
            id="password" 
            placeholder='Password'
            {...register("password", {
                required: "A password is required"
            })}
            className='w-80 border-2 border-solid focus:border-red-400 transition ease-in delay-200 focus:outline-none rounded-md border-white bg-transparent py-1 px-1 drop-shadow-md text-slate-700 placeholder-gray'
            />
            <p className='text-red-700'>{errors.password?.message}</p>
        </div>
        

        <div className='mb-10'>
            <input 
            type="password" 
            id="confirmPassword" 
            placeholder='Confirm Password'
            {...register("confirmPassword", {
                required: "Password confirmation is required",
                validate: value => value === password || "The passwords do not match"
            })}
            className='w-80 border-2 border-solid focus:border-red-400 transition ease-in delay-200 focus:outline-none rounded-md border-white bg-transparent py-1 px-1 drop-shadow-md text-slate-700 placeholder-gray'
            />
            <p className='text-red-700'>{formState.touchedFields.confirmPassword && errors.confirmPassword && errors.confirmPassword.message}</p>
        </div>
        

        <button disabled={!isDirty || !isValid} className='bg-red-500 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 px-6 py-3 rounded-md mb-5 mx-auto inline-block text-white w-80'>Create Account</button>
    </form>
    <button 
        onClick={signInWithGoogle}
        className='bg-white w-80 rounded-lg flex items-center justify-between font-lato text-lg p-33 mt-7'
    >   <img 
            src={GoogleLogo} 
            alt="Google Logo"
            className='w-14 p-3'
         />
        <p className='px-3'>Sign in with Google</p>
    </button>
    <button onClick={logout}>Logout</button>
    </div>
    )
}