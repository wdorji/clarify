import React, { useContext, useState } from "react";
import { TeacherDocument } from "@/types/TeacherDocument";
import { useRouter } from "next/navigation";
import { DocumentContext } from "./documentContextProvider";
import {
  Button,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { IoEyeOutline } from "react-icons/io5";

interface CheckWidgetProps {
  teacherDocument: TeacherDocument; // Update prop name and type
}

const CheckWidget: React.FC<CheckWidgetProps> = ({ teacherDocument }) => {
  const [imagePreview, setImagePreview] = useState("");

  const router = useRouter();
  const { documentId, setDocumentId } = useContext(DocumentContext);

  const handleDocClick = () => {
    setDocumentId(teacherDocument.textId!);
    router.replace("/result");
  };

  const handleImagePreview = (selectedImage: string) => {
    setImagePreview(selectedImage);
    onOpen();
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="h-50 w-90 p-3 mr-3 flex flex-col border-[2px] border-black justify-between bg-white rounded-md milder__box__shadow mb-6 cursor-pointer hover:scale-[0.98] transition-[0.5s]">
      {/* Top Container */}
      <div className="flex items-center justify-between p-4">
        <span className="text-3xl font-bold text-[#000000] ">
          {teacherDocument.textName}
        </span>
      </div>

      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <Image alt={imagePreview} src={imagePreview} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </>

      <HStack>
        {teacherDocument.imageUrl.map((singleImg) => (
          <div className="container" key={singleImg}>
            <Image
              alt={singleImg}
              boxSize="100px"
              objectFit="cover"
              src={singleImg}
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

      {/* Bottom Container */}
      {teacherDocument.date !== undefined ? (
        <div className="w-full text-xs flex justify-end text-gray-500">
          {teacherDocument.date.toString()}
        </div>
      ) : (
        <></>
      )}

      <div
        className=" flex justify-end  p-1 cursor-pointer hover: transition-[0.5s]"
        onClick={handleDocClick}
      >
        <span className="text-black text-base font-semibold">
          View feedback
        </span>
      </div>
    </div>
  );
};

export default CheckWidget;
