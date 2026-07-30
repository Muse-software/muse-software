"use client";

import { useState } from "react";

const tabs = ["About", "Mission", "Vision", "Values"] as const;
type Tab = (typeof tabs)[number];

const values = [
  {
    name: "Innovation",
    copy: "We continuously explore new ideas, technologies, and creative approaches to deliver distinctive digital solutions.",
  },
  {
    name: "Excellence",
    copy: "We are committed to the highest standards of quality in every project, from concept to launch.",
  },
  {
    name: "Creativity",
    copy: "We believe great design is more than aesthetics — it is a powerful tool for storytelling, engagement, and impact.",
  },
  {
    name: "Collaboration",
    copy: "We work closely with our clients and partners, building strong relationships based on trust and shared success.",
  },
  {
    name: "Passion",
    copy: "Our passion for technology and design drives us to create meaningful work and push boundaries in everything we do.",
  },
  {
    name: "Growth Mindset",
    copy: "We embrace learning, adaptation, and continuous improvement to stay ahead in an evolving digital world.",
  },
  {
    name: "Saudi Talent",
    copy: "We are proud to be built by Saudi creatives and developers, contributing to the Kingdom's growing digital ecosystem and vision for the future.",
  },
];

export default function AboutTabs() {
  const [active, setActive] = useState<Tab>("About");

  return (
    <section className="bg-[#060608] py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1000px] px-5 md:px-10">
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              className={`border px-5 py-2 text-sm font-medium transition-colors md:text-base ${
                active === tab
                  ? "border-[#fd4601] text-[#fd4601]"
                  : "border-white/35 text-white/60 hover:border-white/40 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-10 md:mt-14">
          {active === "About" && (
            <div className="max-w-[70ch] space-y-5 text-lg leading-8 text-white/70">
              <p>
                Muse Studios is a Saudi technology company specializing in custom website development and distinctive digital design solutions. Founded in Riyadh by a team of ambitious and creative Saudi talents, the company was built on a shared vision to redefine digital experiences through innovation, craftsmanship, and forward-thinking design.
              </p>
              <p>
                Driven by passion and a commitment to excellence, we create websites that go beyond functionality — delivering unique digital experiences that reflect each brand&rsquo;s identity and help businesses stand out in an increasingly competitive market. By combining modern technology, strategic thinking, and creative design, we transform ideas into impactful digital products.
              </p>
              <p>
                At Muse Studios, we believe that every project is an opportunity to leave a lasting impression. Our mission is to empower businesses with exceptional digital solutions while contributing to the growth of Saudi Arabia&rsquo;s evolving technology landscape through creativity, innovation, and local talent.
              </p>
            </div>
          )}

          {active === "Mission" && (
            <p className="max-w-[70ch] text-lg leading-8 text-white/70 md:text-xl md:leading-9">
              To empower businesses and entrepreneurs with innovative digital solutions by designing and developing exceptional websites that combine creativity, functionality, and cutting-edge technology, helping our clients build meaningful digital experiences and achieve sustainable growth.
            </p>
          )}

          {active === "Vision" && (
            <p className="max-w-[70ch] text-lg leading-8 text-white/70 md:text-xl md:leading-9">
              To become one of Saudi Arabia&rsquo;s leading digital studios, recognized for creating unique web experiences, inspiring innovation, and shaping the future of digital design and development through Saudi talent and global standards.
            </p>
          )}

          {active === "Values" && (
            <div className="grid gap-8 md:grid-cols-2">
              {values.map((value) => (
                <div key={value.name}>
                  <h3 className="font-space-grotesk text-lg font-bold text-white">
                    {value.name}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-white/60">{value.copy}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
