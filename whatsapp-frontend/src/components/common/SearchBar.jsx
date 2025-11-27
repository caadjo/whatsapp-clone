import { useState } from 'react';
import { Search, X } from 'lucide-react';

function SearchBar({ onSearch, placeholder = 'Buscar...' }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    const clearSearch = () => {
        setSearchTerm('');
        onSearch('');
    };

    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-whatsapp-green"
            />
            {searchTerm && (
                <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                    <X className="w-5 h-5" />
                </button>
            )}
        </div>
    );
}

export default SearchBar;

