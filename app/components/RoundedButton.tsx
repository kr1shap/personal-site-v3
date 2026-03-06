interface RoundedButtonProps {
  label: string;
  onClick?: () => void;
}

export default function RoundedButton({ label, onClick }: RoundedButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        inline-flex items-center justify-center
        w-full max-w-58 h-15.25 px-6
        rounded-[2.5rem] border-[3px] border-(--dull-blue)
        bg-(--cream) text-(--dull-grey)
        text-[2.5rem] max-sm:text-[2rem] leading-none
        transition-transform duration-200 ease-out hover:-translate-y-0.5
        shadow-[0_0_9.4px_0_rgba(69,99,149,0.76)]
      `}
    >
      {label}
    </button>
  );
}
