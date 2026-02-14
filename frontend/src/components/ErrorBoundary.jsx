import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        this.setState({ error, errorInfo });

        // Log to external service in production (e.g., Sentry)
        if (process.env.NODE_ENV === 'production') {
            // logErrorToService(error, errorInfo);
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
                    <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-2xl">
                        {/* Icon */}
                        <div className="flex justify-center mb-6">
                            <div className="bg-red-500/20 p-4 rounded-full">
                                <AlertTriangle className="text-red-500" size={48} />
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl font-bold text-white text-center mb-3">
                            Something went wrong
                        </h1>

                        {/* Description */}
                        <p className="text-gray-300 text-center mb-6 text-sm">
                            We're sorry for the inconvenience. The application encountered an unexpected error.
                        </p>

                        {/* Error Details (Development Only) */}
                        {import.meta.env.MODE === 'development' && this.state.error && (
                            <div className="bg-black/40 rounded-lg p-4 mb-6 border border-red-500/30">
                                <p className="text-red-400 font-mono text-xs break-all">
                                    {this.state.error.toString()}
                                </p>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                            >
                                <RefreshCw size={18} />
                                Reload Page
                            </button>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors border border-white/20"
                            >
                                <Home size={18} />
                                Go to Home
                            </button>
                        </div>

                        {/* Support Text */}
                        <p className="text-gray-400 text-center mt-6 text-xs">
                            If this problem persists, please contact support.
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
