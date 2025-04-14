import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Package, 
  Tag, 
  Barcode, 
  Scale, 
  AlertCircle,
  Settings,
  User
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  barcode?: string;
  isWeighted?: boolean;
  promotion?: string;
}

function App() {
  const [activeTab, setActiveTab] = useState('pos');
  
  // Mock data for demonstration
  const products: Product[] = [
    { id: '1', name: 'Manzana', price: 25.50, stock: 3, isWeighted: true },
    { id: '2', name: 'Plátano', price: 22.00, stock: 4, isWeighted: true },
    { id: '3', name: 'Leche', price: 28.50, stock: 10, barcode: '7501055901234' },
    { id: '4', name: 'Pan', price: 35.00, stock: 2, promotion: '2x1' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-20 bg-indigo-800 min-h-screen flex flex-col items-center py-8">
        <div className="flex flex-col space-y-8">
          <button 
            onClick={() => setActiveTab('pos')}
            className={`p-3 rounded-xl ${activeTab === 'pos' ? 'bg-indigo-700 text-white' : 'text-indigo-300 hover:bg-indigo-700/50'}`}
          >
            <ShoppingCart size={24} />
          </button>
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`p-3 rounded-xl ${activeTab === 'inventory' ? 'bg-indigo-700 text-white' : 'text-indigo-300 hover:bg-indigo-700/50'}`}
          >
            <Package size={24} />
          </button>
          <button 
            onClick={() => setActiveTab('promotions')}
            className={`p-3 rounded-xl ${activeTab === 'promotions' ? 'bg-indigo-700 text-white' : 'text-indigo-300 hover:bg-indigo-700/50'}`}
          >
            <Tag size={24} />
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`p-3 rounded-xl ${activeTab === 'settings' ? 'bg-indigo-700 text-white' : 'text-indigo-300 hover:bg-indigo-700/50'}`}
          >
            <Settings size={24} />
          </button>
        </div>
        <div className="mt-auto">
          <button className="p-3 text-indigo-300 hover:bg-indigo-700/50 rounded-xl">
            <User size={24} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            {activeTab === 'pos' && 'Punto de Venta'}
            {activeTab === 'inventory' && 'Inventario'}
            {activeTab === 'promotions' && 'Promociones'}
            {activeTab === 'settings' && 'Configuración'}
          </h1>
          <div className="flex items-center space-x-4">
            {products.some(p => p.stock <= 5) && (
              <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg flex items-center">
                <AlertCircle size={20} className="mr-2" />
                <span>Productos con bajo stock</span>
              </div>
            )}
          </div>
        </div>

        {/* POS View */}
        {activeTab === 'pos' && (
          <div className="grid grid-cols-12 gap-6">
            {/* Products Grid */}
            <div className="col-span-8 bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-1 relative">
                  <input 
                    type="text"
                    placeholder="Buscar producto o escanear código de barras..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <Barcode className="absolute left-3 top-2.5 text-gray-400" size={20} />
                </div>
                <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                  <Scale size={20} />
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {products.map(product => (
                  <div 
                    key={product.id}
                    className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 cursor-pointer transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-800">{product.name}</h3>
                      {product.promotion && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          {product.promotion}
                        </span>
                      )}
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                      {product.isWeighted && <span className="text-sm text-gray-500">/kg</span>}
                    </p>
                    <p className={`text-sm ${product.stock <= 5 ? 'text-red-600' : 'text-gray-500'}`}>
                      Stock: {product.stock} {product.isWeighted ? 'kg' : 'unidades'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart */}
            <div className="col-span-4 bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Carrito de Compra</h2>
              <div className="space-y-4 mb-6">
                <p className="text-gray-500 text-center py-8">
                  Selecciona productos para agregar al carrito
                </p>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">IVA (16%)</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>$0.00</span>
                </div>
                <button className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700">
                  Procesar Venta
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;