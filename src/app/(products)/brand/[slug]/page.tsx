import { fetchBrandDetailsBySlug, fetchProductsByCategory } from "@/api/data";
import Categories from "@/components/categories";
import { Box } from "@mui/material";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { brand: string };
}): Promise<Metadata> {
  const brand: MetaDataModel = await fetchBrandDetailsBySlug(params?.brand);
  return {
    title: brand?.meta_title,
    description: brand?.meta_description,
    keywords: brand?.meta_keywords?.split(","),
  };
}

const BrandPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const products = await fetchProductsByCategory(
    "",
    params?.slug
  );
  const brand = await fetchBrandDetailsBySlug(params?.slug);
  if (!brand) return notFound()
  return (
    <Box sx={{ mb: 2 }}>
      <Categories
        products={products}
        brand={brand}
      />
    </Box>
  );
};

export default BrandPage;
