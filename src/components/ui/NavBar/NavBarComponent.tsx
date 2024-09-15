
const SearchBar = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="flex items-center bg-white rounded-full shadow-lg p-4">
                {/* Input field */}
                <input 
                    type="text" 
                    placeholder="Search Trademark Here eg. Mickey Mouse" 
                    className="w-64 px-4 py-2 text-gray-700 rounded-l-full focus:outline-none"
                />
                {/* Search button */}
                <button className="bg-blue-500 text-white rounded-full px-6 py-2 ml-2 hover:bg-blue-600">
                    Search
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
