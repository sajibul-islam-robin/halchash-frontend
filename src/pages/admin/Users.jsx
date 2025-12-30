import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { API_BASE_URL } from '../../config/api';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Search, Ban, CheckCircle, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

const Users = () => {
  const { getAuthHeaders } = useAdminAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [blockedFilter, setBlockedFilter] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [searchTerm, blockedFilter]);

  const fetchUsers = async () => {
    try {
      let url = `${API_BASE_URL}/api/users?search=${searchTerm}`;
      if (blockedFilter) url += `&blocked=${blockedFilter}`;
      
      const response = await fetch(url, { headers: getAuthHeaders() });
      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
      } else {
        toast.error(data.error || 'Failed to fetch users');
      }
    } catch (error) {
      toast.error('Failed to fetch users: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBlock = async (userId) => {
    if (!confirm('Are you sure you want to block this user?')) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${userId}/block`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ reason: 'Admin action' })
      });
      const data = await response.json();
      if (data.success) {
        toast.success('User blocked');
        fetchUsers();
      }
    } catch (error) {
      toast.error('Failed to block user');
    }
  };

  const handleUnblock = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${userId}/unblock`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      const data = await response.json();
      if (data.success) {
        toast.success('User unblocked');
        fetchUsers();
      }
    } catch (error) {
      toast.error('Failed to unblock user');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-500 mt-1">Manage registered users</p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={blockedFilter}
          onChange={(e) => setBlockedFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">All Users</option>
          <option value="false">Active</option>
          <option value="true">Blocked</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone || '-'}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${user.is_blocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {user.is_blocked ? 'Blocked' : 'Active'}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {user.is_blocked ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUnblock(user._id)}
                        >
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleBlock(user._id)}
                        >
                          <Ban className="h-4 w-4 text-red-600" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Users;

