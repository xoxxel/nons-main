"use client";

import { Box, Button, Container, Select, Typography } from "@mui/material";
import Image from "next/image";
import CategoryAccordions from "../categoryAccaordions";
import { useState } from "react";

const AboutCategory = ({ brand }: { brand: BrandDetailsModel }) => {
  const [tab, setTab] = useState<"faq" | "guide" | "description">("description");
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const items: { title: string, slug: "faq" | "guide" | "description" }[] = [
    { title: "سوالات متداول", slug: "faq" },
    { title: "راهنمای استفاده", slug: "guide" },
    { title: "توضیحات برند", slug: "description" }
  ]

  return (
    <Container sx={{ mt: { md: 15, xs: 6 } }}>
      <Box
        sx={{
          bgcolor: "background.element",
          borderRadius: "12px",
          p: { md: 3, xs: "15px" },
        }}
      >
        <Box
          sx={{
            width: { lg: "75px", xs: "35px" },
            height: { lg: "75px", xs: "35px" },
            position: "relative",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_SERVER}/${brand?.icon}`}
            fill
            alt={brand?.icon}
          />
        </Box>
        <Typography
          sx={{ color: "text.content", fontSize: { lg: "29px", xs: "21px" }, fontweight: "600", mt: { lg: 1, xs: 2 } }}
        >
          {`درباره برند ${brand?.title_en}`}
        </Typography>
        <Typography
          sx={{ color: "text.secondary", fontSize: { lg: "21px", xs: "14px" }, fontweight: "500", mt: { lg: 0, xs: 1 } }}
        >
          {brand?.title_fa}
        </Typography>
        <Box onClick={() => setOpenDropdown(!openDropdown)} sx={{ userSelect: "none", display: { lg: "none", xs: "flex" }, alignItems: "center", gap: 1.5, width: "100%", borderRadius: "5px", border: "1px solid", borderColor: "border.secondary", mt: 2, p: "9px" }}>
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L7 7L13 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <Typography sx={{
            fontSize: "16px",
            fontWeight: "600",
            color: "text.content",
          }}>{items?.find((i) => i.slug == tab)?.title}</Typography>
        </Box>
        {openDropdown &&
          <Box
            sx={{
              border: "0.5px solid",
              borderColor: "border.main",
              borderRadius: "5px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              gap: 1.5,
              padding: "10px 14px",
              mt: "5px",
            }}
          >
            {/* row */}
            {items?.map((item) => (
              <Box
                onClick={() => { setTab(item.slug); setOpenDropdown(false) }}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
                  p: "10px 7px",
                  bgcolor:
                    items?.find((i) => i.slug == tab)?.slug === item?.slug ? "background.main" : "transparent",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "text.main",
                    userSelect: "none",
                  }}
                >
                  {item?.title}
                </Typography>
                {items?.find((i) => i.slug == tab)?.slug === item?.slug ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.5"
                      y="0.5"
                      width="15"
                      height="15"
                      rx="7.5"
                      fill="#0961DC"
                    />
                    <rect
                      x="0.5"
                      y="0.5"
                      width="15"
                      height="15"
                      rx="7.5"
                      stroke="#0961DC"
                    />
                    <path
                      d="M11.3332 5.5L6.74984 10.0833L4.6665 8"
                      stroke="white"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <Box
                    sx={{
                      width: "16px",
                      height: "16px",
                      border: "0.5px solid",
                      borderRadius: "50px",
                      borderColor: "border.main",
                    }}
                  ></Box>
                )}
              </Box>
            ))}
          </Box>
        }
        <Box
          sx={{
            display: { lg: "flex", xs: "none" },
            justifyContent: "center",
            gap: 1,
            width: "100%",
          }}
        >
          <Button
            onClick={() => setTab("description")}
            sx={{
              px: 3,
              fontWeight: "600",
              bgcolor:
                tab === "description" ? "button.main" : "background.secondary",
              color: tab === "description" ? "white" : "text.content",
              py: 1,
              ":hover": {
                bgcolor:
                  tab === "description"
                    ? "button.main"
                    : "background.secondary",
              },
            }}
          >
            توضیحات برند
          </Button>
          <Button
            onClick={() => setTab("faq")}
            sx={{
              px: 3,
              fontWeight: "600",
              bgcolor: tab === "faq" ? "button.main" : "background.secondary",
              color: tab === "faq" ? "white" : "text.content",
              py: 1,
              ":hover": {
                bgcolor: tab === "faq" ? "button.main" : "background.secondary",
              },
            }}
          >
            سوالات متداول
          </Button>
          <Button
            onClick={() => setTab("guide")}
            sx={{
              px: 3,
              fontWeight: "600",
              bgcolor: tab === "guide" ? "button.main" : "background.secondary",
              color: tab === "guide" ? "white" : "text.content",
              py: 1,
              ":hover": {
                bgcolor:
                  tab === "guide" ? "button.main" : "background.secondary",
              },
            }}
          >
            راهنمای استفاده
          </Button>
        </Box>
        <Box sx={{ mt: { lg: 0, xs: 3 } }}>
          {tab === "description" && (
            <Box
              sx={{
                fontSize: { md: "16px", xs: "13px" },
                lineHeight: 2,
                pt: { lg: 6, xs: 0 },
                pb: { lg: 3, xs: 0 },
                px: { lg: 10, xs: 1 },
                color: "text.main",
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: brand?.text }} />
            </Box>
          )}
          {tab === "faq" && <CategoryAccordions faqs={brand?.faqs} />}
          {tab === "guide" && (
            <Box
              sx={{
                fontSize: { md: "16px", xs: "13px" },
                lineHeight: 2,
                pt: { lg: 6, xs: 0 },
                pb: { lg: 3, xs: 0 },
                px: { lg: 10, xs: 1 },
                color: "text.main",
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: brand?.giude }} />
            </Box>
          )}
        </Box>
      </Box>
    </Container >
  );
};

export default AboutCategory;
