import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const LoginEmbedded: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900 flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-gray-300">Sign in to continue to DJ Flowerz</p>
                </div>

                <SignIn
                    appearance={{
                        elements: {
                            rootBox: 'w-full',
                            card: 'bg-white/10 backdrop-blur-lg shadow-2xl border border-white/20 rounded-2xl',
                            headerTitle: 'text-white text-2xl font-bold',
                            headerSubtitle: 'text-gray-300',
                            socialButtonsBlockButton: 'bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-200',
                            socialButtonsBlockButtonText: 'text-white font-medium',
                            formButtonPrimary: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-xl hover:scale-105 transition-all duration-200',
                            formFieldInput: 'bg-black/30 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400',
                            formFieldLabel: 'text-gray-300 font-medium',
                            footerActionLink: 'text-purple-400 hover:text-purple-300 font-medium',
                            identityPreviewText: 'text-white',
                            identityPreviewEditButton: 'text-purple-400 hover:text-purple-300',
                            dividerLine: 'bg-white/10',
                            dividerText: 'text-gray-400',
                            formFieldInputShowPasswordButton: 'text-gray-400 hover:text-white',
                            otpCodeFieldInput: 'bg-black/30 border-white/20 text-white',
                            formResendCodeLink: 'text-purple-400 hover:text-purple-300',
                            alertText: 'text-white',
                            formFieldErrorText: 'text-red-400',
                        },
                    }}
                    routing="path"
                    path="/login"
                    signUpUrl="/signup"
                    afterSignInUrl="/"
                    redirectUrl="/"
                />
            </div>
        </div>
    );
};

export default LoginEmbedded;
