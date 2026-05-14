"use client";

import { User, Bell, Shield, Palette, Globe, CreditCard, Key, Monitor, ChevronRight } from "lucide-react";
import { useState } from "react";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "api", label: "API Keys", icon: Key },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-white/40 text-sm mt-1">Manage your account preferences and configuration.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Sidebar */}
        <div className="lg:w-[220px] flex-shrink-0">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-white/[0.08] text-white"
                    : "text-white/40 hover:text-white/60 hover:bg-white/[0.03]"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 space-y-6">
          {activeTab === "profile" && (
            <>
              {/* Profile Section */}
              <div className="rounded-2xl border border-white/[0.06] bg-[#0c0c14] p-6">
                <h3 className="text-sm font-semibold mb-4">Profile Information</h3>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl font-bold">
                    A
                  </div>
                  <div>
                    <p className="text-sm font-medium">Alex Creator</p>
                    <p className="text-xs text-white/40">alex@creator.com</p>
                    <button className="text-xs text-indigo-400 hover:text-indigo-300 font-medium mt-1 transition-colors">Change Avatar</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-white/40 mb-1.5">Full Name</label>
                    <input type="text" defaultValue="Alex Creator" className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-500/40 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/40 mb-1.5">Username</label>
                    <input type="text" defaultValue="@alexcreator" className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-500/40 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/40 mb-1.5">Email</label>
                    <input type="email" defaultValue="alex@creator.com" className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-500/40 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/40 mb-1.5">Website</label>
                    <input type="url" defaultValue="https://alexcreator.com" className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-500/40 transition-colors" />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-xs font-medium text-white/40 mb-1.5">Bio</label>
                  <textarea rows={3} defaultValue="Full-stack developer & content creator. Building in public." className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-500/40 transition-colors resize-none" />
                </div>
                <div className="mt-5 flex justify-end">
                  <button className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-medium transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === "notifications" && (
            <div className="rounded-2xl border border-white/[0.06] bg-[#0c0c14] p-6">
              <h3 className="text-sm font-semibold mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { label: "Email notifications", desc: "Receive emails for important updates", checked: true },
                  { label: "Push notifications", desc: "Browser push notifications", checked: true },
                  { label: "New followers", desc: "Get notified when someone follows you", checked: false },
                  { label: "Comment replies", desc: "Notifications for comment threads", checked: true },
                  { label: "Weekly digest", desc: "Summary of your weekly performance", checked: true },
                  { label: "Marketing emails", desc: "Product updates and feature announcements", checked: false },
                ].map((n, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                    <div>
                      <p className="text-sm font-medium">{n.label}</p>
                      <p className="text-xs text-white/30">{n.desc}</p>
                    </div>
                    <button
                      className={`w-10 h-6 rounded-full relative transition-colors ${n.checked ? "bg-indigo-600" : "bg-white/10"}`}
                    >
                      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${n.checked ? "left-5" : "left-1"}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="rounded-2xl border border-white/[0.06] bg-[#0c0c14] p-6 space-y-4">
              <h3 className="text-sm font-semibold mb-2">Security Settings</h3>
              {[
                { label: "Change Password", desc: "Last changed 30 days ago" },
                { label: "Two-Factor Authentication", desc: "Add an extra layer of security" },
                { label: "Active Sessions", desc: "Manage devices logged into your account" },
                { label: "Login History", desc: "Review recent sign-in activity" },
              ].map((item, i) => (
                <button key={i} className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors text-left">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-white/30">{item.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/20" />
                </button>
              ))}
            </div>
          )}

          {(activeTab === "appearance" || activeTab === "billing" || activeTab === "api") && (
            <div className="rounded-2xl border border-white/[0.06] bg-[#0c0c14] p-6 flex flex-col items-center justify-center h-[300px]">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] flex items-center justify-center mb-4">
                <Monitor className="w-6 h-6 text-white/20" />
              </div>
              <p className="text-sm font-medium">Coming Soon</p>
              <p className="text-xs text-white/30 mt-1 text-center max-w-xs">This section is under development. Check back soon for updates.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
