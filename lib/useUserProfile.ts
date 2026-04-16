"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export function useUserProfile() {
  const [authorName, setAuthorName] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setUserId(null);
        setAuthorName(null);
        setLoading(false);
        return;
      }

      setUserId(user.id);

      const { data } = await supabase
        .from("profiles")
        .select("author_name")
        .eq("id", user.id)
        .single();

      setAuthorName(data?.author_name ?? null);

      setLoading(false);
    };

    loadProfile();
  }, []);

  return { userId, authorName, loading };
}
