// TermsAndConditions.jsx
import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="bg-gray-100 font-sans min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Gen-Go Car Rentals</h1>
          <h2 className="text-2xl font-semibold text-gray-600 mt-2">Terms and Conditions</h2>
        </header>
        <section className="bg-white p-6 rounded-lg shadow-md">
          <ol className="list-decimal space-y-6 pl-6">
            <li>
              <h3 className="text-xl font-semibold text-gray-800">Acceptance of Terms</h3>
              <p className="text-gray-600">
                By using Gen-Go Car Rentals services, the renter agrees to abide by these Terms and Conditions. A copy of
                this agreement will be provided at the time of rental and must be kept in the vehicle during the rental
                period.
              </p>
            </li>
            <li>
              <h3 className="text-xl font-semibold text-gray-800">Renter Requirements</h3>
              <p className="text-gray-600">
                The renter must be at least 21 years old and possess a valid driver’s license held for a minimum of one
                year. For premium vehicles, the minimum age is 25 years with a license held for at least four years. An
                International Driving License is required for non-EU renters or if the license is not in English. A valid
                credit card in the renter’s name is required for payment and a security deposit of INR 10,000, which will
                be refunded upon vehicle return, subject to inspection.
              </p>
            </li>
            <li>
              <h3 className="text-xl font-semibold text-gray-800">Vehicle Use</h3>
              <p className="text-gray-600">
                The vehicle must be driven only by the renter or authorized additional drivers listed in the rental
                agreement. Additional drivers incur a fee of INR 500 per day. The vehicle may not be used for illegal
                activities, towing, racing, or off-road driving. It is prohibited to transport the vehicle outside India or
                board it on ferries without prior written consent from Gen-Go Car Rentals. Smoking in the vehicle is
                strictly prohibited, with a cleaning fee of INR 5,000 for violations.
              </p>
            </li>
            <li>
              <h3 className="text-xl font-semibold text-gray-800">Rental Period</h3>
              <p className="text-gray-600">
                The minimum rental period is 24 hours. Extensions must be approved by Gen-Go Car Rentals at least 48 hours
                in advance, subject to availability. Unauthorized extensions will incur a penalty of three times the daily
                rental rate per day. Early returns are non-refundable unless agreed upon in writing.
              </p>
            </li>
            <li>
              <h3 className="text-xl font-semibold text-gray-800">Vehicle Return</h3>
              <p className="text-gray-600">
                The vehicle must be returned to the designated Gen-Go Car Rentals location in Bangalore with the same fuel
                level as at pickup. A refueling fee of INR 150 per liter plus a service charge of INR 1,000 will apply if
                the fuel level is lower. All accessories (e.g., GPS, child seats) must be returned in the same condition,
                barring normal wear and tear. Missing or damaged accessories will be charged to the renter’s credit card.
              </p>
            </li>
            <li>
              <h3 className="text-xl font-semibold text-gray-800">Fees and Charges</h3>
              <p className="text-gray-600">
                The renter is responsible for all fines, tolls, parking fees, and traffic violations incurred during the
                rental period, plus an administrative fee of INR 1,000 per incident. If the vehicle is returned to a
                different location without prior approval, a relocation fee ranging from INR 5,000 to INR 15,000 will
                apply. Late returns beyond a 1-hour grace period will be charged at the full daily rate.
              </p>
            </li>
            <li>
              <h3 className="text-xl font-semibold text-gray-800">Insurance and Liability</h3>
              <p className="text-gray-600">
                Basic insurance is included, with an excess of INR 20,000 for standard vehicles. The renter may purchase
                additional insurance to reduce this excess to INR 5,000 for INR 1,000 per day. The renter is liable for
                damages due to misuse, negligence, or violation of these terms (e.g., driving under the influence, off-road
                driving), including repair costs and loss of rental income during repairs. Damage to tires, interiors, or
                accessories (e.g., due to smoking or animals) is not covered by insurance and will be charged to the renter.
              </p>
            </li>
            <li>
              <h3 className="text-xl font-semibold text-gray-800">Accidents and Breakdowns</h3>
              <p className="text-gray-600">
                In case of an accident, the renter must immediately notify the police and Gen-Go Car Rentals, providing a
                written statement. The renter may not leave the scene until the police arrive. For breakdowns, the renter
                must contact Gen-Go Car Rentals immediately. If the fault poses a safety risk, further driving is
                prohibited until repairs are made.
              </p>
            </li>
            <li>
              <h3 className="text-xl font-semibold text-gray-800">Payment</h3>
              <p className="text-gray-600">
                Payment must be made in advance via credit card (Visa or MasterCard). American Express, debit cards, and
                cash are not accepted for the security deposit. Gen-Go Car Rentals reserves the right to charge the
                renter’s credit card for additional fees, damages, or fines incurred during the rental period.
              </p>
            </li>
            <li>
              <h3 className="text-xl font-semibold text-gray-800">Privacy</h3>
              <p className="text-gray-600">
                Gen-Go Car Rentals collects personal data (e.g., driver’s license, credit card details) to process the
                rental and comply with legal obligations. This data will not be shared with third parties except as
                required by law.
              </p>
            </li>
            <li>
              <h3 className="text-xl font-semibold text-gray-800">Governing Law</h3>
              <p className="text-gray-600">
                This agreement is governed by the laws of India, and any disputes will be resolved in the courts of
                Bangalore.
              </p>
            </li>
            <li>
              <h3 className="text-xl font-semibold text-gray-800">Amendments</h3>
              <p className="text-gray-600">
                Gen-Go Car Rentals reserves the right to amend these Terms and Conditions at any time. The renter will be
                bound by the terms in effect at the time of rental.
              </p>
            </li>
          </ol>
          <p className="mt-6 text-gray-600">
            By signing the rental agreement, the renter acknowledges understanding and acceptance of these Terms and
            Conditions.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;