import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR TERMS & SERVICES — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple Terms & Services for my website. Here is some context:
// - Website: https://investorso.com
// - Name: Compound Interest Calculator
// - Contact information: https://investorso.com
// - Description: Calculate your compound interest of your investments, and see how it grows over time and how much you can expect to make.
// - Ownership: when buying a package, users can download code to create apps. They own the code but they do not have the right to resell it. They can ask for a full refund within 7 day after the purchase.
// - User data collected: Investment details not data is stored
// - Non-personal data collection: web cookies
// - Link to privacy-policy: https://investorso.com/privacy-policy
// - Governing Law: United States
// - Updates to the Terms: users will be updated by web page

// Please write a simple Terms & Services for my site. Add the current date. Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const TOS = () => {
  return (
    <main className="max-w-7xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Terms and Conditions for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Last Updated: March 31, 2025

Welcome to Compound Interest Calculator ("the Website"), operated by Investorso ("we," "us," or "our"). By accessing or using our Website, you agree to these Terms & Services ("Terms"). If you do not agree, please do not use our Website.

1. Services Provided

Our Website allows users to calculate the compound interest of their investments and analyze potential growth over time. Additionally, users may purchase packages that include downloadable code to create their own applications.

2. Ownership & Usage Rights

Upon purchasing a package, users receive ownership of the downloaded code.

Users may use the code for personal or business purposes but are strictly prohibited from reselling, redistributing, or sublicensing it in any form.

We retain all rights to the original code, excluding the granted usage rights.

3. Refund Policy

Users may request a full refund within 7 days of purchase. To request a refund, contact us at https://investorso.com.

4. Data Collection & Privacy

We do not store user investment details.

We collect non-personal data through web cookies to enhance user experience. For more details, please refer to our Privacy Policy.

5. Limitation of Liability

We provide our services "as-is" and make no warranties regarding their accuracy, reliability, or fitness for a particular purpose. Users assume full responsibility for any financial decisions made based on the Website's calculations.

6. Governing Law

These Terms are governed by and construed in accordance with the laws of the United States.

7. Updates to Terms

We may update these Terms at any time. Users will be notified of updates via the Website. Continued use of our services constitutes acceptance of the revised Terms.

For any questions, please contact us at https://investorso.com.`}
        </pre>
      </div>
    </main>
  );
};

export default TOS;
