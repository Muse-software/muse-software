import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

/** Font Awesome Free SVG artwork; decorative icons inherit their control's label. */
export default function Icon({name = 'arrow-up-right', className = ''}: {
  name?: 'arrow-up-right' | 'arrow-right' | 'arrow-left' | 'plus';
  className?: string;
}) {
  const definition = name === 'plus' ? faPlus : name === 'arrow-left' ? faArrowLeft : faArrowRight;
  const [width, height, , , paths] = definition.icon;
  return <svg className={`site-icon ${name !== 'plus' ? 'site-icon-directional' : ''} ${className}`}
    viewBox={`0 0 ${width} ${height}`} aria-hidden="true" focusable="false" data-icon={name}>
    <g transform={name === 'arrow-up-right' ? `rotate(-45 ${width / 2} ${height / 2})` : undefined}>
      {(Array.isArray(paths) ? paths : [paths]).map((d, i) => <path key={i} d={d} />)}
    </g>
  </svg>;
}
