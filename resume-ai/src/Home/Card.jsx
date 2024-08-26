import { FaReact, FaPencilAlt, FaShare } from "react-icons/fa";

const Card = ({ title, desc, iconName }) => {
  return (
    <div className="h-[25vh] w-[90vw] md:h-[30vh] md:w-[25vw] shadow-xl flex justify-center flex-col items-center py-6 px-4 rounded-xl gap-2">
      <div className="self-start">
        {iconName === "react" ? (
          <FaReact size={"30px"} md:size={"40px"} />
        ) : iconName === "pen" ? (
          <FaPencilAlt size={"30px"} md:size={"40px"} />
        ) : iconName === "share" ? (
          <FaShare size={"30px"} md:size={"40px"} />
        ) : null}
      </div>

      <div>
        <h1 className="font-bold text-lg md:text-2xl">{title}</h1>
      </div>

      <div>
        <p className="text-gray-400 text-center text-sm md:text-base font-semibold">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default Card;
