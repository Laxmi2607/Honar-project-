"use client";

import { MessageSquare, Search, Send, Paperclip, Smile, MoreHorizontal, Phone, Video, Pin } from "lucide-react";
import { useState } from "react";

const conversations = [
  { name: "Sarah Chen", message: "Let's collab on that AI post!", time: "2m", unread: 3, avatar: "S", online: true },
  { name: "Mark Digital", message: "The sponsorship deal looks great", time: "15m", unread: 1, avatar: "M", online: true },
  { name: "Luna Creative", message: "Sent you the designs ✨", time: "1h", unread: 0, avatar: "L", online: false },
  { name: "Dev Community", message: "Alex: Thanks for the tutorial!", time: "3h", unread: 12, avatar: "D", online: true },
  { name: "Brand Inbox", message: "Partnership inquiry from Nike", time: "5h", unread: 2, avatar: "B", online: false },
];

const messages = [
  { sender: "Sarah Chen", content: "Hey Alex! I loved your latest blog post on Next.js 15. Would you be interested in doing a collab?", time: "10:30 AM", isOwn: false },
  { sender: "You", content: "Thanks Sarah! Absolutely, I'd love that. What did you have in mind?", time: "10:32 AM", isOwn: true },
  { sender: "Sarah Chen", content: "I was thinking we could do a joint Twitter Space about AI in content creation. My audience would love your take on it.", time: "10:35 AM", isOwn: false },
  { sender: "Sarah Chen", content: "Let's collab on that AI post! We could also cross-promote on Instagram.", time: "10:36 AM", isOwn: false },
];

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(0);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
        <p className="text-white/40 text-sm mt-1">Collaborate with creators and manage brand inquiries.</p>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-[#0c0c14] overflow-hidden h-[calc(100vh-220px)] flex">
        {/* Conversation List */}
        <div className="w-[320px] border-r border-white/[0.06] flex flex-col hidden md:flex">
          <div className="p-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-2">
              <Search className="w-3.5 h-3.5 text-white/30" />
              <input type="text" placeholder="Search messages..." className="bg-transparent text-xs text-white placeholder:text-white/30 outline-none w-full" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv, i) => (
              <div
                key={i}
                onClick={() => setSelectedChat(i)}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors border-b border-white/[0.03] ${
                  selectedChat === i ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
                }`}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold">
                    {conv.avatar}
                  </div>
                  {conv.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0c0c14]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium truncate">{conv.name}</p>
                    <span className="text-[10px] text-white/30 flex-shrink-0">{conv.time}</span>
                  </div>
                  <p className="text-xs text-white/40 truncate mt-0.5">{conv.message}</p>
                </div>
                {conv.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-indigo-500 text-white text-[10px] flex items-center justify-center font-bold flex-shrink-0">
                    {conv.unread}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="h-14 border-b border-white/[0.06] flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold">
                {conversations[selectedChat].avatar}
              </div>
              <div>
                <p className="text-sm font-medium">{conversations[selectedChat].name}</p>
                <p className="text-[11px] text-emerald-400">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 rounded-lg hover:bg-white/[0.06] transition-colors"><Phone className="w-4 h-4 text-white/40" /></button>
              <button className="p-2 rounded-lg hover:bg-white/[0.06] transition-colors"><Video className="w-4 h-4 text-white/40" /></button>
              <button className="p-2 rounded-lg hover:bg-white/[0.06] transition-colors"><MoreHorizontal className="w-4 h-4 text-white/40" /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${
                  msg.isOwn
                    ? "bg-indigo-600 text-white rounded-br-md"
                    : "bg-white/[0.06] text-white/80 rounded-bl-md"
                }`}>
                  <p>{msg.content}</p>
                  <p className={`text-[10px] mt-1 ${msg.isOwn ? "text-white/50" : "text-white/30"}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/[0.06]">
            <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-2">
              <button className="p-1 hover:bg-white/[0.06] rounded-lg transition-colors">
                <Paperclip className="w-4 h-4 text-white/30" />
              </button>
              <input type="text" placeholder="Type a message..." className="bg-transparent text-sm text-white placeholder:text-white/30 outline-none flex-1" />
              <button className="p-1 hover:bg-white/[0.06] rounded-lg transition-colors">
                <Smile className="w-4 h-4 text-white/30" />
              </button>
              <button className="p-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors">
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
