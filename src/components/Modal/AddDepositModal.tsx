import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { RED_PACKET_ADDRESS } from "@/server/redPacketServer";
import { ethers } from "ethers";
import { useLinkApprove } from "@/server/linkServer";
import { Provider, useStore } from "reto";
import { AddDepositModalStore } from "@/store/addDepositModal.store";

type AddDepositModal = {
  className?: string;
};

// 验证相关逻辑
const useInvalid = ({ value, first }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const validateEmail = () => {
    if (value > 0) {
      return true;
    } else {
      setErrorMessage("金额不可为0");
      return false;
    }
  };

  const isInvalid = React.useMemo(() => {
    if (first) return false;

    return validateEmail() ? false : true;
  }, [value]);

  return { errorMessage, isInvalid };
};

// 授权相关逻辑
const useOk = ({ value, isInvalid }) => {
  const { setApprovalTx, setDepositLoading, setStep } =
    useStore(AddDepositModalStore);
  const { write: writeApprove, data } = useLinkApprove({
    onError: () => {
      setDepositLoading(false);
      setStep("approval");
    },
  });

  const onOk = () => {
    if (isInvalid) {
      return;
    }
    writeApprove({
      args: [RED_PACKET_ADDRESS, ethers.toBigInt(value)],
    });
  };

  useEffect(() => {
    setApprovalTx(data?.hash);
  }, [data?.hash]);

  return { onOk };
};

const AddDepositModal = ({ className }: AddDepositModal) => {
  const {
    value,
    setValue,
    onAddDeposit,
    depositLoading,
    setDepositLoading,
    step,
    setStep,
  } = useStore(AddDepositModalStore);
  const [first, setFirst] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { errorMessage, isInvalid } = useInvalid({ value, first });
  const { onOk } = useOk({ value, isInvalid });

  const onChange = (e) => {
    if (first) {
      setFirst(false);
    }
    setValue(e.target.value);
  };

  return (
    <>
      <Button
        className={`bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full hover:from-blue-600 hover:to-purple-600 hover:text-white  ${className}`}
        onClick={onOpen}
      >
        添加押金
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              {step === "approval" && (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    授权
                  </ModalHeader>
                  <ModalBody className="flex flex-col">
                    <Input
                      type="number"
                      label="Price"
                      min={0}
                      size="lg"
                      placeholder="0.00"
                      labelPlacement="outside"
                      isInvalid={isInvalid}
                      errorMessage={isInvalid && errorMessage}
                      value={value}
                      onChange={onChange}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      取消
                    </Button>
                    <Button
                      onPress={() => {
                        setStep("deposit");
                        setDepositLoading(true);
                        onOk();
                      }}
                    >
                      下一步
                    </Button>
                  </ModalFooter>
                </>
              )}
              {step === "deposit" && (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    添加押金
                  </ModalHeader>
                  <ModalBody className="flex flex-col">
                    转入金额: ({value})
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      isLoading={depositLoading}
                      onPress={() => {
                        onAddDeposit();
                        setStep("approval");
                        onClose();
                        // message
                      }}
                    >
                      确认
                    </Button>
                  </ModalFooter>
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default (props: AddDepositModal) => {
  return (
    <Provider of={AddDepositModalStore}>
      <AddDepositModal {...props}></AddDepositModal>
    </Provider>
  );
};
