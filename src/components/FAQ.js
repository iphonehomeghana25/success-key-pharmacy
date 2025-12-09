import React, { useState } from 'react';
import '../styles/FAQ.css';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqData = [
  {
    question: "Do you accept Mobile Money?",
    answer: "Yes, we accept MTN Mobile Money, Vodafone Cash, and AT Money. You can pay securely upon delivery or at the shop counter."
  },
  {
    question: "Do you deliver to areas outside Lapaz?",
    answer: "Our primary rapid delivery zone is Abeka, Lapaz, and Tesano. However, we can dispatch riders to Achimota, Dome, Kaneshie and Accra for a slightly higher delivery fee."
  },
  {
    question: "How do I upload my prescription?",
    answer: "It's simple! Click the 'Upload Prescription' button on the menu, or just click the WhatsApp button. Snap a clear photo of your note, send it to us, and we will confirm availability and price."
  },
  {
    question: "Are you open on Sundays?",
    answer: "Yes, we are open on Sundays from 9:00 AM to 11:300 PM to handle emergencies and weekend refills."
  },
  {
    question: "Do you sell baby formula and diapers?",
    answer: "Absolutely. We have a dedicated 'Mother & Baby' section in our Mini Mart stocked with popular brands of formula, diapers, wipes, and skincare products."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        
        <div className="faq-header">
          <span className="faq-badge">Common Questions</span>
          <h2>Everything You Need to Know</h2>
          <div className="faq-icon-large">
            <HelpCircle size={40} />
          </div>
        </div>

        <div className="faq-list">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                <h3>{item.question}</h3>
                <span className="toggle-icon">
                  {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </div>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
