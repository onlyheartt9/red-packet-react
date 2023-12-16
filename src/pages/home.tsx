import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useAccount, useConnect, useNetwork } from "wagmi";
import RedPacket from "@/components/RedPacket";
import { useState } from "react";

export default function Home() {
  const aaa = useAccount();
  const bbb = useConnect();
  const ccc = useNetwork();
  console.log(aaa, bbb, ccc);
  return (
    <div>
      <Button>xxxx</Button>
      <div>description</div>
      <div>red pockets</div>
    </div>
  );
}
