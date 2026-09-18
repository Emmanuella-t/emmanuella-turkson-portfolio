import React from 'react';
import { Download, Heart, Lightbulb, Linkedin, Mail, Target, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function About() {
  const values = [
    {
      icon: Heart,
      title: 'Empathy First',
      description: 'Understanding users deeply before designing solutions',
    },
    {
      icon: Users,
      title: 'Inclusive Design',
      description: 'Building for everyone, not just the majority',
    },
    {
      icon: Lightbulb,
      title: 'Continuous Learning',
      description: 'Always growing, always curious',
    },
    {
      icon: Target,
      title: 'Impact Over Output',
      description: 'Quality and meaning matter more than quantity',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#FFEDDA]">
        <div className="max-w-7xl mx-auto min-w-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <h1 className="text-[clamp(2.25rem,7vw,3.75rem)] font-bold text-[#401216] mb-4 sm:mb-6">
                Hi, I'm <span className="text-[#63333A]">Emmanuella</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-[#401216]/80 leading-relaxed">
                A designer who believes technology should empower everyone.
              </p>
            </div>

            <div className="order-1 lg:order-2 relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6912295bcf607c90c75bc0c1/90ac0a901_emmanuellaspicture.jpeg"
                  alt="Emmanuella Turkson"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden sm:block absolute -bottom-6 sm:-bottom-8 -right-6 sm:-right-8 w-40 sm:w-64 h-40 sm:h-64 bg-[#D5BCAD] rounded-3xl -z-10" />
              <div className="hidden sm:block absolute -top-6 sm:-top-8 -left-6 sm:-left-8 w-32 sm:w-48 h-32 sm:h-48 bg-[#63333A]/20 rounded-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto min-w-0">
          <h2 className="text-[clamp(1.75rem,5vw,2.5rem)] font-bold text-[#401216] mb-6 sm:mb-8">From curiosity to commitment</h2>

          <div className="space-y-5 sm:space-y-6 text-base sm:text-lg text-[#401216]/80 leading-relaxed">
            <p>I've always been fascinated by how design shapes the way we interact with the world.</p>

            <p>
              What started as an interest in visual aesthetics evolved into a passion for solving real
              problems—especially for people who are often overlooked.
            </p>

            <p>
              I'm currently studying Computer Science at Philander Smith University, where I'm learning to
              bridge design and development.
            </p>

            <p>
              My work focuses on accessibility, healthcare, and creating inclusive digital experiences that make
              a real difference in people's lives.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto min-w-0">
          <h2 className="text-[clamp(1.75rem,5vw,2.5rem)] font-bold text-[#401216] mb-6 sm:mb-8">Design with purpose</h2>

          <div className="bg-[#63333A] rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 text-white">
            <p className="text-lg sm:text-xl leading-relaxed mb-5 sm:mb-6">
              I'm driven by the belief that good design can make a tangible difference in people's lives.
            </p>

            <p className="text-lg leading-relaxed opacity-90">
              Whether it's making virtual meetings accessible for deaf users or helping patients communicate with
              doctors more effectively, I approach every project with empathy and intention.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto min-w-0">
          <h2 className="text-[clamp(1.75rem,5vw,2.5rem)] font-bold text-[#401216] mb-8 sm:mb-12 text-center">My Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#FFEDDA] rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-shadow min-w-0"
                >
                  <div className="w-14 h-14 bg-[#63333A] rounded-xl flex items-center justify-center mb-6">
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#401216] mb-3">{value.title}</h3>
                  <p className="text-[#401216]/70 text-lg leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-12 shadow-sm">
            <h3 className="text-2xl font-semibold text-[#401216] mb-6">Quick Facts</h3>

            <div className="space-y-4 text-lg text-[#401216]/80">
              <div className="flex items-start gap-3">
                <span className="text-[#D5BCAD] mt-1">•</span>
                <span>
                  <strong>Location:</strong> Little Rock, Arkansas
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#D5BCAD] mt-1">•</span>
                <span>
                  <strong>Education:</strong> BSc Computer Science, Philander Smith University (Expected 2027)
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#D5BCAD] mt-1">•</span>
                <span>
                  <strong>Specialization:</strong> Accessibility design, healthcare UX, human-centered design
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#D5BCAD] mt-1">•</span>
                <span>
                  <strong>Passion:</strong> Creating technology that empowers everyone
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#63333A] text-white">
        <div className="max-w-4xl mx-auto text-center min-w-0">
          <h2 className="text-[clamp(1.75rem,5vw,2.5rem)] font-bold mb-4 sm:mb-6">Let's Connect</h2>
          <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 sm:mb-12 leading-relaxed max-w-2xl mx-auto px-2">
            Whether you have a project in mind, want to collaborate, or just want to chat about design—I'm all ears.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 px-2">
            <a href="mailto:imturkson@gmail.com">
              <Button className="h-12 px-8 bg-[#D5BCAD] hover:bg-white text-[#401216] font-medium text-base">
                <Mail size={18} className="mr-2" />
                Email Me
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/emmanuella-turkson" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="h-12 px-8 bg-[#D5BCAD] hover:bg-white text-[#401216] font-medium text-base">
                <Linkedin size={18} className="mr-2" />
                LinkedIn
              </Button>
            </a>
            <a
              href="https://drive.google.com/file/d/14dn2VkynSd9wh2UevfpwyZAGx5UFN3jI/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="h-12 px-8 bg-[#D5BCAD] hover:bg-white text-[#401216] font-medium text-base">
                <Download size={18} className="mr-2" />
                Download Resume
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

