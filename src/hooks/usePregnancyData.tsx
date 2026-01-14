import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { differenceInWeeks, differenceInDays, addWeeks } from 'date-fns';

interface PregnancyData {
  dueDate: Date | null;
  babyName: string | null;
  currentWeek: number;
  daysUntilDue: number;
  trimester: number;
  progress: number;
}

export const usePregnancyData = () => {
  const { user } = useAuth();
  const [pregnancyData, setPregnancyData] = useState<PregnancyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPregnancyData = async () => {
    if (!user) {
      setPregnancyData(null);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('pregnancy_data')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        const dueDate = new Date(data.due_date);
        const today = new Date();
        const conceptionDate = addWeeks(dueDate, -40);
        const currentWeek = Math.max(1, Math.min(40, differenceInWeeks(today, conceptionDate) + 1));
        const daysUntilDue = Math.max(0, differenceInDays(dueDate, today));
        const trimester = currentWeek <= 12 ? 1 : currentWeek <= 26 ? 2 : 3;
        const progress = Math.min(100, (currentWeek / 40) * 100);

        setPregnancyData({
          dueDate,
          babyName: data.baby_name,
          currentWeek,
          daysUntilDue,
          trimester,
          progress
        });
      } else {
        setPregnancyData(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch pregnancy data');
    } finally {
      setLoading(false);
    }
  };

  const savePregnancyData = async (dueDate: Date, babyName?: string) => {
    if (!user) return { error: new Error('Not authenticated') };

    try {
      const { error } = await supabase
        .from('pregnancy_data')
        .upsert({
          user_id: user.id,
          due_date: dueDate.toISOString().split('T')[0],
          baby_name: babyName || null
        }, { onConflict: 'user_id' });

      if (error) throw error;
      
      await fetchPregnancyData();
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err : new Error('Failed to save pregnancy data') };
    }
  };

  useEffect(() => {
    fetchPregnancyData();
  }, [user]);

  return { pregnancyData, loading, error, savePregnancyData, refetch: fetchPregnancyData };
};
