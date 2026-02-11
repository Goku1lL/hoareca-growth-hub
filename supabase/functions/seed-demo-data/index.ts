import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const demoUsers = [
      { email: "agent@ninjacart.com", password: "demo123456", full_name: "Rahul Sharma", role: "calling_agent" },
      { email: "leadtaker@ninjacart.com", password: "demo123456", full_name: "Priya Patel", role: "lead_taker" },
      { email: "kam@ninjacart.com", password: "demo123456", full_name: "Vikram Singh", role: "kam" },
      { email: "admin@ninjacart.com", password: "demo123456", full_name: "Anita Desai", role: "admin" },
    ];

    const results = [];

    for (const u of demoUsers) {
      // Check if user exists
      const { data: existingUsers } = await supabase.auth.admin.listUsers();
      const existing = existingUsers?.users?.find((x: any) => x.email === u.email);

      if (existing) {
        // Ensure role exists
        await supabase.from("user_roles").upsert(
          { user_id: existing.id, role: u.role },
          { onConflict: "user_id,role" }
        );
        results.push({ email: u.email, status: "already exists" });
        continue;
      }

      const { data, error } = await supabase.auth.admin.createUser({
        email: u.email,
        password: u.password,
        email_confirm: true,
        user_metadata: { full_name: u.full_name },
      });

      if (error) {
        results.push({ email: u.email, status: "error", error: error.message });
        continue;
      }

      // Insert role
      await supabase.from("user_roles").insert({ user_id: data.user.id, role: u.role });
      results.push({ email: u.email, status: "created" });
    }

    // Seed pincode mappings
    await supabase.from("pincode_persona_map").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    const pincodeMap = [
      { pincode: "560034", locality: "Koramangala", user_email: "agent@ninjacart.com", role: "calling_agent" },
      { pincode: "560095", locality: "Whitefield", user_email: "agent@ninjacart.com", role: "calling_agent" },
      { pincode: "560034", locality: "Koramangala", user_email: "leadtaker@ninjacart.com", role: "lead_taker" },
      { pincode: "560038", locality: "Indiranagar", user_email: "leadtaker@ninjacart.com", role: "lead_taker" },
      { pincode: "560095", locality: "Whitefield", user_email: "leadtaker@ninjacart.com", role: "lead_taker" },
      { pincode: "560034", locality: "Koramangala", user_email: "kam@ninjacart.com", role: "kam" },
      { pincode: "560038", locality: "Indiranagar", user_email: "kam@ninjacart.com", role: "kam" },
      { pincode: "560095", locality: "Whitefield", user_email: "kam@ninjacart.com", role: "kam" },
      { pincode: "560008", locality: "Jayanagar", user_email: "kam@ninjacart.com", role: "kam" },
      { pincode: "560001", locality: "MG Road", user_email: "kam@ninjacart.com", role: "kam" },
      { pincode: "560034", locality: "Koramangala", user_email: "admin@ninjacart.com", role: "admin" },
      { pincode: "560038", locality: "Indiranagar", user_email: "admin@ninjacart.com", role: "admin" },
      { pincode: "560095", locality: "Whitefield", user_email: "admin@ninjacart.com", role: "admin" },
      { pincode: "560008", locality: "Jayanagar", user_email: "admin@ninjacart.com", role: "admin" },
      { pincode: "560001", locality: "MG Road", user_email: "admin@ninjacart.com", role: "admin" },
    ];
    await supabase.from("pincode_persona_map").insert(pincodeMap);

    // Seed config data
    await supabase.from("sku_mapping").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("sku_mapping").insert([
      { grammage: 150, sku_name: "Hass Avocado 150g", lot_size: 4, box_count: 20 },
      { grammage: 180, sku_name: "Hass Avocado 180g", lot_size: 4.5, box_count: 16 },
      { grammage: 220, sku_name: "Hass Avocado 220g", lot_size: 5.5, box_count: 16 },
      { grammage: 280, sku_name: "Hass Avocado 280g", lot_size: 5, box_count: 12 },
      { grammage: 350, sku_name: "Hass Avocado 350g", lot_size: 6.5, box_count: 18 },
    ]);

    await supabase.from("stage_mapping").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("stage_mapping").insert([
      { consumption_days_min: 0, consumption_days_max: 1, stage_number: 4, stage_description: "Ready to Eat (Dark/Soft)" },
      { consumption_days_min: 2, consumption_days_max: 2, stage_number: 3, stage_description: "Near Ripe (Breaking Color)" },
      { consumption_days_min: 3, consumption_days_max: 4, stage_number: 2, stage_description: "Turning (Lightening)" },
      { consumption_days_min: 5, consumption_days_max: 99, stage_number: 1, stage_description: "Hard Green (Fresh Import)" },
    ]);

    await supabase.from("delivery_slots").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("delivery_slots").insert([
      { slot_name: "Morning: 9 AM–12 PM", start_time: "09:00", end_time: "12:00", is_active: true },
      { slot_name: "Afternoon: 12 PM–3 PM", start_time: "12:00", end_time: "15:00", is_active: true },
    ]);

    await supabase.from("distribution_partners").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("distribution_partners").insert([
      { name: "DP-Koramangala", city: "Bangalore", status: "active", commission_pct: 8, area_coverage: "Koramangala, HSR Layout" },
      { name: "DP-Indiranagar", city: "Bangalore", status: "active", commission_pct: 7.5, area_coverage: "Indiranagar, CV Raman Nagar" },
      { name: "DP-Whitefield", city: "Bangalore", status: "active", commission_pct: 9, area_coverage: "Whitefield, Marathahalli" },
      { name: "DP-Central", city: "Bangalore", status: "active", commission_pct: 7, area_coverage: "MG Road, Jayanagar, Basavanagudi" },
    ]);

    await supabase.from("drop_reasons").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("drop_reasons").insert([
      { step_number: 2, reason_text: "Not Interested", is_active: true },
      { step_number: 2, reason_text: "Not Reachable", is_active: true },
      { step_number: 2, reason_text: "Wrong Contact", is_active: true },
      { step_number: 2, reason_text: "Other", is_active: true },
      { step_number: 3, reason_text: "Price Too High", is_active: true },
      { step_number: 3, reason_text: "Quality Not Matching", is_active: true },
      { step_number: 3, reason_text: "Competitor Lock-in", is_active: true },
      { step_number: 3, reason_text: "No Demand", is_active: true },
      { step_number: 3, reason_text: "Other", is_active: true },
      { step_number: 4, reason_text: "Quality Negative", is_active: true },
      { step_number: 4, reason_text: "Commercial Terms Issue", is_active: true },
      { step_number: 4, reason_text: "Other", is_active: true },
    ]);

    return new Response(JSON.stringify({ success: true, users: results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
