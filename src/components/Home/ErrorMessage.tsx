interface ErrorMessageProps {
    error: string;
    onRetry?: () => void;
    className?: string;
}

const ErrorMessage = ({
    error,
    onRetry,
    className = "",
}: ErrorMessageProps) => {

    return (

        <div
            className={`bg-red-50 border border-red-200 rounded-lg p-6 text-center ${className}`}
        >

            <div className="w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">

                <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                </svg>

            </div>

            <h3 className="text-lg font-semibold text-red-800 mb-2">
                Unable to load content
            </h3>

            <p className="text-red-700 mb-4">
                {error}
            </p>

            {onRetry && (

                <button
                    onClick={onRetry}
                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 min-h-[48px] touch-manipulation"
                >
                    Try Again
                </button>

            )}

        </div>
    );
};

export default ErrorMessage;