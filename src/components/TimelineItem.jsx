import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

export default function TimelineItem({ item, isLast }) {
  return (
    <div className="relative pl-8 pb-12">
      {/* Timeline dot and line */}
      <div className="absolute left-0 top-0">
        <div className="w-4 h-4 bg-[#63333A] rounded-full border-4 border-[#FFEDDA]" />
        {!isLast && (
          <div className="absolute left-1/2 top-4 w-0.5 h-full bg-[#D5BCAD] transform -translate-x-1/2" />
        )}
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-lg transition-shadow min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3 mb-3">
          <div className="min-w-0">
            <h3 className="text-lg sm:text-xl font-semibold text-[#401216] mb-1 break-words">{item.title}</h3>
            <p className="text-[#63333A] font-medium break-words">{item.company}</p>
          </div>
          <span className="self-start text-xs font-medium px-3 py-1 bg-[#D5BCAD]/20 text-[#63333A] rounded-full whitespace-nowrap shrink-0">
            {item.type}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-[#401216]/60 mb-4">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{item.date}</span>
          </div>
          {item.location && (
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <span>{item.location}</span>
            </div>
          )}
        </div>

        {item.description && (
          <ul className="space-y-2">
            {item.description.map((desc, idx) => (
              <li key={idx} className="flex items-start gap-2 text-[#401216]/80 text-sm">
                <span className="text-[#D5BCAD] mt-1">•</span>
                <span>{desc}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}