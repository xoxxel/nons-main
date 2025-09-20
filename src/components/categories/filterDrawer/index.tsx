"use client";

import { Box, Button, SwipeableDrawer, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ProductsModel from "@/models/Products";
import { fetchProductWittAllFilters } from "@/api/data";
import FiltersSkeleton from "@/components/skeletons/filtersSkeleton";
import { useRouter } from "next/navigation";

const FilterOptions = dynamic(
  () => import("@/components/categories/filterDrawer/filterOptions"),
  { ssr: false, loading: () => <FiltersSkeleton /> }
);

const FilterDrawer = () => {
  const router = useRouter()
  const [isDrawerOpen, setIsDraweOpen] = useState(false);
  const [isloadOptions, setIsloadOptions] = useState(false);
  const right = useMediaQuery("(min-width:600px)");
  const [filterOptions, setFilterOptions] = useState<CategoRyFiltersModel>({
    categories: [],
    platforms: [],
    brands: [],
    regions: [],
    lowestPrice: 0,
    highestPrice: 10000000001,
    suggestedProducts: false,
    onlineSellers: false,
    autoSendings: false,
    discountedProducts: false,
    productsWithWarranty: false,
  });
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<number[]>([]);
  const [products, setProducts] = useState<ProductsModel>({} as ProductsModel);
  const [loading, setLoading] = useState(true);
  const filterCounts =
    (filterOptions.categories.length > 0 ? 1 : 0) +
    (filterOptions.platforms.length > 0 ? 1 : 0) +
    (filterOptions.brands.length > 0 ? 1 : 0) +
    (filterOptions.regions.length > 0 ? 1 : 0) +
    (selectedBrands.length > 0 ? 1 : 0) +
    (selectedRegions.length > 0 ? 1 : 0) +
    (filterOptions.lowestPrice !== 0 || filterOptions.highestPrice !== 10000000001 ? 1 : 0) +
    (filterOptions.suggestedProducts ? 1 : 0) +
    (filterOptions.onlineSellers ? 1 : 0) +
    (filterOptions.autoSendings ? 1 : 0) +
    (filterOptions.discountedProducts ? 1 : 0) +
    (filterOptions.productsWithWarranty ? 1 : 0);

  useEffect(() => {
    setLoading(true);
    fetchProductWittAllFilters({
      categories: filterOptions.categories?.join(","),
      brands: selectedBrands?.join(","),
      regions: selectedRegions?.join(","),
      search: "",
      platforms: filterOptions?.platforms?.join(","),
      lowestPrice: filterOptions?.lowestPrice,
      highestPrice: filterOptions?.highestPrice,
      hasGuarantee: filterOptions?.productsWithWarranty,
      discounted: filterOptions?.discountedProducts,
      autoSending: filterOptions?.autoSendings,
      mostFavorite: filterOptions?.suggestedProducts,
      online_shops: filterOptions?.onlineSellers
    })
      .then((res) => setProducts(res))
      .catch((err) =>
        console.error("error fetching products in shop filters", err)
      )
      .finally(() => setLoading(false));
  }, [filterOptions, selectedBrands, selectedRegions]);

  const handleApplyFilter = () => {
    const params = new URLSearchParams();

    if (filterOptions.categories.length > 0) {
      params.set('category', filterOptions.categories.join(','));
    }

    if (filterOptions.platforms.length > 0) {
      params.set('platform', filterOptions.platforms.join(','));
    }

    if (selectedRegions.length > 0) {
      params.set('region', selectedRegions.join(','));
    }

    if (selectedBrands.length > 0) {
      params.set('brand', selectedBrands.join(','));
    }

    if (filterOptions.lowestPrice > 0) {
      params.set('lowestPrice', filterOptions.lowestPrice.toString());
    }

    if (filterOptions.highestPrice < 10000000001) {
      params.set('highestPrice', filterOptions.highestPrice.toString());
    }


    const booleanFilterMap: {
      [key in keyof CategoRyFiltersModel]?: string
    } = {
      suggestedProducts: 'most_favorite',
      onlineSellers: 'online_shops',
      autoSendings: 'auto_sending',
      discountedProducts: 'discounted',
      productsWithWarranty: 'warranty'
    };

    const booleanFilters = (Object.keys(booleanFilterMap) as (keyof CategoRyFiltersModel)[]).filter(
      key => booleanFilterMap[key] !== undefined
    );

    booleanFilters.forEach(filter => {
      if (filterOptions[filter]) {
        const queryKey = booleanFilterMap[filter];
        if (queryKey) {
          params.set(queryKey, '1');
        }
      }
    });

    router.push(`/products?${params?.toString()}`)
  };

  return (
    <>
      <Button
        onClick={() => {
          setIsDraweOpen(true);
          setIsloadOptions(true);
        }}
        sx={{
          color: "white",
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          bgcolor: "button.main",
          borderRadius: "7px",
          px: 2,
          py: 1,
          position: "relative",
          fontSize: { md: "16px", xs: "13px" },
          ":hover": {
            bgcolor: "button.main",
          },
        }}
      >
        {/* badge */}
        {filterCounts > 0 && (
          <Box
            sx={{
              width: "19px",
              height: "19px",
              bgcolor: "#FF6B00",
              position: "absolute",
              top: "-7px",
              right: "-7px",
              borderRadius: "50%",
              border: "2px solid",
              borderColor: "background.main",
              fontSize: "13px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              pt: "3px",
              pl: "1px",
            }}
          >
            {filterCounts}
          </Box>
        )}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 6.66663L12.5 6.66663M12.5 6.66663C12.5 8.04734 13.6193 9.16663 15 9.16663C16.3807 9.16663 17.5 8.04734 17.5 6.66663C17.5 5.28591 16.3807 4.16663 15 4.16663C13.6193 4.16663 12.5 5.28591 12.5 6.66663ZM7.5 13.3333L17.5 13.3333M7.5 13.3333C7.5 14.714 6.38071 15.8333 5 15.8333C3.61929 15.8333 2.5 14.714 2.5 13.3333C2.5 11.9526 3.61929 10.8333 5 10.8333C6.38071 10.8333 7.5 11.9526 7.5 13.3333Z"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Box>
        فیلتر
      </Button>
      <SwipeableDrawer
        disableSwipeToOpen
        sx={{
          "& .MuiPaper-root": {
            bgcolor: "background.main",
            borderRadius: right ? "15px 0 0 15px" : "15px 15px 0 0",
            px: 2.5,
            pb: 3.25,
            height: { sm: "100%", xs: "90%" },
            maxHeight: "100vh",
            overflowY: "auto",
            width: right ? "400px" : "100%",
          },
          zIndex: 99999999,
        }}
        anchor={right ? "right" : "bottom"}
        open={isDrawerOpen}
        onClose={() => setIsDraweOpen(false)}
        onOpen={() => setIsDraweOpen(true)}
      >
        {isloadOptions && (
          <FilterOptions
            setIsDraweOpen={setIsDraweOpen}
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            selectedRegions={selectedRegions}
            setSelectedRegions={setSelectedRegions}
            products={products}
            loading={loading}
            handleApplyFilter={handleApplyFilter}
          />
        )}
      </SwipeableDrawer>
    </>
  );
};

export default FilterDrawer;
