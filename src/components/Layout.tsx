import { ConnectButton } from "@rainbow-me/rainbowkit";

function Layout({ children }) {
  return (
    <div>
      <header>
        {/* 放置全局头部内容 */}
        <ConnectButton></ConnectButton>
      </header>
      <main>{children}</main>
      <footer>{/* 放置全局底部内容 */}</footer>
    </div>
  );
}

export default Layout;
