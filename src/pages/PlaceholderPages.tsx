const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold">{title}</h1>
    <p className="text-muted-foreground">This page is under construction. Coming soon!</p>
  </div>
);

// SampleOrdersPage and AgreementsPage moved to dedicated files
export const ConfigPage = () => <PlaceholderPage title="Backend Configuration" />;
export const ProfilePage = () => <PlaceholderPage title="My Profile" />;
