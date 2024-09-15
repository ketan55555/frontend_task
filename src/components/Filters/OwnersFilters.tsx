import { useState } from 'react';

const tabs = ['Owners', 'Law Firms', 'Attorneys'];
const owners = ['Tesla, Inc.', 'LEGALFORCE RAPC.', 'SpaceX Inc.', 'Neuralink Corp.', 'The Boring Company'];

const OwnersFilters: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Owners');
  const [searchTerm, setSearchTerm] = useState('');
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    'Tesla, Inc.': true,
  });

  const handleCheck = (owner: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [owner]: !prev[owner],
    }));
  };

  const filteredOwners = owners.filter((owner) =>
    owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full md:w-1/2 my-4">
      <h2 className="text-xl font-semibold mb-4">Owners</h2>

      {/* Tab Navigation */}
      <div className="flex border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 -mb-px ${
              activeTab === tab
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-600 hover:text-blue-500'
            }`}
            onClick={() => setActiveTab(tab)}
            aria-label={`Select ${tab} tab`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder={`Search ${activeTab}`}
          aria-label={`Search ${activeTab}`}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Owners List */}
      <div className="h-48 overflow-y-auto border rounded p-2">
        {filteredOwners.map((owner) => (
          <label key={owner} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={checkedItems[owner] || false}
              onChange={() => handleCheck(owner)}
              className="mr-2"
              aria-label={`Select ${owner}`}
            />
            {owner}
          </label>
        ))}
      </div>
    </div>
  );
};

export default OwnersFilters;
