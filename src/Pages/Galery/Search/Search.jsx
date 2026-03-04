import { useState } from 'react';
import { Search as IconSearch } from "lucide-react";

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Search:', searchQuery);
    };

    return (
        <div className="base">
            <div className="max-w-150 mx-auto p-4">
                <h1 className="m-10 text-center">
                    Buscar Filmes
                </h1>
                
                <form onSubmit={handleSearch} className="space-y-4">
                    <div className="flex items-center justify-center gap-2">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Digite o nome..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />

                        <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                        >
                            <IconSearch className="inline-block" />
                        </button>
                    </div>
                    
                    
                </form>
            </div>
        </div>
    );
}