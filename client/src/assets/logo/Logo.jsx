const Logo = ({ size = 48 }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
      }}
      className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 shadow-lg shadow-blue-500/30"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size * 0.55}
        height={size * 0.55}
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 21s-6-4.35-9-8.5A5.5 5.5 0 0 1 12 5a5.5 5.5 0 0 1 9 7.5C18 16.65 12 21 12 21z" />
        <path d="M12 8v8" />
        <path d="M8 12h8" />
      </svg>
    </div>
  );
};

export default Logo;