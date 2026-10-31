const StatusTimeline = ({ history = [] }) => {
  const statusOrder = ['Submitted', 'Reviewed', 'Assigned', 'In Progress', 'Resolved'];
  
  if (history.length === 0) return null;

  const dotColors = {
    Submitted: 'bg-blue-500',
    Reviewed: 'bg-yellow-500',
    Assigned: 'bg-purple-500',
    'In Progress': 'bg-orange-500',
    Resolved: 'bg-green-500',
  };

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {history.map((entry, index) => (
          <li key={index}>
            <div className="relative pb-8">
              {index < history.length - 1 && (
                <span className="absolute top-5 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              )}
              <div className="relative flex items-start space-x-3">
                <div>
                  <div className={`relative flex items-center justify-center w-8 h-8 rounded-full ring-4 ring-white ${dotColors[entry.status] || 'bg-gray-400'}`}>
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>
                <div className="min-w-0 flex-1 pt-1">
                  <p className="text-sm font-semibold text-gray-900">{entry.status}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(entry.at).toLocaleString('en-IN', {
                      day: '2-digit', month: 'short', year: 'numeric',
                      hour: '2-digit', minute: '2-digit',
                    })} · by {entry.byRole}
                  </p>
                  {entry.note && <p className="text-xs text-gray-600 mt-0.5">{entry.note}</p>}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatusTimeline;

