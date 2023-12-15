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
type RedPacketProps = {
  isOpen: boolean;
  onOpenChange: (key: boolean) => void;
};

type statusType = "Completed" | "In_Progress" | "Not_Participated";

type packetType = {
   id : number; // id
   startTime : number; // 发起红包时间
   amount : number; // 单个红包金额
   collectType : string; // 红包类型
   lock : boolean; // 红包锁
   currentTimes : number; // 当前次数
   times : number; // 次数限制
   limit : number; // 限制人数
   users : string[]; // 当前参加的人数
   creator : string; // 发起人
   currentUser : string; // 当前需要发红包的人
   exist : boolean; // 是否存在
   requestId : number; // 随机数映射id，方便vrf回调
}

const StateCompoents = ({ status: statusType }) => {
  const publicClass = {
    Background: "w-20 p-1 px-2  bg-zinc-100/40 rounded-full flex flex-row",
    Status_Ball: "w-2 h-2 self-center rounded-full",
    Text: "basis-3/4 text-white/50 text-sm font-normal",
  };
  const ConfigClass = {
    Ball_Color: {
      Completed: "bg-[#FFE0B3]",
      In_Progress: "bg-[#25FE15]",
      Not_Participated: "bg-[#2CA6FF]",
    },
    Text: {
      Completed: "已完成",
      In_Progress: "进行中",
      Not_Participated: "未参与",
    },
  };

  const ballColor = ConfigClass.Ball_Color[statusType];
  const text = ConfigClass.Text[statusType];

  return (
    <div className={publicClass.Background}>
      <div className={publicClass.Status_Ball + " " + ballColor}></div>
      <div className={publicClass.Text}>{text}</div>
    </div>
  );
};

const mockData : packetType = {
  id: 1,
  startTime: 2131323132131,
  amount: 8.88,
  collectType: 'usdc',
  lock: false,
  currentTimes: 2,
  times: 10,
  limit: 15,
  users: ['0x1212323123312312313','0x12123131323123'],
  creator: '0x123123123123132131232',
  currentUser: '0x666666a6a666a66a6a66',
  exist: true,
  requestId: 659284
};

function RedPacket({ isOpen, onOpenChange }: RedPacketProps) {
  const status: statusType = "In_Progress";

  const Message = [
    {id: 1, title:'参与次数', current: mockData.currentTimes , total: mockData.times  },
    {id: 2, title: '参与人数', current: mockData.users.length, total: mockData.limit},
  ]

  return (
    <>
      <div
        className="h-[492pt] w-[332pt] rounded-[60pt]  bg-auto bg-center transition-all hover:scale-105"
        style={{ backgroundImage: "url(/img/packet-bgd.png)" }}
      >
        <Button className="h-full w-full flex p-24 flex-col">
          <StateCompoents status={status} />
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
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}  className="bg-red-50">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>xxxxx</ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  再考虑考虑
                </Button>
                <Button color="danger" onPress={onClose}>
                  参与
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default RedPacket;
