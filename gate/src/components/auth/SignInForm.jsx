"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import { useLoginUserMutation } from "@/redux/actions/authActions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { signIn, useSession } from "next-auth/react";
import logo from '@/assets/logos/logo.png'
import Image from "next/image";

export default function AuthForm() {
  const [activeTab, setActiveTab] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [loginUser] = useLoginUserMutation();
  const [error, setError] = useState(null);
  
  // Sign In Form Data
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  // Sign Up Form Data
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const { data: session, status } = useSession();

  // Important: Check session status and force navigation if needed
  useEffect(() => {
    if (status === "authenticated") {
      console.log("Already authenticated, redirecting to home");
      // Force a full page reload to ensure middleware gets a chance to run
      window.location.href = "/";
    }
  }, [status]);
  
  // Handle Sign In form submission
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const result = await signIn('credentials', {
      redirect: false,
      email: signInData.email,
      password: signInData.password,
    });

    if (result.error) {
      setError('Invalid email or password');
      console.error('Login failed', result);
    } else {
      router.push('/'); 
    }
  };

  // Handle Sign Up form submission
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate passwords match
    if (signUpData.password !== signUpData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate required fields
    if (!signUpData.name || !signUpData.email || !signUpData.phoneNumber || !signUpData.password) {
      setError('Please fill in all required fields');
      return;
    }

    // Validate password strength
    if (signUpData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    try {
      // Add your signup logic here
      console.log('Signing up user:', signUpData);
      toast.success('Account created successfully!');
      // After successful signup, you might want to sign them in automatically
      // or redirect to signin form
      setActiveTab('signin');
    } catch (error) {
      setError('Failed to create account');
      console.error('Signup failed:', error);
    }
  };

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn('google', {
        redirect: false,
        callbackUrl: '/'
      });
      
      if (result.error) {
        setError('Google sign in failed');
      } else {
        router.push('/');
      }
    } catch (error) {
      setError('Google sign in failed');
    }
  };
  
  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full ">
      <div className="w-full max-w-md sm:pt-7 mx-auto mb-0 flex items-center justify-between">
         <Image 
                     className='w-14 md:w-20'
                       src={logo}
                       alt="Logo"
                       width={100}
                       height={40}
                     />
        <Link
          href="/"
          className="inline-flex items-center text-sm text-[#175C87 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <div className="w-4 h-4 rounded-full border-1 border-[#175C87] flex items-center justify-center mr-2">
            <svg class="w-4 h-4 text-[#175C87" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
</svg>

          </div>
          Back to Home
        </Link>
      </div>
      
      <div className="flex flex-col flex-1 w-full max-w-md mx-auto">
        <div className="">
          <div className="mb-2">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              {activeTab === 'signin' ? 'Sign In' : 'Sign Up'}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {activeTab === 'signin' 
                ? 'Enter your email and password to sign in!' 
                : 'Create your account to get started!'
              }
            </p>
          </div>
          
          {/* Tab Switch */}
          <div className="grid grid-cols-2 gap-1 p-1 mb-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <button 
              type="button" 
              onClick={() => setActiveTab('signin')}
              className={`py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === 'signin' 
                  ? 'bg-[#377DA8]  text-white shadow-sm' 
                  : 'text-black hover:text-gray-700 dark:text-white'
              }`}
            >
              Sign In
            </button>
            <button 
              type="button" 
              onClick={() => setActiveTab('signup')}
              className={`py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === 'signup' 
                  ? 'bg-[#377DA8] text-white shadow-sm' 
                  : 'text-black hover:text-gray-700 dark:text-white '
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Sign In Form */}
          {activeTab === 'signin' && (
            <form onSubmit={handleSignInSubmit}>
              <div className="space-y-6">
                <div>
                  <Label>Email/Phone</Label>
                  <Input 
                    placeholder="info@gmail.com" 
                    type="email" 
                    name="email" 
                    value={signInData.email} 
                    onChange={(e) => setSignInData({...signInData, email: e.target.value})} 
                    required
                  />
                </div>
                <div>
                  <Label>Password</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={signInData.password}
                      onChange={(e) => setSignInData({...signInData, password: e.target.value})}
                      placeholder="Enter your password"
                      required
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                     I accept the terms and conditions 
                    </span>
                  </div>
                  <Link
                    href="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div>
                  <Button type="submit" className="w-full" size="sm">
                    Sign In
                  </Button>
                </div>
              </div>
            </form>
          )}

          {/* Sign Up Form */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignUpSubmit}>
              <div className="space-y-6">
                <div>
                  <Label>Full Name</Label>
                  <Input 
                    placeholder="John Doe" 
                    type="text" 
                    name="name" 
                    value={signUpData.name} 
                    onChange={(e) => setSignUpData({...signUpData, name: e.target.value})} 
                    required
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input 
                    placeholder="info@gmail.com" 
                    type="email" 
                    name="email" 
                    value={signUpData.email} 
                    onChange={(e) => setSignUpData({...signUpData, email: e.target.value})} 
                    required
                  />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input 
                    placeholder="+1 (555) 000-0000" 
                    type="tel" 
                    name="phoneNumber" 
                    value={signUpData.phoneNumber} 
                    onChange={(e) => setSignUpData({...signUpData, phoneNumber: e.target.value})} 
                    required
                  />
                </div>
                <div>
                  <Label>Password</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={signUpData.password}
                      onChange={(e) => setSignUpData({...signUpData, password: e.target.value})}
                      placeholder="Enter your password"
                      required
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>
                <div>
                  <Label>Confirm Password</Label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={signUpData.confirmPassword}
                      onChange={(e) => setSignUpData({...signUpData, confirmPassword: e.target.value})}
                      placeholder="Confirm your password"
                      required
                    />
                    <span
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showConfirmPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox checked={isChecked} onChange={setIsChecked} />
                  <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                    I accept the{' '}
                    <Link href="/terms" className="text-brand-500 hover:text-brand-600">
                      terms and conditions
                    </Link>
                  </span>
                </div>
                <div>
                  <Button type="submit" className="w-full" size="sm">
                    Create Account
                  </Button>
                </div>
              </div>
            </form>
          )}

          {/* Divider */}
          <div className="flex items-center justify-center py-5">
            <span className="text-gray-500 dark:text-gray-400">or</span>
          </div>

          {/* Google Sign In */}
          <div className="">
            <button 
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full rounded-md py-2.5 bg-[#D1E9FF] hover:bg-[#B8DCFF] transition-colors duration-200 text-gray-700 font-medium flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}