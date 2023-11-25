"use client";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { DocumentContext } from "./documentContextProvider";
import { uploadImage, getDownloadURL } from "../../storage";
import { GrDocumentUpload } from "react-icons/gr";
import SortableList, { SortableItem } from "react-easy-sort";
import { IoEyeOutline } from "react-icons/io5";

import {
  postOCR,
  makeCheckRequest,
  makeGrammarRequest,
  addDocRequest,
  getDocRequest,
} from "../global/httpRequestsUtils";
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
} from "@chakra-ui/react";
import { performRecognition } from "../global/httpRequestsUtils";
import { arrayMoveImmutable, arrayMoveMutable } from "array-move";
import { ImagesContext } from "./imagesContextProvider";

interface OCRResponse {
  regions: {
    lines: {
      words: {
        text: string;
      }[];
    }[];
  }[];
}

export default function SortBar() {
  const session = useSession();
  const router = useRouter();
  const { documentId, setDocumentId } = useContext(DocumentContext);

  const { images, setImages } = useContext(ImagesContext);
  const [files, setFiles] = useState<string[]>(images.imageUrls);

  const [imagePreview, setImagePreview] = useState("");

  const handleSubmitOrder = async () => {
    const notification = toast.loading("Processing document");

    try {
      let completeText = "";

      for (let i = 0; i < files.length; i++) {
        const lines = (await performRecognition(files[i])).response_text;

        completeText += lines;
      }

      const docId = await addDocRequest({
        textContent: completeText,
        imageBucket: images.imageBuckets,
        userEmail: session.data?.user?.email!,
        date: new Date(),
        imageUrl: files,
        textName: images.fileName,
        palmRes: "",
        grammarPrompt: "",
        question: "",
        refAnswer: "",
      });

      setDocumentId(docId.response_text);

      toast.success("Document processed successfully!", {
        id: notification,
      });

      router.replace("/choice");
    } catch (err) {
      toast.error("Error processing your images");
    }
  };

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setFiles((array) => arrayMoveImmutable(array, oldIndex, newIndex));
  };

  const handleImagePreview = (selectedImage: string) => {
    setImagePreview(selectedImage);
    onOpen();
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="justify-center items-center ">
      <VStack spacing={7}>
        <div className="border-[2px] border-black p-5">
          <SortableList
            onSortEnd={onSortEnd}
            className="user-select:none flex flex-start"
          >
            <>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalCloseButton />
                  <ModalBody>
                    <Image alt={imagePreview} src={imagePreview} />
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>

            {files.map((singleImgUrl) => (
              <SortableItem key={singleImgUrl}>
                <div className="container">
                  <VStack>
                    <Image
                      alt={singleImgUrl}
                      boxSize="100px"
                      objectFit="cover"
                      src={singleImgUrl}
                    />
                    <div className="j p-20 ">
                      <button
                        onClick={() => {
                          handleImagePreview(singleImgUrl);
                        }}
                      >
                        <IoEyeOutline color="white" />
                      </button>
                    </div>
                    <span>{files.indexOf(singleImgUrl) + 1}</span>
                  </VStack>
                </div>
              </SortableItem>
            ))}
          </SortableList>
        </div>
        <div
          className="w-40 flex items-center justify-center space-x-2 border-[2px] border-black rounded-md p-1 cursor-pointer hover:bg-[#d3d3d3] transition-[0.5s]"
          onClick={handleSubmitOrder}
        >
          <span className="text-black text-base font-semibold">
            Submit Page Order
          </span>
        </div>
      </VStack>
    </div>
  );
}
