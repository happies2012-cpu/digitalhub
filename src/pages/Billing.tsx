import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, CreditCard, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';

const invoices = [
    {
        id: 'INV-2024-001',
        date: '2024-01-14',
        amount: '₹999.00',
        plan: 'Pro Plan',
        status: 'Paid',
        method: 'PayU',
    },
    {
        id: 'INV-2023-012',
        date: '2023-12-14',
        amount: '₹999.00',
        plan: 'Pro Plan',
        status: 'Paid',
        method: 'PayU',
    },
    {
        id: 'INV-2023-011',
        date: '2023-11-14',
        amount: '₹499.00',
        plan: 'Starter Plan',
        status: 'Paid',
        method: 'Cashfree',
    },
];

const Billing = () => {
    return (
        <div className="flex h-screen bg-background">
            <DashboardSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader />
                <main className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Billing & Invoices</h1>
                            <p className="text-muted-foreground">Manage your subscription and view payment history</p>
                        </div>
                        <Button variant="outline" className="gap-2">
                            <AlertCircle className="w-4 h-4" />
                            Payment Methods
                        </Button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm font-medium text-muted-foreground">Current Plan</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-2xl font-bold">Pro Plan</h3>
                                        <p className="text-sm text-muted-foreground mt-1">Billed monthly</p>
                                    </div>
                                    <Badge className="bg-gradient-primary text-primary-foreground">Active</Badge>
                                </div>
                                <div className="mt-6 flex gap-2">
                                    <Button variant="gradient" className="w-full">Upgrade</Button>
                                    <Button variant="outline" className="w-full">Cancel</Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm font-medium text-muted-foreground">Next Payment</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-2xl font-bold">₹999.00</h3>
                                    <Badge variant="outline">Due Feb 14, 2024</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-6">
                                    Will be charged to card ending in 4242
                                </p>
                                <Button variant="outline" className="w-full gap-2">
                                    <CreditCard className="w-4 h-4" />
                                    Update Method
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm font-medium text-muted-foreground">Lifetime Value</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <h3 className="text-2xl font-bold mb-2">₹2,497.00</h3>
                                <p className="text-sm text-muted-foreground mb-6">
                                    Total amount paid since Nov 2023
                                </p>
                                <div className="flex items-center gap-2 text-sm text-success">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span>Account in good standing</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Invoice History</CardTitle>
                            <CardDescription>Download past invoices and receipts</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-muted-foreground uppercase bg-muted/50 rounded-lg">
                                        <tr>
                                            <th className="px-6 py-3">Invoice ID</th>
                                            <th className="px-6 py-3">Date</th>
                                            <th className="px-6 py-3">Plan</th>
                                            <th className="px-6 py-3">Amount</th>
                                            <th className="px-6 py-3">Status</th>
                                            <th className="px-6 py-3">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {invoices.map((invoice) => (
                                            <tr key={invoice.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                                                <td className="px-6 py-4 font-medium">{invoice.id}</td>
                                                <td className="px-6 py-4 text-muted-foreground">{invoice.date}</td>
                                                <td className="px-6 py-4">{invoice.plan}</td>
                                                <td className="px-6 py-4 font-bold">{invoice.amount}</td>
                                                <td className="px-6 py-4">
                                                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                                                        {invoice.status}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Button variant="ghost" size="sm" className="gap-2 hover:text-primary">
                                                        <Download className="w-4 h-4" />
                                                        Download
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    );
};

export default Billing;
