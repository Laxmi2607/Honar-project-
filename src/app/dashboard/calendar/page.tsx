"use client";

import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const scheduledEvents = [
  { day: 14, title: "Blog: AI Content Tips", color: "bg-indigo-500", time: "10:00 AM" },
  { day: 15, title: "Thread: Week 12 Update", color: "bg-blue-500", time: "9:00 AM" },
  { day: 15, title: "IG Reel: React Tips", color: "bg-pink-500", time: "2:00 PM" },
  { day: 16, title: "Newsletter #24", color: "bg-emerald-500", time: "6:00 PM" },
  { day: 18, title: "YT Video: Full Stack", color: "bg-red-500", time: "12:00 PM" },
  { day: 20, title: "LinkedIn Post", color: "bg-blue-600", time: "8:00 AM" },
  { day: 22, title: "Blog: SaaS Growth", color: "bg-indigo-500", time: "10:00 AM" },
];

export default function CalendarPage() {
  const [currentMonth] = useState("May 2025");

  // Generate calendar days for May 2025 (starts on Thursday)
  const startDay = 4; // Thursday
  const totalDays = 31;
  const blanks = Array.from({ length: startDay }, (_, i) => i);
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
          <p className="text-white/40 text-sm mt-1">Plan and schedule your content pipeline.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20">
          <Plus className="w-4 h-4" /> Schedule
        </button>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.06] transition-colors">
            <ChevronLeft className="w-4 h-4 text-white/40" />
          </button>
          <h2 className="text-lg font-semibold min-w-[140px] text-center">{currentMonth}</h2>
          <button className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.06] transition-colors">
            <ChevronRight className="w-4 h-4 text-white/40" />
          </button>
        </div>
        <div className="hidden sm:flex gap-1 rounded-xl bg-white/[0.03] border border-white/[0.06] p-1">
          <button className="px-3 py-1.5 rounded-lg bg-white/[0.08] text-white text-xs font-medium">Month</button>
          <button className="px-3 py-1.5 rounded-lg text-white/40 text-xs font-medium hover:text-white/60">Week</button>
          <button className="px-3 py-1.5 rounded-lg text-white/40 text-xs font-medium hover:text-white/60">Day</button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="rounded-2xl border border-white/[0.06] bg-[#0c0c14] overflow-hidden">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-white/[0.06]">
          {daysOfWeek.map((d) => (
            <div key={d} className="px-2 py-3 text-center text-[11px] font-medium text-white/30 uppercase tracking-wider">
              {d}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7">
          {blanks.map((b) => (
            <div key={`blank-${b}`} className="min-h-[100px] md:min-h-[120px] border-b border-r border-white/[0.03] bg-white/[0.01]" />
          ))}
          {days.map((day) => {
            const events = scheduledEvents.filter((e) => e.day === day);
            const isToday = day === 14;
            return (
              <div
                key={day}
                className={`min-h-[100px] md:min-h-[120px] border-b border-r border-white/[0.03] p-1.5 md:p-2 hover:bg-white/[0.02] transition-colors cursor-pointer ${isToday ? "bg-indigo-500/[0.04]" : ""}`}
              >
                <span className={`text-xs font-medium inline-flex w-6 h-6 items-center justify-center rounded-full ${isToday ? "bg-indigo-500 text-white" : "text-white/40"}`}>
                  {day}
                </span>
                <div className="mt-1 space-y-1">
                  {events.map((event, i) => (
                    <div key={i} className={`${event.color} bg-opacity-20 rounded px-1.5 py-0.5 text-[10px] font-medium truncate cursor-pointer hover:bg-opacity-30 transition-colors`}>
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
