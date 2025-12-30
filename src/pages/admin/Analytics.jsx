import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, TrendingUp, Package, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-500 mt-1">View detailed analytics and reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
              Sales Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">View revenue trends, sales reports, and top products</p>
            <Link to="/admin/dashboard" className="text-indigo-600 hover:underline mt-2 inline-block">
              View Dashboard →
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
              Revenue Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Analyze revenue patterns over time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2 text-purple-600" />
              Inventory Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Track stock levels and low stock alerts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-orange-600" />
              User Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Monitor user growth and activity</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Analytics</CardTitle>
          <CardDescription>Access comprehensive analytics from the dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            For detailed analytics including sales trends, revenue charts, top products, and user statistics,
            please visit the <Link to="/admin/dashboard" className="text-indigo-600 hover:underline">Dashboard</Link> page.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;

