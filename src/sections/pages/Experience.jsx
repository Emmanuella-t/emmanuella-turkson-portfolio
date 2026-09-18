import React from 'react';
import TimelineItem from '@/components/TimelineItem';
import SkillsGrid from '@/components/SkillsGrid';

export default function Experience() {
  const timeline = [
    {
      title: 'BSc. Computer Science',
      company: 'Philander Smith University',
      date: 'Expected May 2027',
      location: 'Little Rock, Arkansas',
      type: 'Education',
      description: [
        'Pursuing comprehensive computer science education',
        'Focus on human-computer interaction and accessibility',
        'Member of design and technology initiatives',
      ],
    },
    {
      title: 'UX Design Professional Certificate',
      company: 'HerTechTrail',
      date: '2023',
      type: 'Certification',
      description: [
        'Completed comprehensive UX design training',
        'Mastered user research, wireframing, and prototyping',
        'Developed portfolio projects in accessibility design',
      ],
    },
    {
      title: 'Software Engineering Intern',
      company: 'Dell Technologies',
      date: '2025',
      type: 'Internship',
      description: [
        'Worked on AI-powered CLI log analysis',
        'Model evaluation, security insights, LLM testing',
        'Collaborated on machine learning infrastructure projects',
      ],
    },
    {
      title: 'Data Science Research Intern',
      company: 'Lawrence Berkeley National Lab',
      date: '2024',
      type: 'Internship',
      description: [
        'Machine learning models for catalyst selectivity prediction',
        'Transfer learning + cheminformatics',
        'Contributed to cutting-edge research in computational chemistry',
      ],
    },
    {
      title: 'CFPB Research Fellow / UX Fellow',
      company: 'Consumer Financial Protection Bureau',
      date: '2024',
      type: 'Work',
      description: [
        'Designed "CreditBoost" mobile prototype',
        'Conducted user research, UX flows',
        'Created user-centered financial wellness solutions',
      ],
    },
    {
      title: 'Calculus Tutor & Teaching Assistant',
      company: 'Philander Smith University',
      date: '2023 - Present',
      type: 'Work',
      description: [
        'Known for clarity and patient teaching',
        'Help students grasp complex mathematical concepts',
        'Develop supplementary learning materials',
      ],
    },
    {
      title: 'Social Media Manager',
      company: 'Philander Smith University',
      date: '2023 - Present',
      type: 'Work',
      description: [
        'Manage university social media presence',
        'Create engaging content for campus community',
        'Coordinate digital marketing campaigns',
      ],
    },
    {
      title: 'Accessibility Design Lead',
      company: 'Zoom Redesign Project',
      date: 'November 2024',
      type: 'Project',
      description: [
        "Led the redesign of Zoom's accessibility features for hearing-impaired users",
        'Designed and implemented AI sign language avatar feature',
        'Conducted user research and usability testing with deaf community',
        'Created comprehensive design system and documentation',
      ],
    },
    {
      title: 'UX Designer',
      company: 'Mededge Software',
      date: 'May 2024 - Present',
      type: 'Work',
      description: [
        'Designed healthcare app focusing on patient management',
        'Created user-friendly mobile solutions for medical professionals',
        'Improved patient-doctor communication through better UX',
        'Collaborated with development team on implementation',
      ],
    },
    {
      title: 'Project Lead',
      company: 'Safe G Mobile App',
      date: 'August 2024',
      type: 'Project',
      description: [
        'Led UI/UX design for mental health and self-care mobile application',
        'Presented project at UNCF Innovate for Impact competition',
        'Designed safety features for college campus communities',
        'Developed user flows and interactive prototypes',
      ],
    },
    {
      title: 'UI/UX Design Intern',
      company: 'HerTechTrail',
      date: 'June 2023 - August 2023',
      type: 'Internship',
      description: [
        'Collaborated on team projects including skincare mobile application',
        'Designed end-to-end user experiences focusing on customer needs',
        'Participated in design critiques and user testing sessions',
        'Created wireframes and high-fidelity mockups',
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#FFEDDA]">
        <div className="max-w-7xl mx-auto text-center min-w-0">
          <h1 className="text-[clamp(2.25rem,7vw,3.75rem)] font-bold text-[#401216] mb-4 sm:mb-6">Experience</h1>
          <p className="text-base sm:text-lg md:text-xl text-[#401216]/70 max-w-2xl mx-auto px-2">
            Building skills through real-world projects and continuous learning
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto min-w-0">
          <h2 className="text-[clamp(1.5rem,4vw,1.875rem)] font-bold text-[#401216] mb-8 sm:mb-12">Professional Journey</h2>

          {timeline.map((item, idx) => (
            <TimelineItem key={idx} item={item} isLast={idx === timeline.length - 1} />
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto min-w-0">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-[clamp(1.75rem,5vw,2.5rem)] font-bold text-[#401216] mb-3 sm:mb-4">Skills & Tools</h2>
            <p className="text-base sm:text-lg text-[#401216]/70 px-2">
              A comprehensive toolkit developed through education and experience
            </p>
          </div>

          <SkillsGrid />
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto min-w-0">
          <h2 className="text-[clamp(1.5rem,4vw,1.875rem)] font-bold text-[#401216] mb-6 sm:mb-8">Certifications</h2>

          <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="w-16 h-16 bg-[#D5BCAD]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-[#63333A]">H</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#401216] mb-2">
                  HerTechTrail UX Design Professional Certificate
                </h3>
                <p className="text-[#401216]/70 mb-3">Completed 2023</p>
                <p className="text-[#401216]/80">
                  Comprehensive training in user experience design, including user research, wireframing,
                  prototyping, and usability testing. Completed multiple portfolio projects demonstrating
                  proficiency in modern UX design practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

