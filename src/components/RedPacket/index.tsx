import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import "./style.module.scss";
import { RedPacketType } from "@/types/intex";
import { useAccount } from "wagmi";
type RedPacketProps = {
  data: RedPacketType;
};

type statusType = "Completed" | "In_Progress" | "Not_Participated";

const StateComponents = ({ status }: { status: statusType }) => {
  const publicClass = {
    Background: "w-20 p-1 px-2  bg-zinc-100/40 rounded-full flex flex-row",
    Status_Ball: "w-2 h-2 self-center rounded-full",
    Text: "basis-3/4 text-white/50 h-4 align-middle font-normal",
  };

  const Config = {
    Completed: { ballColor: "bg-[#FFE0B3]", text: "已完成" },
    In_Progress: { ballColor: "bg-[#25FE15]", text: "进行中" },
    Not_Participated: { ballColor: "bg-[#2CA6FF]", text: "未参与" },
  };

  const conf = Config[status];

  return (
    <div className={publicClass.Background}>
      <div className={publicClass.Status_Ball + " " + conf.ballColor}></div>
      <div className={publicClass.Text}>{conf.text}</div>
    </div>
  );
};

const ContextComponent = ({
  status,
  message = {},
}: {
  status: statusType;
  message: RedPacketType;
}) => {
  return (
    <>
      {status === "Not_Participated" && (
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>您未参与这个红包活动</ModalHeader>
              <ModalBody>
                <p>点击'参与活动'按钮，即可参与新一轮抢红包活动🎉！</p>
              </ModalBody>
              <ModalFooter>
                <Button className="bg-[#FE3F21] text-white" onPress={onClose}>
                  参与活动
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      )}
      {status !== "Not_Participated" && (
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>红包详情</ModalHeader>
              <ModalBody>
                <p>
                  开始时间:{" "}
                  {message?.startTime
                    ? new Date(message?.startTime).toLocaleString()
                    : "Not Data"}
                </p>
                <p>红包金额: {message?.amount ?? 0}</p>
                <p>代币类型：{message?.collectType ?? ""}</p>
                <p>发起人： {message?.creator ?? "none"}</p>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      )}
    </>
  );
};

function RedPacket({ data }: RedPacketProps) {
  const status: statusType = "Not_Participated";
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { address: currentAddress } = useAccount();
  const mockData = data;
  // const mockData: RedPacketType = {
  //   id: 1,
  //   startTime: 2131323132131,
  //   amount: 8.88,
  //   collectType: "usdc",
  //   lock: false,
  //   currentTimes: 2,
  //   times: 10,
  //   limit: 15,
  //   users: ["0x1212323123312312313", "0x12123131323123"],
  //   creator: "0x123123123123132131232",
  //   currentUser: "0x666666a6a666a66a6a66",
  //   exist: true,
  //   requestId: 659284,
  // };

  const Message = [
    {
      id: 1,
      title: "参与次数",
      current: mockData?.currentTimes,
      total: mockData?.times,
    },
    {
      id: 2,
      title: "参与人数",
      current: mockData?.users?.length,
      total: mockData?.limit,
    },
  ];

  const onClick = () => {
    if (mockData.users.includes(currentAddress as string)) {
      alert("你已经参加了");
      return;
    }
    onOpen();
  };

  return (
    <>
      <div
        className="h-[490px] w-[330px] rounded-[60px]  bg-cover bg-center transition-all hover:scale-105 "
        style={{ backgroundImage: "url(/img/packet-bgd.png)" }}
        onClick={() => {
          onOpen();
        }}
      >
        <Button
          className="h-full w-full flex flex-col bg-transparent items-start px-16 pb-40"
          disableRipple
          disableAnimation
          onClick={onClick}
        >
          <StateComponents status={status} />
          <div className=" flex flex-col mt-14">
            {Message.map((item) => (
              <p
                className="my-2 text-[#FFE0B3] text-lg font-bold"
                key={item.id}
              >
                {item.title} : {item.current}/{item.total}
              </p>
            ))}
          </div>
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ContextComponent status={status} message={mockData} />
        </Modal>
      </div>
    </>
  );
}

export default RedPacket;
