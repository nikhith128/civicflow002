const AIInsights = ({ report }) => {
  if (!report) return null;
  const { ai, duplicate, priority } = report;
  const isAI = ai?.source === 'gemini';

  return (
    <div className="space-y-4">
      {/* AI Source Badge */}
      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${isAI ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
        <span>{isAI ? '🤖' : '⚠️'}</span>
        <span>{isAI ? 'AI Analysis (Gemini)' : 'Fallback Analysis (Rule-based)'}</span>
        {ai?.confidence ? (
          <span className="ml-auto text-xs opacity-70">{Math.round(ai.confidence * 100)}% confidence</span>
        ) : null}
      </div>

      {/* Summary */}
      {report.summary && (
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">AI Summary</h4>
          <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">{report.summary}</p>
        </div>
      )}

      {/* Category */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">AI Category</h4>
          <p className="text-sm font-medium text-gray-800 bg-gray-50 rounded p-2">{report.categoryAI}</p>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Final Category</h4>
          <p className="text-sm font-medium text-gray-800 bg-gray-50 rounded p-2">{report.categoryFinal}</p>
        </div>
      </div>

      {/* Safety Flag */}
      {ai?.safetyFlag && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-3">
          <span className="text-red-500">⚠️</span>
          <p className="text-sm font-medium text-red-700">Safety hazard detected by AI</p>
        </div>
      )}

      {/* Priority Factors */}
      {priority?.factors?.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Priority Breakdown (Score: {priority.score})</h4>
          <div className="space-y-2">
            {priority.factors.map((f, i) => (
              <div key={i} className="flex items-start gap-2 text-xs">
                <div className={`flex-shrink-0 mt-0.5 w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold ${f.contribution > 0 ? 'bg-blue-500' : 'bg-gray-300'}`}>
                  {f.contribution}
                </div>
                <div>
                  <p className="font-medium text-gray-700">{f.name}</p>
                  <p className="text-gray-500">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Duplicate */}
      {duplicate?.isDuplicate && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <h4 className="text-xs font-semibold text-amber-700 mb-1">⚠️ Possible Duplicate</h4>
          <p className="text-xs text-amber-600">Parent: {duplicate.parentId}</p>
          <p className="text-xs text-amber-600">{duplicate.reason}</p>
        </div>
      )}
    </div>
  );
};

export default AIInsights;

