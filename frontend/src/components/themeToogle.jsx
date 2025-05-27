import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../slices/ThemeSlice"; // ✅ import the correct action

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode); // ✅ return value properly

  return (
    <button
      onClick={() => dispatch(toggleTheme())} // ✅ call the correct action
      className="text-sm underline text-blue-600 dark:text-yellow-400 hover:opacity-80 transition"
    >
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
}
