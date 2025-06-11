import React from "react";

export default function PrivacyPolicy() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border border-gray-200">
        <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">Privacy Policy</h1>

        <p className="text-sm text-gray-500 text-center mb-10">
          Last Updated: <span className="font-semibold">[Insert Date]</span>
        </p>

        <div className="space-y-10 text-gray-800 text-lg leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Personal details like name, email, phone, and driver's license.</li>
              <li>Payment details (securely handled by payment gateways).</li>
              <li>Device, browser, and location data (if permitted).</li>
              <li>Cookies and tracking for user session and analytics.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>To manage car bookings and user accounts.</li>
              <li>To communicate confirmations, receipts, and support replies.</li>
              <li>To improve platform functionality and user experience.</li>
              <li>To meet legal and security obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Sharing Your Information</h2>
            <p>We do not sell your personal data. However, we may share it with:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Trusted partners (e.g., payment and hosting providers).</li>
              <li>Legal authorities when required by law.</li>
              <li>Other parties with your explicit consent.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
            <p>
              Your data is encrypted and protected using the latest security practices to prevent
              unauthorized access or misuse.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Review or correct your personal data.</li>
              <li>Request deletion of your account and data.</li>
              <li>Withdraw your consent at any time.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Children’s Privacy</h2>
            <p>
              Our services are intended for users aged 18 and above. We do not knowingly collect data from minors.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Policy Updates</h2>
            <p>
              We may update this policy occasionally. All changes will be posted here with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Us</h2>
            <p>
              For any questions or concerns about this policy, feel free to reach out to us:
            </p>
            <p className="mt-2">
              📧 <strong>Email:</strong>{" "}
              <a href="mailto:support@gengo.com" className="text-blue-600 underline">
                support@gengo.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
