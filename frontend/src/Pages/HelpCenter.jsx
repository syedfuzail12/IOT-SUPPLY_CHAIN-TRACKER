import React, { useState } from 'react';
import { Search, HelpCircle, Book, FileText, MessageCircle, ChevronRight, Plus, Minus } from 'lucide-react';

function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How do I connect a new device?",
      answer: "To connect a new device, go to the Devices section and click the 'Add Device' button. Follow the on-screen instructions to complete the pairing process. Make sure your device is powered on and in pairing mode before starting this process."
    },
    {
      id: 2,
      question: "How do I change my account password?",
      answer: "You can change your password by navigating to the Profile section. Click on 'Security Settings' and select 'Change Password'. You'll need to enter your current password and then your new password twice to confirm."
    },
    {
      id: 3,
      question: "What should I do if a device is offline?",
      answer: "If a device appears offline, first check that it's powered on and connected to your network. Try restarting the device, and ensure your internet connection is working. If problems persist, you can use the 'Troubleshoot' option in the device details page."
    },
    {
      id: 4,
      question: "How do I set up automated tasks?",
      answer: "Automated tasks can be created in the Automation section. Click 'Create New Automation' and select triggers and actions for your devices. You can set conditions based on time, device status, or other events to create customized workflows."
    },
    {
      id: 5,
      question: "Can I share device access with family members?",
      answer: "Yes, you can share access by going to the Devices section, selecting the device you want to share, and clicking on 'Share Access'. Enter the email addresses of family members you want to share with and select their permission level."
    }
  ];

  const helpCategories = [
    {
      icon: <Book size={20} />,
      title: "Getting Started",
      description: "New user guides and basic setup instructions"
    },
    {
      icon: <FileText size={20} />,
      title: "User Manuals",
      description: "Detailed documentation for all features"
    },
    {
      icon: <MessageCircle size={20} />,
      title: "Contact Support",
      description: "Get help from our customer support team"
    }
  ];

  const handleFaqToggle = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const filteredFaqs = searchQuery 
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 flex items-center justify-center">
          <HelpCircle className="mr-2" />
          Help Center
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Find answers to common questions or contact our support team
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search for help..."
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Help Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {helpCategories.map((category, index) => (
          <div 
            key={index} 
            className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition duration-150 cursor-pointer"
          >
            <div className="flex items-center mb-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-600 dark:text-blue-300 mr-3">
                {category.icon}
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-white">
                {category.title}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
              {category.description}
            </p>
            <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
              Learn more
              <ChevronRight size={16} className="ml-1" />
            </div>
          </div>
        ))}
      </div>

      {/* FAQs Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <div 
                key={faq.id} 
                className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 pb-3 last:pb-0"
              >
                <button
                  className="flex justify-between items-center w-full py-3 text-left"
                  onClick={() => handleFaqToggle(faq.id)}
                >
                  <span className="font-medium text-gray-900 dark:text-white">
                    {faq.question}
                  </span>
                  {expandedFaq === faq.id ? 
                    <Minus size={18} className="text-gray-500 dark:text-gray-400" /> : 
                    <Plus size={18} className="text-gray-500 dark:text-gray-400" />
                  }
                </button>
                
                {expandedFaq === faq.id && (
                  <div className="pb-3 px-1 text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-500 dark:text-gray-400">
                No results found for "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Contact Support Card */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-100 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          Still need help?
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Our support team is available Monday to Friday, 9am to 5pm.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150">
          Contact Support
        </button>
      </div>
    </div>
  );
}

export default HelpCenter;