import React from 'react';

const Payment = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Payment Method (Halchash.com)</h1>
      <section className="space-y-4">
        <p>At Halchash.com, we exclusively accept payments via Cash on Delivery (COD). We do not currently offer any prepaid payment options on our website.</p>
        <h2 className="font-semibold">Purpose of the Policy</h2>
        <p>We have chosen COD to ensure trust and security among our customers — customers pay only after receiving and inspecting the product.</p>

        <h2 className="text-2xl font-semibold mt-6">পেমেন্ট পদ্ধতি</h2>
        <p>Halchash.com এ আমরা শুধুমাত্র ক্যাশ অন ডেলিভারি (COD) গ্রহণ করি। বর্তমানে অগ্রিম পেমেন্ট নেই।</p>
      </section>
    </div>
  );
};

export default Payment;
