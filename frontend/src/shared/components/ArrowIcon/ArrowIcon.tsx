type Direction = "up" | "down" | "left" | "right";

interface ArrowIconProps {
  direction: Direction;
}

const rotationDegrees = {
  up: 0,
  right: 90,
  down: 180,
  left: 270,
};

function ArrowIcon({ direction }: ArrowIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="25"
      viewBox="0 0 21 20"
      fill="none"
      style={{
        transform: `rotate(${rotationDegrees[direction]}deg)`,
      }}
      role="img"
      aria-label="방향"
    >
      <path
        d="M5.79199 7.5L10.792 12.5L15.792 7.5"
        stroke="#8a8a8a"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ArrowIcon;
