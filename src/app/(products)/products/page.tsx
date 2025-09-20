import { fetchProductsBySearch, fetchProductWittAllFilters } from "@/api/data";
import Card from "@/components/categories/card";
import InfiniteProducts from "@/components/products/infiniteProducts";
import ProductsModel from "@/models/Products";
import { Box, Container, Grid } from "@mui/material";

const ShopPage = async ({
  searchParams,
}: {
  searchParams: {
    q: string;
    category: string;
    brand: string;
    platform: string;
    region: string;
    warranty: string;
    discounted: string;
    auto_sending: string;
    online_shops: string;
    most_favorite: string;
    highestPrice: number,
    lowestPrice: number
  };
}) => {
  const products: ProductsModel = await fetchProductWittAllFilters({
    categories: searchParams?.category || "",
    brands: searchParams?.brand || "",
    search: searchParams?.q || "",
    regions: searchParams?.region || "",
    platforms: searchParams?.platform || "",
    highestPrice: searchParams?.highestPrice || 1000000000,
    lowestPrice: searchParams?.lowestPrice || 0,
    hasGuarantee: searchParams?.warranty === "1",
    discounted: searchParams?.discounted === "1",
    autoSending: searchParams?.auto_sending === "1",
    online_shops: searchParams?.online_shops === "1",
    mostFavorite: searchParams?.most_favorite === "1"
  });

  return (
    <Container>
      <Box
        sx={{
          border: "1px solid",
          borderColor: "background.secondary",
          borderBottom: "0px",
        }}
      >
        <Grid container>
          {products?.results?.map((product, index) => (
            <Grid key={index} item xs={12}>
              <Card product={product} />
              <Box
                sx={{
                  borderTop: "1px solid",
                  borderColor: "background.secondary",
                }}
              ></Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <InfiniteProducts
        searchParams={searchParams}
        pageCount={products?.page_count}
      />
    </Container>
  );
};

export default ShopPage;
