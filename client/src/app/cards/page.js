import Link from 'next/link';

export default function CardsPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl mb-8">
          Magic Card Collection
        </h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Placeholder card items */}
          {[1, 2, 3, 4, 5, 6].map((card) => (
            <div key={card} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Card {card}
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel bibendum
                    consectetur, nisl nisl aliquam eros, nec tincidunt nisl nunc eget purus.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}