import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-205.25! flex items-center  justify-center bg-linear-to-br bg-white px-4 overflow-hidden">
      <div className="bg-[#ffffffa5] shadow-2xl shadow-[#8f5c25] rounded-2xl p-10 text-center max-w-md w-full">
        <img src="/logo.svg" alt="Logo" className="mx-auto w-28 mb-6" />
        <h1 className="text-6xl font-bold text-[#bf7a30] mb-4">404</h1>
        <p className="text-[#bf7a30] mb-6 text-lg"> Bunday Sahifa Topilmadi </p>
        <Link to="/" className="inline-block bg-[#8f5c25] text-[#ffffffa5] px-6 py-3 rounded-lg shadow-md hover:bg-[#6c3e0c] transition duration-300" > Bosh sahifaga qaytish</Link>
      </div>
    </div>
  );
};

export default NotFound;