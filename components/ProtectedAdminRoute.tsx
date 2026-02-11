import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedAdminRouteProps {
    children: React.ReactNode;
}

const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
    const { user, loading } = useAuth();

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <p className="text-white text-lg">Verifying access...</p>
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Redirect to home if not admin
    if (!user.isAdmin) {
        return (
            <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-red-500/10 border border-red-500/30 rounded-xl p-8 text-center">
                    <div className="text-6xl mb-4">🚫</div>
                    <h1 className="text-3xl font-bold text-white mb-2">Access Denied</h1>
                    <p className="text-gray-300 mb-6">
                        You don't have permission to access the admin panel.
                    </p>
                    <p className="text-sm text-gray-400 mb-6">
                        Only authorized administrators can access this area.
                    </p>
                    <a
                        href="/#/"
                        className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-xl transition-all"
                    >
                        Return to Home
                    </a>
                </div>
            </div>
        );
    }

    // User is authenticated and is admin
    return <>{children}</>;
};

export default ProtectedAdminRoute;
