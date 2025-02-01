import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BackPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-24 relative">
      <div className="animated-bg" />
      <div className="container mx-auto px-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-pink-400 hover:text-pink-300 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-['Russo_One'] mb-8">
            <span className="bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
              TrAIp House Backpage
            </span>
          </h1>

          <div className="space-y-8 text-gray-300">
            <section className="card-spicy p-6">
              <h2 className="text-2xl font-['Russo_One'] text-pink-400 mb-4">Introduction</h2>
              <p className="text-lg font-['Teko']">
                TrAIp House represents a revolutionary fusion of artificial intelligence and digital companionship,
                creating an immersive platform where users can interact with unique AI personalities in a secure
                and engaging environment.
              </p>
            </section>

            <section className="card-spicy p-6">
              <h2 className="text-2xl font-['Russo_One'] text-pink-400 mb-4">Technology Stack</h2>
              <ul className="list-disc list-inside space-y-2 text-lg font-['Teko']">
                <li>Advanced AI Models for Natural Conversation</li>
                <li>Blockchain Integration for Secure Transactions</li>
                <li>Real-time Chat with Memory Persistence</li>
                <li>Dynamic Content Generation</li>
                <li>Multi-chain Token Support</li>
              </ul>
            </section>

            <section className="card-spicy p-6">
              <h2 className="text-2xl font-['Russo_One'] text-pink-400 mb-4">Tokenomics</h2>
              <div className="space-y-4 text-lg font-['Teko']">
                <p>
                  Each AI companion has their own unique token, allowing for a personalized economy within
                  the platform. Token utilities include:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Exclusive Content Access</li>
                  <li>Premium Chat Features</li>
                  <li>Governance Rights</li>
                  <li>Staking Rewards</li>
                </ul>
              </div>
            </section>

            <section className="card-spicy p-6">
              <h2 className="text-2xl font-['Russo_One'] text-pink-400 mb-4">Roadmap</h2>
              <div className="space-y-6 text-lg font-['Teko']">
                <div>
                  <h3 className="text-xl text-pink-300 mb-2">Phase 1: Launch</h3>
                  <ul className="list-disc list-inside">
                    <li>Initial AI Companions Release</li>
                    <li>Basic Chat Functionality</li>
                    <li>Token Integration</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl text-pink-300 mb-2">Phase 2: Enhancement</h3>
                  <ul className="list-disc list-inside">
                    <li>Advanced AI Features</li>
                    <li>Multi-chain Support</li>
                    <li>Community Governance</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl text-pink-300 mb-2">Phase 3: Expansion</h3>
                  <ul className="list-disc list-inside">
                    <li>Mobile App Launch</li>
                    <li>Virtual Reality Integration</li>
                    <li>Cross-platform Support</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="card-spicy p-6">
              <h2 className="text-2xl font-['Russo_One'] text-pink-400 mb-4">Security</h2>
              <div className="space-y-4 text-lg font-['Teko']">
                <p>
                  Security is paramount at TrAIp House. We implement:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>End-to-end Encryption for All Communications</li>
                  <li>Smart Contract Audits</li>
                  <li>Regular Security Updates</li>
                  <li>Multi-signature Wallets for Treasury Management</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}