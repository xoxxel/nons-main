import { Box, Typography } from "@mui/material";
import ShopProfile from "./shopProfile";
import ShareAndChatButtons from "./actionButtons";

const ShopMenu = ({shop}:{shop:ShopModel}) => {
  return (
    <Box
      sx={{
        width: "100%",
        p: "15px",
        bgcolor: {md:"background.element",xs:"transparent"},
        border: {md:"0.5px solid",xs:"none"},
        borderColor: {md:"border.secondary",xs:"none"},
        borderRadius: "12px",
        mb:"10px",
      }}
    >
      <ShopProfile shop={shop} />
      {/* score products and posts */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          width: "100%",
          color: "text.content",
          mt: 3,
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography sx={{ fontSize: "13px", fontWeight: "900" }}>
            {shop?.score}
          </Typography>
          <Typography sx={{ fontSize: "13px", fontWeight: "400" }}>
            امتیاز
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography sx={{ fontSize: "13px", fontWeight: "900" }}>
            {shop?.product_count}
          </Typography>
          <Typography sx={{ fontSize: "13px", fontWeight: "400" }}>
            محصول
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography sx={{ fontSize: "13px", fontWeight: "900" }}>
            0
          </Typography>
          <Typography sx={{ fontSize: "13px", fontWeight: "400" }}>
            پست
          </Typography>
        </Box>
      </Box>
      {/* share and chat  */}
        <ShareAndChatButtons shop={shop} />

      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5,mt:2 }}>
        <Box sx={{width:"24px",height:"24px",color:"icon.main"}}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.0913 6.72222H20.0451C20.5172 6.72222 20.7533 6.72222 20.8914 6.82149C21.0118 6.9081 21.0903 7.04141 21.1075 7.18877C21.1272 7.35767 21.0125 7.56403 20.7832 7.97677L19.3624 10.5343C19.2792 10.684 19.2376 10.7589 19.2213 10.8381C19.2069 10.9083 19.2069 10.9806 19.2213 11.0508C19.2376 11.13 19.2792 11.2049 19.3624 11.3545L20.7832 13.9121C21.0125 14.3248 21.1272 14.5312 21.1075 14.7001C21.0903 14.8475 21.0118 14.9808 20.8914 15.0674C20.7533 15.1667 20.5172 15.1667 20.0451 15.1667H12.6135C12.0224 15.1667 11.7268 15.1667 11.501 15.0516C11.3024 14.9504 11.1409 14.7889 11.0397 14.5903C10.9247 14.3645 10.9247 14.0689 10.9247 13.4778V10.9444M7.23021 21.5L3.00799 4.61111M4.59137 10.9444H12.4024C12.9936 10.9444 13.2892 10.9444 13.515 10.8294C13.7136 10.7282 13.8751 10.5667 13.9763 10.3681C14.0913 10.1423 14.0913 9.84672 14.0913 9.25556V4.18889C14.0913 3.59772 14.0913 3.30214 13.9763 3.07634C13.8751 2.87773 13.7136 2.71625 13.515 2.61505C13.2892 2.5 12.9936 2.5 12.4024 2.5H4.64329C3.90596 2.5 3.53729 2.5 3.28514 2.65278C3.06414 2.78668 2.89993 2.99699 2.82363 3.24387C2.73657 3.52555 2.82599 3.88321 3.00483 4.59852L4.59137 10.9444Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        </Box>
        <Typography sx={{fontSize:"14px",color:"text.content"}}>گزارش تخلف</Typography>
      </Box>
    </Box>
  );
};

export default ShopMenu;
