import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Users, Receipt, AlertTriangle, 
  Wallet, Megaphone, TrendingUp, DollarSign, 
  ShoppingBag, Star, CheckCircle, XCircle, Clock,
  ChevronRight, Search, Filter, MoreHorizontal,
  Shield, Ban, Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn, formatCurrency } from '@/lib/utils';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

const revenueData = [
  { name: 'Week 1', revenue: 450000, commission: 13500 },
  { name: 'Week 2', revenue: 520000, commission: 15600 },
  { name: 'Week 3', revenue: 480000, commission: 14400 },
  { name: 'Week 4', revenue: 610000, commission: 18300 },
];

const mockSellers = [
  { id: 1, name: 'TechHub NG', email: 'tech@example.com', status: 'active', sales: 1250000, products: 45, joined: '2024-01-15' },
  { id: 2, name: 'Fashion Store', email: 'fashion@example.com', status: 'trial', sales: 450000, products: 23, joined: '2024-02-20' },
  { id: 3, name: 'Home Essentials', email: 'home@example.com', status: 'suspended', sales: 0, products: 12, joined: '2024-01-10' },
  { id: 4, name: 'Mobile Masters', email: 'mobile@example.com', status: 'active', sales: 890000, products: 34, joined: '2024-03-01' },
];

const mockOrders = [
  { id: 'ORD-001', buyer: 'John Doe', seller: 'TechHub NG', amount: 125000, status: 'pending', date: '2 mins ago' },
  { id: 'ORD-002', buyer: 'Jane Smith', seller: 'Fashion Store', amount: 45000, status: 'confirmed', date: '15 mins ago' },
  { id: 'ORD-003', buyer: 'Mike Johnson', seller: 'Mobile Masters', amount: 280000, status: 'shipped', date: '1 hour ago' },
];

const mockDisputes = [
  { id: 1, orderId: 'ORD-045', buyer: 'Alice Brown', seller: 'TechHub NG', type: 'not-received', status: 'open', date: '2 days ago' },
  { id: 2, orderId: 'ORD-032', buyer: 'Bob Davis', seller: 'Fashion Store', type: 'wrong-item', status: 'resolved', date: '5 days ago' },
];

const mockWithdrawals = [
  { id: 1, seller: 'TechHub NG', amount: 500000, status: 'pending', date: '1 hour ago' },
  { id: 2, seller: 'Fashion Store', amount: 150000, status: 'paid', date: '2 days ago' },
];

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Sellers', value: '1,245', change: '+45', icon: Users, color: 'bg-blue-500' },
    { label: 'Total Buyers', value: '45.2K', change: '+1.2K', icon: ShoppingBag, color: 'bg-emerald-500' },
    { label: 'Total GMV', value: '₦2.4B', change: '+18.5%', icon: DollarSign, color: 'bg-amber-500' },
    { label: 'Platform Earnings', value: '₦72M', change: '+12.3%', icon: TrendingUp, color: 'bg-purple-500' },
  ];

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: 'bg-emerald-100 text-emerald-700',
      trial: 'bg-amber-100 text-amber-700',
      suspended: 'bg-red-100 text-red-700',
      pending: 'bg-amber-100 text-amber-700',
      confirmed: 'bg-blue-100 text-blue-700',
      shipped: 'bg-purple-100 text-purple-700',
      delivered: 'bg-emerald-100 text-emerald-700',
      open: 'bg-red-100 text-red-700',
      resolved: 'bg-emerald-100 text-emerald-700',
      paid: 'bg-emerald-100 text-emerald-700',
    };
    return styles[status] || 'bg-slate-100 text-slate-700';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-slate-50"
    >
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Super Admin</h1>
              <p className="text-xs text-slate-500">Platform Management</p>
            </div>
          </div>
          <Badge className="bg-red-100 text-red-700 border-red-200">
            <Shield className="w-3 h-3 mr-1" />
            RESTRICTED ACCESS
          </Badge>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="px-4 lg:px-8 py-4 border-b border-slate-200 bg-white">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-slate-100 p-1">
            <TabsTrigger value="overview" className="gap-2">
              <LayoutDashboard className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="sellers" className="gap-2">
              <Users className="w-4 h-4" />
              Sellers
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2">
              <Receipt className="w-4 h-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="disputes" className="gap-2">
              <AlertTriangle className="w-4 h-4" />
              Disputes
            </TabsTrigger>
            <TabsTrigger value="withdrawals" className="gap-2">
              <Wallet className="w-4 h-4" />
              Payouts
            </TabsTrigger>
            <TabsTrigger value="broadcast" className="gap-2">
              <Megaphone className="w-4 h-4" />
              Broadcast
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6 space-y-6">
            {/* Stats */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
                          <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                          <p className="text-sm text-emerald-500 mt-1">{stat.change}</p>
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

            {/* Revenue Chart */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Platform Revenue (30 Days)</CardTitle>
                <Button variant="outline" size="sm">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" tickFormatter={(v) => `₦${v/1000}k`} />
                      <Tooltip 
                        formatter={(v: number) => formatCurrency(v)}
                        contentStyle={{ borderRadius: 12 }}
                      />
                      <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="commission" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Seller Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Active (Paid)</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">892</span>
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="w-[72%] h-full bg-emerald-500 rounded-full" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">On Free Trial</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">245</span>
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="w-[20%] h-full bg-amber-500 rounded-full" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Suspended</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">108</span>
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="w-[8%] h-full bg-red-500 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Open Disputes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <div className="text-4xl font-bold text-red-500 mb-2">12</div>
                    <p className="text-slate-500">Active disputes requiring attention</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pending Withdrawals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <div className="text-4xl font-bold text-amber-500 mb-2">₦2.4M</div>
                    <p className="text-slate-500">From 24 sellers awaiting payout</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Sellers Tab */}
          <TabsContent value="sellers" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>All Sellers</CardTitle>
                <div className="flex gap-2">
                  <select className="text-sm border border-slate-200 rounded-lg px-3 py-1.5">
                    <option>All Sellers</option>
                    <option>Active</option>
                    <option>On Trial</option>
                    <option>Suspended</option>
                  </select>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input placeholder="Search sellers..." className="pl-9 w-64" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSellers.map((seller) => (
                    <div key={seller.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-gradient-to-br from-emerald-600 to-emerald-500 text-white">
                            {seller.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-slate-900">{seller.name}</p>
                          <p className="text-sm text-slate-500">{seller.email}</p>
                          <p className="text-xs text-slate-400">Joined {seller.joined}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="font-semibold text-slate-900">{formatCurrency(seller.sales)}</p>
                          <p className="text-sm text-slate-500">{seller.products} products</p>
                        </div>
                        <Badge className={getStatusBadge(seller.status)}>
                          {seller.status}
                        </Badge>
                        <div className="flex gap-2">
                          {seller.status !== 'active' && (
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                              <Check className="w-4 h-4" />
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            <Ban className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>All Orders</CardTitle>
                <select className="text-sm border border-slate-200 rounded-lg px-3 py-1.5">
                  <option>All Orders</option>
                  <option>Pending</option>
                  <option>Confirmed</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="p-4 border border-slate-200 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-medium text-slate-900">{order.id}</p>
                          <p className="text-sm text-slate-500">{order.date}</p>
                        </div>
                        <Badge className={getStatusBadge(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-600">Buyer: {order.buyer}</p>
                          <p className="text-sm text-slate-600">Seller: {order.seller}</p>
                        </div>
                        <p className="font-semibold text-slate-900">{formatCurrency(order.amount)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Disputes Tab */}
          <TabsContent value="disputes" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>All Disputes</CardTitle>
                <Button variant="outline" size="sm">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockDisputes.map((dispute) => (
                    <div 
                      key={dispute.id} 
                      className={cn(
                        "p-4 border-l-4 rounded-r-xl",
                        dispute.status === 'open' 
                          ? 'border-l-red-500 bg-red-50' 
                          : 'border-l-emerald-500 bg-emerald-50'
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-slate-900">Order: {dispute.orderId}</p>
                          <p className="text-sm text-slate-600">Issue: {dispute.type.replace(/-/g, ' ')}</p>
                          <p className="text-sm text-slate-500">Buyer: {dispute.buyer} | Seller: {dispute.seller}</p>
                          <p className="text-xs text-slate-400 mt-1">{dispute.date}</p>
                        </div>
                        <Badge className={getStatusBadge(dispute.status)}>
                          {dispute.status}
                        </Badge>
                      </div>
                      {dispute.status === 'open' && (
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Resolve
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600">
                            <XCircle className="w-4 h-4 mr-2" />
                            Refund
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Withdrawals Tab */}
          <TabsContent value="withdrawals" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Seller Payouts</CardTitle>
                <Button variant="outline" size="sm">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockWithdrawals.map((withdrawal) => (
                    <div 
                      key={withdrawal.id} 
                      className={cn(
                        "p-4 border-l-4 rounded-r-xl",
                        withdrawal.status === 'pending' 
                          ? 'border-l-amber-500 bg-amber-50' 
                          : 'border-l-emerald-500 bg-emerald-50'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-slate-900">{withdrawal.seller}</p>
                          <p className="text-sm text-slate-500">{withdrawal.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-slate-900">{formatCurrency(withdrawal.amount)}</p>
                          <Badge className={getStatusBadge(withdrawal.status)}>
                            {withdrawal.status}
                          </Badge>
                        </div>
                      </div>
                      {withdrawal.status === 'pending' && (
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                            <Check className="w-4 h-4 mr-2" />
                            Mark Paid
                          </Button>
                          <Button size="sm" variant="outline">
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Broadcast Tab */}
          <TabsContent value="broadcast" className="mt-6">
            <Card className="max-w-2xl">
              <CardHeader>
                <CardTitle>Send Platform Broadcast</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Target Audience</label>
                  <select className="w-full border border-slate-200 rounded-lg px-3 py-2">
                    <option>Everyone</option>
                    <option>Sellers Only</option>
                    <option>Buyers Only</option>
                    <option>Sellers on Trial</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Title</label>
                  <Input placeholder="e.g., Platform Update" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Message</label>
                  <textarea 
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 min-h-[120px]"
                    placeholder="Write your message here..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Type</label>
                  <div className="flex gap-2">
                    <Badge className="cursor-pointer bg-blue-100 text-blue-700">Info</Badge>
                    <Badge className="cursor-pointer bg-emerald-100 text-emerald-700">Success</Badge>
                    <Badge className="cursor-pointer bg-amber-100 text-amber-700">Warning</Badge>
                    <Badge className="cursor-pointer bg-red-100 text-red-700">Urgent</Badge>
                  </div>
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Megaphone className="w-4 h-4 mr-2" />
                  Send Broadcast
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
}
