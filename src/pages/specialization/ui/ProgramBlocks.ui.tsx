import { Typography, Card, CardContent } from "@mui/material";
import { t } from "i18next";

export default function ProgramBlocks({ skills }) {
  return (
    <div className="my-10">
      <Typography
        variant="h3"
        component="h3"
        className="text-[2.5rem] font-semibold text-[#333] lg:text-[40px] md:!text-[30px] my-5"
      >
        {t("specialization.whatYouWillStudy")}
      </Typography>
      <div className="flex justify-between ">
        <Card className="min-w-[350px] max-w-[350px] hover:shadow-2xl transition-shadow duration-300 border border-gray">
          <CardContent>
            <Typography variant="h5" className="font-bold mb-4">
              Front-End
            </Typography>
            <ul className="list-disc ml-5 space-y-2">
              {skills.map((item, i) => (
                <li key={i} className="text-gray-700">
                  {item.name}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
