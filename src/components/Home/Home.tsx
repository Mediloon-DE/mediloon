"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Truck, BadgeCheck } from "lucide-react";
import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="bg-blue-100 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Premium <span className="text-pink-600">Medical Supplies</span><br />
            For Professionals & Home Use
          </h1>

          {/* Subheading */}
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Trusted by healthcare providers nationwide. Sterile, high-quality products with fast delivery.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg shadow-lg">
              <Link href="/stores">
                Our Stores <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" className="px-8 py-6 text-lg border-blue-600 text-blue-600 hover:bg-blue-50">
              <Link href="#">
                Learn About Us
              </Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Shield className="w-8 h-8 mx-auto text-blue-600" />, text: "Certified Quality" },
              { icon: <Truck className="w-8 h-8 mx-auto text-blue-600" />, text: "Fast Shipping" },
              { icon: <BadgeCheck className="w-8 h-8 mx-auto text-blue-600" />, text: "Verified Suppliers" },
              { icon: <Shield className="w-8 h-8 mx-auto text-blue-600" />, text: "Secure Orders" }
            ].map((item, index) => (
              <div key={index} className="bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                {item.icon}
                <p className="mt-2 font-medium text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}