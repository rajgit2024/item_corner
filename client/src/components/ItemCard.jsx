function ItemCard({ item, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer transform hover:-translate-y-1 overflow-hidden"
    >
      {/* Item Image */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src={`http://localhost:5000${item.cover_image}`}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
        />
      </div>

      {/* Item Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate flex-1 mr-2">{item.name}</h3>
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap">
            {item.type}
          </span>
        </div>

        {item.description && (
          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
            {item.description.length > 100 ? `${item.description.substring(0, 100)}...` : item.description}
          </p>
        )}
      </div>
    </div>
  )
}

export default ItemCard
