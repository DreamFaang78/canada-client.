import type { Metadata } from "next";
import QuoteButton from "@/components/ui/QuoteButton";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sharanbroker.com";
const SLUG = "insurance-broker-vs-agent-ontario";
const TITLE = "Insurance Broker vs. Insurance Agent in Ontario: What's the Difference?";

export const metadata: Metadata = {
  title: `${TITLE} | Sharan Kaur Insurance`,
  description:
    "An insurance broker in Ontario works for you and compares 30+ carriers; an agent works for one company. Learn the key differences and why RIBO licensing matters.",
  alternates: { canonical: `/blog/${SLUG}` },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description:
    "A clear explanation of the difference between an insurance broker and an insurance agent in Ontario, and why RIBO licensing matters when choosing one.",
  author: { "@type": "Person", name: "Sharan Kaur" },
  publisher: {
    "@type": "Organization",
    name: "Sharan Kaur Insurance",
    logo: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg` },
  },
  datePublished: "2026-02-03",
  dateModified: "2026-06-11",
  mainEntityOfPage: `${SITE_URL}/blog/${SLUG}`,
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does it cost more to use an insurance broker instead of an agent?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, using a RIBO-licensed broker like Sharan Kaur typically does not cost more than going directly to an agent or insurer. Brokers are paid a commission by the insurance company you choose, so you get the benefit of comparison shopping across 30+ carriers at no extra cost to you.",
      },
    },
    {
      "@type": "Question",
      name: "Can a broker help me after I've already bought a policy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, a broker continues to support you after your policy is in place — helping with mid-term changes, claims questions, and shopping the market again at renewal to make sure your rate is still competitive. This ongoing support is one of the main advantages of working with a broker instead of a single-company agent.",
      },
    },
    {
      "@type": "Question",
      name: "How do I verify that a broker is RIBO licensed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can verify a broker's RIBO license by checking the public registry on the Registered Insurance Brokers of Ontario (RIBO) website using their name or license number. A licensed broker should also be willing to share their license number with you directly when asked.",
      },
    },
  ],
};

export default function InsuranceBrokerVsAgentOntarioPage() {
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
          An insurance broker in Ontario, like Sharan Kaur, is RIBO-licensed and works for
          you — comparing rates and coverage from 30+ carriers to find the best fit for
          your needs. An insurance agent, by contrast, represents one insurance company
          and can only sell that company's products. Understanding this difference can
          save you money and ensure you have the right coverage, whether you're in
          Mississauga, Brampton, or anywhere across the GTA.
        </p>

        <section className="space-y-4">
          <h2 className="font-poppins font-bold text-2xl text-big-dark">
            What Does an Insurance Broker Do?
          </h2>
          <p className="text-mid-gray leading-relaxed font-light">
            An insurance broker is an independent professional who is licensed to sell
            policies from multiple insurance companies. Their role is to assess your
            situation — whether that's auto, home, life, or business insurance — and then
            shop the market on your behalf to find the policy that offers the best
            combination of coverage and price. Because brokers aren't tied to a single
            insurer, they have no incentive to push one company's product over another;
            their incentive is to keep you as a satisfied client over the long term, which
            means finding you genuinely competitive options. In Ontario, brokers are
            regulated by the Registered Insurance Brokers of Ontario (RIBO).
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-poppins font-bold text-2xl text-big-dark">
            What Does an Insurance Agent Do?
          </h2>
          <p className="text-mid-gray leading-relaxed font-light">
            An insurance agent, sometimes called a "captive agent," represents one
            insurance company exclusively. If you walk into that company's office or call
            their sales line, the agent can only offer you that company's products and
            pricing — even if a competitor would be a better fit for your needs. Agents can
            still be knowledgeable and helpful within the scope of what their company
            offers, but they are not able to compare your situation against other insurers'
            rates. This means you, the consumer, would need to separately contact multiple
            companies' agents if you wanted to compare options yourself.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-poppins font-bold text-2xl text-big-dark">
            Key Differences: Who They Work For
          </h2>
          <p className="text-mid-gray leading-relaxed font-light">
            The single biggest difference comes down to who the professional represents.
            A broker represents you, the client, and has a duty to act in your best
            interest when recommending coverage. An agent represents the insurance company
            and is, in effect, that company's sales representative. This affects everything
            from how your first quote is built to how a claim might be handled — a broker
            can advocate for you with the insurer if a claim dispute arises, while an
            agent's primary loyalty remains with their employer. For consumers comparing
            "insurance broker vs. agent" options in Ontario, this distinction is the most
            important factor to understand.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-poppins font-bold text-2xl text-big-dark">
            Why RIBO Licensing Matters
          </h2>
          <p className="text-mid-gray leading-relaxed font-light">
            RIBO — the Registered Insurance Brokers of Ontario — is the regulatory body
            that licenses and oversees insurance brokers in the province. To hold a RIBO
            license, a broker must complete approved education, pass licensing exams, carry
            errors and omissions insurance, and follow a code of conduct that puts the
            client's interests first. When you work with a RIBO-licensed broker like
            Sharan Kaur, you have the assurance that you're dealing with a regulated
            professional who is accountable to a governing body — not just a salesperson
            working on commission for a single company.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-poppins font-bold text-2xl text-big-dark">
            Which One Should You Choose?
          </h2>
          <p className="text-mid-gray leading-relaxed font-light">
            For most people in Mississauga, Brampton, and across the GTA, a RIBO-licensed
            broker offers a clear advantage: one application, multiple quotes from 30+
            carriers, and ongoing support at renewal time without any extra cost to you.
            This is especially valuable for newcomers to Canada, first-time home buyers, or
            G2 drivers, whose situations may be treated very differently from one insurer to
            the next. Sharan Kaur also provides bilingual service in English and Punjabi,
            making the process easier for clients who feel more comfortable discussing
            coverage details in their first language.
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
            Want a broker who works for you, not the insurance company? Sharan Kaur, a
            RIBO-licensed broker serving Mississauga and Brampton, compares 30+ carriers to
            find your best rate — with bilingual support in English and Punjabi.
          </p>
          <QuoteButton href="/get-a-quote" size="lg">
            Get a Free Quote
          </QuoteButton>
        </div>
      </article>
    </div>
  );
}
