
import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProfileForm from '@/components/user/ProfileForm';
import { useAuth } from '@/contexts/AuthContext';
import CustomButton from '@/components/ui/CustomButton';
import { LogOut } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, signOut, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="content-container py-12">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-display font-bold">Your Profile</h1>
            <CustomButton 
              onClick={signOut} 
              variant="outline"
              size="sm"
            >
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </CustomButton>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="glass-morphism p-6 rounded-lg">
                <h2 className="text-xl font-medium mb-6">Account Information</h2>
                <ProfileForm />
              </div>
            </div>
            
            <div>
              <div className="glass-morphism p-6 rounded-lg mb-6">
                <h2 className="text-xl font-medium mb-4">Account Details</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p>{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Account ID</p>
                    <p className="text-xs truncate">{user.id}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
