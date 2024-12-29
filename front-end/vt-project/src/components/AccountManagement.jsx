import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { auth } from "../utils/api";

const AccountManagement = () => {
    const [accounts, setAccounts] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedAccount, setSelectedAccount] = useState(null);

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/accounts/search', {
                method: 'POST',
                headers: {
                    ...auth.getAuthHeaders(),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    keyword: searchKeyword,
                    paging: {
                        page: 1,
                        size: 10
                    }
                })
            });
            if (response.ok) {
                const data = await response.json();

                const accountsData = data.data?.contents || [];
                setAccounts(accountsData);
            } else {
                toast.error('Failed to fetch accounts');
            }
        } catch (error) {
            toast.error('Error fetching accounts');
        }
    };
    const handleCreateStaff = async (formData) => {
        try {

            const isoDate = new Date(formData.dateOfBirth).toISOString();
            const response = await fetch('http://localhost:8080/api/v1/accounts/staff', {

                method: 'POST',
                headers: {
                    ...auth.getAuthHeaders(),

                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fullName: formData.fullName,
                    userName: formData.userName,
                    dateOfBirth: isoDate,
                    email: formData.email,
                    phoneNumber: formData.phoneNumber,
                    address: formData.address
                })
            });

            if (response.ok) {
                const result = await response.json();
                if (result.status === 'OK') {
                    toast.success('Staff account created successfully');
                    fetchAccounts();
                    setShowCreateModal(false);
                } else {
                    toast.error(result.message || 'Failed to create staff account');
                }
            }
        } catch (error) {
            console.error('Error creating staff account:', error);
            toast.error('Error creating staff account');
        }
    };
    const CreateStaffModal = ({ onClose, onSubmit }) => {
        const [formData, setFormData] = useState({
            fullName: '',
            userName: '',
            dateOfBirth: '',
            email: '',
            phoneNumber: '',

            address: ''
        });

        const handleSubmit = (e) => {
            e.preventDefault();
            onSubmit(formData);
        };

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({
                ...formData,
                [name]: value
            });
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Create Staff Account</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>



                        <div>
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                rows="3"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="flex justify-end space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                            >
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    const handleUpdateAccount = async (id, formData) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/accounts/${id}`, {
                method: 'PATCH',
                headers: auth.getAuthHeaders(),
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                toast.success('Account updated successfully');
                fetchAccounts();
                setSelectedAccount(null);
            } else {
                toast.error('Failed to update account');
            }
        } catch (error) {
            toast.error('Error updating account');
        }
    };

    const handleBanAccount = async (id) => {
        if (window.confirm('Are you sure you want to ban this account?')) {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/accounts/${id}`, {
                    method: 'DELETE',
                    headers: {
                        ...auth.getAuthHeaders(),
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    toast.success('Account banned successfully');
                    fetchAccounts();
                } else {
                    const errorData = await response.json();
                    toast.error(errorData.message || 'Failed to ban account');
                }
            } catch (error) {
                console.error('Error banning account:', error);
                toast.error('Error banning account');
            }
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Account Management</h1>
                <p className="text-gray-600">Manage user accounts and staff</p>
            </div>

            <div className="mb-6 flex justify-between items-center">
                <div className="flex-1 max-w-md">
                    <input
                        type="text"
                        placeholder="Search accounts..."
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && fetchAccounts()}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg ml-4"
                >
                    Create Staff Account +
                </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 p-11">
                        <tr>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">ID</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Full Name</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Username</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Phone Number</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200  ">
                        {accounts.map((account) => (
                            <tr key={account.id}>
                                <td className="p- py-4 whitespace-nowrap">{account.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{account.fullName}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{account.userName}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{account.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{account.phoneNumber}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 rounded-full text-xs ${account.status === 'ACTIVE'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                        }`}>
                                        {account.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => setSelectedAccount(account)}
                                        className="text-blue-600 hover:text-blue-800 mr-3"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleBanAccount(account.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Ban
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Create Staff Modal */}
            {showCreateModal && (
                <CreateStaffModal
                    onClose={() => setShowCreateModal(false)}
                    onSubmit={handleCreateStaff}
                />
            )}

            {/* Edit Account Modal */}
            {selectedAccount && (
                <EditAccountModal
                    account={selectedAccount}
                    onClose={() => setSelectedAccount(null)}
                    onSubmit={(formData) => handleUpdateAccount(selectedAccount.id, formData)}
                />
            )}
        </div>
    );
};

// Create Staff Modal Component
const CreateStaffModal = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Create Staff Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded-md text-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Edit Account Modal Component
const EditAccountModal = ({ account, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        username: account.username,
        email: account.email,
        role: account.role
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Edit Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded-md text-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AccountManagement;