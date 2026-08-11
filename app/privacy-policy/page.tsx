export const metadata = {
  title: "Privacy Policy | Sharan Kaur Insurance Broker",
  description: "Read our privacy policy detailing how we collect, store, and protect your personal information in compliance with RIBO and PIPEDA regulations.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-light-gray">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 bg-white rounded-3xl border border-gray-150 shadow-sm mt-8">
        <h1 className="font-poppins font-bold text-3xl sm:text-4xl text-big-dark mb-6">
          Privacy Policy
        </h1>
        <p className="text-xs text-mid-gray mb-8">Last Updated: May 26, 2026</p>

        <div className="space-y-6 text-charcoal text-sm leading-relaxed font-light">
          <p>
            At Sharan Kaur Insurance (operating as Sharan Kaur, Insurance Broker), we are committed to maintaining the accuracy, confidentiality, and security of your personal information. This Privacy Policy describes the personal information we collect from or about you, how we use it, and to whom we disclose it.
          </p>

          <h2 className="font-poppins font-bold text-xl text-big-dark pt-4">1. Compliance with Regulations</h2>
          <p>
            We manage your personal information in accordance with the Personal Information Protection and Electronic Documents Act (PIPEDA), the Registered Insurance Brokers of Ontario (RIBO) code of conduct, and other applicable provincial and federal privacy legislation.
          </p>

          <h2 className="font-poppins font-bold text-xl text-big-dark pt-4">2. Collection of Information</h2>
          <p>
            When you request a quote, submit a contact form, or establish a policy with us, we collect necessary personal details, which may include:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Contact info: Name, email address, phone number, and physical mailing address.</li>
            <li>Auto details: Driving history, vehicle vehicle identification numbers (VIN), vehicle make/model, and previous insurance status.</li>
            <li>Home details: Home construction details, age of roof, occupancy status, and local hazard indicators.</li>
            <li>Life details: Health indicators, age, and tobacco consumption status.</li>
            <li>Business details: Business type, annual revenue, employee count, and commercial risks.</li>
          </ul>

          <h2 className="font-poppins font-bold text-xl text-big-dark pt-4">3. Use of Information</h2>
          <p>
            We use your personal information to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Shop your profile across 30+ insurance underwriters to find the best rate.</li>
            <li>Establish, maintain, and renew your insurance policies.</li>
            <li>Communicate critical billing, claim updates, and regulatory disclosures.</li>
            <li>Respond to your requests submitted via our website forms.</li>
            <li>Verify identity and prevent fraud.</li>
          </ul>

          <h2 className="font-poppins font-bold text-xl text-big-dark pt-4">4. Sharing and Disclosure</h2>
          <p>
            We only share your information with licensed insurance carriers and underwriting organizations necessary to secure your insurance coverage. We <strong>never</strong> sell, rent, or trade your personal information to third-party marketing companies.
          </p>

          <h2 className="font-poppins font-bold text-xl text-big-dark pt-4">5. Security of Your Data</h2>
          <p>
            We employ industry-standard administrative, physical, and technological security measures to protect your data from unauthorized access, loss, or alteration. All database interactions with our system use encrypted Secure Socket Layer (SSL) protocols.
          </p>

          <h2 className="font-poppins font-bold text-xl text-big-dark pt-4">6. Your Rights</h2>
          <p>
            You have the right to request access to the personal information we hold about you, request corrections to inaccurate details, or withdraw your consent for information use (subject to legal or contractual restrictions and reasonable notice).
          </p>

          <h2 className="font-poppins font-bold text-xl text-big-dark pt-4">7. Contact Information</h2>
          <p>
            If you have any questions or complaints regarding our privacy practices, please contact Sharan Kaur directly at:
            <br />
            <strong>Email:</strong> sharan@thebig.ca
            <br />
            <strong>Phone:</strong> 647.501.8013
            <br />
            <strong>Address:</strong> 105D-135 Matheson Blvd West, Mississauga, ON L5R 3L1
          </p>
        </div>
      </div>
    </div>
  );
}
