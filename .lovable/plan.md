

# Premium HoReCa Distribution — Pre-Sales CRM Dashboard

## Overview
A full-featured CRM dashboard for Ninjacart's Premium HoReCa Distribution team, tracking a 4-step pre-sales funnel from prospect discovery through signed agreements. The app serves 4 user personas (Calling Agent, Lead Taker, KAM, Manager/Admin) with role-based access, pincode-based data filtering, and comprehensive analytics.

**Branding**: Ninjacart green theme (#1B5E20 primary, #4CAF50 secondary, #FF9800 accent) with clean, professional design using Inter font.

---

## Phase 1: Foundation & Layout

### Authentication & Role System
- Login page with Ninjacart branding and email/password authentication via Supabase
- Role selection (Calling Agent, Lead Taker, KAM, Manager/Admin) with role-based landing defaults
- 4 pre-seeded test users with pincode mappings
- User roles stored in a separate `user_roles` table (security best practice)

### Global Layout
- Collapsible sidebar with step navigation, badge counts, and icons
- Top bar with logo, user info, role badge, notification bell, and quick action buttons (+Log Call, +Start Visit, +Add Lead)
- Global search across all entities
- Mobile-responsive design (hamburger menu, stacking cards, single-column forms)

---

## Phase 2: Landing Dashboard

### Calendar & Scheduling
- Horizontal week strip with today highlighted and appointment count badges
- Day click reveals scheduled appointments color-coded by type (Call/Visit/Sample Delivery/Agreement)

### Resources Carousel
- Scrollable cards for product photos, training videos, and brochures (placeholder content)

### Metrics Summary
- Key metric cards (Total Prospects, Leads, Sample Orders, Agreements, Today's Activity, Conversion Rate, Pipeline Value)
- Filter bar: Today/MTD/Weekly/Custom + Persona + Pincode filters

### Step Navigation Cards
- 4 large clickable cards with counts, mini progress bars, and direct navigation to each step

---

## Phase 3: Step 1 — Prospect Building

- Sortable/filterable prospect table (Pincode, Locality, Restaurant Name, Source, Cuisine, Status, Actions)
- Add Prospect modal with auto-fill locality from pincode
- Bulk CSV import with de-duplication check and preview
- Bulk assign functionality (multi-select checkboxes)
- Prospect detail drawer with activity log and "Convert to Lead" CTA
- 32 realistic Bangalore restaurant dummy records across 5 pincodes

---

## Phase 4: Step 2 — Lead Generation

- Three sub-tabs: First Call/Visit, Re-calls/Re-visits, Drop-outs (each with badge counts)
- Card-based lead list with aging indicators (green/yellow/red dots), attempt counts, and quick actions
- Log Call modal with outcome-driven conditional fields (PM contact capture on "Interested", appointment scheduling)
- Log Visit modal with full lead qualification form (GST, avocado consumption, supplier info, monthly spend)
- Drop Lead modal with configurable reasons
- Lead detail page with full timeline/activity log
- 22 dummy leads with varied statuses and activity histories

---

## Phase 5: Step 3 — Visit to Sample Order

- Three sub-tabs: First Visit, Re-visits, Drop-outs
- Full-page visit form with sections: Pre-filled Lead Info, Visit Details, Avocado Specification, Order Details, Next Steps
- **Avocado Specification** — Dynamic repeatable rows with auto-stage resolution from consumption days (Stage 1-4), quantity, box count, grammage-to-SKU mapping, and summary table
- Sample order placement with delivery date, address, and slot selection
- 12 dummy sample orders with multi-stage avocado specs

---

## Phase 6: Step 4 — Sample Order to Agreement

- Three sub-tabs: Pending Feedback, Re-visits, Drop-outs
- Agreement form with quality feedback gate (hides commercial sections if quality = No)
- Commercial terms: pricing type, agreed price, outlets, payment type, credit terms, volume
- Delivery & distribution partner assignment
- Agreement preview modal and "Send for E-Sign" flow with status tracking
- 7 dummy agreements at various stages

---

## Phase 7: Analytics Dashboard

- **Funnel Visualization** — Horizontal funnel chart (Recharts) with conversion percentages and drill-down
- **Drop-off Analysis** — Stacked bar chart showing drop reasons per stage
- **5 Analytics Tabs**:
  - Persona Productivity (calls/visits/conversions per persona)
  - Pipeline Health (donut chart, aging analysis, volume forecast gauge)
  - Geography/Pincode View (penetration table with heatmap coloring)
  - Re-contact Queue (overdue re-calls and re-visits sorted by urgency)
  - Volume Forecasting (line chart: target vs pipeline vs actual over 8 weeks)
- Global filters: date range, persona, pincode + CSV export

---

## Phase 8: Backend Configuration (Admin Only)

- **6 Config Tabs**: Pincode-Persona Mapping, SKU Specification Mapping, Consumption-to-Stage Mapping, Delivery Slots, Distribution Partners, Drop Reasons (per step)
- All tables are editable inline with add/edit/delete functionality
- Pre-seeded with realistic configuration data

---

## Phase 9: Cross-Cutting Features

- **De-duplication**: Warning modal on duplicate Restaurant Name + Pincode
- **Activity Logging**: Every state transition tracked with timestamp, user, action, and notes — displayed as vertical timeline
- **Notifications Panel**: Appointment reminders, overdue alerts, assignment notifications (8 pre-populated)
- **Global Search**: Search across all entities with grouped results

---

## Database (Supabase)

All data stored in Supabase with proper tables for: prospects, leads, sample_orders, avocado_specs, agreements, activity_logs, pincode_persona_map, sku_mapping, stage_mapping, delivery_slots, distribution_partners, drop_reasons, user_roles, and notifications. RLS policies ensure pincode-based data access per persona.

---

## Dummy Data Seeding

The app will be pre-populated with realistic Bangalore HoReCa data:
- 32 prospects, 22 leads, 12 sample orders, 7 agreements
- 80+ activity log entries, 15+ appointments, 8 notifications
- Realistic restaurant names, addresses, and contacts across Koramangala, Indiranagar, Whitefield, Jayanagar, and MG Road

Every page, modal, form, filter, tab, and button will be fully functional with this data — demo-ready from day one.

