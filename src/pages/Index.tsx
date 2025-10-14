import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { AuthPage } from "@/components/AuthPage";
import { TutorialScreen } from "@/components/TutorialScreen";
import { Dashboard } from "@/components/Dashboard";
import { toast } from "sonner";

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [farmName, setFarmName] = useState("");
  const [showTutorial, setShowTutorial] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile to get farm name
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
          
          // Show tutorial only on first login
          const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
          if (!hasSeenTutorial) {
            setShowTutorial(true);
            localStorage.setItem('hasSeenTutorial', 'true');
          }
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
        
        const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
        if (!hasSeenTutorial) {
          setShowTutorial(true);
          localStorage.setItem('hasSeenTutorial', 'true');
        }
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('farm_name')
        .eq('id', userId)
        .single();

      if (error) throw error;
      
      if (data) {
        setFarmName(data.farm_name);
      }
    } catch (error: any) {
      console.error("Erro ao buscar perfil:", error);
    }
  };

  const handleAuthSuccess = () => {
    // Auth state change will be handled by the listener
  };

  const handleCloseTutorial = () => {
    setShowTutorial(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user || !session) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  if (showTutorial) {
    return <TutorialScreen userName={farmName || "Produtor"} onClose={handleCloseTutorial} />;
  }

  return <Dashboard userName={farmName || "Produtor"} />;
};

export default Index;
