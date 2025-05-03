import ModeToggle from "./ModeToggle";

export default function NavBar() {
  return (
    <nav className="flex-between">
      <ModeToggle />
      <h1 className="text-dark-100 dark:text-light-900 text-4xl font-space-grotesk font-semibold">
        DevOverflow
      </h1>
    </nav>
  );
}
