import React from 'react';

export interface ExpediXLogoProps {
  /**
   * Layout format of the logo:
   * - 'mark': Symbol only (compass + geometric X + route mark)
   * - 'horizontal': Symbol + "ExpediX" wordmark side-by-side
   * - 'stacked': Symbol on top + "ExpediX" wordmark + tagline underneath
   * - 'wordmark': Wordmark only ("Expedi" + "X")
   */
  variant?: 'mark' | 'horizontal' | 'stacked' | 'wordmark';
  /**
   * Theme styling:
   * - 'light': Navy text (#082D56) + Blue accent (#0B65D8) for white/light backgrounds
   * - 'dark': White text (#FFFFFF) + Cyan/Blue accent (#38BDF8 / #0B65D8) for navy/dark backgrounds
   */
  theme?: 'light' | 'dark';
  /**
   * Size presets or custom dimension
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  /**
   * Optional custom class name for the wrapper
   */
  className?: string;
  /**
   * Show tagline under the wordmark
   */
  showTagline?: boolean;
  /**
   * Optional badge text (e.g., 'PROTOTYPE')
   */
  badge?: string;
}

export const ExpediXLogoMark: React.FC<{
  size?: number;
  theme?: 'light' | 'dark';
  className?: string;
}> = ({ size = 36, theme = 'light', className = '' }) => {
  const navyColor = theme === 'dark' ? '#FFFFFF' : '#082D56';
  const blueColor = theme === 'dark' ? '#38BDF8' : '#0B65D8';
  const cyanColor = theme === 'dark' ? '#7DD3FC' : '#38BDF8';
  const ringColor = theme === 'dark' ? '#93C5FD' : '#082D56';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-label="ExpediX Compass Logo Mark"
    >
      {/* 1. Four Cardinal Pointer Triangles (North, South, East, West) */}
      {/* North */}
      <polygon points="50,5 42.5,17 57.5,17" fill={navyColor} />
      {/* South */}
      <polygon points="50,95 42.5,83 57.5,83" fill={navyColor} />
      {/* East */}
      <polygon points="95,50 83,42.5 83,57.5" fill={navyColor} />
      {/* West */}
      <polygon points="5,50 17,42.5 17,57.5" fill={navyColor} />

      {/* 2. Four Quadrant Compass Ring Arcs with precise cardinal breaks */}
      {/* North-East Quadrant */}
      <path
        d="M 59 17.5 A 33 33 0 0 1 82.5 41"
        stroke={ringColor}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* South-East Quadrant */}
      <path
        d="M 82.5 59 A 33 33 0 0 1 59 82.5"
        stroke={ringColor}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* South-West Quadrant */}
      <path
        d="M 41 82.5 A 33 33 0 0 1 17.5 59"
        stroke={ringColor}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* North-West Quadrant */}
      <path
        d="M 17.5 41 A 33 33 0 0 1 41 17.5"
        stroke={ringColor}
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* 3. Geometric "X" Structure */}
      {/* Upper-Left Navy Wing */}
      <polygon
        points="27,27 44,27 57,45 44,52 27,27"
        fill={navyColor}
      />

      {/* Lower-Left Navy Base Slice */}
      <polygon
        points="28,73 40,73 48,63 41,56 28,73"
        fill={navyColor}
      />

      {/* Lower-Right Blue Wing */}
      <polygon
        points="46,55 58,45 74,73 57,73 46,55"
        fill={blueColor}
      />

      {/* Upper-Right Dynamic Blue Wing / Wedge */}
      <polygon
        points="52,43 73,27 75,34 59,51"
        fill={blueColor}
      />

      {/* 4. Expedition Route Swoop crossing the X */}
      <path
        d="M 27 73 Q 48 55 78 24"
        stroke={cyanColor}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* 5. Waypoint Navigation Dot at end of route */}
      <circle
        cx="78.5"
        cy="23.5"
        r="4.2"
        fill={cyanColor}
        stroke={navyColor}
        strokeWidth="1.8"
      />
      <circle
        cx="78.5"
        cy="23.5"
        r="1.8"
        fill="#FFFFFF"
      />
    </svg>
  );
};

export const ExpediXLogo: React.FC<ExpediXLogoProps> = ({
  variant = 'horizontal',
  theme = 'light',
  size = 'md',
  className = '',
  showTagline = false,
  badge,
}) => {
  // Numeric size calculations
  let markSize = 32;
  let textClass = 'text-lg';
  let taglineClass = 'text-[10px]';

  if (typeof size === 'number') {
    markSize = size;
  } else {
    switch (size) {
      case 'xs':
        markSize = 20;
        textClass = 'text-sm';
        taglineClass = 'text-[9px]';
        break;
      case 'sm':
        markSize = 26;
        textClass = 'text-base';
        taglineClass = 'text-[10px]';
        break;
      case 'md':
        markSize = 34;
        textClass = 'text-lg';
        taglineClass = 'text-[11px]';
        break;
      case 'lg':
        markSize = 44;
        textClass = 'text-2xl';
        taglineClass = 'text-xs';
        break;
      case 'xl':
        markSize = 64;
        textClass = 'text-4xl';
        taglineClass = 'text-sm';
        break;
    }
  }

  const expedColor = theme === 'dark' ? 'text-white' : 'text-[#082D56]';
  const xColor = theme === 'dark' ? 'text-[#38BDF8]' : 'text-[#0B65D8]';
  const tagColor = theme === 'dark' ? 'text-sky-200/90' : 'text-slate-600';

  // Variant: Mark only
  if (variant === 'mark') {
    return <ExpediXLogoMark size={markSize} theme={theme} className={className} />;
  }

  // Variant: Wordmark only
  if (variant === 'wordmark') {
    return (
      <div className={`inline-flex flex-col ${className}`}>
        <span className={`font-heading font-black tracking-tight leading-none ${textClass} ${expedColor}`}>
          Expedi<span className={xColor}>X</span>
        </span>
        {showTagline && (
          <span className={`font-medium tracking-wide mt-1 ${taglineClass} ${tagColor}`}>
            Smarter Expeditions. Greater Discovery.
          </span>
        )}
      </div>
    );
  }

  // Variant: Stacked (Centered Logo Mark + Wordmark + Tagline)
  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <ExpediXLogoMark size={markSize} theme={theme} className="mb-3" />
        <div className="flex items-center gap-2">
          <span className={`font-heading font-black tracking-tight leading-none ${textClass} ${expedColor}`}>
            Expedi<span className={xColor}>X</span>
          </span>
          {badge && (
            <span
              className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                theme === 'dark'
                  ? 'bg-sky-400/20 text-sky-200 border border-sky-400/30'
                  : 'bg-sky-50 text-polar-blue border border-sky-200'
              }`}
            >
              {badge}
            </span>
          )}
        </div>
        {showTagline && (
          <p className={`font-medium tracking-wide mt-2 ${taglineClass} ${tagColor}`}>
            Smarter Expeditions. Greater Discovery.
          </p>
        )}
      </div>
    );
  }

  // Default: Horizontal (Symbol + "ExpediX" side-by-side)
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <ExpediXLogoMark size={markSize} theme={theme} />
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5">
          <span className={`font-heading font-black tracking-tight leading-none ${textClass} ${expedColor}`}>
            Expedi<span className={xColor}>X</span>
          </span>
          {badge && (
            <span
              className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.2 rounded ${
                theme === 'dark'
                  ? 'bg-sky-400/20 text-sky-200 border border-sky-400/30'
                  : 'bg-sky-50 text-polar-blue border border-sky-200'
              }`}
            >
              {badge}
            </span>
          )}
        </div>
        {showTagline && (
          <span className={`font-medium tracking-tight mt-0.5 ${taglineClass} ${tagColor}`}>
            Smarter Expeditions. Greater Discovery.
          </span>
        )}
      </div>
    </div>
  );
};

export default ExpediXLogo;
