export default function AIUsageWidget(){

  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h3 className="font-bold mb-2">
        AI Usage
      </h3>

      <div className="text-3xl font-black">
        0 Tokens
      </div>

      <div className="text-sm text-gray-500">
        OpenAI tracking pending
      </div>
    </div>
  );
}
