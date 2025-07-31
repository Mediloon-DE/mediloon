

import { FooterSection } from './FooterSection';
import { NewsletterSection } from './NewsletterSection';

export const Footer: React.FC = () => {
    const helpFaqLinks = [
        { text: "FAQ", href: "/faq" },
        { text: "Hilfe", href: "/help" },
        { text: "Versand", href: "/shipment" },
        { text: "Versandkosten", href: "/shipping-costs" },
        { text: "Now! Versand", href: "/now-shipping" },
        { text: "E-Rezept", href: "/e-prescription" },
        { text: "Pharmakovigilanz", href: "/pharmacovigilance" },
        { text: "Medizinproduktesicherheit", href: "/medical-device-safety" },
    ];

    const companyLinks = [
        { text: "Über uns", href: "/about" },
        { text: "Corporate Website", href: "/corporate" },
        { text: "Retail Media", href: "/retail-media" },
        { text: "Jobs & Karriere", href: "/careers" },
        { text: "Partner werden", href: "/partners" },
        { text: "RedPoints", href: "/redpoints" },
        { text: "Unsere Apps", href: "/apps" },
        { text: "Unsere Eigenmarken", href: "/brands" }
    ];

    const legalLinks = [
        { text: "Nutzung und Haftung", href: "legal/liability" },
        { text: "AGB", href: "legal/terms" },
        { text: "Widerruf", href: "legal/revocation" },
        { text: "Datenschutz", href: "legal/privacy" },
        { text: "Erklärung zur Barrierefreiheit", href: "legal/accessibility" },
        { text: "Cookie-Einstellungen", href: "legal/cookies" },
        { text: "Impressum", href: "legal/imprint" }
    ];

    return (
        <footer className="flex flex-col items-center bg-[#FFEADE] md:py-10">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="w-full flex flex-col md:flex-row">
                    <div className="flex flex-col md:flex-row justify-between text-sm w-full">
                        <FooterSection title="Hilfe & FAQ" links={helpFaqLinks} />
                        <FooterSection title="Unternehmen" links={companyLinks} />
                        <FooterSection title="Rechtliches" links={legalLinks} />
                        <NewsletterSection />
                    </div>
                </div>
                <div className="mt-8 text-start text-gray-900 text-sm">
                    &copy; {new Date().getFullYear()} Mediloon. - Online-Apotheke!.
                </div>
            </div>
        </footer>
    );
};

export default Footer;