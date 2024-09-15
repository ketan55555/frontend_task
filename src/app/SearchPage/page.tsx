'use client'  
import { useState} from 'react';
import axios from 'axios';
import Filters from '@/components/Filters/filters';



const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState<{body:any,msg:string}>({body:{},msg:""});
  const [filters, setFilters] = useState({
    status: {
      Registered: false,
      Pending: false,
      Abandoned: false,
    },
    owner: '',
    attorney: '',
  });
  const [view, setView] = useState<'grid' | 'list'>('list');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const page=1;// For pagination
  const rowsPerPage = 10;

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError('');

    const body = {
      input_query: query,
      input_query_type: '',
      sort_by: 'default',
      status: [],
      exact_match: false,
      date_query: false,
      owners: filters.owner ? [filters.owner] : [],
      attorneys: filters.attorney ? [filters.attorney] : [],
      law_firms: [],
      mark_description_description: [],
      classes: [],
      page: page,
      rows: rowsPerPage,
      sort_order: 'desc',
      states: [],
      counties: [],
    };
    try {
      const response = await axios.post(
        'https://vit-tm-task.api.trademarkia.app/api/v3/us',
        body
      );
      console.log(response.data);
      setData(response.data);
    } catch (err) {
      setError('Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleFilter = (filterCategory: string, filterName: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterCategory]: {
        ...prev[filterCategory],
        [filterName]: !prev[filterCategory][filterName],
      },
    }));
  };

  // Filter data based on filters
  // const filteredData = data.filter((item) => {
  //   const statusMatch =
  //     !Object.values(filters.status).some(Boolean) ||
  //     filters.status[item.status as keyof typeof filters.status];

  //   const ownerMatch = filters.owner
  //     ? item.owner?.toLowerCase().includes(filters.owner.toLowerCase())
  //     : true;

  //   const attorneyMatch = filters.attorney
  //     ? item.attorney?.toLowerCase().includes(filters.attorney.toLowerCase())
  //     : true;

  //   return statusMatch && ownerMatch && attorneyMatch;
  // });

  return (
    <div className="flex flex-col md:flex-row p-4">
      {/* Main Content */}
      <div className="md:w-3/4 w-full">
        {/* Search Input Box */}
         <div className="flex justify-center mb-4">
          <div className="flex w-full md:w-1/2">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
            >
              Search
            </button>
          </div>

     
        </div>

        {/* Loading and Error States */}
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Search Results */}
        <div className={`grid ${view === 'grid' ? 'md:grid-cols-2' : 'grid-cols-1'} gap-4`}>
          {data.body ? JSON.stringify(data.body) : "" }
        </div>

        {/* Pagination (Optional) */}
        {/* Implement pagination controls here if necessary */}
      </div>

      {/* Filters Panel */}
      <div className="md:w-1/4 w-full md:pl-4 mt-4 md:mt-0">
        <div className="border p-4 rounded-md bg-white shadow-sm">
          {/* View Toggle */}
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">View</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setView('grid')}
                className={`px-4 py-2 rounded ${
                  view === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                Grid View
              </button>
              <button
                onClick={() => setView('list')}
                className={`px-4 py-2 rounded ${
                  view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                List View
              </button>
            </div>
          </div>

          {/* Filters */}
          <div>
            <h3 className="text-lg font-bold mb-2">Filters</h3>
           
           <Filters toggleFilter={toggleFilter}></Filters>
              
            </div>

           
          </div>
        </div>
      </div>
  
  );
};

export default SearchPage;
