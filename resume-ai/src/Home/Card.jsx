import { FaReact, FaPencilAlt, FaShare } from "react-icons/fa";

const Card = ({ title, desc, iconName }) => {
  return (
    <div className="h-[30vh] w-[25vw] shadow-xl flex justify-center flex-col items-center py-6 px-4 rounded-xl gap-2">
      <div className="justify-self-start self-start">
        {
          iconName === "react" ? <FaReact size={"40px"} /> :
          iconName === "pen" ? <FaPencilAlt size={"40px"} /> :
          iconName === "share" ? <FaShare size={"40px"} /> :
          null
        }
      </div>

      <div>
        <h1 className="font-bold text-2xl">{title}</h1>
      </div>

      <div>
        <p className="text-gray-400 text-center text-sm font-semibold">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default Card;
