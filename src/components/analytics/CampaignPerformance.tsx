import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const activityData = [
    { name: 'Mon', active: 4000, new: 2400 },
    { name: 'Tue', active: 3000, new: 1398 },
    { name: 'Wed', active: 2000, new: 9800 },
    { name: 'Thu', active: 2780, new: 3908 },
    { name: 'Fri', active: 1890, new: 4800 },
    { name: 'Sat', active: 2390, new: 3800 },
    { name: 'Sun', active: 3490, new: 4300 },
];

const conversionData = [
    { name: 'Jan', rate: 2.3 },
    { name: 'Feb', rate: 3.1 },
    { name: 'Mar', rate: 4.0 },
    { name: 'Apr', rate: 3.8 },
    { name: 'May', rate: 5.2 },
    { name: 'Jun', rate: 6.1 },
];

export function CampaignPerformance() {
    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>
                    Compare your campaign metrics over time
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="activity">
                    <TabsList className="mb-4">
                        <TabsTrigger value="activity">User Activity</TabsTrigger>
                        <TabsTrigger value="conversions">Conversion Rate</TabsTrigger>
                    </TabsList>

                    <TabsContent value="activity" className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={activityData}>
                                <defs>
                                    <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }}
                                    itemStyle={{ fontSize: '12px' }}
                                />
                                <Legend />
                                <Area type="monotone" dataKey="new" stroke="#ec4899" fillOpacity={1} fill="url(#colorNew)" name="New Users" />
                                <Area type="monotone" dataKey="active" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorActive)" name="Active Users" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </TabsContent>

                    <TabsContent value="conversions" className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={conversionData}>
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }}
                                    cursor={{ fill: 'transparent' }}
                                />
                                <Bar dataKey="rate" fill="#10b981" radius={[4, 4, 0, 0]} name="Conversion Rate %" />
                            </BarChart>
                        </ResponsiveContainer>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
