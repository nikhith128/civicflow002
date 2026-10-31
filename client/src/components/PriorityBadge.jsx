const PriorityBadge = ({ priority }) => {
  const config = {
    Critical: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' },
    High: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200' },
    Medium: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200' },
    Low: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
  };
  const c = config[priority] || config.Low;
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${c.bg} ${c.text} ${c.border}`}>
      {priority === 'Critical' && '🔴 '}
      {priority === 'High' && '🟠 '}
      {priority === 'Medium' && '🟡 '}
      {priority === 'Low' && '🟢 '}
      {priority}
    </span>
  );
};

export default PriorityBadge;

