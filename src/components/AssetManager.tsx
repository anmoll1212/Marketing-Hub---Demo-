import React, { useState } from "react";
import { FolderHeart, Image, UploadCloud, Info, CheckCircle2, ChevronRight, Download, Sliders, ExternalLink } from "lucide-react";

export default function AssetManager() {
  const [assets, setAssets] = useState([
    {
      id: "media-1",
      name: "SaaS Cyber audit hero banner",
      type: "PNG Graphic",
      ratio: "16:9 Landscape",
      resolution: "1920 x 1080px",
      size: "1.4 MB",
      campaign: "SaaS Launch - AI CodeReviewer",
      adaptationsCount: 3,
      approved: true,
    },
    {
      id: "media-2",
      name: "Bamboo Glistening beach water",
      type: "WebP Artwork",
      ratio: "1:1 Square Ad",
      resolution: "1080 x 1080px",
      size: "420 KB",
      campaign: "Eco Bottle Summer Promo",
      adaptationsCount: 1,
      approved: false,
    },
    {
      id: "media-3",
      name: "Institutional Consensus newsletter",
      type: "JPEG Visual",
      ratio: "4:3 Newsletter banner",
      resolution: "800 x 600px",
      size: "210 KB",
      campaign: "QuantumFintech Consensus",
      adaptationsCount: 2,
      approved: true,
    },
  ]);

  const [simulationUploaded, setSimulationUploaded] = useState(false);
  const [isFileOver, setIsFileOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsFileOver(true);
  };

  const handleDragLeave = () => {
    setIsFileOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsFileOver(false);
    setSimulationUploaded(true);
    
    // Add dynamic mockup asset
    const newAsset = {
      id: `media-${Date.now()}`,
      name: "Uploaded Asset Manual Draft",
      type: "JPEG Image",
      ratio: "16:9 Widescreen",
      resolution: "1280 x 720px",
      size: "820 KB",
      campaign: "Dynamic Selected Channel Setup",
      adaptationsCount: 3,
      approved: false
    };
    setAssets([newAsset, ...assets]);
  };

  const toggleApprovalStatus = (id: string) => {
    setAssets((prev) =>
      prev.map((a) => (a.id === id ? { ...a, approved: !a.approved } : a))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-slate-800 text-base font-bold">Multichannel Asset Repository</h2>
          <p className="text-slate-400 text-xs mt-0.5">Manage, approve, and auto-convert campaign imagery ratios dynamically.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Drag & Drop upload Zone */}
        <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-slate-800 text-sm font-bold flex items-center gap-1.5">
              <FolderHeart className="w-4 h-4 text-indigo-500" />
              Upload Asset Manual
            </h3>
            <p className="text-slate-405 text-slate-400 text-[11px] mt-0.5">Drag brand design files to feed the automatic adaptor.</p>
          </div>

          {/* Interactive drag area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => setSimulationUploaded(true)}
            className={`cursor-pointer border-2 border-dashed rounded-xl p-8 py-12 text-center transition-all ${
              isFileOver
                ? "border-indigo-600 bg-indigo-50/40"
                : "border-slate-200 bg-slate-50 hover:bg-slate-550/10 hover:border-slate-350"
            }`}
          >
            <UploadCloud className="w-10 h-10 text-slate-300 mx-auto mb-3 animate-pulse" />
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-800 block">Drag & drop files here</span>
              <span className="text-[10px] text-slate-405 text-slate-400 block font-medium">Accepts custom PNG, JPG, or styled HTML up to 15MB</span>
              <span className="text-[9px] bg-slate-105 bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono font-bold uppercase inline-block">Click to simulate upload</span>
            </div>
          </div>

          {simulationUploaded && (
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-4 rounded-lg text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Asset Upload Processed</span>
                Campaign adaptor has cataloged your file and is compiling standard media dimensions.
              </div>
            </div>
          )}

          {/* Sizing Specifications guide panel */}
          <div className="bg-slate-50 border border-slate-10 border-slate-200 rounded p-4 text-[11px] text-slate-600 space-y-2 leading-relaxed">
            <span className="font-bold text-slate-850 block uppercase text-[10px] tracking-wider text-slate-800">Ratio specifications required</span>
            <div className="divide-y divide-slate-150 space-y-1 text-[11px]">
              <div className="flex justify-between py-1">
                <span className="text-slate-450 font-medium">Twitter Image</span>
                <span className="font-mono text-slate-500">16:9 (1200 x 675)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-450 font-medium">LinkedIn Graphic</span>
                <span className="font-mono text-slate-500">1.91:1 (1200 x 627)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-450 font-medium">Instagram Stories</span>
                <span className="font-mono text-slate-500">9:16 (1080 x 1920)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Assets Grid */}
        <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm lg:col-span-2 space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 block">Catalog-approved Campaign Media</span>
            <span className="text-[9px] font-mono text-slate-400 font-bold uppercase">Dynamic Conversions Adaptor</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assets.map((a) => (
              <div
                key={a.id}
                className="bg-slate-50 border border-slate-200 hover:border-slate-300 transition rounded-xl p-4 flex flex-col justify-between text-xs space-y-3"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] bg-slate-200 text-slate-700 font-mono font-bold px-1.5 py-0.5 rounded">
                      {a.type}
                    </span>

                    <button
                      onClick={() => toggleApprovalStatus(a.id)}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border transition-all ${
                        a.approved
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700 font-bold"
                          : "bg-amber-50 border-amber-200 text-amber-700 font-bold hover:bg-emerald-50"
                      }`}
                    >
                      {a.approved ? "Approved" : "Pending Signoff"}
                    </button>
                  </div>

                  <span className="font-bold text-slate-800 text-xs block truncate" title={a.name}>
                    {a.name}
                  </span>

                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-455 text-slate-500 pt-1">
                    <span>Ratio: <strong>{a.ratio}</strong></span>
                    <span>Resolution: <strong>{a.resolution}</strong></span>
                    <span>Size: <strong>{a.size}</strong></span>
                    <span>Campaign: <strong className="truncate block">{a.campaign}</strong></span>
                  </div>
                </div>

                {/* Foot indicators */}
                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] mt-1">
                  <span className="text-indigo-600 font-bold block">
                    {a.adaptationsCount} automatic conversions created
                  </span>

                  <button className="text-slate-500 hover:text-slate-800 flex items-center gap-1 font-bold">
                    <Download className="w-3.5 h-3.5" /> Download Pack
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
