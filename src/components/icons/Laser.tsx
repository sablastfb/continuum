export const Laser = ({ 
  size = 24, 
  strokeWidth = 2, 
  className = "",
  ...props 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {/* Laser beam icon */}
    <path d="M2 12h20" />
    <path d="M18 8l4 4-4 4" />
    <circle cx="4" cy="12" r="2" />
  </svg>
);
