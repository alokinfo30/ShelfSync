'use client';

// This is consumed as a shared dependency in next.config.js of all MFEs
export function Header() {
    return (
        <header className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between">
                <span className="text-2xl font-bold">NexusLib</span>
                {/* Navigation links here */}
            </div>
        </header>
    );
}