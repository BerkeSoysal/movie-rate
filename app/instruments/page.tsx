import { createClient } from '@/utils/supabase/server';

export default async function Instruments() {
  const supabase = await createClient();
  const { data: instruments } = await supabase.from("instruments").select();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Instruments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {instruments?.map((instrument) => (
          <div 
            key={instrument.id} 
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{instrument.name}</h2>
            {instrument.description && (
              <p className="text-gray-600 mb-2">{instrument.description}</p>
            )}
            {instrument.type && (
              <p className="text-sm text-gray-500">Type: {instrument.type}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}