import React from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "../ui/card";
import { ACCESS_CATEGORIES } from "@/app/(admin)/admin/access/Access";
import { Construction, DiamondPercent, Scale, ScreenShare } from "lucide-react";

const AccessCategoryCard = ({
  category,
  onClick,
}: {
  category: ACCESS_CATEGORIES;
  onClick: (category: ACCESS_CATEGORIES) => void;
}) => {
  return (
    <motion.div className="cursor-pointer" onClick={() => onClick(category)}>
      <Card className="text-center h-full hover:shadow-xl transition-all duration-300 group">
        <CardContent className="pt-8 items-center flex flex-col justify-center">
          {category === ACCESS_CATEGORIES.legal ? (
            <Scale size={200} />
          ) : category === ACCESS_CATEGORIES.communications ? (
            <ScreenShare size={200} />
          ) : category === ACCESS_CATEGORIES.marketing ? (
            <DiamondPercent size={200} />
          ) : category === ACCESS_CATEGORIES.projectManagement ? (
            <Construction size={200} />
          ) : (
            ""
          )}
          <p className="text-gray-600 mb-6 text-lg leading-relaxed mt-4 font-bold">
            {category}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AccessCategoryCard;
