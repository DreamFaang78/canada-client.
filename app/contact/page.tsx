import LocationContact from "@/app/sections/LocationContact";

export const metadata = {
  title: "Contact Sharan Kaur — Insurance Broker Mississauga",
  description:
    "Contact Sharan Kaur, RIBO-licensed insurance broker at 105D-135 Matheson Blvd West, Mississauga. Call (647) 501-8013 or get a free quote online.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="pt-8">
      <LocationContact />
    </div>
  );
}
