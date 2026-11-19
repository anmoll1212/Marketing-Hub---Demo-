import React, { useState, useEffect } from "react";
import { CheckCircle2, XCircle, FileText, UserCheck, Search, ShieldCheck } from "lucide-react";

export default function ApproverWorkspace({
  sessions,
  onApprove,
  onReject,
  onProvideInfo,
  initialSessionId
}: {
  sessions: any[];
  onApprove: (id: string) => void;
  onReject: (id: string, feedback: string) => void;
  onProvideInfo: (id: string, feedback: string) => void;
  initialSessionId?: string | null;
}) {
  const [activeSession, setActiveSession] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (initialSessionId && sessions.length > 0) {
      const found = sessions.find((s) => s.id === initialSessionId);
      if (found) {
        setActiveSession(found);
      }
    }
  }, [initialSessionId, sessions]);

  const filteredSessions = sessions.filter(
    (s) =>
      s.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-144px)] gap-6">
      {/* Sidebar: List of pending/reviewed sign-offs */}
      <div className="w-80 bg-white border border-slate-200 rounded-xl flex flex-col overflow-hidden shadow-sm shrink-0">
        <div className="p-4 border-b border-slate-200 bg-slate-50 space-y-3 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-800 text-sm">Sign-off Requests</h3>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2 text-slate-400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredSessions.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-400">No requests found.</div>
          ) : (
            filteredSessions.map((session) => (
              <button
                key={session.id}
                onClick={() => {
                  setActiveSession(session);
                  setFeedback("");
                }}
                className={`w-full text-left p-3 rounded-lg border text-xs transition duration-200 ${
                  activeSession?.id === session.id
                    ? "bg-indigo-50 border-indigo-200"
                    : "bg-white border-transparent hover:bg-slate-50 hover:border-slate-200"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-slate-800 truncate pr-2">{session.project}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                    session.status === "Approved" ? "bg-emerald-100 text-emerald-700" :
                    session.status === "Published" ? "bg-blue-100 text-blue-700" :
                    session.status === "Rejected" ? "bg-red-100 text-red-700" :
                    "bg-amber-100 text-amber-700"
                  }`}>
                    {session.status}
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono tracking-tight">{session.id}</div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main Content: Document Details & Action Buttons */}
      <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
        {activeSession ? (
          <>
            <div className="p-5 border-b border-slate-200 bg-slate-50 flex justify-between items-start shrink-0">
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-1">{activeSession.project}</h2>
                <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                  <span>ID: {activeSession.id}</span>
                  <span>•</span>
                  <span>Brand: {activeSession.briefRecord.brand}</span>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                activeSession.status === "Approved" ? "bg-emerald-100 text-emerald-700" :
                activeSession.status === "Published" ? "bg-blue-100 text-blue-700" :
                activeSession.status === "Rejected" ? "bg-red-100 text-red-700" :
                "bg-amber-100 text-amber-700"
              }`}>
                {activeSession.status}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <section className="space-y-3">
                <h3 className="font-bold text-sm text-indigo-700 border-b border-slate-200 pb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Strategic Overview
                </h3>
                <div className="bg-slate-50 p-4 rounded-lg text-xs leading-relaxed border border-slate-100">
                  <p><strong>Goal:</strong> {activeSession.briefRecord.goal}</p>
                  <p className="mt-2"><strong>Target Audience:</strong> {activeSession.briefRecord.audience}</p>
                  <p className="mt-2"><strong>Core Strategy:</strong> {activeSession.briefRecord.objective_why}</p>
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="font-bold text-sm text-indigo-700 border-b border-slate-200 pb-2">Proposed Messaging</h3>
                <div className="bg-white p-4 rounded-lg text-xs border border-slate-200 leading-relaxed space-y-4">
                  <div>
                    <span className="font-bold text-slate-500 block text-[10px] uppercase mb-1">Subject Line</span>
                    <p className="font-medium text-slate-800">{activeSession.briefRecord.subjectLine || "N/A"}</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-500 block text-[10px] uppercase mb-1">Preheader Text</span>
                    <p className="font-medium text-slate-800">{activeSession.briefRecord.preheaderText || "N/A"}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded border">
                    <span className="font-bold text-slate-500 block text-[10px] uppercase mb-1">SMS Draft</span>
                    <p className="font-mono text-slate-700">{activeSession.briefRecord.smsCopy || "N/A"}</p>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="font-bold text-sm text-red-700 border-b border-slate-200 pb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Legal & Mandatory Disclosures
                </h3>
                <div className="bg-red-50 p-4 rounded-lg text-xs border border-red-100 font-mono text-red-900">
                  {activeSession.briefRecord.mandatories || "Does not reduce total cost to own."}
                </div>
              </section>
            </div>

            {/* Actions panel locked if not in initial pending state? The current app logic:
                Actually, the user can approve any time if it's pending.
            */}
            {(activeSession.status === "Submitted" || activeSession.status === "Data Request") && (
              <div className="p-4 border-t border-slate-200 bg-slate-50 shrink-0 space-y-4 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                {activeSession.status === "Data Request" && (
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 text-amber-800 text-xs mb-2">
                    <strong>Document & Information Request:</strong> The creator requires more files or information to proceed with this brief.
                  </div>
                )}
                
                <textarea
                  placeholder={activeSession.status === "Data Request" ? "Provide information or document links to the creator..." : "If rejecting, provide feedback for the creator..."}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full h-16 text-xs p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-sans"
                />
                
                {activeSession.status === "Data Request" && (
                  <div className="flex items-center gap-2 mb-2">
                    <label className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors">
                      <FileText className="w-4 h-4 text-slate-500" />
                      <span>Upload Document...</span>
                      {/* Fake file input for demo purposes */}
                      <input type="file" className="hidden" onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                              setFeedback(prev => prev + (prev ? "\n\n" : "") + "Attached: " + e.target.files![0].name);
                          }
                      }} />
                    </label>
                  </div>
                )}

                <div className="flex gap-4">
                  {activeSession.status === "Data Request" ? (
                    <button
                      onClick={() => {
                          if (!feedback) alert("Please provide some information or attach a document.");
                          else onProvideInfo(activeSession.id, feedback);
                      }}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 text-sm shadow-sm"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Provide Information
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => onApprove(activeSession.id)}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 text-sm shadow-sm"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        Approve Campaign
                      </button>
                      <button
                        onClick={() => {
                            if (!feedback) alert("Please enter rejection feedback first.");
                            else onReject(activeSession.id, feedback);
                        }}
                        className="flex-1 bg-white border-2 border-red-500 text-red-600 hover:bg-red-50 font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 text-sm shadow-sm"
                      >
                        <XCircle className="w-5 h-5" />
                        Reject (Requires Feedback)
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
            
            {(activeSession.status !== "Submitted" && activeSession.status !== "Data Request") && (
              <div className="p-4 border-t border-slate-200 bg-slate-50 shrink-0 flex items-center justify-center gap-2 text-slate-500 text-xs">
                {activeSession.status === "Approved" || activeSession.status === "Published" ? (
                  <><CheckCircle2 className="w-4 h-4 text-emerald-500" /> This brief has been approved.</>
                ) : (
                  <><XCircle className="w-4 h-4 text-red-500" /> This brief was rejected. Awaiting creator revision.</>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-4">
            <UserCheck className="w-12 h-12 text-slate-200" />
            <p className="text-sm font-medium">Select a campaign sign-off request to review.</p>
          </div>
        )}
      </div>
    </div>
  );
}
