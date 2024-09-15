

const statuses = [
  { label: 'All', color: '' },
  { label: 'Registered', color: 'bg-green-500' },
  { label: 'Pending', color: 'bg-yellow-500' },
  { label: 'Abandoned', color: 'bg-red-500' },
  { label: 'Others', color: 'bg-blue-500' },
];

const StatusFilters: React.FC = (props:any) => {
  return (
    <div className="my-4">
      <h2 className="text-xl font-semibold mb-4">Status</h2>
      <div className="flex flex-wrap gap-2">
        {statuses.map((status) => (
          <button
            key={status.label}
            className="flex items-center border rounded-full px-4 py-2 hover:bg-gray-100 active:bg-gray-200 focus:outline-none"
            onClick={() => props.toggleFilter('status', status)}
            aria-label={`Filter by ${status.label}`}
          >
            {status.color && (
              <span
                className={`w-2 h-2 rounded-full mr-2 ${status.color}`}
                aria-hidden="true"
              ></span>
            )}
            {status.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StatusFilters;
