import { redPacketAbi } from "@/abi/redPacketAbi";
import { dealConstractData } from "@/utils/indes";
import { parseUnits } from "ethers";
import { useState } from "react";
import {
  useContractRead as useContractRead_wagmi,
  useContractWrite as useContractWrite_wagmi,
  useWalletClient,
} from "wagmi";

export const RED_PACKET_ADDRESS = "0xa3ae85342e3836A2d5852F45CFCfACA0C7F6E91A";

// const ConversionMethod = {
//     'Number':Number,
//     // "RedPacket":RedPacketClass()
// }

// read公共方法
export const useContractRead = ({ ...params }) => {
  const [data, setData] = useState<any>();

  useContractRead_wagmi({
    ...params,
    onSuccess(data) {
      setData(dealConstractData(data));
    },
  });
  return [data];
};

// export const useGetBalance = () => {
//   const { data: walletClient } = useWalletClient();
//   return useContractRead({
//     address: RED_PACKET_ADDRESS,
//     abi: redPacketAbi,
//     functionName: "getBalance",
//     args: [],
//     account: walletClient?.account,
//   });
// };

// 获取当前用户押金
export const useGetDeposit = () => {
  const { data: walletClient } = useWalletClient();
  parseUnits;
  return useContractRead({
    address: RED_PACKET_ADDRESS,
    abi: redPacketAbi,
    functionName: "getDeposit",
    args: [],
    account: walletClient?.account,
    valueType: "number",
    watch: true,
  });
};

// 获取指定红包信息
export const useGetPacket = () => {
  const { data: walletClient } = useWalletClient();
  return useContractRead({
    address: RED_PACKET_ADDRESS,
    abi: redPacketAbi,
    functionName: "getPacket",
    args: [],
    account: walletClient?.account,
  });
};

// 获取所有红包信息
export const useGetPackets = () => {
  return useContractRead({
    address: RED_PACKET_ADDRESS,
    abi: redPacketAbi,
    functionName: "getPackets",
    args: [],
  });
};

// 添加押金
export const useAddDeposit = () => {
  return useContractWrite_wagmi({
    address: RED_PACKET_ADDRESS,
    abi: redPacketAbi,
    functionName: "addDeposit",
  });
};

// 参加红包
export const useAttendPacket = () => {
  return useContractWrite_wagmi({
    address: RED_PACKET_ADDRESS,
    abi: redPacketAbi,
    functionName: "attendPacket",
  });
};
// 创建红包
export const useCreatePacket = () => {
  return useContractWrite_wagmi({
    address: RED_PACKET_ADDRESS,
    abi: redPacketAbi,
    functionName: "createPacket",
  });
};
// 提取小钱钱
export const useWithdrawContractBalance = () => {
  return useContractWrite_wagmi({
    address: RED_PACKET_ADDRESS,
    abi: redPacketAbi,
    functionName: "withdrawContractBalance",
  });
};
