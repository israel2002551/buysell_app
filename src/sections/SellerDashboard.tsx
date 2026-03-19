import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Package, Plus, Receipt, TrendingUp, 
  Link2, Star, Wallet, Settings, BarChart3, Users, 
  ChevronRight, ArrowUpRight, ArrowDownRight, MoreHorizontal,
  Edit, Trash2, Eye, Pause, Play, Upload, Globe,
  DollarSign, ShoppingCart, Clock, CheckCircle, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Product, UserProfile } from '@/App';
import { cn, formatCurrency } from '@/lib/utils';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

interface SellerDashboardProps {
  user: UserProfile;
  products: Product[];
}

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'products', label: 'My Products', icon: Package },
  { id: 'add-product', label: 'Add Product', icon: Plus },
  { id: 'orders', label: 'Orders', icon: Receipt },
  { id: 'dropshipping', label: 'Dropshipping', icon: Globe },
  { id: 'affiliate', label: 'Affiliate', icon: Link2 },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'withdrawals', label: 'Withdrawals', icon: Wallet },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const salesData = [
  { name: 'Mon', sales: 45000 },
  { name: 'Tue', sales: 52000 },
  { name: 'Wed', sales: 48000 },
  { name: 'Thu', sales: 61000 },
  { name: 'Fri', sales: 75000 },
  { name: 'Sat', sales: 82000 },
  { name: 'Sun', sales: 68000 },
];

const categoryData = [
  { name: 'Electronics', value: 45, color: '#10b981' },
  { name: 'Fashion', value: 30, color: '#f59e0b' },
  { name: 'Home', value: 15, color: '#3b82f6' },
  { name: 'Others', value: 10, color: '#8b5cf6' },
];

const recentOrders = [
  { id: 'ORD-001', customer: 'John Doe', amount: 125000, status: 'pending', date: '2 mins ago' },
  { id: 'ORD-002', customer: 'Jane Smith', amount: 45000, status: 'confirmed', date: '15 mins ago' },
  { id: 'ORD-003', customer: 'Mike Johnson', amount: 280000, status: 'shipped', date: '1 hour ago' },
  { id: 'ORD-004', customer: 'Sarah Williams', amount: 95000, status: 'delivered', date: '3 hours ago' },
];

const reviews = [
  { id: 1, customer: 'Alice Brown', rating: 5, comment: 'Excellent product! Fast delivery.', product: 'iPhone 15 Pro Max', date: '2 days ago' },
  { id: 2, customer: 'Bob Davis', rating: 4, comment: 'Good quality, as described.', product: 'Samsung Galaxy S24', date: '3 days ago' },
  { id: 3, customer: 'Carol White', rating: 5, comment: 'Amazing seller! Will buy again.', product: 'MacBook Pro M3', date: '5 days ago' },
];

export function SellerDashboard({ user, products }: SellerDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const stats = [
    { 
      label: 'Total Revenue', 
      value: '₦2,450,000', 
      change: '+12.5%', 
      trend: 'up',
      icon: DollarSign,
      color: 'bg-emerald-500'
    },
    { 
      label: 'Active Products', 
      value: products.length.toString(), 
      change: '+3', 
      trend: 'up',
      icon: Package,
      color: 'bg-blue-500'
    },
    { 
      label: 'Total Orders', 
      value: '156', 
      change: '+8.2%', 
      trend: 'up',
      icon: ShoppingCart,
      color: 'bg-amber-500'
    },
    { 
      label: 'Avg Rating', 
      value: '4.8', 
      change: '+0.2', 
      trend: 'up',
      icon: Star,
      color: 'bg-purple-500'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'confirmed': return 'bg-blue-100 text-blue-700';
      case 'shipped': return 'bg-purple-100 text-purple-700';
      case 'delivered': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-slate-50 flex"
    >
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        className={cn(
          "fixed lg:sticky top-0 left-0 z-40 h-screen bg-white border-r border-slate-200 transition-all duration-300",
          isSidebarOpen ? "w-64" : "w-0 lg:w-20 overflow-hidden"
        )}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              {isSidebarOpen && (
                <div>
                  <span className="font-bold text-slate-900">BUY</span>
                  <span className="font-bold text-amber-500">SELL</span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
                  activeTab === item.id
                    ? "bg-emerald-50 text-emerald-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
              </button>
            ))}
          </nav>

          {/* User */}
          <div className="p-4 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-gradient-to-br from-emerald-600 to-emerald-500 text-white">
                  {user.avatar}
                </AvatarFallback>
              </Avatar>
              {isSidebarOpen && (
                <div className="min-w-0">
                  <p className="font-medium text-sm text-slate-900 truncate">{user.name}</p>
                  <p className="text-xs text-slate-500 truncate">{user.email}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
              >
                <LayoutDashboard className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-bold text-slate-900">
                {sidebarItems.find(i => i.id === activeTab)?.label}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
                <Clock className="w-4 h-4" />
                23 days left
              </Button>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 lg:p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Stats Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
                              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                              <div className="flex items-center gap-1 mt-2">
                                {stat.trend === 'up' ? (
                                  <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                                ) : (
                                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                                )}
                                <span className={cn(
                                  "text-sm font-medium",
                                  stat.trend === 'up' ? "text-emerald-500" : "text-red-500"
                                )}>
                                  {stat.change}
                                </span>
                              </div>
                            </div>
                            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", stat.color)}>
                              <stat.icon className="w-6 h-6 text-white" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Charts Row */}
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Sales Chart */}
                  <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-lg">Sales Overview</CardTitle>
                      <select className="text-sm border border-slate-200 rounded-lg px-3 py-1.5">
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>Last 90 days</option>
                      </select>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={salesData}>
                            <defs>
                              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                            <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `₦${v/1000}k`} />
                            <Tooltip 
                              formatter={(v: number) => formatCurrency(v)}
                              contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="sales" 
                              stroke="#10b981" 
                              strokeWidth={2}
                              fillOpacity={1} 
                              fill="url(#colorSales)" 
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Category Distribution */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Sales by Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={categoryData}
                              cx="50%"
                              cy="50%"
                              innerRadius={50}
                              outerRadius={80}
                              dataKey="value"
                            >
                              {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-2 mt-4">
                        {categoryData.map((cat) => (
                          <div key={cat.name} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                              <span className="text-slate-600">{cat.name}</span>
                            </div>
                            <span className="font-medium text-slate-900">{cat.value}%</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Orders & Reviews */}
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Recent Orders */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-lg">Recent Orders</CardTitle>
                      <Button variant="ghost" size="sm" className="text-emerald-600">
                        View All
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentOrders.map((order) => (
                          <div key={order.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                <Receipt className="w-5 h-5 text-emerald-600" />
                              </div>
                              <div>
                                <p className="font-medium text-sm text-slate-900">{order.id}</p>
                                <p className="text-xs text-slate-500">{order.customer}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-sm text-slate-900">{formatCurrency(order.amount)}</p>
                              <Badge className={cn("text-xs", getStatusColor(order.status))}>
                                {order.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Reviews */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-lg">Recent Reviews</CardTitle>
                      <Button variant="ghost" size="sm" className="text-emerald-600">
                        View All
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {reviews.map((review) => (
                          <div key={review.id} className="p-3 bg-slate-50 rounded-xl">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                </div>
                                <span className="font-medium text-sm text-slate-900">{review.rating}.0</span>
                              </div>
                              <span className="text-xs text-slate-400">{review.date}</span>
                            </div>
                            <p className="text-sm text-slate-600 mb-1">"{review.comment}"</p>
                            <p className="text-xs text-slate-400">on {review.product}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { icon: Plus, label: 'Add Product', desc: 'List new item', color: 'bg-emerald-500' },
                    { icon: Globe, label: 'Import Products', desc: 'Dropship items', color: 'bg-blue-500' },
                    { icon: Receipt, label: 'View Orders', desc: 'Process orders', color: 'bg-purple-500' },
                    { icon: Link2, label: 'Share Store', desc: 'Get more customers', color: 'bg-amber-500' },
                  ].map((action, index) => (
                    <motion.button
                      key={action.label}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:shadow-lg hover:border-emerald-200 transition-all text-left"
                    >
                      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", action.color)}>
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{action.label}</p>
                        <p className="text-sm text-slate-500">{action.desc}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'products' && (
              <motion.div
                key="products"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>My Products ({products.length})</CardTitle>
                    <div className="flex gap-2">
                      <select className="text-sm border border-slate-200 rounded-lg px-3 py-1.5">
                        <option>All</option>
                        <option>Active</option>
                        <option>Paused</option>
                      </select>
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Product
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {products.map((product) => (
                        <div key={product.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-slate-900 truncate">{product.name}</h3>
                            <p className="text-sm text-emerald-600 font-semibold">{formatCurrency(product.price)}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                Stock: {product.stock}
                              </Badge>
                              {product.stock <= 5 && product.stock > 0 && (
                                <Badge className="bg-amber-100 text-amber-700 text-xs">
                                  Low Stock
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-white rounded-lg transition-colors">
                              <Eye className="w-4 h-4 text-slate-400" />
                            </button>
                            <button className="p-2 hover:bg-white rounded-lg transition-colors">
                              <Edit className="w-4 h-4 text-slate-400" />
                            </button>
                            <button className="p-2 hover:bg-white rounded-lg transition-colors">
                              <Pause className="w-4 h-4 text-slate-400" />
                            </button>
                            <button className="p-2 hover:bg-white rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === 'orders' && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>All Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="p-4 border border-slate-200 rounded-xl">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                <Receipt className="w-5 h-5 text-emerald-600" />
                              </div>
                              <div>
                                <p className="font-medium text-slate-900">{order.id}</p>
                                <p className="text-sm text-slate-500">{order.customer}</p>
                              </div>
                            </div>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-500">{order.date}</p>
                            <p className="font-semibold text-slate-900">{formatCurrency(order.amount)}</p>
                          </div>
                          <div className="flex gap-2 mt-3">
                            {order.status === 'pending' && (
                              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                                Confirm Order
                              </Button>
                            )}
                            {order.status === 'confirmed' && (
                              <Button size="sm" variant="outline">
                                Mark as Shipped
                              </Button>
                            )}
                            <Button size="sm" variant="ghost">
                              Contact Buyer
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </motion.div>
  );
}
