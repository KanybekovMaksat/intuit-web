import { FC } from "react";
import { Mentor } from "./model/types/mentorTypes";
import professiaIcon from "../../../public/tanda/CardMentor/icon/approved.png";
import experienceIcon from "../../../public/tanda/CardMentor/icon/industry.png";
import defaultMentor from "../../../public/tanda/CardMentor/icon/defaultMentor.png";

interface MentorCardProps {
  mentor: Mentor;
}

const MentorCard: FC<MentorCardProps> = ({ mentor }) => (
  <div className="bg-white rounded-3xl p-6 shadow-md hover:-translate-y-2 transition-transform duration-300">
    <img
      src={mentor.image || defaultMentor}
      alt={mentor.name}
      className="w-32 h-32 rounded-full border mx-auto mb-4 object-cover"
    />

    <h3 className="text-[20px] font-semibold text-center my-[10px]">
      {mentor.name}
    </h3>

    <div className="text-[#7b7777] flex justify-center items-center gap-x-[8px] font-[Roboto]">
      <div className="flex items-center bg-gray-100 px-3 py-1 rounded-lg">
        <img src={professiaIcon} alt="Профессия" className="w-5 h-5 mr-2" />
        <span className="text-sm">{mentor.profession}</span>
      </div>

      <div className="flex items-center bg-gray-100 px-3 py-1 rounded-lg">
        <img src={experienceIcon} alt="Опыт" className="w-5 h-5 mr-2" />
        <span className="text-sm">Опыт {mentor.experience}</span>
      </div>
    </div>

    <div className="text-left mb-4 mt-[10px] font-[Roboto]">
      <h4 className="font-semibold mb-2">Преподаватель по:</h4>
      <p className="text-[#7b7777] font-semibold pl-4">{mentor.teacher}</p>
    </div>

    <div className="text-left flex-1">
      <h4 className="font-semibold mb-2">Пройдете темы:</h4>
      <ul className="list-disc pl-6 space-y-1 text-[#7b7777]">
        {mentor.topics.map((topic, index) => (
          <li
            key={index}
            className="text-[16px] font-semibold py-[5px] pl-[5px]"
          >
            {topic}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default MentorCard;
