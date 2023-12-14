import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Style from "./style.less";
type RedPacketProps = {
  isOpen: boolean;
  onOpenChange: (key: boolean) => void;
};

function RedPacket({ isOpen, onOpenChange }: RedPacketProps) {
  return <div className="red-packet"></div>;
}

export default RedPacket;
