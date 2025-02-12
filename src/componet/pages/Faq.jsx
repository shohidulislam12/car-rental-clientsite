
const Faq = () => {
    return (

            <div className="join dark:bg-black dark:text-white p-2 pt-10 join-vertical w-full">
  {/* FAQ 1 */}
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="faq-accordion" defaultChecked />
    <div className="collapse-title text-xl font-medium">
      What documents do I need to rent a car?
    </div>
    <div className="collapse-content">
      <p>
        You need a valid driver’s license, a credit/debit card for payment, and an ID (e.g., passport or national ID).
      </p>
    </div>
  </div>

  {/* FAQ 2 */}
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="faq-accordion" />
    <div className="collapse-title text-xl font-medium">
      Is there an age limit for renting a car?
    </div>
    <div className="collapse-content">
      <p>
        Yes, the minimum age is typically 21 years, but it may vary by location and car type. Drivers under 25 may incur a young driver surcharge.
      </p>
    </div>
  </div>

  {/* FAQ 3 */}
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="faq-accordion" />
    <div className="collapse-title text-xl font-medium">
      Can I rent a car without a credit card?
    </div>
    <div className="collapse-content">
      <p>
        Some locations accept debit cards, but additional requirements like proof of return travel may apply. Check with us in advance.
      </p>
    </div>
  </div>

  {/* FAQ 4 */}
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="faq-accordion" />
    <div className="collapse-title text-xl font-medium">
      What happens if I return the car late?
    </div>
    <div className="collapse-content">
      <p>
        Late returns may result in additional charges. Please contact us if you anticipate a delay to discuss options.
      </p>
    </div>
  </div>

  {/* FAQ 5 */}
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="faq-accordion" />
    <div className="collapse-title text-xl font-medium">
      Is insurance included in the rental price?
    </div>
    <div className="collapse-content">
      <p>
        Basic coverage is usually included, but you can purchase additional insurance for extra protection during your rental period.
      </p>
    </div>
  </div>

  {/* FAQ 6 */}
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="faq-accordion" />
    <div className="collapse-title text-xl font-medium">
      Can I add an additional driver?
    </div>
    <div className="collapse-content">
      <p>
        Yes, additional drivers can be added for a small fee. They must meet the same requirements as the primary driver.
      </p>
    </div>
  </div>

  {/* FAQ 7 */}
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="faq-accordion" />
    <div className="collapse-title text-xl font-medium">
      What should I do if the car breaks down?
    </div>
    <div className="collapse-content">
      <p>
        Contact our roadside assistance immediately using the number provided in your rental agreement. We’ll assist you promptly.
      </p>
    </div>
  </div>

  {/* FAQ 8 */}
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="faq-accordion" />
    <div className="collapse-title text-xl font-medium">
      Can I take the car out of state or country?
    </div>
    <div className="collapse-content">
      <p>
        Cross-border or out-of-state rentals may have restrictions or require additional documentation. Contact us for more details.
      </p>
    </div>
  </div>

  {/* FAQ 9 */}
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="faq-accordion" />
    <div className="collapse-title text-xl font-medium">
      Are there mileage limits for rented cars?
    </div>
    <div className="collapse-content">
      <p>
        Most rentals come with unlimited mileage, but some specialty vehicles or promotions may have limits. Check your agreement for specifics.
      </p>
    </div>
  </div>

  {/* FAQ 10 */}
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="faq-accordion" />
    <div className="collapse-title text-xl font-medium">
      How can I cancel or modify my reservation?
    </div>
    <div className="collapse-content">
      <p>
        You can cancel or modify your booking online through your account or by contacting our customer service. Cancellation fees may apply.
      </p>
    </div>
  </div>
</div>

 
    );
};

export default Faq;