import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils/routes';
import { ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

export default function ProjectCard({ project, index = 0 }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.15 }}
    >
      <Link to={createPageUrl(project.link)}>
        <div
          className="group bg-[#240E08] rounded-2xl overflow-hidden border border-[#3A1A10] transition-all duration-500"
          style={{ boxShadow: '0 0 0 rgba(188,120,33,0)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 24px rgba(188,120,33,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 0 rgba(188,120,33,0)';
          }}
        >
          {/* Image */}
          <div
            className={`relative overflow-hidden bg-gradient-to-br from-[#3A1A10] to-[#240E08] ${
              project.imageFrame || "aspect-video"
            }`}
          >
            <img
              src={project.image}
              alt={project.title}
              className={`h-full w-full object-cover transition-transform duration-500 ${
                project.imageHover ?? "group-hover:scale-105"
              } ${project.imagePosition || "object-center"}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            <span className="inline-block px-2.5 sm:px-3 py-1 border border-gold/40 text-[#BC7821] font-mono text-[0.65rem] sm:text-xs rounded-full mb-3">
              {project.category}
            </span>

            <h3 className="text-lg sm:text-xl font-displaySc text-[#FFEDAD] font-semibold uppercase tracking-wide mb-2 break-words">
              {project.title}
            </h3>

            <p className="text-[#FFEDAD]/70 font-body text-sm leading-relaxed mb-4">
              {project.description}
            </p>

            <div className="inline-flex items-center gap-2 text-[#BC7821] font-medium text-sm group/link">
              <span className="relative inline-block">
                View Case Study
                <span className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 bg-[#BC7821] transition-transform duration-300 group-hover/link:scale-x-100" />
              </span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}