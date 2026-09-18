import React from 'react';
import { Palette, Code, Wrench } from 'lucide-react';

export default function SkillsGrid() {
  const skills = {
    design: {
      title: 'Design Skills',
      icon: Palette,
      items: [
        'Visual Design',
        'Wireframing',
        'User Research',
        'Usability Testing',
        'Interaction Design',
        'Prototyping'
      ]
    },
    technical: {
      title: 'Technical Skills',
      icon: Code,
      items: [
        'HTML/CSS',
        'JavaScript',
        'Python',
        'C++',
        'Java',
        'SQL'
      ]
    },
    tools: {
      title: 'Design Tools',
      icon: Wrench,
      items: [
        'Figma',
        'Canva',
        'Adobe XD',
        'Adobe Photoshop',
        'Adobe Illustrator',
        'Sketch',
        'Balsamiq'
      ]
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {Object.values(skills).map((category, idx) => {
        const Icon = category.icon;
        return (
          <div key={idx} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-shadow min-w-0">
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <div className="p-2 bg-[#D5BCAD]/20 rounded-lg shrink-0">
                <Icon className="text-[#63333A]" size={24} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#401216]">{category.title}</h3>
            </div>
            <ul className="space-y-3">
              {category.items.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-[#401216]/80">
                  <span className="w-1.5 h-1.5 bg-[#D5BCAD] rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}