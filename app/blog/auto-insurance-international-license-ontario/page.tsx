import type { Metadata } from "next";
import QuoteButton from "@/components/ui/QuoteButton";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sharanbroker.com";
const SLUG = "auto-insurance-international-license-ontario";
const TITLE = "Can You Get Auto Insurance in Ontario With an International Driver's License?";

export const metadata: Metadata = {
  title: `${TITLE} | Sharan Kaur Insurance`,
  description:
    "Yes — you can get auto insurance in Ontario with an international driver's license. Learn how it works and how to find the best rate with a RIBO-licensed broker.",
  alternates: { canonical: `/blog/${SLUG}` },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description:
    "An explainer on getting auto insurance in Ontario with an international driver's license, transitioning to a G2/G license, and finding the best rate with a broker.",
  author: { "@type": "Person", name: "Sharan Kaur" },
  publisher: {
    "@type": "Organization",
    name: "Sharan Kaur Insurance",
    logo: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg` },
  },
  datePublished: "2026-01-22",
  dateModified: "2026-06-11",
  mainEntityOfPage: `${SITE_URL}/blog/${SLUG}`,
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long can I drive in Ontario on an international driver's license?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Visitors and new residents can generally drive in Ontario with a valid international driver's license and their home country license for up to 60 days, but if you're settling permanently you should apply for an Ontario license (G1/G2/G) as soon as possible. Sharan Kaur, a RIBO-licensed broker, can confirm what documentation your insurer needs during this transition period.",
      },
    },
    {
      "@type": "Question",
      name: "Will my insurance rate change once I get my G2 or G license?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, your rate can change once you move from an international license to a G2 or G Ontario license, since insurers reassess your risk profile based on your Ontario licensing class and accumulated driving record. In many cases, rates improve as you gain Canadian licensing history and a clean record.",
      },
    },
    {
      "@type": "Question",
      name: "Do all insurers in Ontario accept international driver's licenses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not all insurers in Ontario accept international driver's licenses on the same terms — some are more flexible than others about recognizing foreign driving experience. Sharan Kaur compares 30+ carriers to find the insurers that are most accommodating for drivers with international licenses and offer the best available rate.",
      },
    },
  ],
};

export default function AutoInsuranceInternationalLicenseOntarioPage() {
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
          Yes, you can get auto insurance in Ontario with an international driver's
          license while you transition to a G2 or G license. Insurance companies will
          insure drivers using a valid international license combined with proof of
          identity and address, though premiums may be higher until you obtain an
          Ontario-issued license. A RIBO-licensed broker, such as Sharan Kaur, compares
          30+ carriers to find insurers in Mississauga and Brampton that accept
          international licenses and recognize prior driving experience for a better rate.
        </p>

        <section className="space-y-4">
          <h2 className="font-poppins font-bold text-2xl text-big-dark">
            Driving Rules for International License Holders in Ontario
          </h2>
          <p className="text-mid-gray leading-relaxed font-light">
            Ontario allows visitors and new residents to drive using a valid license from
            their home country, often alongside an International Driving Permit (IDP), for
            a limited period after arrival — typically up to 60 days for visitors. If
            you're moving to Ontario permanently, you'll need to exchange your foreign
            license for an Ontario license within that window, which usually means entering
            the graduated licensing system at the G1, G2, or G level depending on your home
            country and any reciprocal licensing agreements. While you hold your
            international license, you can still legally drive and insure a vehicle, but
            it's important to keep documentation of your license validity on hand for your
            insurer.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-poppins font-bold text-2xl text-big-dark">
            How Insurers Treat International Driving Experience
          </h2>
          <p className="text-mid-gray leading-relaxed font-light">
            Every insurer evaluates international driving experience differently. Some
            carriers will request a "letter of experience" — an official document from your
            previous insurer or licensing body confirming how many years you've held a
            license and your claims history — and will use it to reduce your premium as if
            you had that same experience in Ontario. Other carriers place little to no
            weight on foreign experience and treat international license holders as
            brand-new drivers, which results in significantly higher rates. This is one of
            the biggest reasons it pays to compare multiple insurers rather than accepting
            a quote from a single company.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-poppins font-bold text-2xl text-big-dark">
            Steps to Insure Your Car With an International License
          </h2>
          <p className="text-mid-gray leading-relaxed font-light">
            To insure a vehicle in Ontario with an international license, you'll generally
            need: your valid international driver's license and/or International Driving
            Permit, a piece of government-issued photo ID, proof of your Ontario address,
            and the vehicle's details (VIN, make, model, year). If you have a letter of
            experience or driving abstract from your home country, gather that too — it can
            be the difference between a standard rate and a steep new-driver surcharge.
            From there, a broker can submit your information to multiple carriers at once
            and present you with a side-by-side comparison of coverage and price, so you
            can make an informed decision before your policy starts.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-poppins font-bold text-2xl text-big-dark">
            Transitioning to a G2/G License and Your Insurance
          </h2>
          <p className="text-mid-gray leading-relaxed font-light">
            Once you obtain your Ontario G2 or G license, it's important to update your
            insurance policy with your new licensing information. Insurers periodically
            review your file, and an outdated license status can affect a claim if it's not
            disclosed. The good news is that progressing through Ontario's graduated
            licensing system — and accumulating a clean Canadian driving record — typically
            leads to lower premiums over time, regardless of whether you started with an
            international license. Your broker should review your policy at each renewal to
            make sure you're benefiting from your improved licensing status and driving
            history.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-poppins font-bold text-2xl text-big-dark">
            How a Broker Helps You Get the Best Rate
          </h2>
          <p className="text-mid-gray leading-relaxed font-light">
            A RIBO-licensed broker works for you, not for any single insurance company,
            which means their job is to find the carrier that treats your specific
            situation most favourably. Sharan Kaur, based in Mississauga and serving
            Brampton and the wider GTA, compares 30+ carriers for drivers with
            international licenses and helps gather the documentation — like letters of
            experience — that can unlock better pricing. For Punjabi-speaking newcomers,
            she also provides bilingual support so the entire process, from your first
            quote to your final policy documents, is clear and stress-free.
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
            Driving on an international license and need car insurance in Ontario? Sharan
            Kaur, a RIBO-licensed broker serving Mississauga and Brampton, compares 30+
            carriers to find a policy that recognizes your driving experience — with
            bilingual support in English and Punjabi.
          </p>
          <QuoteButton href="/get-a-quote" size="lg">
            Get a Free Quote
          </QuoteButton>
        </div>
      </article>
    </div>
  );
}
