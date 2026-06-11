import type { Metadata } from "next";
import QuoteButton from "@/components/ui/QuoteButton";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sharanbroker.com";
const SLUG = "home-insurance-first-time-buyers-mississauga";
const TITLE = "Home Insurance for First-Time Buyers in Mississauga: What You Need to Know";

export const metadata: Metadata = {
  title: `${TITLE} | Sharan Kaur Insurance`,
  description:
    "First-time home buyers in Mississauga need home insurance before closing. Learn what's covered, common add-ons, and how to get the best rate from a RIBO-licensed broker.",
  alternates: { canonical: `/blog/${SLUG}` },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description:
    "A guide for first-time home buyers in Mississauga covering what home insurance covers, common add-ons, typical costs, and how to find the best rate.",
  author: { "@type": "Person", name: "Sharan Kaur" },
  publisher: {
    "@type": "Organization",
    name: "Sharan Kaur Insurance",
    logo: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg` },
  },
  datePublished: "2026-03-05",
  dateModified: "2026-06-11",
  mainEntityOfPage: `${SITE_URL}/blog/${SLUG}`,
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need home insurance before closing on a house in Mississauga?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, your mortgage lender will require proof of home insurance before your closing date, since the property is collateral for the loan. Sharan Kaur, a RIBO-licensed broker, can arrange a policy that meets your lender's requirements and have proof of insurance ready in time for closing.",
      },
    },
    {
      "@type": "Question",
      name: "What is not covered by a standard home insurance policy in Ontario?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Standard home insurance policies in Ontario typically exclude flooding from overland water, sewer backup, and earthquake damage unless those coverages are added separately. A broker can review your property's specific risks in Mississauga and recommend which optional add-ons are worth including.",
      },
    },
    {
      "@type": "Question",
      name: "How much does home insurance cost for a first-time buyer in Mississauga?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The cost of home insurance for a first-time buyer in Mississauga depends on factors like the home's age, size, construction, location, and the coverage and deductible you choose. Comparing 30+ carriers through a RIBO-licensed broker is the best way to find an accurate, competitive quote for your specific property.",
      },
    },
  ],
};

export default function HomeInsuranceFirstTimeBuyersMississaugaPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="bg-big-dark text-white py-14 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-big-red/10 to-transparent z-0" />
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="font-poppins font-bold text-3xl sm:text-5xl leading-tight">
            {TITLE}
          </h1>
        </div>
      </div>

      <article className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <p className="text-lg text-charcoal leading-relaxed font-light">
          First-time home buyers in Mississauga must arrange home insurance before their
          closing date, since mortgage lenders require proof of coverage to fund the
          purchase. A standard policy covers your dwelling, personal belongings, liability,
          and additional living expenses, but extras like overland water and sewer backup
          are often optional add-ons worth considering. A RIBO-licensed broker, such as
          Sharan Kaur, compares 30+ carriers to help first-time buyers in Mississauga and
          Brampton find coverage that fits their new home and budget.
        </p>

        <section className="space-y-4">
          <h2 className="font-poppins font-bold text-2xl text-big-dark">
            Is Home Insurance Mandatory When Buying a Home?
          </h2>
          <p className="text-mid-gray leading-relaxed font-light">
            While home insurance isn't legally mandated by the Ontario government the way
            auto insurance is, it is effectively mandatory for anyone buying a home with a
            mortgage. Lenders require proof of insurance — naming them as a "loss payee" or
            "mortgagee" on the policy — before they will release mortgage funds on closing
            day. Without this proof, your real estate transaction simply cannot close. This
            means first-time buyers in Mississauga should arrange their home insurance quote
            and policy a few weeks before their closing date, not the day before, to avoid
            any last-minute delays.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-poppins font-bold text-2xl text-big-dark">
            What Does a Standard Home Insurance Policy Cover?
          </h2>
          <p className="text-mid-gray leading-relaxed font-light">
            A standard home insurance policy in Ontario generally includes four core types
            of coverage: dwelling coverage, which pays to repair or rebuild your home's
            structure if it's damaged by a covered peril like fire or windstorm; personal
            property coverage, which protects your furniture, electronics, and belongings;
            liability coverage, which protects you financially if someone is injured on your
            property and sues you; and additional living expenses coverage, which pays for
            temporary accommodation if your home becomes uninhabitable due to a covered
            loss. The specific limits and perils covered can vary significantly between
            insurers, which is why reviewing the policy wording with a broker matters.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-poppins font-bold text-2xl text-big-dark">
            Common Add-Ons First-Time Buyers Should Consider
          </h2>
          <p className="text-mid-gray leading-relaxed font-light">
            Several valuable coverages are not included in a standard policy by default.
            Overland water coverage protects against damage from flooding caused by heavy
            rain or melting snow — increasingly relevant given recent severe weather events
            in the GTA. Sewer backup coverage protects against damage if water backs up
            through your drains or sewer line, which can be a common issue in older
            Mississauga neighbourhoods. Earthquake coverage, while a lower-probability risk
            in Ontario, is inexpensive and worth discussing. Identity theft and home-based
            business coverage are also popular add-ons for first-time buyers who work from
            home.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-poppins font-bold text-2xl text-big-dark">
            How Much Does Home Insurance Cost in Mississauga?
          </h2>
          <p className="text-mid-gray leading-relaxed font-light">
            Home insurance costs in Mississauga vary widely depending on the home's age,
            square footage, construction materials, roof condition, proximity to a fire
            hydrant and fire station, claims history of the property, and the coverage
            limits and deductible you select. Newer homes with updated electrical, plumbing,
            and roofing typically cost less to insure than older homes that haven't been
            updated. Bundling your home insurance with an auto policy can also reduce your
            overall cost. Because pricing varies so much from one insurer to the next for
            the exact same property, getting a personalized quote is the only reliable way
            to know your actual cost.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-poppins font-bold text-2xl text-big-dark">
            How to Get the Best Rate as a First-Time Buyer
          </h2>
          <p className="text-mid-gray leading-relaxed font-light">
            The best way for a first-time buyer in Mississauga to get a competitive home
            insurance rate is to work with a RIBO-licensed broker who compares 30+ carriers
            on your behalf. Sharan Kaur reviews your new home's details — its age,
            construction, location, and any unique features — and shops the market to find
            coverage that protects your investment without unnecessary extras. She also
            helps make sure your policy meets your lender's exact requirements ahead of
            closing, and provides bilingual support in English and Punjabi for buyers who
            prefer to discuss their policy details in Punjabi.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-poppins font-bold text-2xl text-big-dark">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqJsonLd.mainEntity.map((item) => (
              <div key={item.name}>
                <h3 className="font-poppins font-bold text-base text-big-dark mb-2">
                  {item.name}
                </h3>
                <p className="text-mid-gray leading-relaxed font-light">
                  {item.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="pt-4 border-t border-gray-100">
          <p className="text-mid-gray leading-relaxed font-light mb-6">
            Buying your first home in Mississauga and need insurance before closing? Sharan
            Kaur, a RIBO-licensed broker serving Mississauga and Brampton, compares 30+
            carriers to find your best rate — with bilingual support in English and Punjabi.
          </p>
          <QuoteButton href="/get-a-quote" size="lg">
            Get a Free Quote
          </QuoteButton>
        </div>
      </article>
    </div>
  );
}
