export default function Loading() {
  return (
    <div className="min-h-screen bg-[#fffaf7] flex items-center justify-center px-4">
      <div className="bg-white border border-[#f3e3d3] rounded-2xl px-8 py-7 shadow-2xl flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#F15B40] border-t-transparent rounded-full animate-spin" />

        <p className="text-[#894207] font-black uppercase tracking-wide text-sm">
          Loading article...
        </p>
      </div>
    </div>
  );
}