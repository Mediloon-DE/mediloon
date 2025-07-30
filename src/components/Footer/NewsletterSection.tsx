"use client";
import React from 'react';
import { Check, Mail } from 'lucide-react';
interface BenefitItem {
    text: string;
}

export const NewsletterSection: React.FC = () => {
    const benefits: BenefitItem[] = [
        { text: "Attractive offers and discounts" },
        { text: "Exclusive vouchers and gifts" },
        { text: "Free extras" },
    ];

    return (
        <section className="flex flex-col text-zinc-900 max-md:mt-6">
            <h3 className="self-start text-sm font-bold tracking-normal">
                Newsletter
            </h3>
            <div className="flex flex-col items-start pb-3.5 pl-2 w-full bg-white rounded-2xl">
                <div className="flex gap-10 items-start self-stretch">
                    <div className="flex flex-col grow shrink-0 self-end mt-10 text-sm tracking-normal basis-0 w-fit">
                        <ul className="space-y-0">
                            {benefits.map((benefit, index) => (
                                <li key={index} className="flex gap-1 mt-2.5 first:mt-0">
                                    <Check className='w-[18px] text-primary font-bold' />
                            <span className="my-auto">{benefit.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col justify-center items-center self-start px-7 text-lg font-medium text-center whitespace-nowrap bg-yellow-300 rounded-full h-[76px] w-[76px] max-md:px-5">
                        <span>5€</span>
                    </div>
                </div>
                <button className="flex flex-col justify-center items-center px-16 py-2 mt-6 text-sm font-bold tracking-normal text-center text-white whitespace-nowrap bg-primary rounded-full max-md:px-5 hover:bg-rose-700 transition-colors">
                    <div className="flex gap-1.5 w-[94px]">
                        <Mail className='w-8 h-8' />
                        <span className="my-auto">Register</span>
                    </div>
                </button>
            </div>
        </section>
    );
};
