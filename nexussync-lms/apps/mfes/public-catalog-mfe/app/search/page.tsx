import React from 'react';

// Next.js function to fetch data on the server side (SSR)
async function getSearchResults(query: string) {
    // 1. Call the Public Catalog BFF to execute the search
    const response = await fetch(`http://localhost:3005/api/discovery/search?q=${query}`, {
        // Essential for server-side fetching in the App Router
        cache: 'no-store' 
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch search results from BFF');
    }
    return response.json();
}

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
    const query = searchParams.q || '';
    let results = [];

    if (query) {
        try {
            // Solves: Member Discovery (fast, SEO-friendly catalog display)
            results = await getSearchResults(query);
        } catch (error) {
            console.error(error);
            return <p className="text-red-500">Error retrieving catalog data.</p>;
        }
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Search Results for: "{query}"</h1>
            
            {/* Display search results, including real-time availability fetched by the BFF */}
            {results.map((book: any) => (
                <div key={book.catalogId} className="border p-4 mb-3">
                    <h2 className="text-xl font-semibold">{book.title}</h2>
                    <p>Author: {book.author}</p>
                    {/* Availability data is crucial for Discovery */}
                    <p className="font-bold text-green-700">Available Copies: {book.availableCount || 0}</p>
                </div>
            ))}
            {results.length === 0 && query && <p>No books found matching your query.</p>}
        </div>
    );
}