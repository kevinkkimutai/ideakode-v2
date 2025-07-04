
export default function WalletCard() {
  return (
    <div className="bg-gradient-to-r from-[#30759E] to-[#3077A0] text-white p-6 min-h-[166px] rounded-xl shadow col-span-1 flex flex-col justify-between">
      <div>
        <p className="text-sm">Main Wallet</p>
        
      </div>
      <div className="flex items-center justify-between py-10"> 
        <h2 className="text-4xl font-bold ">MZN 245,000</h2>
        <p className="text-sm text-green-300 ">Active</p>
      </div>
       <p className="text-sm mt-2">444 221 224 ***</p>
     
    </div>
  )
}