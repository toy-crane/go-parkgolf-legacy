type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  starOutline: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <g data-name="Layer 2">
        <g data-name="star">
          <rect
            width="24"
            height="24"
            transform="rotate(90 12 12)"
            opacity="0"
          />
          <path d="M17.56 21a1 1 0 0 1-.46-.11L12 18.22l-5.1 2.67a1 1 0 0 1-1.45-1.06l1-5.63-4.12-4a1 1 0 0 1-.25-1 1 1 0 0 1 .81-.68l5.7-.83 2.51-5.13a1 1 0 0 1 1.8 0l2.54 5.12 5.7.83a1 1 0 0 1 .81.68 1 1 0 0 1-.25 1l-4.12 4 1 5.63a1 1 0 0 1-.4 1 1 1 0 0 1-.62.18zM12 16.1a.92.92 0 0 1 .46.11l3.77 2-.72-4.21a1 1 0 0 1 .29-.89l3-2.93-4.2-.62a1 1 0 0 1-.71-.56L12 5.25 10.11 9a1 1 0 0 1-.75.54l-4.2.62 3 2.93a1 1 0 0 1 .29.89l-.72 4.16 3.77-2a.92.92 0 0 1 .5-.04z" />
        </g>
      </g>
    </svg>
  ),
  starFilled: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
      fill="#FCD53F"
    >
      <g data-name="Layer 2">
        <g data-name="star">
          <rect
            width="24"
            height="24"
            transform="rotate(90 12 12)"
            opacity="0"
          />
          <path d="M17.56 21a1 1 0 0 1-.46-.11L12 18.22l-5.1 2.67a1 1 0 0 1-1.45-1.06l1-5.63-4.12-4a1 1 0 0 1-.25-1 1 1 0 0 1 .81-.68l5.7-.83 2.51-5.13a1 1 0 0 1 1.8 0l2.54 5.12 5.7.83a1 1 0 0 1 .81.68 1 1 0 0 1-.25 1l-4.12 4 1 5.63a1 1 0 0 1-.4 1 1 1 0 0 1-.62.18z" />
        </g>
      </g>
    </svg>
  ),
  logoFilled: (props: IconProps) => (
    <svg
      width="128"
      height="128"
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M38.6121 81.0665H89.4462L90.7496 72.5332H39.9155L38.6121 81.0665Z"
        fill="#27D51A"
      />
      <path
        d="M119.437 0L115.089 29.8667H107.272L112.121 0H103.536L94.1847 57.6H37.0162C34.059 57.6027 31.1951 58.6429 28.9167 60.5418C26.6384 62.4407 25.0881 65.0797 24.5322 68.0051L22.0556 81.1001C17.7802 81.3302 13.6504 82.7425 10.1196 85.1818C6.58891 87.6212 3.79382 90.9932 2.04127 94.9278C0.288721 98.8624 -0.353509 103.207 0.185099 107.485C0.723707 111.763 2.42232 115.809 5.09443 119.179C7.76655 122.548 11.3088 125.111 15.3323 126.586C19.3558 128.06 23.7049 128.389 27.902 127.537C32.0992 126.685 35.9821 124.685 39.1244 121.756C42.2668 118.827 44.547 115.082 45.7147 110.933H78.9096C88.0987 110.933 96.9786 107.591 103.915 101.52C110.852 95.4502 115.378 87.0609 116.662 77.8963L128 0H119.437ZM23.2966 119.467C20.3641 119.467 17.4976 118.591 15.0594 116.95C12.6211 115.309 10.7208 112.977 9.59857 110.248C8.47638 107.519 8.18276 104.517 8.75485 101.62C9.32694 98.7233 10.739 96.0624 12.8126 93.9739C14.8861 91.8855 17.528 90.4632 20.404 89.887C23.2801 89.3108 26.2613 89.6065 28.9705 90.7368C31.6797 91.8671 33.9953 93.7811 35.6245 96.2369C37.2536 98.6927 38.1232 101.58 38.1232 104.533C38.1188 108.493 36.5553 112.288 33.7757 115.088C30.9961 117.888 27.2275 119.462 23.2966 119.467ZM108.275 76.6846C107.505 82.1893 105.215 87.3653 101.666 91.6227C99.5246 94.1999 96.9725 96.4002 94.114 98.1334C89.5258 100.923 84.2688 102.398 78.9096 102.4H46.4984C46.3022 100.206 45.7979 98.0513 45.0006 96.0001H87.1651L88.4685 87.4667H39.2704C38.8069 87.0266 38.3258 86.6057 37.8272 86.2041C35.6349 84.4353 33.1427 83.0811 30.4713 82.2067L32.7041 70.4001L32.8552 69.6017C33.0404 68.6265 33.5571 67.7469 34.3165 67.1139C35.0759 66.481 36.0305 66.1342 37.0162 66.1334H101.384L105.887 38.4H113.847L108.275 76.6846Z"
        fill="#27D51A"
      />
    </svg>
  ),
  logo: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
      <rect width="256" height="256" fill="none" />
      <line
        x1="208"
        y1="128"
        x2="128"
        y2="208"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <line
        x1="192"
        y1="40"
        x2="40"
        y2="192"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </svg>
  ),
  google: (props: IconProps) => (
    <svg role="img" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
      />
    </svg>
  ),
  apple: (props: IconProps) => (
    <svg role="img" viewBox="0 0 24 24" {...props}>
      <path
        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
        fill="currentColor"
      />
    </svg>
  ),
  kakao: (props: IconProps) => (
    <svg
      width="30"
      height="31"
      viewBox="0 0 30 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="icon_login_kakao">
        <path
          id="Vector"
          d="M15 5.37183C8.78676 5.37183 3.75 9.3885 3.75 14.3432C3.75 17.5466 5.8557 20.3574 9.02322 21.9445C8.8509 22.5456 7.91585 25.8114 7.87864 26.068C7.87864 26.068 7.85625 26.2608 7.97968 26.3343C8.1031 26.4078 8.24827 26.3507 8.24827 26.3507C8.60221 26.3007 12.3527 23.6362 13.0018 23.1735C13.6503 23.2664 14.3181 23.3146 15 23.3146C21.2132 23.3146 26.25 19.2981 26.25 14.3432C26.25 9.3885 21.2132 5.37183 15 5.37183Z"
          fill="#212529"
        />
      </g>
    </svg>
  ),
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
