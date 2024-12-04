import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import VerticalMenu from '../components/VerticalMenu'
import HeaderDashboard from '../components/Headerdashboard'
const StaffDashboard = () => {
    return (
        <div className="flex">
            {/* Vertical Menu */}
            <VerticalMenu />
            {/* Main Content */}
            <div className="flex-1 bg-gray-50">
                {/* Header */}
                <HeaderDashboard />

                <div className="flex">
                    {/* Charts Section */}
                    <div className="flex-1 p-6">

                    </div>

                </div>
            </div>
        </div>
    )
}

export default StaffDashboard