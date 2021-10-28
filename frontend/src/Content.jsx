import { useUserUpdate } from "./context/UserContext";

export const Content = () => {
  const toggleUser = useUserUpdate();

  return (
    <div className="bg-gray-700 grid place-items-center h-screen">
      <div className="text-yellow-500 text-4xl text-center">Hidden Gems</div>
      <button onClick={toggleUser}>login log out</button>
    </div>
  );
};
