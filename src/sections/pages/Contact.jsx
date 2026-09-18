import React from 'react';
import { Briefcase, Github, Linkedin, Mail } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export default function Contact() {
  const opportunities = [
    'Freelance projects',
    'Design collaborations',
    'Full-time & Internship opportunities',
    'Speaking engagements',
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/emmanuella-turkson',
      color: 'hover:bg-[#0077B5]',
    },
    {
      name: 'Fiverr',
      icon: Briefcase,
      url: 'https://www.fiverr.com/ella_turkson/buying?source=avatar_menu_profile',
      color: 'hover:bg-[#1DBF73]',
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/Emmanuella-t',
      color: 'hover:bg-[#401216]',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#FFEDDA]">
        <div className="max-w-4xl mx-auto text-center min-w-0">
          <h1 className="text-[clamp(2.25rem,7vw,3.75rem)] font-bold text-[#401216] mb-6 sm:mb-8">Let's Work Together</h1>

          <p className="text-base sm:text-lg md:text-xl text-[#401216]/70 mb-6 sm:mb-8 px-2">I'm currently open to:</p>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 px-2">
            {opportunities.map((opportunity, idx) => (
              <div
                key={idx}
                className="px-6 py-3 bg-white rounded-full shadow-sm border border-[#D5BCAD]/30"
              >
                <span className="text-[#63333A] font-medium">{opportunity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto min-w-0">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#401216] mb-2">Send me a message</h2>
            <p className="text-[#401216]/70 mb-8">
              Fill out the form below and I'll get back to you within 24 hours
            </p>

            <ContactForm />
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-2xl mx-auto text-center min-w-0">
          <h3 className="text-xl sm:text-2xl font-bold text-[#401216] mb-4">Prefer email?</h3>

          <a
            href="mailto:imturkson@gmail.com"
            className="inline-flex items-center gap-3 text-base sm:text-lg md:text-xl text-[#63333A] hover:text-[#D5BCAD] transition-colors font-medium break-all"
          >
            <Mail size={24} />
            imturkson@gmail.com
          </a>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto min-w-0">
          <h3 className="text-xl sm:text-2xl font-bold text-[#401216] mb-6 sm:mb-8 text-center">Connect with me</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {socialLinks.map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center justify-center gap-3 p-6 sm:p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all group min-w-0 ${social.color}`}
                >
                  <Icon size={32} className="text-[#63333A] group-hover:text-white transition-colors" />
                  <span className="text-sm font-medium text-[#401216] group-hover:text-white transition-colors">
                    {social.name}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#FFEDDA]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-block px-6 py-3 bg-white rounded-full shadow-sm mb-4">
            <p className="text-[#401216]/70">
              📍 Based in <span className="font-semibold text-[#63333A]">Little Rock, Arkansas</span>
            </p>
          </div>
          <p className="text-[#401216]/60">Available for remote work and collaborations worldwide</p>
        </div>
      </section>
    </div>
  );
}

