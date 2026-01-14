import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { format } from 'date-fns';

export const useNutritionLogs = () => {
  const { user } = useAuth();
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const today = format(new Date(), 'yyyy-MM-dd');

  const fetchTodayLogs = async () => {
    if (!user) {
      setCompletedItems(new Set());
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('nutrition_logs')
        .select('item_id')
        .eq('user_id', user.id)
        .eq('log_date', today)
        .eq('completed', true);

      if (error) throw error;

      setCompletedItems(new Set(data?.map(log => log.item_id) || []));
    } catch (err) {
      console.error('Failed to fetch nutrition logs:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleItem = async (itemId: string) => {
    if (!user) return;

    const isCompleted = completedItems.has(itemId);
    
    // Optimistic update
    const newSet = new Set(completedItems);
    if (isCompleted) {
      newSet.delete(itemId);
    } else {
      newSet.add(itemId);
    }
    setCompletedItems(newSet);

    try {
      if (isCompleted) {
        await supabase
          .from('nutrition_logs')
          .delete()
          .eq('user_id', user.id)
          .eq('log_date', today)
          .eq('item_id', itemId);
      } else {
        await supabase
          .from('nutrition_logs')
          .upsert({
            user_id: user.id,
            log_date: today,
            item_id: itemId,
            completed: true
          }, { onConflict: 'user_id,log_date,item_id' });
      }
    } catch (err) {
      // Revert on error
      console.error('Failed to update nutrition log:', err);
      setCompletedItems(completedItems);
    }
  };

  useEffect(() => {
    fetchTodayLogs();
  }, [user]);

  return { completedItems, loading, toggleItem };
};
