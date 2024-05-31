"use server";

import { Brand } from "@/components/ui/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/server";
import { Database } from "@/supabase/types";
import { createServerClient } from "@supabase/ssr";
import { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request, { params }) {

  const email = decodeURIComponent(params.username);
  let password = email;
  if (email !== "gaelle.allali@carreopera.com") {
    password = "parnassa";
  }

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
   redirect(`/login?message=${encodeURIComponent(error.message)}`);
  }

  redirect("/chat");

  return "hello"
}
