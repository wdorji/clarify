"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ImagesContext } from "./imagesContextProvider";
import { uploadImage, getDownloadURL } from "../../storage";
import { GrDocumentUpload } from "react-icons/gr";
import { IoEyeOutline } from "react-icons/io5";

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
  Image,
  HStack,
} from "@chakra-ui/react";

export default function UploadWidget() {
  const [files, setFiles] = useState<File[]>([]);
  const { images, setImages } = useContext(ImagesContext);

  const session = useSession();
  const router = useRouter();

  const handleUploadedFiles = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files.length + files.length > 5) {
        alert("Please upload a maximum of 5 separate images");
      } else {
        try {
          setFiles([...files, ...Array.from(e.target.files)]);
          setImagePreview(e.target.files[0]);
        } catch (err) {
          toast.error("Error processing your images");
        }
      }
    }
  };

  const [imagePreview, setImagePreview] = useState<File | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleImagePreview = (selectedImage: File) => {
    setImagePreview(selectedImage);
    onOpen();
  };

  const handleImageItemDelete = () => {
    setFiles(files.filter((fileItem) => fileItem.name !== imagePreview?.name));
    onClose();
  };

  const [isSecondModalOpen, setIsOpen] = useState(false);

  const onSecondModalClose = () => {
    // Your additional code here, for example, clearing form data or triggering some other action.
    handleImagesUpload();

    if (fileTitle === "") {
      setFileTitle("Untitled_document");
    }
    // Close the modal
    setIsOpen(false);
  };

  const [fileTitle, setFileTitle] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileTitle(event.target.value);
  };

  const handleImagesUpload = async () => {
    const notification = toast.loading("Uploading documents");
    const buckets: string[] = [];
    const imgUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const bucket = await uploadImage(files[i], session?.data?.user?.email);

      buckets.push(bucket);

      const imgUrl = await getDownloadURL(bucket);

      imgUrls.push(imgUrl);
    }

    setImages({
      fileName: fileTitle,
      imageUrls: imgUrls,
      imageBuckets: buckets,
    });

    toast.success("Documents uploaded successfully!", {
      id: notification,
    });

    router.replace("/sort");
  };

  return (
    <div className="justify-center items-center ">
      <div className="h-90 w-90 p-3 flex flex-col justify-center items-center bg-white border-[2px] space-x-2 border-black rounded-md milder__box__shadow mb-6">
        <VStack spacing={20}>
          <GrDocumentUpload size={170} />
          <div className=" flex items-center justify-center space-x-2 border-[2px] border-dashed border-black rounded-md p-1 cursor-pointer hover:bg-[#d3d3d3] transition-[0.5s] ">
            <span className="absolute text-sm truncate">Upload files here</span>
            <input
              type="file"
              className="opacity-0"
              name="file"
              multiple
              id="file"
              accept="image/jpg, image/png"
              onChange={(e) => handleUploadedFiles(e)}
            />
          </div>
        </VStack>
      </div>
      {files.length > 0 ? (
        <VStack spacing={7}>
          <div className="border-[2px] border-black p-5">
            <>
              <Modal isOpen={isSecondModalOpen} onClose={onSecondModalClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Name this document</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <input
                      type="text"
                      id="fileInput"
                      value={fileTitle}
                      className="border-[2px]"
                      onChange={handleChange}
                      onKeyDown={(e) => {
                        if (e.key == "Enter") {
                          onSecondModalClose();
                        }
                      }}
                    />
                  </ModalBody>
                </ModalContent>
              </Modal>
            </>
            <>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>{imagePreview?.name}</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Image
                      alt={imagePreview?.name}
                      src={URL.createObjectURL(imagePreview!)}
                    />
                  </ModalBody>

                  <ModalFooter>
                    <Button variant="ghost" onClick={handleImageItemDelete}>
                      Delete
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>

            <HStack>
              {files.map((singleImg) => (
                <div className="container" key={singleImg.name}>
                  <Image
                    alt={singleImg.name}
                    boxSize="100px"
                    objectFit="cover"
                    src={URL.createObjectURL(singleImg)}
                  />
                  <div className="j p-20">
                    <button
                      onClick={() => {
                        handleImagePreview(singleImg);
                      }}
                    >
                      <IoEyeOutline color="white" />
                    </button>
                  </div>
                </div>
              ))}
            </HStack>
          </div>
          <div
            className="w-40 flex items-center justify-center space-x-2 border-[2px] border-black rounded-md p-1 cursor-pointer hover:bg-[#d3d3d3] transition-[0.5s]"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <span className="text-black text-base font-semibold">
              Upload Images
            </span>
          </div>
        </VStack>
      ) : (
        <></>
      )}
    </div>
  );
}
