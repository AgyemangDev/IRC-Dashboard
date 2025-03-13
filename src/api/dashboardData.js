// This is a sample API file that would fetch real data in a production environment
// You can use this as a template for implementing actual API calls

export const fetchDashboardData = async () => {
    try {
      // In a real application, you would make API calls here
      // const response = await fetch('/api/dashboard-stats');
      // const data = await response.json();
  
      // For demonstration, we'll return mock data
      return {
        membershipData: [
          { name: "Full Members", value: 65, color: "#4f46e5" },
          { name: "Associate Members", value: 35, color: "#818cf8" },
        ],
        orgTypeData: [
          { name: "NGO", count: 42, color: "#4f46e5" },
          { name: "Government", count: 28, color: "#818cf8" },
          { name: "Academic", count: 35, color: "#6366f1" },
          { name: "Private", count: 18, color: "#a5b4fc" },
          { name: "International", count: 22, color: "#3730a3" },
        ],
        monthlyData: [
          { name: "Jan", registrations: 5 },
          { name: "Feb", registrations: 8 },
          { name: "Mar", registrations: 12 },
          { name: "Apr", registrations: 7 },
          { name: "May", registrations: 15 },
          { name: "Jun", registrations: 10 },
          { name: "Jul", registrations: 13 },
          { name: "Aug", registrations: 18 },
          { name: "Sep", registrations: 14 },
          { name: "Oct", registrations: 9 },
          { name: "Nov", registrations: 11 },
          { name: "Dec", registrations: 7 },
        ],
        locationData: [
          { id: "nairobi", name: "Nairobi", count: 45, x: 60, y: 55 },
          { id: "mombasa", name: "Mombasa", count: 28, x: 65, y: 60 },
          { id: "kisumu", name: "Kisumu", count: 22, x: 55, y: 55 },
          { id: "nakuru", name: "Nakuru", count: 18, x: 58, y: 53 },
          { id: "eldoret", name: "Eldoret", count: 15, x: 56, y: 51 },
        ],
        summaryStats: [
          { title: "Total Organizations", value: 145, icon: "Building", change: "+12%", changeType: "positive" },
          { title: "Active Members", value: 94, icon: "UserCheck", change: "+8%", changeType: "positive" },
          { title: "Pending Approvals", value: 17, icon: "UserMinus", change: "-5%", changeType: "negative" },
          { title: "Countries Represented", value: 12, icon: "Globe", change: "+2", changeType: "positive" },
        ],
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      throw error
    }
  }
  
  