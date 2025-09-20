import { Accordion, AccordionDetails, AccordionSummary, Box, Container } from "@mui/material";

const CategoryAccordions = ({ faqs }: { faqs: BrandModel["faqs"] }) => {
  return (
    <Box sx={{ mb: { lg: "10px", xs: 0 }, mt: { md: 6.5, sm: 4, xs: 0 } }}>
      <Box
        className="products_accordion"
        sx={{
          "& > .Mui-expanded": {
            borderColor: "primary.main",
          },
          "& > *": {
            transition: "border 0.2s",
            borderColor: "background.element",
            borderRadius: "0px !important",
          },
          px: { lg: "40px", xs: "0px" }
        }}
      >
        {faqs?.map((faq) => <Accordion
          sx={{
            boxShadow: "none",
            position: "unset",
            borderRight: "4px solid",
            borderColor: "background.main",
          }}
        >
          <AccordionSummary
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              backgroundColor: "background.element",
              backdropFilter: "blur(1px)",
              color: "text.content",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            {faq?.question}
          </AccordionSummary>
          <AccordionDetails
            sx={{
              backgroundColor: "background.secondary",
              fontSize: { md: "16px", xs: "13px" },
              fontWeight: "400",
              lineHeight: 2,
              pt: { lg: 1, xs: "10px" },
              pb: { lg: 4, xs: "10px" },
              color: "text.main"
            }}
          >
            {faq?.answer}
          </AccordionDetails>
        </Accordion>)}
      </Box>
    </Box>
  );
};

export default CategoryAccordions;
