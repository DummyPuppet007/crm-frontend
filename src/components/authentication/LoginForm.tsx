import React, { useState } from 'react';
import { Eye, EyeOff, Lock, AtSign } from 'lucide-react';
import ThemeToggle from '../common/ThemeToggle';
import { useTheme } from '../../context/ThemeContext';
import { FetchData } from '../../services/FetchData';
import { useNavigate } from "react-router-dom";

interface FormData {
  username: string;
  password: string;
}

interface FormErrors {
  username?: string;
  password?: string;
  general?: string;
}

export default function LoginPage() {
  const { darkMode } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      //await new Promise(resolve => setTimeout(resolve, 2000));

      const response = await FetchData<any>({
        url: "auth/login",
        method: "POST",
        data: formData,
      })
      
      // Here you would typically make your login API call
      console.log('Login attempt:', response);
      
      // Reset form on success (in real app, you'd redirect)
      setFormData({ username: '', password: '' });
      navigate("/dashboard");
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'dark bg-neutral-900' : 'bg-gray-50'
    }`}>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className={`w-full max-w-md transition-all duration-300 ${
          darkMode ? 'bg-neutral-800' : 'bg-white'
        } rounded-2xl shadow-2xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          
          {/* Header */}
          <div className="p-8 pb-6">
            <div className="flex justify-center mb-6">
              <div className={`p-3 rounded-full ${
                darkMode ? 'bg-blue-600' : 'bg-blue-500'
              }`}>
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h2 className={`text-3xl font-bold text-center mb-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Welcome Back
            </h2>
            
            <p className={`text-center ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <div className="px-8 pb-8">
            {/* General Error */}
            {errors.general && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {errors.general}
              </div>
            )}

            {/* Email Field */}
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <AtSign className={`w-5 h-5 ${
                    darkMode ? 'text-gray-400' : 'text-gray-400'
                  }`} />
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg transition-colors duration-200 border-2 ${
                    errors.username 
                      ? 'border-red-500' 
                      : darkMode ? 'border-neutral-600' : 'border-neutral-300'
                  } ${
                    darkMode 
                      ? 'bg-neutral-700 text-white placeholder-neutral-400 focus:border-blue-500' 
                      : 'bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
                  placeholder="Enter your Username"
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-red-500">{errors.username}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`w-5 h-5 ${
                    darkMode ? 'text-gray-400' : 'text-gray-400'
                  }`} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 rounded-lg border-2
                    ${darkMode
                      ? 'bg-neutral-700 text-white placeholder-neutral-400'
                      : 'bg-white text-gray-900 placeholder-gray-500'}
                
                    ${
                      errors.password
                        ? // error state → always red, even on focus
                          'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : // normal state
                          (darkMode
                            ? 'border-neutral-600 focus:border-blue-500'
                            : 'border-neutral-300 focus:border-blue-500')
                    }
                
                    transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-opacity-20`
                  }
                  placeholder="Enter your Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className={`w-5 h-5 ${
                      darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                    } transition-colors`} />
                  ) : (
                    <Eye className={`w-5 h-5 ${
                      darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                    } transition-colors`} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all duration-200 ${
                isLoading
                  ? 'bg-neutral-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-105'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}