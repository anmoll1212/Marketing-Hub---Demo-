import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Clock, Plus, Tag, HelpCircle, BadgeCheck, Check } from "lucide-react";

interface ScheduleEvent {
  day: number;
  title: string;
  brand: string;
  type: "review" | "launch" | "deadline";
  time: string;
  platform?: string;
}

export default function CampaignCalendar() {
  const [currentMonth, setCurrentMonth] = useState("June 2026");
  const [selectedDay, setSelectedDay] = useState<number | null>(4);

  const [events, setEvents] = useState<ScheduleEvent[]>([
    { day: 2, title: "SOW Scope Document Finalization", brand: "CodeRefine", type: "deadline", time: "11:00 AM", platform: "Docs" },
    { day: 4, title: "Compliance Audit & Copy Pre-Screen", brand: "CodeRefine", type: "review", time: "2:00 PM" },
    { day: 9, title: "BioBottles Bamboo Promo Launch", brand: "BioBottles", type: "launch", time: "9:00 AM", platform: "Instagram" },
    { day: 14, title: "Fintech Ledger Consensus Campaign", brand: "QuantumFintech", type: "launch", time: "10:30 AM", platform: "LinkedIn" },
    { day: 18, title: "Social Image Asset Adaptive Checklist", brand: "BioBottles", type: "deadline", time: "5:00 PM" },
    { day: 26, title: "SaaS CodeReviewer Live Push", brand: "CodeRefine", type: "launch", time: "8:00 AM", platform: "Multi-Platform" }
  ]);

  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventBrand, setNewEventBrand] = useState("CodeRefine");
  const [newEventType, setNewEventType] = useState<"review" | "launch" | "deadline">("review");

  // Generate days in June: 30 days
  const calendarDays = Array.from({ length: 30 }).map((_, i) => i + 1);

  const handleCreateEvent = () => {
    if (!newEventTitle.trim() || selectedDay === null) return;
    const item: ScheduleEvent = {
      day: selectedDay,
      title: newEventTitle.trim(),
      brand: newEventBrand,
      type: newEventType,
      time: "12:00 PM",
    };
    setEvents([...events, item]);
    setNewEventTitle("");
  };

  const getEventsForDay = (day: number) => {
    return events.filter((e) => e.day === day);
  };

  const getEventBadgeClass = (type: "review" | "launch" | "deadline") => {
    switch (type) {
      case "launch":
        return "bg-emerald-50 text-emerald-800 border-emerald-100";
      case "review":
        return "bg-amber-50 text-amber-800 border-amber-100";
      default:
        return "bg-indigo-50 text-indigo-800 border-indigo-100";
    }
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-205 pb-4">
        <div>
          <h2 className="text-slate-800 text-base font-bold">Multichannel Creative Launch Calendar</h2>
          <p className="text-slate-400 text-xs mt-0.5">Visually coordinate and program upcoming go-live schedules and editorial copy signoffs.</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-1 px-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold rounded">
            Month
          </button>
          <button className="p-1 px-2.5 bg-slate-10 text-slate-400 text-xs font-bold rounded">
            Week
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main 30 days Calendar Grid */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-sm font-bold text-slate-850 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-650" />
              {currentMonth}
            </span>

            <div className="flex items-center gap-1">
              <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Grid layout */}
          <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
            {/* Week labels */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((w) => (
              <span key={w} className="font-mono text-[10px] text-slate-400 font-bold uppercase py-1">
                {w}
              </span>
            ))}

            {/* Days boxes */}
            {calendarDays.map((day) => {
              const dayEvents = getEventsForDay(day);
              const isSelected = selectedDay === day;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`min-h-[56px] border rounded-lg p-1.5 flex flex-col justify-between items-start transition-all cursor-pointer ${
                    isSelected
                      ? "border-slate-800 bg-slate-50"
                      : "border-slate-20 // border-slate-150 bg-white hover:bg-slate-50/50"
                  }`}
                >
                  <span className={`text-[10px] font-mono font-bold ${isSelected ? "text-slate-900" : "text-slate-400"}`}>
                    {day}
                  </span>

                  {dayEvents.length > 0 && (
                    <div className="w-full space-y-0.5 text-left truncate">
                      {dayEvents.slice(0, 2).map((ev, i) => (
                        <span
                          key={i}
                          className="block text-[8px] leading-tight font-bold border rounded-sm px-1 py-0.5 truncate uppercase"
                          style={{
                            backgroundColor: ev.type === "launch" ? "#ECFDF5" : ev.type === "review" ? "#FFFBEB" : "#EEF2FF",
                            color: ev.type === "launch" ? "#047857" : ev.type === "review" ? "#B45309" : "#4338CA",
                            borderColor: ev.type === "launch" ? "#A7F3D0" : ev.type === "review" ? "#FDE68A" : "#C7D2FE"
                          }}
                        >
                          {ev.brand.substring(0, 5)}: {ev.type}
                        </span>
                      ))}
                      {dayEvents.length > 2 && (
                        <span className="block text-[7px] text-slate-400 pl-0.5 font-bold">
                          +{dayEvents.length - 2} more
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Event Actions Feed */}
        <div className="bg-slate-50 border border-slate-205 rounded-xl p-5 shadow-sm space-y-5">
          <div className="border-b border-slate-200 pb-2">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Day Details</span>
            <span className="text-sm font-bold text-slate-800 block">Actions for June {selectedDay || "4"}, 2026</span>
          </div>

          {/* Current list */}
          <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
            {selectedDay !== null && getEventsForDay(selectedDay).length > 0 ? (
              getEventsForDay(selectedDay).map((ev, idx) => (
                <div key={idx} className="bg-white border border-slate-200 p-3 rounded-lg text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider block font-mono">
                      {ev.time} {ev.platform && `• ${ev.platform}`}
                    </span>
                    <span className={`text-[8px] px-1.5 py-0.5 rounded font-bold uppercase border ${getEventBadgeClass(ev.type)}`}>
                      {ev.type}
                    </span>
                  </div>

                  <span className="font-bold text-slate-800 text-xs block">{ev.title}</span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-indigo-650 text-indigo-600 font-bold">
                    <Tag className="w-3 h-3" /> {ev.brand} BrandDNA parameters
                  </span>
                </div>
              ))
            ) : (
              <p className="text-slate-400 text-xs italic py-4">No events scheduled for this day.</p>
            )}
          </div>

          {/* Create new scheduling event */}
          <div className="border-t border-slate-200 pt-4 space-y-3.5 text-xs">
            <span className="text-slate-700 font-bold block text-[10px] uppercase tracking-wider">Quick Schedule Event</span>
            
            <div className="space-y-3">
              <input
                type="text"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                placeholder="Enter event headline..."
                className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-indigo-600"
              />

              <div className="grid grid-cols-2 gap-2">
                <select
                  value={newEventBrand}
                  onChange={(e) => setNewEventBrand(e.target.value)}
                  className="bg-white border border-slate-200 rounded px-2 py-1.5 text-xs focus:outline-none"
                >
                  <option value="CodeRefine">CodeRefine</option>
                  <option value="BioBottles">BioBottles</option>
                  <option value="QuantumFintech">QuantumFintech</option>
                </select>

                <select
                  value={newEventType}
                  onChange={(e) => setNewEventType(e.target.value as any)}
                  className="bg-white border border-slate-200 rounded px-2 py-1.5 text-xs focus:outline-none"
                >
                  <option value="review">Audit/Review</option>
                  <option value="launch">Go-Live Launch</option>
                  <option value="deadline">Scope Deadline</option>
                </select>
              </div>

              <button
                onClick={handleCreateEvent}
                className="w-full py-2 bg-slate-900 border text-white font-bold text-xs rounded active:scale-95 transition"
              >
                Schedule Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
