import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { getProfile, updateProfile } from "@/integrations/supabase/services";
import Header from "@/components/Header";
import { Loader2 } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        navigate("/");
        return;
      }

      try {
        setLoading(true);
        const profileData = await getProfile(user.id);
        
        if (profileData) {
          setProfile(profileData);
          setFormData({
            name: profileData.name || "",
            phone: profileData.phone || "",
            address: profileData.address || ""
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    try {
      setSaving(true);
      
      const updatedProfile = await updateProfile(user.id, {
        name: formData.name,
        phone: formData.phone,
        address: formData.address
      });
      
      setProfile(updatedProfile);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full py-8 px-4">
        <Header />
        <div className="container mx-auto max-w-4xl pt-24 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full py-8 px-4">
      <Header />
      
      <div className="container mx-auto max-w-4xl pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
          <p className="text-muted-foreground">
            Manage your profile information and view your order history
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="glass shadow-sm">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user?.email || ""}
                      readOnly
                      disabled
                      className="glass bg-muted"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="glass"
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="glass"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="glass"
                      placeholder="Enter your address"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="glass-button w-full"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : "Save Changes"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-1">
            <Card className="glass shadow-sm">
              <CardHeader>
                <CardTitle>Account Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Total Orders</p>
                  <p className="text-2xl font-bold">{profile?.orders_count || 0}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">Account Created</p>
                  <p className="text-sm">
                    {profile?.created_at 
                      ? new Date(profile.created_at).toLocaleDateString() 
                      : "N/A"}
                  </p>
                </div>
                
                <div className="pt-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate("/")}
                  >
                    Browse Products
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 