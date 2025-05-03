const skillClass =
  "text-xl sm:text-3xl lg:text-2xl w-full sm:w-[45%] lg:w-1/4 p-3 m-2 text-center border-2 rounded-2xl " +
  "hover:bg-[var(--hover-color)] hover:border-[var(--hover-color)] hover:text-[var(--foreground)] " +
  "transition-transform duration-200 transform hover:scale-110";

export default function Skills() {
  return (
    <div className="flex flex-wrap justify-center items-center px-4 lg:px-32 py-6">
      <div className={skillClass}>Developer</div>
      <div className={skillClass}>Next.js</div>
      <div className={skillClass}>RUST</div>
      <div className={skillClass}>QA Automation</div>
      <div className={skillClass}>Programming</div>
    </div>
  );
}
