import type { Metadata } from "next";
import QuoteButton from "@/components/ui/QuoteButton";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sharanbroker.com";
const SLUG = "life-insurance-new-immigrants-canada";
const TITLE = "Life Insurance for New Immigrants to Canada: A Beginner's Guide";

export const metadata: Metadata = {
  title: `${TITLE} | Sharan Kaur Insurance`,
  description:
    "New immigrants to Canada can get life insurance soon after arrival. Learn the difference between term and permanent coverage and how to get bilingual help in Punjabi.",
  alternates: { canonical: `/blog/${SLUG}` },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description:
    "A beginner's guide for new immigrants to Canada on why life insurance matters, term vs. permanent coverage, medical exams, and how much coverage to get.",
  author: { "@type": "Person", name: "Sharan Kaur" },
  publisher: {
    "@type": "Organization",
    name: "Sharan Kaur Insurance",
    logo: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg` },
  },
  datePublished: "2026-03-19",
  dateModified: "2026-06-11",
  mainEntityOfPage: `${SITE_URL}/blog/${SLUG}`,
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How soon after arriving in Canada can I get life insurance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "New immigrants can apply for life insurance shortly after arriving in Canada, though most insurers require you to have established residency status, such as permanent residency or a valid work permit, and sometimes a minimum period of time in Canada. Sharan Kaur, a RIBO-licensed broker, can confirm which carriers accept applications based on your specific immigration status.",
      },
    },
    {
      "@type": "Question",
      name: "Will I need a medical exam to get life insurance as a new immigrant?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on your age, the amount of coverage you're applying for, and the insurer. Many insurers offer no-medical-exam life insurance options up to certain coverage amounts, which can be a good fit for new immigrants who haven't yet established a Canadian family doctor.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get life insurance support in Punjabi in Mississauga and Brampton?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Sharan Kaur is a bilingual, RIBO-licensed broker who explains life insurance options — including term, permanent, and critical illness coverage — in both English and Punjabi for clients in Mississauga, Brampton, and across the GTA.",
      },
    },
  ],
};

export default function LifeInsuranceNewImmigrantsCanadaPage() {
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
          New immigrants to Canada can apply for life insurance shortly after arrival,
          provided they have an established immigration status such as permanent
          residency or a valid work permit. Term life insurance is often the most
          affordable starting point for newcomers, while permanent policies build cash
          value over time. A RIBO-licensed broker, such as Sharan Kaur, helps new
          immigrants in Mississauga and Brampton understand their options and find
          coverage from carriers that work with newcomers — with support in English and
          Punjabi.
        </p>

        <section className="space-y-4">
          <h2 className="font-poppins font-bold text-2xl text-big-dark">
            Why New Immigrants Need Life Insurance
          </h2>
          <p className="text-mid-gray leading-relaxed font-light">
            Moving to a new country often comes with new financial responsibilities — a
            mortgage, a growing family, or money sent home to support relatives abroad.
            Life insurance ensures that if something happens to you, your family won't be
            left struggling to cover these obligations on top of the emotional loss. For
            new immigrants specifically, life insurance can also help protect against the
            risk of being underinsured during the early years in Canada, when savings may
            still be limited and a sudden loss of income could be especially difficult for
            a family to absorb. It's also often more affordable to get coverage while
            you're younger and healthier, so starting early matters.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-poppins font-bold text-2xl text-big-dark">
            Term vs. Permanent Life Insurance: Which Is Right for You?
          </h2>
          <p className="text-mid-gray leading-relaxed font-light">
            Term life insurance provides coverage for a set period — typically 10, 20, or
            30 years — and is usually the most affordable option, making it popular with
            young families and new immigrants who want maximum coverage at the lowest
            initial cost, often to cover a mortgage or income replacement during their
            working years. Permanent life insurance (such as whole life or universal life)
            provides lifelong coverage and builds cash value that can be accessed later,
            but comes with significantly higher premiums. Many new immigrants start with a
            term policy to get affordable protection in place quickly, then revisit
            permanent options once their finances are more established in Canada.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-poppins font-bold text-2xl text-big-dark">
            Do You Need a Medical Exam as a New Immigrant?
          </h2>
          <p className="text-mid-gray leading-relaxed font-light">
            Whether a medical exam is required depends on your age, health history, and how
            much coverage you're applying for. Many insurers offer simplified-issue or
            no-medical-exam policies for smaller coverage amounts, which rely on a health
            questionnaire instead of lab work or a paramedical exam — a practical option for
            new immigrants who haven't yet been matched with a family doctor in Canada. For
            larger coverage amounts, a medical exam is more likely to be required, but this
            can typically be arranged through a mobile paramedical service that comes to
            your home or workplace, so it doesn't require an existing doctor relationship.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-poppins font-bold text-2xl text-big-dark">
            How Much Life Insurance Coverage Do You Need?
          </h2>
          <p className="text-mid-gray leading-relaxed font-light">
            A common starting point is to consider 7-10 times your annual income, though
            the right amount depends on your specific obligations: outstanding debts like a
            mortgage or car loan, the number of dependents who rely on your income,
            future expenses such as your children's education, and any final expenses or
            money you'd want to leave for family members abroad. New immigrants should also
            factor in that government benefits and workplace coverage may be more limited
            in the early years compared to longer-term residents, which can mean a
            personal policy plays an even more important role in your overall financial
            plan.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-poppins font-bold text-2xl text-big-dark">
            Getting Bilingual Support for Life Insurance in Punjabi
          </h2>
          <p className="text-mid-gray leading-relaxed font-light">
            Life insurance involves important decisions about beneficiaries, coverage
            amounts, and policy terms — details that are much easier to get right when
            you can discuss them in the language you're most comfortable with. Sharan Kaur
            is a bilingual, RIBO-licensed broker serving Mississauga, Brampton, and the
            wider GTA, and she walks Punjabi-speaking clients through term and permanent
            life insurance options, medical underwriting requirements, and how to choose
            the right coverage amount, all in plain language in either English or Punjabi.
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
            New to Canada and want to protect your family with the right life insurance?
            Sharan Kaur, a RIBO-licensed broker serving Mississauga and Brampton, compares
            30+ carriers to find a policy that fits — with bilingual support in English
            and Punjabi.
          </p>
          <QuoteButton href="/get-a-quote" size="lg">
            Get a Free Quote
          </QuoteButton>
        </div>
      </article>
    </div>
  );
}
