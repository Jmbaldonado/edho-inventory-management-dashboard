"use client";

import Header from "@/app/(components)/Header";
import { useGetProductsQuery } from "@/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

const columns: GridColDef[] = [
  {
    field: "productId",
    headerName: "ID",
    flex: 1,
    headerClassName: "bg-white",
  },
  {
    field: "name",
    headerName: "Product Name",
    flex: 2,
    headerClassName: "bg-white",
  },
  {
    field: "price",
    headerName: "Price",
    flex: 1,
    type: "number",
    valueGetter: (value, row) => `$${row.price}`,
    headerClassName: "bg-white",
  },
  {
    field: "rating",
    headerName: "Rating",
    flex: 1,
    type: "number",
    valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
    headerClassName: "bg-white",
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    flex: 1,
    type: "number",
    headerClassName: "bg-white",
  },
];

export default function Inventory() {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 30,
    page: 0,
  });

  const {
    data: products,
    isError,
    isLoading,
  } = useGetProductsQuery({
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
  });

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header name="Inventory" />
      <DataGrid
        rows={products.data}
        columns={columns}
        getRowId={(row) => row.productId}
        checkboxSelection
        className="!bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700 px-8"
        pagination
        paginationMode="server"
        rowCount={products.metadata.total_records}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
    </div>
  );
}
