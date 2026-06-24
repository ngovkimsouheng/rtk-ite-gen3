"use client";
import { useState } from "react";
import { columns } from "@/components/tables/Columns";
import { DataTable } from "@/components/tables/TableComponent";
import { ViewProductDetail } from "@/components/ui/view-detail-product";
import {
  useDeleteProductByUuidMutation,
  useGetAllProductQuery,
  useUpdateProductMutation,
} from "@/services/ecommerce";
import { access } from "fs";
import toast from "react-hot-toast";
export default function DataTablePage() {
  const { data } = useGetAllProductQuery({
    page: 0,
    size: 10000,
  });
  const tableData = Array.isArray(data?.content) ? data?.content : [];

  const [selectedUuid, setSelectedUuid] = useState<string | null>(null);

  const updateProduct = {
    name: "ng men rtk",
    description:
      "The latest iPhone featuring the A18 Pro chip, titanium design, and advanced camera system.",

    stockQuantity: 50,

    priceIn: 950,
    priceOut: 1199,

    discount: 10,

    color: [
      {
        color: "Black Titanium",
        images: [
          "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800",
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
        ],
      },
      {
        color: "White Titanium",
        images: [
          "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800",
          "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=800",
        ],
      },
    ],

    thumbnail:
      "https://i.pinimg.com/736x/d4/30/80/d43080ee7ffcd34e8208c2fc6447b180.jpg",

    warranty: "1 Year Official Warranty",

    availability: true,

    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800",
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=800",
    ],

    categoryUuid: "6abd6b9a-8b9a-4613-bc2d-42686156a313",

    supplierUuid: "7dd85516-733b-4d47-a445-583c225fb833",

    brandUuid: "c273f461-4492-4f00-9d69-8e12d0dd9d8b",
  };
  const [updateProductByUUID] = useUpdateProductMutation();
  const [deleteProductByUUID] = useDeleteProductByUuidMutation();

  // const handleDeleteProductByUUID = () => {
  //   deleteProductByUUID({
  //     uuid: selectedUuid,
  //     accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  //   });
  // };

  // const handleUpdateProductByUUID = () => {
  //   console.log(selectedUuid);
  //   updateProductByUUID({
  //     uuid: selectedUuid,
  //     accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  //     updateProduct: JSON.stringify(updateProduct),
  //   });
  // };
  const handleUpdateProductByUUID = async (uuid: string) => {
    try {
      await updateProductByUUID({
        uuid,
        accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
        updateProduct,
      }).unwrap();

      toast.success("Product updated successfully");
    } catch (error) {
      toast.error("Failed to update product");
    }
  };
  const handleDeleteProductByUUID = async (uuid: string) => {
    try {
      await deleteProductByUUID({
        uuid,
        accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      }).unwrap();

      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };
  const handleViewDetail = (uuid: string) => {
    setSelectedUuid(uuid);
  };

  const handleClose = () => {
    setSelectedUuid(null);
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns({
          onViewDetail: handleViewDetail,
          handleDeleteProductByUUID: handleDeleteProductByUUID,
          handleUpdateProductByUUID: handleUpdateProductByUUID,
        })}
        data={tableData}
      />

      {/* Modal */}
      {selectedUuid && (
        <ViewProductDetail
          uuid={selectedUuid}
          open={true}
          onOpenChange={(open) => {
            if (!open) handleClose();
          }}
        />
      )}
    </div>
  );
}
