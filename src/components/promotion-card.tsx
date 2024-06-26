import { Card } from "antd";

import ImagePromotion from "./image-promotion";

import { Promotion } from "@/lib/models";

const PromotionCard = ({ promotion }: { promotion?: Promotion }) => {
  if (!promotion) return <></>;
  return (
    <Card title={<div className="card-title">推广</div>}>
      <ImagePromotion promotion={promotion}></ImagePromotion>
    </Card>
  );
};

export default PromotionCard;
