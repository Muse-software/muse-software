type TickerProps = {
  text: string;
};

export default function Ticker({ text }: TickerProps) {
  const items = Array.from({ length: 8 });

  return (
    <div className="ticker-wrapper">
      <div className="ticker-track">
        {items.map((_, i) => (
          <span className="ticker-item" key={i}>
            {text}
            <span className="ticker-dot" aria-hidden="true">
              •
            </span>
          </span>
        ))}
      </div>
      <div className="ticker-track" aria-hidden="true">
        {items.map((_, i) => (
          <span className="ticker-item" key={i}>
            {text}
            <span className="ticker-dot" aria-hidden="true">
              •
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
