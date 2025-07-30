

import { FooterSection } from './FooterSection';
import { NewsletterSection } from './NewsletterSection';

export const Footer: React.FC = () => {
    const helpFaqLinks = [
        { text: "FAQ", href: "/faq" },
        { text: "Help", href: "/help" },
        { text: "Shipment", href: "/shipment" },
        { text: "Shipping costs", href: "/shipping-costs" },
        { text: "Now! Shipping", href: "/now-shipping" },
        { text: "E-prescription", href: "/e-prescription" },
        { text: "Pharmacovigilance", href: "/pharmacovigilance" },
        { text: "Medical device safety", href: "/medical-device-safety" },
    ];

    const companyLinks = [
        { text: "About Us", href: "/about" },
        { text: "Corporate Website", href: "/corporate" },
        { text: "Retail Media", href: "/retail-media" },
        { text: "Jobs & Careers", href: "/careers" },
        { text: "Become a partner", href: "/partners" },
        { text: "RedPoints", href: "/redpoints" },
        { text: "Our apps", href: "/apps" },
        { text: "Our own brands", href: "/brands" }
    ];

    const legalLinks = [
        { text: "Use and liability", href: "legal/liability" },
        { text: "Terms and Conditions", href: "legal/terms" },
        { text: "Revocation", href: "legal/revocation" },
        { text: "Data protection", href: "legal/privacy" },
        { text: "Accessibility Statement", href: "legal/accessibility" },
        { text: "Cookie settings", href: "legal/cookies" },
        { text: "Imprint", href: "legal/imprint" }
    ];

    return (
        <footer className="flex flex-col items-center bg-[#FFEADE] py-10">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="w-full flex flex-col md:flex-row">
                    <div className="flex flex-col md:flex-row justify-between text-sm w-full">
                        <FooterSection title="Help & FAQ" links={helpFaqLinks} />
                        <FooterSection title="Pursue" links={companyLinks} />
                        <FooterSection title="Legal" links={legalLinks} />
                        <NewsletterSection />
                    </div>
                </div>
                <div className="mt-8 text-start text-gray-900 text-sm">
                    &copy; {new Date().getFullYear()} Mediloon. - Your TÜV-certified online pharmacy!.
                </div>
            </div>
        </footer>
    );
};

export default Footer;