export const metadata = {
  title: { default: "Admin", template: "%s | Admin" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }) {
  return <div className="flex min-h-full flex-1 flex-col bg-[#faf8f5]">{children}</div>;
}
