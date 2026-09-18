import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ProjectCard from '@/components/ProjectCard';

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      image: '/case-studies/zoom-thumbnail.png',
      category: 'Accessibility Design',
      title: 'ZOOM REDESIGN',
      description: "Redesigned Zoom's accessibility features for deaf and hearing-impaired users",
      link: 'ZoomRedesign',
      tags: ['accessibility', 'mobile'],
    },
    {
      image: '/case-studies/mededge-thumbnail.png',
      category: 'Healthcare Technology',
      title: 'MEDEDGE',
      description: 'Medical decision-support platform reducing diagnostic errors and prescription mistakes',
      link: 'MEDEdge',
      tags: ['healthcare', 'mobile'],
    },
    {
      image:
        '/case-studies/synchrony_rise_case_stucy/assets/01_hero/rise-hero-three-phone.jpg',
      imageHover: '',
      category: 'UX / Product',
      title: 'RISE BY SYNCHRONY',
      description:
        'A student credit-building experience that brings guidance to consequential financial decisions while keeping students in control',
      link: 'case-studies/rise-by-synchrony',
      tags: ['mobile'],
    },
    {
      image: '/case-studies/career_match_case_study/career-match-case-study-thumbnail.png',
      imageFrame: 'aspect-[1448/1086]',
      imagePosition: 'object-center',
      imageHover: '',
      category: 'AI / Product',
      title: 'CAREER MATCH',
      description:
        'Explainable resume-to-job matching beyond keywords — with measured ranking and stress-tested failure cases',
      link: 'CareerMatch',
      tags: ['ai', 'product', 'mobile'],
    },
  ];

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'social-impact', label: 'Social Impact' },
  ];

  const filteredProjects =
    activeFilter === 'all' ? projects : projects.filter((p) => p.tags.includes(activeFilter));

  return (
    <div className="min-h-screen">
      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#FFEDDA]">
        <div className="max-w-7xl mx-auto text-center min-w-0">
          <h1 className="text-[clamp(2.25rem,7vw,3.75rem)] font-bold text-[#401216] mb-4 sm:mb-6">My Work</h1>
          <p className="text-base sm:text-lg md:text-xl text-[#401216]/70 max-w-2xl mx-auto px-2">
            Designing solutions that blend creativity with functionality
          </p>
        </div>
      </section>

      <section
        className="work-filters sticky z-[60] border-b border-white/50 bg-[#FFEDDA] px-4 py-6 sm:px-6 sm:py-8 lg:px-8"
        style={{ top: 'var(--site-header-height)' }}
      >
        <div className="max-w-7xl mx-auto min-w-0">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                aria-pressed={activeFilter === filter.id}
                variant={activeFilter === filter.id ? 'default' : 'outline'}
                className={`${
                  activeFilter === filter.id
                    ? 'border-[#63333A] bg-[#63333A] text-white hover:bg-[#401216] hover:text-white'
                    : 'border-[#401216] bg-[#401216] text-[#FFEDAD] hover:border-[#63333A] hover:bg-[#63333A] hover:text-[#FFEDAD]'
                } transition-colors focus-visible:ring-[#63333A]`}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto min-w-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {filteredProjects.map((project, idx) => (
              <div
                key={idx}
                className="animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-[#401216]/50">No projects found for this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

