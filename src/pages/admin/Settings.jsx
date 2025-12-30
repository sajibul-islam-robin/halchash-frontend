import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Settings as SettingsIcon, Key, User, Shield } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import toast from 'react-hot-toast';

const Settings = () => {
  const { admin, updateAdmin, changePassword, fetchAdmin } = useAdminAuth();
  const [showEdit, setShowEdit] = useState(false);
  const [showChange, setShowChange] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', full_name: '' });
  const [pwdData, setPwdData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (admin) {
      setFormData({ username: admin.username || '', email: admin.email || '', full_name: admin.full_name || '' });
    }
  }, [admin]);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your admin account and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-600" />
              Profile Settings
            </CardTitle>
            <CardDescription>Update your profile information</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Manage your admin profile details</p>
            <Button variant="outline" onClick={() => setShowEdit(true)}>Edit Profile</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Key className="h-5 w-5 mr-2 text-green-600" />
              Change Password
            </CardTitle>
            <CardDescription>Update your account password</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Change your admin password</p>
            <Button variant="outline" onClick={() => setShowChange(true)}>Change Password</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-purple-600" />
              Security
            </CardTitle>
            <CardDescription>Manage security settings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Configure security preferences</p>
            <Button variant="outline">Security Settings</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <SettingsIcon className="h-5 w-5 mr-2 text-orange-600" />
              System Settings
            </CardTitle>
            <CardDescription>Configure system preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Manage system-wide settings</p>
            <Button variant="outline">System Settings</Button>
          </CardContent>
        </Card>
      </div>

      {/* Edit Profile Modal */}
      {showEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Edit Profile</h3>
              <button onClick={() => setShowEdit(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <Input name="username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <Input name="full_name" value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input name="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={async () => {
                  setLoading(true);
                  const res = await updateAdmin(formData);
                  setLoading(false);
                  if (res.success) {
                    toast.success('Profile updated');
                    setShowEdit(false);
                    fetchAdmin();
                  } else {
                    toast.error(res.error || 'Update failed');
                  }
                }}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </Button>
              <Button onClick={() => setShowEdit(false)} variant="outline" className="flex-1">Cancel</Button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChange && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Change Password</h3>
              <button onClick={() => setShowChange(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <Input name="currentPassword" type="password" value={pwdData.currentPassword} onChange={(e) => setPwdData({ ...pwdData, currentPassword: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <Input name="newPassword" type="password" value={pwdData.newPassword} onChange={(e) => setPwdData({ ...pwdData, newPassword: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <Input name="confirmPassword" type="password" value={pwdData.confirmPassword} onChange={(e) => setPwdData({ ...pwdData, confirmPassword: e.target.value })} />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={async () => {
                  if (!pwdData.currentPassword || !pwdData.newPassword) {
                    toast.error('Please fill passwords');
                    return;
                  }
                  if (pwdData.newPassword !== pwdData.confirmPassword) {
                    toast.error('Passwords do not match');
                    return;
                  }
                  setLoading(true);
                  const res = await changePassword(pwdData.currentPassword, pwdData.newPassword);
                  setLoading(false);
                  if (res.success) {
                    toast.success('Password changed');
                    setShowChange(false);
                    setPwdData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                  } else {
                    toast.error(res.error || 'Failed to change password');
                  }
                }}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Change Password'}
              </Button>
              <Button onClick={() => setShowChange(false)} variant="outline" className="flex-1">Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;

