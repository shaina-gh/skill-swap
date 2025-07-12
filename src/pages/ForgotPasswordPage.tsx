import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Mail, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate password reset process
    setTimeout(() => {
      if (email) {
        toast({
          title: "Reset email sent!",
          description: "Check your email for password reset instructions.",
        });
        setEmailSent(true);
      } else {
        toast({
          title: "Email required",
          description: "Please enter your email address.",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 1000);
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-fade-in">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-3 hover-scale">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary shadow-neon">
                <Zap className="h-7 w-7 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">SkillSwap</span>
            </Link>
          </div>

          <Card className="card-glass border-card-border shadow-card">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-foreground mb-2">
                Check Your Email
              </CardTitle>
              <p className="text-muted-foreground">
                We've sent password reset instructions to {email}
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setEmailSent(false)}
                  className="w-full"
                >
                  Try Different Email
                </Button>
              </div>

              <div className="text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center text-sm text-neon-blue hover:text-neon-purple transition-smooth"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-3 hover-scale">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary shadow-neon">
              <Zap className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">SkillSwap</span>
          </Link>
        </div>

        <Card className="card-glass border-card-border shadow-card">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-foreground mb-2">
              Reset Password
            </CardTitle>
            <p className="text-muted-foreground">
              Enter your email and we'll send you reset instructions
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-card border-card-border focus:border-neon-blue h-12"
                    required
                  />
                </div>
              </div>

              {/* Send Reset Button */}
              <Button
                type="submit"
                variant="neon"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Instructions"}
              </Button>
            </form>

            {/* Back to Login Link */}
            <div className="text-center">
              <Link
                to="/login"
                className="inline-flex items-center text-sm text-neon-blue hover:text-neon-purple transition-smooth"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}