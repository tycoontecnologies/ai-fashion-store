export default function AnalyticsWidget(){

  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h3 className="font-bold mb-2">
        Analytics
      </h3>

      <ul className="space-y-2">
        <li>Revenue Today</li>
        <li>Orders Today</li>
        <li>Products</li>
        <li>Customers</li>
      </ul>
    </div>
  );
}
