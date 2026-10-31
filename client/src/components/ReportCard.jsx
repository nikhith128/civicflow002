import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import { MapPin, Calendar, ChevronRight } from 'lucide-react';

const ReportCard = ({ report, showLink = true }) => {
  const date = new Date(report.createdAt).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              {report.reportId}
            </span>
            <StatusBadge status={report.status} />
            <PriorityBadge priority={report.priority?.label} />
          </div>
          <h3 className="font-semibold text-gray-900 text-sm truncate">{report.title}</h3>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{report.summary || report.text}</p>
          <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {report.location?.address || `${report.location?.lat?.toFixed(4)}, ${report.location?.lng?.toFixed(4)}`}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {date}
            </span>
            <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">
              {report.categoryFinal}
            </span>
          </div>
          {report.duplicate?.isDuplicate && (
            <div className="mt-2 flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
              <span>⚠️ Possible duplicate of {report.duplicate.parentId}</span>
            </div>
          )}
        </div>
        {showLink && (
          <Link
            to={`/admin/reports/${report._id}`}
            className="flex-shrink-0 text-gray-400 hover:text-blue-600 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default ReportCard;

