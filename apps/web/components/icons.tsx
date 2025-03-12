type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  pin: (props: IconProps) => (
    <svg
      width="128"
      height="128"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 2c-4.2 0-8 3.22-8 8.2c0 3.18 2.45 6.92 7.34 11.23c.38.33.95.33 1.33 0C17.55 17.12 20 13.38 20 10.2C20 5.22 16.2 2 12 2zm0 10c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2z" />
      <circle cx="12" cy="10" r="2" fill="white" />
    </svg>
  ),
};
