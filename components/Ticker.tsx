type TickerProps = {
  text: string;
};

export default function Ticker({ text }: TickerProps) {
  const items = Array.from({ length: 8 });

  return (
    // The wrapper is rotated and scaled up, so it paints ~15px wider than the
    // viewport at desktop widths. `overflow: hidden` on the wrapper itself
    // clips its children, not its own transformed footprint, so the overhang
    // has to be caught by a parent that is not transformed — this one.
    //
    // `clip`, not `hidden`: `hidden` would make this a scroll container, and
    // there is no reason for a sub-tree of the page to become scrollable to
    // absorb 15px of decoration. It is also the same distinction that matters
    // one level up on `html` — see globals.css.
    <div className="overflow-x-clip">
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
    </div>
  );
}
