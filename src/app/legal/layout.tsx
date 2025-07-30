import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mediloon online pharmacy Store",
    description: "Premium online pharmacy for Germany",
};

export default function LegalLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <div className="flex flex-col bg-white max-w-[1280px] mx-auto min-h-screen">
            <main className="flex-1">{children}</main>
        </div >

    );
}