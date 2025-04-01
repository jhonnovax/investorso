import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR PRIVACY POLICY — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple privacy policy for my website. Here is some context:
// - Website: https://investorso.com
// - Name: Compound Interest Calculator
// - Description: Calculate your compound interest of your investments, and see how it grows over time and how much you can expect to make.
// - User data collected: Investment details not data is stored
// - Non-personal data collection: web cookies
// - Purpose of Data Collection: Calculate compound and simple interest
// - Data sharing: we do not share the data with any other parties
// - Children's Privacy: we do not collect any data from children
// - Updates to the Privacy Policy: users will be updated by web page
// - Contact information: https://investorso.com

// Please write a simple privacy policy for my site. Add the current date.  Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Privacy Policy | ${config.appName}`,
  canonicalUrlRelative: "/privacy-policy",
});

const PrivacyPolicy = () => {
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
          </svg>{" "}
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Privacy Policy for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Last Updated: March 31, 2025

Welcome to Compound Interest Calculator ("the Website"), operated by Investorso ("we," "us," or "our"). Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our Website.

1. Information We Collect

User Data: We do not store any investment details entered by users.

Non-Personal Data: We collect non-personal data through web cookies to enhance user experience.

2. Purpose of Data Collection

We collect non-personal data to improve our services and calculate compound and simple interest accurately.

3. Data Sharing

We do not share any collected data with third parties.

4. Children’s Privacy

Our Website does not collect data from children under the age of 13. If we become aware that we have inadvertently collected such data, we will take immediate action to delete it.

5. Updates to This Privacy Policy

We may update this Privacy Policy from time to time. Users will be notified of changes via the Website. Continued use of our services constitutes acceptance of the revised Privacy Policy.

6. Contact Information

For any questions or concerns, please contact us at https://investorso.com.`}
        </pre>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
