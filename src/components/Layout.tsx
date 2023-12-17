import { useGetDeposit } from "@/server/redPacketServer";
import { Chip } from "@nextui-org/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import AddDepositModal from "./Modal/AddDepositModal";

function Layout({ children }) {
  const [data] = useGetDeposit();
  return (
    <div className="dark">
      <header className="flex justify-between mx-8 mb-4 px-8 py-12">
        <h1 className="text-4xl text-white text-center font-semibold">
          RED-PAKECT
        </h1>

        {/* 放置全局头部内容 */}
        <div className="flex text-white items-center">
          <Chip className="mr-4">当前押金：{data}</Chip>
          <AddDepositModal className="mr-4"></AddDepositModal>
          <ConnectButton showBalance></ConnectButton>
        </div>
      </header>
      <main>{children}</main>
      <footer>{/* 放置全局底部内容 */}</footer>
    </div>
  );
}

export default Layout;
