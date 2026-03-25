import { useNavigate } from "react-router-dom";

interface Props {
  name: string;
  curatorName: string;
  fullName: string;
  weekType: string;
}

export const ScheduleDetailTop = ({
  name,
  curatorName,
  fullName,
  weekType,
}: Props) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center justify-between mb-10 lg:flex-col">
      <div className="flex lg:items-start items-center gap-10 lg:mb-4">
        {name && (
          <div className="flex gap-10 sm:flex-col sm:gap-2">
            {name && (
              <div className="mb-2">
                <span className="mb-2">Расписание группы</span>
                <h4 className="text-3xl lg:text-2xl sm:text-xl text-primary font-semibold">
                  {name}
                </h4>
              </div>
            )}
            {curatorName && (
              <div>
                <span className="mb-2">Куратор</span>
                <h4 className="text-3xl lg:text-2xl sm:text-xl text-primary font-semibold">
                  {curatorName}
                </h4>
              </div>
            )}
          </div>
        )}
        {fullName && (
          <div>
            <span className="mb-2">Преподователь</span>
            <h4 className="text-3xl r-lg:text-2xl text-primary font-semibold">
              {fullName}
            </h4>
          </div>
        )}
        <div>
          <span className="mb-2">Это неделя:</span>
          <h4 className="text-3xl lg:text-2xl sm:text-xl text-primary font-semibold">
            {weekType === "top" ? "Числительная" : "Знаменатель"}
          </h4>
        </div>
      </div>
      <button
        onClick={handleGoBack}
        className="py-2.5 px-4 font-semibold text-primary bg-[#F4F4F5] rounded-xl lg:w-full"
      >
        {fullName ? "Сменить преподавателя" : "Сменить группу"}
      </button>
    </div>
  );
};
