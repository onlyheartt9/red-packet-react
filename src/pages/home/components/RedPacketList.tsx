import { useAttendPacket } from "@/server/redPacketServer";
import { Button } from "@nextui-org/react";

export const RedPacketList = () => {
  const { write } = useAttendPacket();
  const onCreatePacket = ()=>{
    write({
      args:[]
    })
  }
  return (
    <div>
      <div className="mr-16 flex flex-row-reverse">
        <Button className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" onClick={onCreatePacket}>
          创建红包
        </Button>
      </div>
      <div></div>
    </div>
  );
};
