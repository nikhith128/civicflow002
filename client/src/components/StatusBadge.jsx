const StatusBadge = ({ status }) => {
  const config = {
    Submitted: { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
    Reviewed: { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' },
    Assigned: { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500' },
    'In Progress': { bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-500' },
    Resolved: { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
  };
  const c = config[status] || config.Submitted;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {status}
    </span>
  );
};

export default StatusBadge;

