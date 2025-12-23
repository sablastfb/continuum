// Dotted line icon
export const DottedLine = ({
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
      <path
          d="M2 12 Q 8 8, 12 12 T 22 12"
          strokeDasharray="0.5 2.5"
          fill="none"
          transform="rotate(30 12 12)"
      />
    </svg>
);

// Dashed line icon
export const DashedLine = ({
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
      <path
          d="M2 12 Q 8 8, 12 12 T 22 12"
          strokeDasharray="4 2"
          fill="none"
          transform="rotate(45 12 12)"
      />
    </svg>
);

// Solid line icon
export const SolidLine = ({
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
      <path
          d="M2 12 Q 8 8, 12 12 T 22 12"
          fill="none"
          transform="rotate(45 12 12)"
      />
    </svg>
);