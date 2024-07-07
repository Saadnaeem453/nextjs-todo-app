// pages/404.tsx
import Link from 'next/link';

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-6xl mb-4">😢</p>
            <p className="text-lg text-gray-700 mb-8">Oops! The page you are looking for does not exist.</p>
            <Link href="/" className="text-blue-500 hover:underline">Go back to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
