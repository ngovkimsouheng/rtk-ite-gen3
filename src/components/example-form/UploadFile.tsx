// "use client";

// import { Upload, X } from "lucide-react";
// import * as React from "react";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import {
//   FileUpload,
//   FileUploadDropzone,
//   FileUploadItem,
//   FileUploadItemDelete,
//   FileUploadItemMetadata,
//   FileUploadItemPreview,
//   FileUploadItemProgress,
//   FileUploadList,
//   FileUploadTrigger,
// } from "@/components/ui/file-upload";

// import { useUploadFilesMutation } from "@/services/uploadApi";

// type FileUploadFillProgressDemoProps = {
//   onUploaded?: (url: string) => void;
// };

// export function FileUploadFillProgressDemo({
//   onUploaded,
// }: FileUploadFillProgressDemoProps) {
//   const [uploadMutiFiles] = useUploadFilesMutation();
//   const [files, setFiles] = React.useState<File[]>([]);

//   const onUpload = React.useCallback(
//     async (
//       files: File[],
//       {
//         onProgress,
//         onSuccess,
//         onError,
//       }: {
//         onProgress: (file: File, progress: number) => void;
//         onSuccess: (file: File) => void;
//         onError: (file: File, error: Error) => void;
//       },
//     ) => {
//       try {
//         const uploadPromises = files.map(async (file) => {
//           try {
//             const response = await uploadMutiFiles(file).unwrap();

//             console.log("UPLOAD RESPONSE:", response);

//             const imageUrl = response?.[0]?.uri;

//             console.log("IMAGE URL:", imageUrl);

//             if (imageUrl) {
//               onUploaded?.(imageUrl);
//             }

//             // fake progress UI
//             const totalChunks = 10;
//             let uploadedChunks = 0;

//             for (let i = 0; i < totalChunks; i++) {
//               await new Promise((r) =>
//                 setTimeout(r, Math.random() * 200 + 100),
//               );

//               uploadedChunks++;
//               const progress = (uploadedChunks / totalChunks) * 100;
//               onProgress(file, progress);
//             }

//             await new Promise((r) => setTimeout(r, 500));
//             onSuccess(file);

//             return response;
//           } catch (error) {
//             onError(
//               file,
//               error instanceof Error ? error : new Error("Upload failed"),
//             );
//           }
//         });

//         const result = await Promise.all(uploadPromises);
//         console.log("ALL UPLOADS:", result);
//       } catch (error) {
//         console.error("Unexpected error:", error);
//       }
//     },
//     [uploadMutiFiles, onUploaded],
//   );

//   const onFileReject = React.useCallback((file: File, message: string) => {
//     toast(message, {
//       description: `"${file.name}" rejected`,
//     });
//   }, []);

//   return (
//     <FileUpload
//       value={files}
//       onValueChange={setFiles}
//       maxFiles={10}
//       maxSize={5 * 1024 * 1024}
//       className="w-full max-w-md"
//       onUpload={onUpload}
//       onFileReject={onFileReject}
//       multiple
//     >
//       <FileUploadDropzone>
//         <div className="flex flex-col items-center gap-1 text-center">
//           <div className="flex items-center justify-center rounded-full border p-2.5">
//             <Upload className="size-6 text-muted-foreground" />
//           </div>
//           <p className="text-sm font-medium">Drag & drop files here</p>
//           <p className="text-xs text-muted-foreground">
//             Or click to browse (max 10 files, 5MB each)
//           </p>
//         </div>

//         <FileUploadTrigger asChild>
//           <Button variant="outline" size="sm" className="mt-2 w-fit">
//             Browse files
//           </Button>
//         </FileUploadTrigger>
//       </FileUploadDropzone>

//       <FileUploadList orientation="horizontal">
//         {files.map((file, index) => (
//           <FileUploadItem key={index} value={file}>
//             <FileUploadItemPreview className="size-20">
//               <FileUploadItemProgress variant="fill" />
//             </FileUploadItemPreview>

//             <FileUploadItemMetadata className="sr-only" />

//             <FileUploadItemDelete asChild>
//               <Button
//                 variant="secondary"
//                 size="icon"
//                 className="absolute -top-1 -right-1 size-5 rounded-full"
//               >
//                 <X className="size-3" />
//               </Button>
//             </FileUploadItemDelete>
//           </FileUploadItem>
//         ))}
//       </FileUploadList>
//     </FileUpload>
//   );
// }


//platzi file upload
"use client";

import { Upload, X } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadItemProgress,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";

import { useUploadFilesMutation } from "@/services/uploadApi";

type Props = {
  onUploaded?: (url: string) => void;
};

export function FileUploadFillProgressDemo({ onUploaded }: Props) {
  const [uploadFile] = useUploadFilesMutation();
  const [files, setFiles] = React.useState<File[]>([]);

  const onUpload = React.useCallback(
    async (
      files: File[],
      {
        onProgress,
        onSuccess,
        onError,
      }: {
        onProgress: (file: File, progress: number) => void;
        onSuccess: (file: File) => void;
        onError: (file: File, error: Error) => void;
      },
    ) => {
      try {
        const uploadPromises = files.map(async (file) => {
          try {
            const response = await uploadFile(file).unwrap();

            console.log("UPLOAD RESPONSE:", response);


            const imageUrl = response?.location;

            console.log("IMAGE URL:", imageUrl);

            if (imageUrl) {
              onUploaded?.(imageUrl);
            }

            // fake progress UI
            const totalChunks = 10;
            let uploadedChunks = 0;

            for (let i = 0; i < totalChunks; i++) {
              await new Promise((r) =>
                setTimeout(r, Math.random() * 200 + 100),
              );

              uploadedChunks++;
              const progress = (uploadedChunks / totalChunks) * 100;
              onProgress(file, progress);
            }

            await new Promise((r) => setTimeout(r, 500));
            onSuccess(file);

            return response;
          } catch (error) {
            onError(
              file,
              error instanceof Error ? error : new Error("Upload failed"),
            );
          }
        });

        const result = await Promise.all(uploadPromises);
        console.log("ALL UPLOADS:", result);
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    },
    [uploadFile, onUploaded],
  );

  const onFileReject = React.useCallback((file: File, message: string) => {
    toast(message, {
      description: `"${file.name}" rejected`,
    });
  }, []);

  return (
    <FileUpload
      value={files}
      onValueChange={setFiles}
      maxFiles={10}
      maxSize={5 * 1024 * 1024}
      className="w-full max-w-md"
      onUpload={onUpload}
      onFileReject={onFileReject}
      multiple
    >
      <FileUploadDropzone>
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="flex items-center justify-center rounded-full border p-2.5">
            <Upload className="size-6 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium">Drag & drop files here</p>
          <p className="text-xs text-muted-foreground">
            Or click to browse (max 10 files, 5MB each)
          </p>
        </div>

        <FileUploadTrigger asChild>
          <Button variant="outline" size="sm" className="mt-2 w-fit">
            Browse files
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>

      <FileUploadList orientation="horizontal">
        {files.map((file, index) => (
          <FileUploadItem key={index} value={file}>
            <FileUploadItemPreview className="size-20">
              <FileUploadItemProgress variant="fill" />
            </FileUploadItemPreview>

            <FileUploadItemMetadata className="sr-only" />

            <FileUploadItemDelete asChild>
              <Button
                variant="secondary"
                size="icon"
                className="absolute -top-1 -right-1 size-5 rounded-full"
              >
                <X className="size-3" />
              </Button>
            </FileUploadItemDelete>
          </FileUploadItem>
        ))}
      </FileUploadList>
    </FileUpload>
  );
}
