"use client";
import React, { useState } from "react";

export interface PowerOfAttoneyFields {
  sellerTitle: string;
  buyerTitle: string;
  dayMade: string;
  monthMade: string;
  yearMade: string;
  sellerAddress: string;
  buyerAddress: string;
  propertyDescription: string;
}
const Page = () => {
  const [data, setData] = useState<PowerOfAttoneyFields>({
    sellerTitle: "ThinkLab Properties LTM",
    buyerTitle: "Usman Aliyu",
    dayMade: "25th",
    monthMade: "June",
    yearMade: "2025",
    sellerAddress: "No.21 Fafu Estate, Idu, Abuja",
    buyerAddress: "No.10, Fly Estate, Wuse Zone 4, Abuja",
    propertyDescription:
      "5 bedroom detached Duplex with BQ, located at, Plot 345, Guzape Extention, Guzape, Abuja",
  });

  return (
    <div className="px-60 w-full h-full flex flex-col items-center text-xl border-2">
      {/* PAGE 1 HEADER */}
      <section className="space-y-20 font-semibold flex flex-col items-center mt-8 min-h-screen">
        <h1 className="text-5xl">POWER OF ATTORNEY</h1>
        <div className="text-5xl flex flex-col items-center justify-center sapce-y-5">
          <h1 className="mb-6">BETWEEN</h1>
          <h1 className="mb-6 uppercase">{data.sellerTitle}</h1>
          <h1 className="">(DONOR)</h1>
        </div>
        <h1 className="text-5xl">AND</h1>
        <div className="text-5xl flex flex-col items-center">
          <h1 className="mb-6 uppercase">{data.buyerTitle}</h1>
          <h1 className="">(DONEE)</h1>
        </div>

        <span className="w-[40%] italic text-center ml-auto mt-16 text-base">
          Franked by: <span className="text-red-500">Think-Lab</span> Properties
          No. 87 Samuel Ladoke Akintola Boulvard, Garki, Abuja.
        </span>
      </section>

      {/* PAGE 2 */}
      <section className="min-h-screen">
        <h3 className="text-2xl">
          <span className="font-bold">THIS POWER OF ATTORNEY</span> is made this{" "}
          {data.dayMade} Day of {data.monthMade}, {data.yearMade}
        </h3>
        <input
          type="text"
          className="hidden"
          onChange={(e) => setData({ ...data, monthMade: e.target.value })}
        />
        <h1 className="text-4xl font-semibold my-8">BETWEEN</h1>
        <span>
          <span className="font-bold text-2xl uppercase">
            {data.buyerTitle}
          </span>{" "}
          of {data.buyerAddress} (Hereinafter referred to as{" "}
          <span className="font-bold">“The Donor”</span>) which expression shall
          where the context so admits includes its agents, heirs, legal
          representatives, successors-in-title and assigns of the First Part.
        </span>
        <h1 className="text-4xl font-semibold my-8">AND</h1>

        <span>
          <span className="font-bold text-2xl uppercase">
            {data.sellerTitle},
          </span>{" "}
          of {data.sellerAddress} (Hereinafter referred to as{" "}
          <span className="font-bold">“The Donee”</span>) which expressions
          shall where the context so admits include his/her heirs, legal
          representatives, administrators, successors-in-title and assigns of
          the other part.
        </span>

        <h1 className="text-4xl font-semibold my-10">WHEREAS</h1>
        <div className="flex space-x-2 w-[90%] ml-12 mb-6">
          <span className="font-bold">1.</span>
          <span>
            The Donor was allocated the {data.propertyDescription}
            (hereinafter referred to as the property)
          </span>
        </div>
        <div className="flex space-x-2 w-[90%] ml-12">
          <span className="font-bold">2.</span>
          <span>
            The Donor is desirous of appointing the DONEE to manage and
            superintend the management of all that{data.propertyDescription}{" "}
            (Herein after referred to as the “Property”).
          </span>
        </div>
      </section>
    </div>
  );
};

export default Page;
