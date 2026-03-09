"use client";

import LightPillar from "../LightPillar";
import GlassSurface from "../GlassSurface";
import FuzzyText from "../FuzzyText";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0" aria-hidden="true">
        <LightPillar
          topColor="#f5a432"
          bottomColor="#651a1a"
          intensity={1}
          rotationSpeed={0.3}
          glowAmount={0.002}
          pillarWidth={3}
          pillarHeight={0.4}
          noiseIntensity={0.5}
          pillarRotation={25}
          interactive={false}
          mixBlendMode="screen"
          quality="high"
        />
      </div>
      <div className="relative z-10">
        <GlassSurface
          width="min(600px, 90vw)"
          height="min(200px, 30vw)"
          borderRadius={100}
          displace={1.2}
          distortionScale={-100}
          redOffset={10}
          greenOffset={10}
          blueOffset={20}
          brightness={43}
          opacity={0.93}
          mixBlendMode="screen"
        >
          <FuzzyText
            baseIntensity={0.2}
            hoverIntensity={0.5}
            enableHover={true}
            clickEffect={true}
            fontSize="clamp(2rem, 5vw, 4rem)"
            fontWeight={700}
            color="#ffffff"
          >
            Coming Soon
          </FuzzyText>
        </GlassSurface>
      </div>
    </section>
  );
}
