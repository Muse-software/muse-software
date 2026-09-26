type SubpageHeroProps = {
  title: string;
  subtitle?: string;
};
export default function SubpageHero({
  title,
  subtitle,
}: SubpageHeroProps) {
  return (
    <section className="studio-subhero">
      <div className="shell">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
  );
}
