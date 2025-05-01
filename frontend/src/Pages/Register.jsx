import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, User, Mail, Lock, Truck, ShoppingBag, Factory } from "lucide-react";
import toast from "react-hot-toast";
import useAuthStore from "../store/authStore";

export default function Register() {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);

  const [form, setForm] = useState({ name: "", email: "", password: "", role: "customer" });
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Password strength meter
    if (name === "password") {
      const strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
    }
  };
  
  const handleRoleChange = (role) => setForm(prev => ({ ...prev, role }));

  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (password.length > 6) score += 1;
    if (password.length > 10) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score;
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordStrength <= 1) {
      toast.error("Please use a stronger password");
      return;
    }
    
    setLoading(true);
    const { name, email, password, role } = form;

    try {
      const res = await register({ name, email, password, role });
      if (res) {
        toast.success("Registration successful!");
        navigate("/dashboard");
      } else {
        toast.error("Registration failed");
      }
    } catch (err) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const getRoleIcon = (role) => {
    switch(role) {
      case "customer": return <ShoppingBag size={16} />;
      case "shipper": return <Truck size={16} />;
      case "manufacturer": return <Factory size={16} />;
      default: return null;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          {/* Header with accent color */}
          <div className="bg-indigo-600 py-6 px-8">
            <h2 className="text-3xl font-bold text-white text-center">Create Account</h2>
            <p className="text-center text-indigo-100 mt-2">Join our IoT device management platform</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-5">
              {/* Name input with icon */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Email input with icon */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Password input with icon and strength meter */}
              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                
                {form.password && (
                  <div className="space-y-1">
                    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getStrengthColor()}`} 
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500">
                      {passwordStrength <= 1 && "Weak password"}
                      {passwordStrength > 1 && passwordStrength <= 3 && "Moderate password"}
                      {passwordStrength > 3 && "Strong password"}
                    </p>
                  </div>
                )}
              </div>

              {/* Role selection with improved UI */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700">Select your role:</p>
                <div className="grid grid-cols-3 gap-3">
                  {["customer", "shipper", "manufacturer"].map((role) => (
                    <button
                      type="button"
                      key={role}
                      onClick={() => handleRoleChange(role)}
                      className={`py-3 px-2 rounded-lg border text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 
                        ${form.role === role
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                          : "bg-white border-gray-300 text-gray-600 hover:bg-indigo-50 hover:border-indigo-300"
                        }`}
                    >
                      {getRoleIcon(role)}
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-md"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" />
                    <span>Processing...</span>
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline cursor-pointer transition-colors"
                >
                  Sign in instead
                </span>
              </p>
            </div>
          </form>
        </div>
        
        <p className="text-center text-xs text-gray-500 mt-6">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}