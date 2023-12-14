import { ConnectButton } from "@rainbow-me/rainbowkit";

function Layout({ children }) {
  return (
    <div>
      <header className="flex justify-between mx-8 my-4 bg-gradient-to-r from-sky-500  rounded-lg px-8 py-4">
        <h1 className="text-4xl text-red-400 text-center font-semibold">
          RED-POKECT
        </h1>

        {/* 放置全局头部内容 */}
        <ConnectButton></ConnectButton>
      </header>
      <main>{children}</main>
      <footer>{/* 放置全局底部内容 */}</footer>
    </div>
  );
}

export default Layout;
