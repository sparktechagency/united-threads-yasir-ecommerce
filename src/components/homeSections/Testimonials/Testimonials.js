import React from "react";
import TestimonialsSlider from "./_components/TestimonialsSlider";

export default function Testimonials() {
  return (
    <section className="text-primary-black">
      <div className="mb-6 space-y-3 text-center">
        <h2 className="text-5xl font-bold">What People Are Saying</h2>
        <p className="text-base text-secondary-2">
          We provide support for more than 15k+ businesses
        </p>
      </div>

      <TestimonialsSlider />
    </section>
  );
}
