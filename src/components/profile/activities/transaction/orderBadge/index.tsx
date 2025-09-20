import OrderModel from "@/models/Order";
import { Box } from "@mui/material";

const OrderBadge = ({ status, orderType }: { status?: OrderModel["status"], orderType?: "sell" | "buy" }) => {
  return (
    <Box
      sx={{
        width: "93px",
        bgcolor:
          status === "completed"
            ? "badge.success"
            : status === "canceled"
              ? "badge.danger"
              : status === "processing" ? "badge.info" : status == "judging" ? "badge.disable" : orderType == "sell" ? "badge.info" : "badge.success",
        textAlign: "center",
        color:
          status === "completed"
            ? "badgeText.success"
            : status === "canceled"
              ? "badgeText.danger"
              : status === "processing" ? "badgeText.info" : status == "judging" ? "badgeText.disable" : orderType == "sell" ? "badgeText.info" : "badgeText.success",
        py: 0.25,
        borderRadius: "5px",
        fontSize: "13px",
        fontWeight: "500",
      }}
    >
      {status === "completed"
        ? "تکمیل شده"
        : status === "canceled"
          ? "لغو شده"
          : status === "processing"
            ? "در حال پردازش"
            : status === "judging" ? "داوری" : status === "waiting" ? (orderType == "sell" ? "در انتظار تسویه" : "تکمیل شده") : "وضعیت نامعلوم"}
    </Box>
  );
};

export default OrderBadge;
